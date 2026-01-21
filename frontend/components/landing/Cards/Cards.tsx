import stylesCards from "./cards.module.css";

import SpotlightCard from "@/components/landing/SpotlightCard";
import { Users, Bookmark } from "@geist-ui/icons";

const Cards = () => {
  return (
    <div
      className={`${stylesCards.grid} grid grid-cols-[256px_256px] grid-rows-2 gap-4`}
    >
      <SpotlightCard
        className={stylesCards.card}
        spotlightColor="rgba(140, 146, 252, 0.2)"
      >
        <div className={stylesCards.cardText}>
          <Users color="" />
          <h4>Aprende rodeado de Devs</h4>
          <p>
            Accede a personas que ya han pasado por lo mismo que tú. Comparte
            dudas, experiencias y aprendizajes con gente que entiende de qué
            hablas.
          </p>
        </div>
      </SpotlightCard>
      <SpotlightCard
        className={stylesCards.card}
        spotlightColor="rgba(83, 92, 250, 0.2)"
      >
        <div className={stylesCards.cardText}>
          <svg
            data-testid="geist-icon"
            height="16"
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width="16"
            color=""
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.80808 4.44191L2.25003 4.88386L3.13391 3.99997L2.69196 3.55803L1.63391 2.49997L2.69197 1.44191L3.13391 0.999972L2.25003 0.116089L1.80808 0.558031L0.484858 1.88126C0.143149 2.22296 0.143149 2.77698 0.484859 3.11869L1.80808 4.44191ZM12 0.999972H11.25V2.49997H12H13.5V11.75C13.5 12.7165 12.7165 13.5 11.75 13.5H4.25002C3.28353 13.5 2.50003 12.7165 2.50003 11.75V6.99997V6.24997H1.00003V6.99997V11.75C1.00003 13.5449 2.4551 15 4.25002 15H11.75C13.545 15 15 13.5449 15 11.75V1.74997V0.999972H14.25H12ZM7.75003 4.88386L8.19197 4.44191L9.51519 3.11869C9.8569 2.77698 9.8569 2.22296 9.51519 1.88126L8.19196 0.55803L7.75002 0.116089L6.86614 0.999973L7.30808 1.44191L8.36614 2.49997L7.30809 3.55803L6.86615 3.99997L7.75003 4.88386ZM4.13155 3.89688L4.02847 4.51535L5.26541 4.7215L5.36848 4.10303L5.86848 1.10303L5.97156 0.484566L4.73462 0.278409L4.63155 0.896878L4.13155 3.89688Z"
              fill="currentColor"
            ></path>
          </svg>
          <h4>No te quedes bloqueado</h4>
          <p>
            Recibe feedback, ideas y respuestas de otros desarrolladores según
            tu contexto, tu nivel y tu stack.
          </p>
        </div>
      </SpotlightCard>
      <SpotlightCard
        className={stylesCards.card}
        spotlightColor="rgba(83, 92, 250, 0.2)"
      >
        <div className={stylesCards.cardText}>
          <Bookmark color="" />
          <h4>Lo importante no desaparece</h4>
          <p>
            Con nuestro sistema de guardado, puedes organizarte para guardar el
            contenido en carpetas, para poder verlo en cualquier momento.
          </p>
        </div>
      </SpotlightCard>
      <SpotlightCard
        className={stylesCards.card}
        spotlightColor="rgba(83, 92, 250, 0.2)"
      >
        <div className={stylesCards.cardText}>
          <svg
            data-testid="geist-icon"
            height="16"
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.5 3.5C2.5 2.94771 2.94772 2.5 3.5 2.5H4.25V1H3.5C2.11929 1 1 2.11929 1 3.5V6.29449C1 6.65016 0.881575 6.86927 0.738252 7.00305C0.587949 7.14333 0.344525 7.24999 0 7.24999V8.74999C0.344525 8.74999 0.587948 8.85665 0.738251 8.99694C0.881575 9.13071 1 9.34982 1 9.70549V12.5C1 13.8807 2.11929 15 3.5 15H4.25V13.5H3.5C2.94772 13.5 2.5 13.0523 2.5 12.5V9.70549C2.5 9.03542 2.27894 8.44137 1.86198 7.99999C2.27894 7.55861 2.5 6.96457 2.5 6.29449V3.5ZM12.5 1H11.75V2.5H12.5C13.0523 2.5 13.5 2.94772 13.5 3.5V6.29449C13.5 6.96453 13.7212 7.5586 14.1382 7.99999C13.7212 8.44139 13.5 9.03545 13.5 9.70549V12.5C13.5 13.0523 13.0523 13.5 12.5 13.5H11.75V15H12.5C13.8807 15 15 13.8807 15 12.5V9.70549C15 9.35012 15.1184 9.13095 15.2618 8.99706C15.4122 8.85668 15.6556 8.74999 16 8.74999V7.24999C15.6556 7.24999 15.4122 7.1433 15.2618 7.00292C15.1184 6.86903 15 6.64986 15 6.29449V3.5C15 2.11928 13.8807 1 12.5 1ZM8.75 10.25V9.5H7.25V10.25V12.5986C7.25 13.0383 7.11985 13.4681 6.87596 13.834L6.45994 14.458L7.70801 15.2901L8.12404 14.666C8.5322 14.0538 8.75 13.3344 8.75 12.5986V10.25ZM8 7C8.69036 7 9.25 6.44036 9.25 5.75C9.25 5.05964 8.69036 4.5 8 4.5C7.30964 4.5 6.75 5.05964 6.75 5.75C6.75 6.44036 7.30964 7 8 7Z"
              fill="currentColor"
            ></path>
          </svg>
          <h4>Creado por desarrolladores</h4>
          <p>
            Loop nace de una necesidad real dentro de la comunidad IT:
            compartir, aprender y crecer.
          </p>
        </div>
      </SpotlightCard>
    </div>
  );
};

export default Cards;
