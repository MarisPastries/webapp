import { NextResponse } from 'next/server';
import { UploadApiResponse } from 'cloudinary';

import { cloudinaryUploader } from '@/libs/cloudinary';
import { Prisma } from '@prisma/client';

const API_KEY = process.env.API_KEY;

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

    // Obtener los datos
    const data = await request.formData();

    // Manipular los datos
    // -- Imagen
    const image = data.get('image') as File;

    if (!image) {
      return NextResponse.json(
        { message: 'Imagen necesaria' },
        { status: 400 },
      );
    }

    // Procesar imagen para enviarla como buffer a cloudinary
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Cargar Imagen en Cloudinary
    const cloudinaryResponse: UploadApiResponse = await new Promise(
      (res, rej) => {
        cloudinaryUploader
          .upload_stream(
            {
              folder: 'marispastries',
            },
            (err, result) => {
              if (err) {
                rej(err);
              }
              if (result) {
                res(result);
              }
            },
          )
          .end(buffer);
      },
    );

    return NextResponse.json({ url: cloudinaryResponse.secure_url });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
