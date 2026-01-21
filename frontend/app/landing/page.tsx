import stylesPage from "./page.module.css";
import Form from "@/components/landing/Form/Form";
import Cards from "@/components/landing/Cards/Cards";

export default function LandingPage() {
  return (
    <main className={stylesPage.main}>
      <h1>Loop</h1>

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
