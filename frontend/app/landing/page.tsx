import stylesPage from "./page.module.css";
import SpotlightCard from "@/components/landing/SpotlightCard";
import { Users, Bookmark } from "@geist-ui/icons";

export default function LandingPage() {
  return (
    <main className={stylesPage.main}>
      <h1>Loop</h1>

      <div className={stylesPage.text}>
        <h2>La comunidad de Desarrollo</h2>
        <h3>¡Comparte ideas, aprende y conecta con otros devs!</h3>
      </div>

      <div className={stylesPage.contenedor}>
        <div
          className={`${stylesPage.grid} grid grid-cols-[256px_256px] grid-rows-2 gap-4`}
        >
          <SpotlightCard
            className={stylesPage.card}
            spotlightColor="rgba(140, 146, 252, 0.2)"
          >
            <div className={stylesPage.cardText}>
              <Users color="" />
              <h4>Aprende rodeado de Devs</h4>
              <p>
                Accede a personas que ya han pasado por lo mismo que tú.
                Comparte dudas, experiencias y aprendizajes con gente que
                entiende de qué hablas.
              </p>
            </div>
          </SpotlightCard>
          <SpotlightCard
            className={stylesPage.card}
            spotlightColor="rgba(83, 92, 250, 0.2)"
          >
            <div className={stylesPage.cardText}>
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
                Recibe feedback, ideas y respuestas de otros desarrolladores
                según tu contexto, tu nivel y tu stack.
              </p>
            </div>
          </SpotlightCard>
          <SpotlightCard
            className={stylesPage.card}
            spotlightColor="rgba(83, 92, 250, 0.2)"
          >
            <div className={stylesPage.cardText}>
              <Bookmark color="" />
              <h4>Lo importante no desaparece</h4>
              <p>
                Con nuestro sistema de guardado, puedes organizarte para guardar
                el contenido en carpetas, para poder verlo en cualquier momento.
              </p>
            </div>
          </SpotlightCard>
          <SpotlightCard
            className={stylesPage.card}
            spotlightColor="rgba(83, 92, 250, 0.2)"
          >
            <div className={stylesPage.cardText}>
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
        <div className={stylesPage.form}>
          <h3>Unete Ahora</h3>
          <div className={stylesPage.oauth}>
            <button type="button">
              Registrarse con Google{" "}
              <svg
                data-testid="geist-icon"
                height="16"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="16"
              >
                <path
                  d="M8.15991 6.54543V9.64362H12.4654C12.2763 10.64 11.709 11.4837 10.8581 12.0509L13.4544 14.0655C14.9671 12.6692 15.8399 10.6182 15.8399 8.18188C15.8399 7.61461 15.789 7.06911 15.6944 6.54552L8.15991 6.54543Z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M3.6764 9.52268L3.09083 9.97093L1.01807 11.5855C2.33443 14.1963 5.03241 16 8.15966 16C10.3196 16 12.1305 15.2873 13.4542 14.0655L10.8578 12.0509C10.1451 12.5309 9.23598 12.8219 8.15966 12.8219C6.07967 12.8219 4.31245 11.4182 3.67967 9.5273L3.6764 9.52268Z"
                  fill="#34A853"
                ></path>
                <path
                  d="M1.01803 4.41455C0.472607 5.49087 0.159912 6.70543 0.159912 7.99995C0.159912 9.29447 0.472607 10.509 1.01803 11.5854C1.01803 11.5926 3.6799 9.51991 3.6799 9.51991C3.5199 9.03991 3.42532 8.53085 3.42532 7.99987C3.42532 7.46889 3.5199 6.95983 3.6799 6.47983L1.01803 4.41455Z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M8.15982 3.18545C9.33802 3.18545 10.3853 3.59271 11.2216 4.37818L13.5125 2.0873C12.1234 0.792777 10.3199 0 8.15982 0C5.03257 0 2.33443 1.79636 1.01807 4.41455L3.67985 6.48001C4.31254 4.58908 6.07983 3.18545 8.15982 3.18545Z"
                  fill="#EA4335"
                ></path>
              </svg>
            </button>
            <button type="button">
              Registrarse con GitHub
              <svg
                data-testid="geist-icon"
                height="16"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="16"
              >
                <g clipPath="url(#clip0_872_3147)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 0C3.58 0 0 3.57879 0 7.99729C0 11.5361 2.29 14.5251 5.47 15.5847C5.87 15.6547 6.02 15.4148 6.02 15.2049C6.02 15.0149 6.01 14.3851 6.01 13.7154C4 14.0852 3.48 13.2255 3.32 12.7757C3.23 12.5458 2.84 11.836 2.5 11.6461C2.22 11.4961 1.82 11.1262 2.49 11.1162C3.12 11.1062 3.57 11.696 3.72 11.936C4.44 13.1455 5.59 12.8057 6.05 12.5957C6.12 12.0759 6.33 11.726 6.56 11.5261C4.78 11.3262 2.92 10.6364 2.92 7.57743C2.92 6.70773 3.23 5.98797 3.74 5.42816C3.66 5.22823 3.38 4.40851 3.82 3.30888C3.82 3.30888 4.49 3.09895 6.02 4.1286C6.66 3.94866 7.34 3.85869 8.02 3.85869C8.7 3.85869 9.38 3.94866 10.02 4.1286C11.55 3.08895 12.22 3.30888 12.22 3.30888C12.66 4.40851 12.38 5.22823 12.3 5.42816C12.81 5.98797 13.12 6.69773 13.12 7.57743C13.12 10.6464 11.25 11.3262 9.47 11.5261C9.76 11.776 10.01 12.2558 10.01 13.0056C10.01 14.0752 10 14.9349 10 15.2049C10 15.4148 10.15 15.6647 10.55 15.5847C12.1381 15.0488 13.5182 14.0284 14.4958 12.6673C15.4735 11.3062 15.9996 9.67293 16 7.99729C16 3.57879 12.42 0 8 0Z"
                    fill="currentColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_872_3147">
                    <rect width="16" height="16" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>

          <div className={stylesPage.separador}>
            <hr />
            <p>o</p>
            <hr />
          </div>

          <button type="button" className={stylesPage.loop}>
            Registrarse en Loop
          </button>
          <div className={stylesPage.terms}>
            <p>
              Al registrarte, aceptas los Términos de servicio y la Política de
              privacidad, incluida la política de Uso de Cookies.
            </p>
          </div>

          <div className={stylesPage.account}>
            <h4>¿Ya tienes una cuenta?</h4>
            <button>Inicia Sesion</button>
            <hr />
            <button className={stylesPage.explorar}>Explorar Contenido</button>
          </div>
        </div>
      </div>
    </main>
  );
}
