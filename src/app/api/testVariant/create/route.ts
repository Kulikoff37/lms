import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, questionIds } = body;

    if (!title || !Array.isArray(questionIds)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const newVariant = await prisma.testVariant.create({
      data: {
        title,
        questions: questionIds,
      },
    });

    return NextResponse.json(newVariant, { status: 201 });
  } catch (error) {
    console.error("Error creating test variant:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}