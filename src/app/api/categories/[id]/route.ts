// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

import { prisma } from '@/libs/prisma';

const API_KEY = process.env.API_KEY;

interface Params {
  params: { id: string };
}

// Obtener categoria por ID
export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = params;

    const categoryById = await prisma?.category.findFirst({
      where: { id },
      include: { products: true },
    });

    if (!categoryById) {
      return NextResponse.json(
        { message: 'La categoria no existe' },
        { status: 404 },
      );
    }

    return NextResponse.json(categoryById);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
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

// Actualizar categoria
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
    const { name } = await request.json();

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          {
            message: 'La categoria no existe',
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

// Eliminar categoria
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

    const deletedCategory = await prisma.category.delete({ where: { id } });

    return NextResponse.json(deletedCategory);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          {
            message: 'La categoria no existe',
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
