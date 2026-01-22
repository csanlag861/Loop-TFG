"use client";
import action from "./action";

export default function Home() {
  return (
    <>
      <div>Hello world</div>
      <form action={action}>
        <button>Acceder al perfil</button>
      </form>
    </>
  );
}
