// app/stock/page.tsx
'use client';

import {
  Box,
  Table,
  Typography,
} from '@mui/joy';
import { useEffect, useState } from 'react';

type Ingredient = {
  id: string;
  name: string;
  category: string;
  subcategory?: string | null;
  quantity: number;
  unit?: string | null;
};

const CATEGORIES = ['HUESOS_CARNOSOS', 'CARNE', 'VISCERAS', 'VEGETALES', 'COMPLEMENTOS'];
const SUBCATEGORIES: Record<string, string[]> = {
  CARNE: ['MAGRA', 'SEMIGRASA'],
  VEGETALES: ['FIBROSOS', 'ALMIDONADOS'],
};

export default function StockPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const fetchIngredients = async () => {
    const res = await fetch('/api/ingredients');
    const data = await res.json();
    setIngredients(data);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <Box>
      <Typography level="h2" mb={2}>
        Stock de ingredientes
      </Typography>

      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Subcategoría</th>
            <th>Cantidad</th>
            <th>Unidad</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ing) => (
            <tr key={ing.id}>
              <td>{ing.name}</td>
              <td>{ing.category}</td>
              <td>{ing.subcategory || '-'}</td>
              <td>{ing.quantity}</td>
              <td>{ing.unit || '-'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
}
