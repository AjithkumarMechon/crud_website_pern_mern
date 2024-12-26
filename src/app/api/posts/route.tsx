import connectMongo from "@/utils/connectMongo";
import PostModel from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

// GET handler
export async function GET(req: NextRequest) {
  try {
    await connectMongo();
    const postData = await PostModel.find({});
    return NextResponse.json(postData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// POST handler
export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body = await req.json();
    if (!body) {
      return NextResponse.json({ error: "Field is empty" }, { status: 400 });
    }
    const postData = await PostModel.create(body);
    return NextResponse.json(postData, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
