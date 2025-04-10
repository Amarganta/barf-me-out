// app/api/ingredient-base/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await prisma.ingredientBase.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, category, subcategory, vegetableType } = body;


  try {
    const created =await prisma.ingredientBase.create({
      data: {
        name,
        category,
        subcategory: subcategory || null,
        vegetableType: vegetableType || null,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating base ingredient' }, { status: 500 });
  }
}
