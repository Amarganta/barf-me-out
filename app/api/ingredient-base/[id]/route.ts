// app/api/ingredient-base/[id]/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

type Params = {
  params: { id: string };
};

export async function PUT(req: Request, { params }: Params) {
  const body = await req.json();
  const { name, category } = body;

  try {
    const updated = await prisma.ingredientBase.update({
      where: { id: params.id },
      data: { name, category },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating base ingredient' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await prisma.ingredientBase.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting base ingredient' }, { status: 500 });
  }
}
