import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

import { prisma } from '@/libs/prisma';

const API_KEY = process.env.API_KEY;

interface Params {
  params: { id: string };
}

// Obtener un producto por ID
export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = params;

    const product = await prisma.product.findFirst({ where: { id } });

    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          {
            message: 'El producto no existe',
          },
          { status: 404 },
        );
      }
      if (error.code === 'P2023') {
        return NextResponse.json(
          {
            message: 'ID inválido',
          },
          { status: 400 },
        );
      }
      NextResponse.json({ message: error.message }, { status: 500 });
    }
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

// Actualizar un producto
export async function PATCH(request: Request, { params }: Params) {
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

    const { id } = params;
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
    } = body;

    const productUpdated = await prisma.product.update({
      where: { id },
      data: {
        title,
        categoryId,
        flavors,
        fillings,
        decorations,
        weights,
        portions,
        prices,
      },
    });

    return NextResponse.json(productUpdated);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          {
            message: 'El producto no existe',
          },
          { status: 404 },
        );
      }
      if (error.code === 'P2023') {
        return NextResponse.json(
          {
            message: 'ID inválido',
          },
          { status: 400 },
        );
      }
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

// Eliminar un Producto

export async function DELETE(request: Request, { params }: Params) {
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

    const { id } = params;

    const productDeleted = await prisma.product.delete({ where: { id } });

    return NextResponse.json(productDeleted);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          {
            message: 'El producto no existe',
          },
          { status: 404 },
        );
      }
      if (error.code === 'P2023') {
        return NextResponse.json(
          {
            message: 'ID inválido',
          },
          { status: 400 },
        );
      }
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
