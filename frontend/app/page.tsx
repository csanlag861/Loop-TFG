import stylesPage from "./page.module.css";
import Form from "@/features/landing/Form/Form";
import Cards from "@/features/landing/Cards/Cards";
import { GetCookies } from "@/lib/get-token";
import { homePath } from "@/utils/paths";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const token = await GetCookies();
  if (token) redirect(homePath());
  return (
    <main className={stylesPage.main}>
      <header className={stylesPage.header}>
        <h1>Loop</h1>
        <span className={stylesPage.badge}>COMUNIDAD IT</span>
      </header>

      <div className={stylesPage.text}>
        <h2>La comunidad de Desarrollo</h2>
        <h3>¡Comparte ideas, aprende y conecta con otros devs!</h3>
      </div>

      <div className={stylesPage.contenedor}>
        <Cards />
        <Form />
      </div>
    </main>
  );
}
