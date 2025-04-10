// app/api/ingredients/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const ingredients = await prisma.ingredient.findMany();
  return NextResponse.json(ingredients);
}

export async function POST(req: Request) {
  const data = await req.json();
  const { name, category, subcategory, quantity, unit } = data;

  try {
    const newIngredient = await prisma.ingredient.create({
      data: {
        name,
        category,
        subcategory,
        quantity,
        unit,
      },
    });

    return NextResponse.json(newIngredient, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating ingredient' }, { status: 500 });
  }
}
