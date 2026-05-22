import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { clsx } from "clsx";

interface BackButtonProps {
  href: string;
  label: string;
  className?: string;
}

export const BackButton = ({ href, label, className }: BackButtonProps) => {
  return (
    <section className={clsx("w-full flex items-center gap-4 py-4", className)}>
      <Link
        href={href}
        className="flex items-center gap-2 text-gris01 hover:text-primary-color transition-colors duration-200 text-[14px]"
      >
        <ArrowLeft size={20} />
        <span className="font-sohne-regular">{label}</span>
      </Link>
    </section>
  );
};
