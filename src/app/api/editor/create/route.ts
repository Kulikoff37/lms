import prisma from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const response = await req.json()

  try {
    const school = await prisma.question.create({
      data: {
        ...response
      }
    })
    return NextResponse.json(
      { school },
      { status: 201 }
    )
  } catch (e) {
    return NextResponse.json(
      { error: e },
      { status: 400 }
    )
  }
}
