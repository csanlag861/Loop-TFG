"use client";

import { useState } from "react";
import { Plus } from "@geist-ui/icons";
import CommentModal from "./comentarioModal";
import { PostEditable } from "@/types/post-types";

export default function MobileCommentAction({ post }: { post: PostEditable }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 
        MOBILE COMMENT FAB
        Only visible on mobile screens. Matches feed FAB styling perfectly.
      */}
      <button
        onClick={() => setIsOpen(true)}
        className="
          fixed bottom-20 right-6 z-40 
          bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] 
          text-white w-14 h-14 rounded-full shadow-2xl 
          flex items-center justify-center 
          md:hidden border-0 cursor-pointer 
          active:scale-95 transition-all duration-150
        "
        aria-label="Escribir comentario"
      >
        <Plus size={22} />
      </button>

      {/* Reusable Comment Modal */}
      <CommentModal
        open={isOpen}
        onOpenChange={setIsOpen}
        post={post}
      />
    </>
  );
}
