import { fetcher } from "@/lib/fetcher";
import { getProfile, getPostsFromUser } from "@/utils/api";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { EditarPerfilButton } from "./editarPerfil-button";
import { FollowButton } from "../seguidor/seguir-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfilePostList from "./perfil-post-list";
import Link from "next/link";

export const Perfil = async ({ id }: { id: string }) => {
  const data = await fetcher(getProfile({ param: parseInt(id) }));
  let initialPosts = undefined;
  try {
    initialPosts = await fetcher(getPostsFromUser({ param: parseInt(id) }));
  } catch (error) {
    console.error("Error cargando los posts del usuario", error);
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center">
      <section className="h-112.25 w-full flex flex-col items-center justify-center gap-4 relative">
        {data.isOwner && (
          <div className="absolute top-0 right-0">
            <EditarPerfilButton profileData={data} />
          </div>
        )}

        {!data.isOwner && (
          <div className="absolute bottom-4 right-4">
            <FollowButton
              targetUserId={data.id}
              initialIsFollowing={data.isFollowing}
            />
          </div>
        )}

        <div className="w-40 h-40 rounded-full overflow-hidden">
          <Image
            src={data.avatarURL}
            alt="Avatar del usuario"
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2 text-gris01 text-[14px]">
          <h1>@{data?.username}</h1>
          <h2 className="font-sohne-light font-light">{data?.nombre}</h2>
          <p className="font-sohne-light font-light">{data?.biografia}</p>
          <div className="flex gap-6 mt-1 font-sohne-light text-[13px]">
            <Link
              href={`/perfil/${id}/seguidores`}
              className="hover:underline hover:text-primary-color transition-colors duration-200"
            >
              <strong className="font-sohne-regular">
                {data?.seguidoresCount ?? 0}
              </strong>{" "}
              seguidores
            </Link>
            <Link
              href={`/perfil/${id}/seguidos`}
              className="hover:underline hover:text-primary-color transition-colors duration-200"
            >
              <strong className="font-sohne-regular">
                {data?.seguidosCount ?? 0}
              </strong>{" "}
              seguidos
            </Link>
          </div>
        </div>
      </section>

      <Separator className="w-full" />
      <section className="w-full max-w-2xl flex flex-col items-center">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList
            className="grid w-full grid-cols-2 mb-8 bg-transparent"
            variant="line"
          >
            <TabsTrigger
              value="posts"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none"
            >
              Publicaciones
            </TabsTrigger>
            <TabsTrigger
              value="likes"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none"
            >
              Likes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="w-full mt-0">
            <ProfilePostList
              userId={parseInt(id)}
              type="posts"
              initialData={initialPosts}
            />
          </TabsContent>

          <TabsContent value="likes" className="w-full mt-0">
            <ProfilePostList userId={parseInt(id)} type="likes" />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};
