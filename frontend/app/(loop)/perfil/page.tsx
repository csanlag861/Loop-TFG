import { redirect } from "next/navigation";
import { GetCookies } from "@/lib/get-token";
import { fetcher } from "@/lib/fetcher";
import { getUserData } from "@/utils/api";

export default async function MyPerfil(){
    const cookies = await GetCookies();

    if (!cookies) {
        redirect("/");
    }else{
        const data = await fetcher(getUserData());
        redirect(`/perfil/${data.id}`);
    }
}