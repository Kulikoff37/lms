import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const subjects = await prisma.subject.findMany()

  return NextResponse.json({
    data: subjects,
  })
}
