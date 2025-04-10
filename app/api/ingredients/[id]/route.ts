// app/api/ingredients/[id]/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

type Params = {
  params: { id: string };
};

export async function PUT(req: Request, { params }: Params) {
  const data = await req.json();
  const { name, category, subcategory, quantity, unit } = data;

  try {
    const updated = await prisma.ingredient.update({
      where: { id: params.id },
      data: { name, category, subcategory, quantity, unit },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating ingredient' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await prisma.ingredient.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting ingredient' }, { status: 500 });
  }
}
