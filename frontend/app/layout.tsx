import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { cookies } from "next/headers";
import { QueryProvider } from "./providers/query-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

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
          <QueryProvider>
            <NuqsAdapter>
              {children} <Toaster position="top-center" richColors />
            </NuqsAdapter>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
