"use client";
import stylePost from "./post.module.css";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Bookmark, Heart, MessageCircle } from "@geist-ui/icons";
import Image from "next/image";
import MoreSettings from "../moreSettings/moreSettings";
import Link from "next/link";
import { profilePath } from "@/utils/paths";
import SavePostDropdown from "../guardarPost/guardarPost";
import { LikeButton } from "../likeButton/likeButton";

const Post = ({ post }) => {
  return (
    <div className={stylePost.post}>
      <div className={stylePost.user}>
        <div className="w-full flex gap-3 items-center justify-baseline">
          <Link href={profilePath({ param: post.usuario.id })}>
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={post.usuario.avatarURL}
                alt="Avatar del usuario"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
          </Link>
          <div className="flex items-baseline gap-2">
            <h2>{post.usuario.nombre}</h2>
            <h3>{post.usuario.username}</h3>
            <p>
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
                locale: es,
              })}
            </p>
          </div>
        </div>
        {post.isOwner && <MoreSettings post={post} />}
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
        <LikeButton
          post_id={post.id}
          initialLiked={post.isLiked}
          initialCount={post.likesCount}
        />
        <SavePostDropdown isGuardado={post.isGuardado} post_id={post.id} />
      </div>
    </div>
  );
};

export default Post;
