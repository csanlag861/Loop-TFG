import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
