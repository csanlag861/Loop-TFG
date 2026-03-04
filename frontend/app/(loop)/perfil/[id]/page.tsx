import { Perfil } from "@/features/perfil/components/perfil";

interface ProfilePageProps {
    params: Promise<{
        id: string
    }>
}

export default async function PerfilPage({params}: ProfilePageProps){
    const { id } = await params;

    return (
        <>
            <Perfil id={id} />
        </>
    )
}