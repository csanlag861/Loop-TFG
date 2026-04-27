import { fetcher } from "@/lib/fetcher";
import { getProfile, getPostsFromUser } from "@/utils/api";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Post from "@/features/posts/components/post/post";
import { EditarPerfilButton } from "./editarPerfil-button";
import { PostEditable } from "@/types/post-types";


export const Perfil = async ({ id }: { id: string }) => {
  const data = await fetcher(getProfile({ param: parseInt(id) }));
  const dataPosts = await fetcher(getPostsFromUser({ param: parseInt(id) }));

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center">
      <section className="h-112.25 w-full flex flex-col items-center justify-center gap-4 relative">

        {data.isOwner && (
          <div className="absolute top-0 right-0">
            <EditarPerfilButton profileData={data} />
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
        <div className="flex flex-col items-center justify-center gap-2 text-01 text-[14px]">
          <h1>@{data?.username}</h1>
          <h2 className="font-sohne-light font-light">{data?.nombre}</h2>
          <p className="font-sohne-light font-light">{data?.biografia}</p>
        </div>
      </section>

      <Separator className="w-full" />
      <section>
        <div className="flex flex-col items-center justify-center gap-2 text-01 text-[14px]">
          <ul className="flex flex-col items-center justify-center gap-8 mt-8">
            {dataPosts.map((post: PostEditable) => (
              <Post key={post.id} post={post} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};