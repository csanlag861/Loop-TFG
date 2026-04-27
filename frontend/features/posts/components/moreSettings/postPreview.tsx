// components/postPreview/postPreview.tsx
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { MessageCircle, Heart, Bookmark } from "lucide-react";
import Image from "next/image";
import type { PostEditable, TecnologiaPost } from "@/types/post-types";

const PostPreview = ({ post }: { post: PostEditable }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={post.usuario.avatarURL}
            alt={post.usuario.nombre}
            width={32}
            height={32}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex items-baseline gap-2 text-sm">
          <span className="font-medium">{post.usuario.nombre}</span>
          <span className="text-muted-foreground text-xs">
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
              locale: es,
            })}
          </span>
        </div>
      </div>

      {post.tecnologias.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {post.tecnologias.map((tech: TecnologiaPost) => (
            <span
              key={tech.id}
              style={{
                backgroundColor: tech.background,
                borderColor: tech.border,
                color: tech.text,
              }}
              className="text-xs px-2 py-0.5 rounded-full border font-medium"
            >
              {tech.nombre}
            </span>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground line-clamp-2">
        {post.contenido}
      </p>
    </div>
  );
};

export default PostPreview;