'use client';
import {
  Box,
  Button,
  Input,
  Select,
  Option,
  Typography,
  Sheet,
  FormControl,
  FormLabel,
  Stack,
  Alert,
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

export default function IngredientesPage() {
  // const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [success, setSuccess] = useState(false);

  const initialForm = {
    name: '',
    category: '',
    subcategory: '',
    quantity: '',
    unit: '',
    mode: 'kg',
  };
  const [form, setForm] = useState(initialForm);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/ingredients', {
      method: 'POST',
      body: JSON.stringify({
        name: form.name,
        category: form.category,
        subcategory: form.subcategory || null,
        quantity: parseFloat(form.quantity),
        unit: form.mode === 'kg' ? 'kg' : 'unidad',
      }),
    });

    if (res.ok) {
      setForm(initialForm);
      setSuccess(true);    
      setTimeout(() => setSuccess(false), 3000);  
    }
  };

  return (
    <Box>
      <Typography level="h2" mb={2}>
        Ingredientes
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
                onChange={(_, val) => {
                  setForm({ ...form, category: val ?? '', subcategory: '' });
                }}
                required
              >
                {CATEGORIES.map((cat) => (
                  <Option key={cat} value={cat}>
                    {cat}
                  </Option>
                ))}
              </Select>
            </FormControl>

            {SUBCATEGORIES[form.category] && (
              <FormControl>
                <FormLabel>Subcategoría</FormLabel>
                <Select
                  value={form.subcategory}
                  onChange={(_, val) => setForm({ ...form, subcategory: val ?? '' })}
                >
                  {SUBCATEGORIES[form.category].map((sub) => (
                    <Option key={sub} value={sub}>
                      {sub}
                    </Option>
                  ))}
                </Select>
              </FormControl>
            )}
            <FormControl>
              <FormLabel>Tipo de cantidad</FormLabel>
              <Select
                value={form.mode}
                onChange={(_, val) => {
                  setForm({ ...form, mode: val ?? 'kg', quantity: '' });
                }}
              >
                <Option value="kg">Kilogramos</Option>
                <Option value="unidad">Unidades</Option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>{form.mode === 'kg' ? 'Cantidad (kg)' : 'Cantidad (unidades)'}</FormLabel>
              <Input
              slotProps={{
                input: {
                  type: 'number',
                  min: form.mode === 'kg' ? '0.1' : '1',
                  step: form.mode === 'kg' ? '0.1' : '1',
                },
              }}
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                required
              />
            </FormControl>
            <Button type="submit">Agregar ingrediente</Button>
          </Stack>
        </form>
      </Sheet>
      {success && <Alert color="success">Ingrediente agregado con éxito</Alert>}
    </Box>
  );
}
