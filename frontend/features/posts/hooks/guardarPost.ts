import { guardarPost } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';


const savePost = async ({ post_id, carpeta_id }: { post_id: number; carpeta_id: number }) => {
  const res = await fetch(guardarPost(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ post_id, carpeta_id }),
  });
  if (!res.ok) throw new Error('Error al guardar el post');
  return res.json();
};

export const useSavePost = () => {
  return useMutation({
    mutationFn: savePost,
  });
};