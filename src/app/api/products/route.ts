import { NextResponse } from 'next/server';

import { Prisma } from '@prisma/client';
import { prisma } from '@/libs/prisma';

const API_KEY = process.env.API_KEY;

// Obtener todos los prodcutos
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
    });

    return NextResponse.json(products);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 },
      );
    }
  }
}

// Crear un producto
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

    const body = await request.json();

    const {
      title,
      categoryId,
      flavors,
      fillings,
      decorations,
      weights,
      portions,
      prices,
      featured,
      trending,
      holiday,
    } = body;

    // Crear producto en DB
    const newProduct = await prisma.product.create({
      data: {
        title,
        // category: { connect: { id: categoryId } },
        categoryId,
        flavors: flavors || [],
        fillings: fillings || [],
        decorations: decorations || [],
        weights: weights || [],
        portions: portions || [],
        prices,
        featured: featured || false,
        trending: trending || false,
        holiday: holiday || false,
      },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
