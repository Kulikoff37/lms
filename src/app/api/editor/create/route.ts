import prisma from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const questionData = await req.json()
    console.log('Received question data:', questionData)

    if (questionData.subjectId) {
      const subjectExists = await prisma.subject.findUnique({
        where: { id: questionData.subjectId }
      })
      
      if (!subjectExists) {
        console.log('Subject not found:', questionData.subjectId)
        questionData.subjectId = null
      }
    }

    if (questionData.section) {
      const sectionExists = await prisma.section.findUnique({
        where: { id: questionData.section }
      })
      
      if (!sectionExists) {
        console.log('Section not found:', questionData.section)
        questionData.section = null
      }
    }

    const data = {
      id: questionData.id,
      text: String(questionData.text),
      type: questionData.type,
      subjectId: questionData.subjectId || null,
      sectionId: questionData.section || null,
    }

    const question = await prisma.question.create({
      data
    })

    return NextResponse.json(
      { question },
      { status: 201 }
    )
  } catch (e) {
    console.error('Error creating question:', e)
    const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred'
    
    if (e instanceof Error && e.message.includes('P2003')) {
      return NextResponse.json(
        { error: 'Foreign key constraint failed. Please check if the subject or section exists.' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create question', details: errorMessage },
      { status: 400 }
    )
  }
}
