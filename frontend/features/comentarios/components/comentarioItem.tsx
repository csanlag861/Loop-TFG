import Image from "next/image";

export default function CommentItem({ comment }: any) {
  return (
    <div className="flex gap-3 p-4 border-b border-(--gris-07)">
      <Image
        src={comment.usuario.avatarURL}
        alt=""
        width={32}
        height={32}
        className="object-cover w-8 h-8 rounded-full shrink-0"
      />

      <div>
        <p className="text-sm font-semibold">{comment.usuario.username}</p>
        <p className="text-sm">{comment.contenido}</p>
      </div>
    </div>
  );
}
