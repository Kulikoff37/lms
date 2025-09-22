import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const questions = await prisma.question.findMany()

  return NextResponse.json({
    data: {
      questions,
      topic: 'Выбранные вопросы',
    },
  })
}
