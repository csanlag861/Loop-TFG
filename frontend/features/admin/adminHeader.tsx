'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { label: 'Usuarios', href: '/dashboard/usuarios' },
  { label: 'Tecnologías', href: '/dashboard/tecnologias' },
  { label: 'Moderación', href: '/dashboard/moderacion' },
];

export function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="px-8 pt-8 pb-0">
      <h1
        className="text-3xl font-bold mb-6"
        style={{ color: 'var(--primary-color)' }}
      >
        Administración
      </h1>
      <nav className="flex gap-6 border-b" style={{ borderColor: 'var(--gris-08)' }}>
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="pb-3 text-sm transition-colors"
              style={{
                color: isActive ? 'var(--gris-01)' : 'var(--gris-05)',
                borderBottom: isActive ? '2px solid var(--primary-color)' : '2px solid transparent',
              }}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}