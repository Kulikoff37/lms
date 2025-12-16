import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import { ITestVariantServer } from '@/types/testing';
import { IQuestionServer } from '@/types/questions';
import { headers } from 'next/headers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const variantIdParam = searchParams.get('variant');
    let variantId: number | null = null;

    if (variantIdParam) {
      variantId = parseInt(variantIdParam, 10);
    }

    let testVariants;

    if (variantId) {
      // Fetch specific variant by ID
      const specificVariant = await prisma.testVariant.findUnique({
        where: {
          id: variantId,
        },
      });

      if (!specificVariant) {
        return NextResponse.json(
          { error: 'Test variant not found' },
          { status: 404 }
        );
      }

      testVariants = [specificVariant]; // Wrap in array to maintain compatibility
    } else {
      // Fetch all variants and get the first one (maintain backward compatibility)
      testVariants = await prisma.testVariant.findMany({
        orderBy: {
          id: 'asc',
        },
      });
    }

    // Check if any test variants exist
    if (testVariants.length === 0) {
      return NextResponse.json({
        data: {
          questions: [],
          topic: 'Нет доступных тестовых вариантов',
        },
      })
    }

    // Type cast the raw Prisma result to our server-side type
    const selectedTestVariant: ITestVariantServer = {
      id: testVariants[0]?.id,
      title: testVariants[0]?.title || '',
      questions: testVariants[0] && Array.isArray(testVariants[0].questions)
        ? testVariants[0].questions as string[]
        : testVariants[0] && typeof testVariants[0].questions === 'string'
          ? JSON.parse(testVariants[0].questions)
          : [],
      createdAt: testVariants[0]?.createdAt || new Date(),
      updatedAt: testVariants[0]?.updatedAt || new Date(),
    };

    // Extract questions from the selected variant (the questions field contains an array of question IDs)
    const questionIds: string[] = selectedTestVariant.questions;

    let questions: IQuestionServer[] = [];
    if (questionIds.length > 0) {
      questions = await prisma.question.findMany({
        where: {
          id: {
            in: questionIds
          }
        }
      });
    }

    return NextResponse.json({
      data: {
        questions,
        topic: selectedTestVariant.title || 'Выбранные вопросы',
        variantId: selectedTestVariant.id,
      },
    })
  } catch (error) {
    console.error('Error fetching test variant and questions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch test data' },
      { status: 500 }
    )
  }
}
