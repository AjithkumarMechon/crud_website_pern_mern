import AuthModel from "@/models/authModel";
import connectMongo from "@/utils/connectMongo";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



interface UsernameRequestBody {
  username: string;
  password: string;
  role?: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "your_default_jwt_secret"; // Use environment variable
const SALT_ROUNDS = 10;

const generateAccessToken = (username: string, role: string): string => {
  return jwt.sign({ username, role }, JWT_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (username: string, role: string): string => {
  return jwt.sign({ username, role }, JWT_SECRET, { expiresIn: "7d" });
};

const generateToken = (
  username: string,
  expiresIn: string,
  role: string
): string => {
  return jwt.sign({ username, role }, JWT_SECRET, { expiresIn });
};

  const headers = {
      'Access-Control-Allow-Origin': process.env.NODE_ENV, 
      'Access-Control-Allow-Methods': 'POST, GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '3600'
    };

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const { username, password }: { username: string; password: string } = await req.json();

    const existingUser = await AuthModel.findOne({ username });

    if (existingUser) {
      const passwordMatch = await bcrypt.compare(password, existingUser.password);

      if (passwordMatch) {
        const accessToken = generateAccessToken(username, existingUser.role);
        const refreshToken = generateRefreshToken(username, existingUser.role);
        const token = generateToken(username, "1h", existingUser.role);

        return NextResponse.json(
          {
            user: existingUser.username,
            role: existingUser.role,
            token,
            refreshToken,
            accessToken,
          },
           { status: 200, headers}
        );
      } else {
        return NextResponse.json({ error: "Incorrect password." }, { status: 401, headers });
      }
    } else {
        return NextResponse.json({ error: "user not found." }, { status: 401, headers });
      }
  } catch (error) {
    console.error("Authentication Error:", error);
    return NextResponse.json({ error: "Failed to authenticate user." }, { status: 500, headers });
  }
}
