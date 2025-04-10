'use client';

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  ListItemContent,
  Typography,
} from '@mui/joy';
import Link from 'next/link';
import { ArrowBigDown, Beef, ChevronDown, Home, PawPrint, ShoppingBasket } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultExpanded);
  return (
    <>
      {renderToggle({ open, setOpen })}
      <Box
        sx={[
          {
            display: 'grid',
            transition: '0.2s ease',
            '& > *': {
              overflow: 'hidden',
            },
          },
          open ? { gridTemplateRows: '1fr' } : { gridTemplateRows: '0fr' },
        ]}
      >
        {children}
      </Box>
    </>
  );
}


export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        width: 220,
        borderRight: '1px solid #eee',
        p: 2,
        bgcolor: 'background.body',
      }}
    >
      <Typography level="h4" fontWeight="xl" mb={2}>
        BARF App
      </Typography>

      <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
      >
        <ListItem>
          <ListItemButton component={Link} href="/" selected={pathname === '/'}>
            <ListItemDecorator><Home size={18} /></ListItemDecorator>
            Inicio
          </ListItemButton>
        </ListItem>

        <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <ShoppingBasket size={18} />
                  <ListItemContent>
                    <Typography level="title-sm">Ingredientes</Typography>
                  </ListItemContent>
                  <ChevronDown 
                    size={18}
                    style={{
                      transform: open ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <Link href='/ingredientes/agregarIngrediente' className=''>Agregar ingrediente</Link>
                </ListItem>
                <ListItem>
                  <Link href='/ingredientes/seleccionarIngredientes'>Selección</Link>
                </ListItem>
                <ListItem>
                  <Link href='/ingredientes/listaDeCompras'>Lista de compras</Link>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
   
        <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <Beef size={18} />
                  <ListItemContent>
                    <Typography level="title-sm">Stock</Typography>
                  </ListItemContent>
                  <ChevronDown 
                    size={18}
                    style={{
                      transform: open ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <Link href='/stock/cargarCompraDeIngrediente' className=''>Agregar al stock</Link>
                </ListItem>
                <ListItem>
                  <Link href='/stock/stockDeIngredientes'>Ingredientes en Stock</Link>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
        <ListItem>
          <ListItemButton component={Link} href="/mascotas" selected={pathname === '/mascotas'}>
            <ListItemDecorator><PawPrint size={18} /></ListItemDecorator>
            Mascotas
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
