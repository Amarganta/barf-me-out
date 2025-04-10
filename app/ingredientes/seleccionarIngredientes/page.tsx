'use client';

import {
  Box,
  Checkbox,
  Typography,
  Stack,
} from '@mui/joy';
import { useEffect, useState } from 'react';

type Ingredient = {
  id: string;
  name: string;
  category: string;
  subcategory?: string | null;
  vegetableType?: string | null;
};

const LABELS: Record<string, string> = {
  HUESOS_CARNOSOS: 'Huesos carnosos',
  CARNE: 'Carne',
  VISCERAS: 'Vísceras',
  VEGETALES: 'Vegetales',
  COMPLEMENTOS: 'Complementos',
  MAGRA: 'Magra',
  SEMIGRASA: 'Semigrasa',
  FIBROSOS: 'Fibrosos',
  ALMIDONADOS: 'Almidonados',
  HOJAS_VERDES: 'Hojas verdes',
  CRUCIFEROS: 'Crucíferas',
  FRUTA: 'Frutas',
};

export default function SeleccionPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const res = await fetch('/api/ingredient-base');
      const data = await res.json();
      setIngredients(data);
    };
    fetchIngredients();
  }, []);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const renderGrouped = () => {
    const grouped: Record<string, any> = {};

    ingredients.forEach((ing) => {
      const cat = ing.category;
      const sub = ing.subcategory || 'NO_SUB';
      const veg = ing.vegetableType || 'NO_TYPE';

      if (!grouped[cat]) grouped[cat] = {};
      if (cat === 'VEGETALES' && sub === 'FIBROSOS') {
        if (!grouped[cat][sub]) grouped[cat][sub] = {};
        if (!grouped[cat][sub][veg]) grouped[cat][sub][veg] = [];
        grouped[cat][sub][veg].push(ing);
      } else {
        if (!grouped[cat][sub]) grouped[cat][sub] = [];
        grouped[cat][sub].push(ing);
      }
    });

    return Object.entries(grouped).map(([cat, subgroups]) => (
      <Box key={cat} mb={3}>
        <Typography level="h3" mb={1}>{LABELS[cat] || cat}</Typography>

        {Object.entries(subgroups).map(([sub, val]) => {
          if (cat === 'VEGETALES' && sub === 'FIBROSOS') {
            return (
              <Box key={sub} ml={2} mb={2}>
                <Typography level="title-md" mb={1}>{LABELS[sub] || sub}</Typography>

                {(() => {
                  const entries = Object.entries(val as Record<string, Ingredient[]>);
                  const noType = entries.find(([type]) => type === 'NO_TYPE');
                  const typed = entries.filter(([type]) => type !== 'NO_TYPE');

                  return (
                    <>

                      {noType && (
                        <Box key="NO_TYPE" ml={2}>
                          <Stack spacing={0.5}>
                            {noType[1].map((ing) => (
                              <Checkbox
                                key={ing.id}
                                label={ing.name}
                                checked={selected.includes(ing.id)}
                                onChange={() => toggle(ing.id)}
                              />
                            ))}
                          </Stack>
                        </Box>
                      )}

                      {typed.map(([vegType, list]) => (
                        <Box key={vegType} ml={2}>
                          <Typography level="body-sm" fontWeight="lg" mb={0.5}>
                            {LABELS[vegType] || vegType}
                          </Typography>
                          <Stack ml={2} spacing={0.5}>
                            {list.map((ing) => (
                              <Checkbox
                                key={ing.id}
                                label={ing.name}
                                checked={selected.includes(ing.id)}
                                onChange={() => toggle(ing.id)}
                              />
                            ))}
                          </Stack>
                        </Box>
                      ))}
                    </>
                  );
                })()}
              </Box>
            );
          } else {
            return (
              <Box key={sub} ml={2} mb={2}>
                {sub !== 'NO_SUB' && (
                  <Typography level="title-md" mb={0.5}>
                    {LABELS[sub] || sub}
                  </Typography>
                )}
                <Stack ml={2} spacing={0.5}>
                  {(val as Ingredient[]).map((ing) => (
                    <Checkbox
                      key={ing.id}
                      label={ing.name}
                      checked={selected.includes(ing.id)}
                      onChange={() => toggle(ing.id)}
                    />
                  ))}
                </Stack>
              </Box>
            );
          }
        })}
      </Box>
    ));
  };

  return (
    <Box>
      <Typography level="h2" mb={2}>Selección de Alimentos</Typography>
      {renderGrouped()}

      <Box mt={4}>
        <Typography level="h4" mb={1}>
          Lista de compras ({selected.length})
        </Typography>
        <ul>
          {ingredients.filter((i) => selected.includes(i.id)).map((i) => (
            <li key={i.id}>{i.name}</li>
          ))}
        </ul>
      </Box>
    </Box>
  );
}
