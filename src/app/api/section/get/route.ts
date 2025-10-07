import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const sections = await prisma.section.findMany()

  return NextResponse.json({
    data: sections,
  })
}