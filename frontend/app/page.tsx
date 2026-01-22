"use client";
import { toast } from "sonner";

export default function Home() {
  const handleClick = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) {
        toast.error("Error fetching profile");
        console.error("Error fetching profile:", res.statusText);
      }
      const data = await res.json();
      console.log("Profile data:", data);
    } catch (error) {
      console.error("Catching error: ", error);
    }
  };
  return (
    <>
      <div>Hello world</div>
      <button onClick={handleClick}>Acceder al perfil</button>
    </>
  );
}
