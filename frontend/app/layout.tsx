import "./globals.css";
import { Toaster } from 'sonner';

export const metadata = {
  title: "Loop",
  description: "Donde los desarrolladores crecen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}         <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
