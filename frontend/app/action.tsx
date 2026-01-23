"use server";
import { cookies } from "next/headers";

const action = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    console.log(token, "TOKEN");
    
    try {
        const res = await fetch("http://backend:3000/api/auth/profile", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${
                    token
                }`
            }
        });
        if (!res.ok) {
            console.error("Error fetching profile:", res.statusText);
            return;
        }
        const data = await res.json();
        console.log("Profile data:", data);
    } catch (error) {
        console.error("Catching error: ", error);
    }
}

export default action;