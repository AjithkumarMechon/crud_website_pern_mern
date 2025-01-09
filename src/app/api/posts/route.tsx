import connectMongo from "@/utils/connectMongo";
import PostModel from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";


  const headers = {
      'Access-Control-Allow-Origin': process.env.NODE_ENV, // You can specify a domain here for production
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '3600'
    };

// GET handler
export async function GET(req: NextRequest) {
  try {
    await connectMongo();
    const postData = await PostModel.find({});
    return NextResponse.json(postData, { status: 200, headers });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500, headers});
  }
}

// POST handler
export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body = await req.json();
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "Field is empty" }, { status: 400, headers });
    }
    const postData = await PostModel.create(body);
    return NextResponse.json(postData,   { status: 201, headers});
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message },   { status: 500, headers});
  }
}
