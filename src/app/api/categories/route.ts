import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { Prisma } from '@prisma/client';

const API_KEY = process.env.API_KEY;

// Listar todas las categorias
export async function GET() {
  try {
    const categories = await prisma.category.findMany();

    return NextResponse.json(categories);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 },
      );
    }
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 },
      );
    }
  }
}

// Crear una categoria
export async function POST(request: Request) {
  try {
    // Verificar ApiKey
    const apiKey = request.headers.get('api-key');
    if (!apiKey) {
      return NextResponse.json(
        { message: 'API key necesaria' },
        { status: 401 },
      );
    }
    if (apiKey !== API_KEY) {
      return NextResponse.json(
        { message: 'API key incorrecta' },
        { status: 401 },
      );
    }

    const { name }: { name: string } = await request.json();

    const categoryExist = await prisma.category.findFirst({ where: { name } });

    if (categoryExist) {
      return NextResponse.json(
        { message: 'La categoría ya existe' },
        { status: 400 },
      );
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json(newCategory);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 },
      );
    }
  }
}
