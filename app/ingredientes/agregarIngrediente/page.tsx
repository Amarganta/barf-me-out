'use client';

import {
  Box,
  Button,
  Input,
  Select,
  Option,
  Typography,
  FormControl,
  FormLabel,
  Stack,
  Table,
  Sheet,
  Alert,
} from '@mui/joy';
import { useEffect, useState } from 'react';

type IngredientBase = {
  id: string;
  name: string;
  category: string;
  subcategory?: string | null;
  vegetableType?: string | null;
};

const CATEGORIES = ['HUESOS_CARNOSOS', 'CARNE', 'VISCERAS', 'VEGETALES', 'COMPLEMENTOS'];

const SUBCATEGORIES: Record<string, string[]> = {
  CARNE: ['MAGRA', 'SEMIGRASA'],
  VEGETALES: ['FIBROSOS', 'ALMIDONADOS'],
};

const VEGETABLE_TYPES = ['HOJAS_VERDES', 'CRUCIFEROS', 'FRUTA'];

export default function IngredientBasePage() {
  const [ingredients, setIngredients] = useState<IngredientBase[]>([]);
  const [form, setForm] = useState({
    name: '',
    category: '',
    subcategory: '',
    vegetableType: '',
  });
  const [success, setSuccess] = useState(false);

  const fetchIngredients = async () => {
    const res = await fetch('/api/ingredient-base');
    const data = await res.json();
    setIngredients(data);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/ingredient-base', {
      method: 'POST',
      body: JSON.stringify({
        name: form.name,
        category: form.category,
        subcategory: form.subcategory || null,
        vegetableType: form.vegetableType || null,
      }),
    });

    if (res.ok) {
      setForm({ name: '', category: '', subcategory: '', vegetableType: '' });
      setSuccess(true);
      fetchIngredients();
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <Box>
      <Typography level="h2" mb={2}>
        Ingredientes base
      </Typography>

      <Sheet sx={{ p: 3, mb: 4, borderRadius: 'md', bgcolor: 'background.level1' }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>Categoría</FormLabel>
              <Select
                value={form.category}
                onChange={(_, val) => setForm({
                  ...form,
                  category: val ?? '',
                  subcategory: '',
                  vegetableType: '',
                })}
                required
              >
                {CATEGORIES.map((cat) => (
                  <Option key={cat} value={cat}>{cat}</Option>
                ))}
              </Select>
            </FormControl>

            {SUBCATEGORIES[form.category] && (
              <FormControl>
                <FormLabel>Subcategoría</FormLabel>
                <Select
                  value={form.subcategory}
                  onChange={(_, val) => setForm({
                    ...form,
                    subcategory: val ?? '',
                    vegetableType: '', // reset si cambia
                  })}
                >
                  {SUBCATEGORIES[form.category].map((sub) => (
                    <Option key={sub} value={sub}>{sub}</Option>
                  ))}
                </Select>
              </FormControl>
            )}

            {form.category === 'VEGETALES' && form.subcategory === 'FIBROSOS' && (
              <FormControl>
                <FormLabel>Tipo de vegetal fibroso</FormLabel>
                <Select
                  value={form.vegetableType}
                  onChange={(_, val) =>
                    setForm({ ...form, vegetableType: val ?? '' })
                  }
                >
                  {VEGETABLE_TYPES.map((tipo) => (
                    <Option key={tipo} value={tipo}>{tipo}</Option>
                  ))}
                </Select>
              </FormControl>
            )}

            <Button type="submit">Agregar ingrediente base</Button>
          </Stack>
        </form>
      </Sheet>

      {success && <Alert color="success">Ingrediente agregado correctamente</Alert>}
    </Box>
  );
}
