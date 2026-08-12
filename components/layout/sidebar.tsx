import Link from "next/link";

const navItems = [
  { href: "/", label: "Catalog" },
  { href: "/upload", label: "Upload" },
];

export function AppSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r md:block">
      <nav className="flex h-full flex-col gap-1 p-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
