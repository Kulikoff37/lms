import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: 'ID варианта обязателен для удаления' },
        { status: 400 }
      );
    }

    // Delete the test variant
    await prisma.testVariant.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Вариант успешно удален',
    });
  } catch (error: any) {
    console.error('Error deleting test variant:', error);

    // Check if it's a Prisma error related to foreign key constraints
    if (error.code === 'P2003' || error.code === 'P2014') {
      return NextResponse.json(
        { error: 'Невозможно удалить вариант, так как он используется в других местах' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Ошибка при удалении варианта: ' + (error.message || 'Неизвестная ошибка') },
      { status: 500 }
    );
  }
}