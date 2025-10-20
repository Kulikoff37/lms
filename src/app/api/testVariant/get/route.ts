import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const variants = await prisma.testVariant.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(variants, { status: 200 });
  } catch (error) {
    console.error("Error fetching test variants:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}