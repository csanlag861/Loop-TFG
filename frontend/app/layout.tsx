import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { cookies } from "next/headers";

export const metadata = {
  title: "Loop",
  description: "Donde los desarrolladores crecen.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "system";
  return (
    <html lang="es" className={theme}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme"
        >
          {children} <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
