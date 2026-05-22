"use client";
import stylePost from "./post.module.css";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { MessageCircle } from "@geist-ui/icons";
import Image from "next/image";
import MoreSettings from "../moreSettings/moreSettings";
import Link from "next/link";
import { profilePath, postPath } from "@/utils/paths";
import SavePostDropdown from "../guardarPost/guardarPost";
import { PostEditable, TecnologiaPost } from "@/types/post-types";
import { LikeButton } from "@/features/posts/components/likeButton/likeButton";
import { useState } from "react";
import CommentModal from "@/features/comentarios/components/comentarioModal";

const Post = ({
  post,
  variant = "feed",
}: {
  post: PostEditable;
  variant?: "feed" | "detail";
}) => {
  if (!post) return null;

  const [isComentarioOpen, setIsComentarioOpen] = useState(false);
  const isDetail = variant === "detail";
  return (
    <div
      className={`
        ${stylePost.post}
        ${isDetail ? "p-6 text-lg" : "p-4"}`}
      style={{ position: "relative" }}
    >
      {!isDetail && (
        <Link
          href={postPath({ id: post.id })}
          className={stylePost.stretchedLink}
          aria-label="Ver post"
        />
      )}
      <div className={stylePost.user} style={{ position: "relative", zIndex: 1 }}>
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
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
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
        {post.tecnologias.map((tech: TecnologiaPost) => (
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
      <div className={stylePost.acciones} style={{ position: "relative", zIndex: 1 }}>
        <div className="flex items-center gap-1">
          <MessageCircle
            size={16}
            className="cursor-pointer"
            onClick={() => setIsComentarioOpen(true)}
          />
          <span>{post.comentariosCount ?? 0}</span>
        </div>
        <LikeButton
          post_id={post.id}
          initialLiked={post.isLiked ?? false}
          initialCount={post.likesCount ?? 0}
        />
        <SavePostDropdown
          isGuardado={post.isGuardado ?? false}
          post_id={post.id}
        />
      </div>
      <CommentModal
        open={isComentarioOpen}
        onOpenChange={setIsComentarioOpen}
        post={post}
      />
    </div>
  );
};

export default Post;
