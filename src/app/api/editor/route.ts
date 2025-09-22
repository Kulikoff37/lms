import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const questions = await prisma.question.findMany({
    include: {
      subject: true,
    }
  })

  return NextResponse.json({
    data: questions,
  })
}
