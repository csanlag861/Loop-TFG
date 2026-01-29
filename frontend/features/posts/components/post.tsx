import stylePost from "./post.module.css";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Bookmark, Heart, MessageCircle } from '@geist-ui/icons'

const Post = ({ post }) => {
  return (
    <div className={stylePost.post}>
      <div className={stylePost.user}>
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
