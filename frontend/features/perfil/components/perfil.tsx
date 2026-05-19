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
      <section className="h-72 md:h-96 w-full flex flex-col items-center justify-center gap-4 relative rounded-3xl overflow-hidden border border-[var(--gris-07)] bg-gradient-to-b from-[#0e0e1f] via-[#050508] to-[#000000] p-6 shadow-2xl mt-4 mb-6">
        {/* Glow spots in the background (Mesh Gradient effect) */}
        <div className="absolute inset-0 opacity-50 pointer-events-none z-0">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-purple-600/20 blur-[100px]" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-blue-600/20 blur-[100px]" />
        </div>

        {data.isOwner && (
          <div className="absolute top-4 right-4 hidden md:block z-10">
            <EditarPerfilButton profileData={data} />
          </div>
        )}

        {!data.isOwner && (
          <div className="absolute bottom-4 right-4 z-10">
            <FollowButton
              targetUserId={data.id}
              initialIsFollowing={data.isFollowing}
            />
          </div>
        )}

        <div className="w-36 h-36 rounded-full p-[3px] bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-500 shadow-[0_0_20px_rgba(139,92,246,0.3)] relative z-10 flex items-center justify-center">
          <div className="w-full h-full rounded-full overflow-hidden bg-[#000000]">
            <Image
              src={data.avatarURL}
              alt="Avatar del usuario"
              width={140}
              height={140}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 text-gris01 text-[14px] relative z-10">
          <h1 className="text-white font-bold tracking-tight text-xl md:text-2xl">@{data?.username}</h1>
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

      <Separator className="w-full my-6 md:my-10" />
      <section className="w-full max-w-2xl flex flex-col items-center">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList
            className="grid w-full grid-cols-2 mb-8 bg-transparent"
            variant="line"
          >
            <TabsTrigger
              value="posts"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none text-xs md:text-sm py-2 md:py-3 cursor-pointer"
            >
              Publicaciones
            </TabsTrigger>
            <TabsTrigger
              value="likes"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none text-xs md:text-sm py-2 md:py-3 cursor-pointer"
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
