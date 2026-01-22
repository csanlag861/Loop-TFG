"use server";

const action = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/auth/profile", {
            method: "GET",
            credentials: "include",
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