import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db'

interface QuestionData {
  text: string;
  subjectId: string;
  section: string;
  type: string;
}

export async function POST(req: NextRequest) {
  try {
    const { questions } = await req.json();

    if (!Array.isArray(questions)) {
      return NextResponse.json(
        { error: 'Questions must be an array' },
        { status: 400 }
      );
    }

    // Validate each question in the array
    for (const question of questions) {
      if (!question.text || !question.subjectId || !question.section || !question.type) {
        return NextResponse.json(
          { error: 'Each question must have text, subjectId, section, and type' },
          { status: 400 }
        );
      }

      // Validate that subjectId exists in the database
      const subjectExists = await prisma.subject.findUnique({
        where: { id: question.subjectId }
      });

      if (!subjectExists) {
        return NextResponse.json(
          { error: `Subject with id ${question.subjectId} does not exist` },
          { status: 400 }
        );
      }

      // Validate that section exists in the database
      const sectionExists = await prisma.section.findUnique({
        where: { id: question.section }
      });

      if (!sectionExists) {
        return NextResponse.json(
          { error: `Section with id ${question.section} does not exist` },
          { status: 400 }
        );
      }
    }

    // Create all questions in a single transaction
    const createdQuestions = await prisma.$transaction(
      questions.map((question) =>
        prisma.question.create({
          data: {
            text: question.text,
            subjectId: question.subjectId,
            sectionId: question.section,
            type: question.type,
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      message: `Successfully created ${createdQuestions.length} questions`,
      data: createdQuestions,
    });
  } catch (error: any) {
    console.error('Error creating questions:', error);

    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Foreign key constraint failed. Please check if the subject or section exists.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}