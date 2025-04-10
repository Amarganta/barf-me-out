// app/layout.tsx
import { CssBaseline, CssVarsProvider } from '@mui/joy';
import type { Metadata } from 'next';
import Sidebar from './components/Sidebar';

export const metadata: Metadata = {
  title: 'BARF Dashboard',
  description: 'Gestión de viandas para mascotas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <CssVarsProvider defaultMode="light">
          <CssBaseline />
          <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <main style={{ flexGrow: 1, padding: '2rem' }}>{children}</main>
          </div>
        </CssVarsProvider>
      </body>
    </html>
  );
}