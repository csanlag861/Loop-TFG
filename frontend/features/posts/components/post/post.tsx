import stylePost from "./post.module.css";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Bookmark, Heart, MessageCircle } from '@geist-ui/icons'
import Image from "next/image";
import { getUserData } from "@/features/home/queries/user-data";

const Post = async ({ post }) => {
  const dataUser = await getUserData();
  return (
    <div className={stylePost.post}>
      <div className={stylePost.user}>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image src={post.usuario.avatarURL} alt="Avatar del usuario" width={40} height={40} className="object-cover w-full h-full" />
        </div>
        <h2>{post.usuario.nombre}</h2>
        <h3>{post.usuario.username}</h3>
        <p>
          {formatDistanceToNow(new Date(post.createdAt), {
            addSuffix: true,
            locale: es,
          })}
        </p>
      </div>
      <div className={stylePost.badges}>
        {post.tecnologias.map((tech) => (
          <div
            key={tech.id}
            style={{
              backgroundColor: tech.background,
              borderColor: tech.border,
              color: tech.text,
            }}
            className={stylePost.badge}
          >
            {tech.nombre}
          </div>
        ))}
      </div>
      <p>{post.contenido}</p>
      <div className={stylePost.acciones}>
        <MessageCircle size={16} />
        <Heart size={16} />
        <Bookmark size={16} />
      </div>
    </div>
  );
};

export default Post;
