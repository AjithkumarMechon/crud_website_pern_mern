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
          { status: 200 }
        );
      } else {
        return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
      }
    } else {
        return NextResponse.json({ error: "user not found." }, { status: 401 });
      }
  } catch (error) {
    console.error("Authentication Error:", error);
    return NextResponse.json({ error: "Failed to authenticate user." }, { status: 500 });
  }
}
