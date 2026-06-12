"use client";

import {
  AiChat02Icon,
  CloudUploadIcon,
  Folder01Icon,
  Home01Icon,
  Note01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../logo";

const navItems = [
  { label: "Home", href: "/dashboard", icon: Home01Icon, exact: true },
  { label: "Ask", href: "/dashboard/chat", icon: AiChat02Icon },
  { label: "Notes", href: "/dashboard/notes", icon: Note01Icon },
  { label: "Sources", href: "/dashboard/uploads", icon: CloudUploadIcon },
];

const projectItems = [
  { label: "Quarry", href: "/dashboard/projects/quarry" },
  { label: "Rodoh", href: "/dashboard/projects/rodoh" },
  { label: "Polymint", href: "/dashboard/projects/polymint" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-x-0 bottom-0 z-50 flex h-14 border-t border-border bg-sidebar px-2 md:sticky md:top-0 md:h-screen md:w-60 md:shrink-0 md:flex-col md:border-t-0 md:px-2 md:py-3">
      <Link href="/dashboard" className="hidden px-2 py-1 md:block">
        <Logo />
      </Link>
      <nav className="flex flex-1 items-center md:mt-4 md:block">
        <ul className="flex w-full items-center justify-around md:block md:space-y-0.5">
          {navItems.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href} className="flex-1 md:w-full">
                <Link
                  href={item.href}
                  className={`flex flex-col items-center gap-0.5 rounded-md px-2 py-1.5 text-[11px] transition-colors md:flex-row md:gap-2.5 md:text-sm ${active ? "bg-black/[0.07] font-medium text-foreground" : "text-secondary hover:bg-black/[0.04] hover:text-foreground"}`}
                >
                  <HugeiconsIcon icon={item.icon} size={18} strokeWidth={1.7} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="hidden md:block">
        <div className="mb-1 mt-5 flex items-center justify-between px-2">
          <p className="text-xs font-medium text-secondary">Projects</p>
          <Link
            href="/dashboard/projects"
            className="text-xs text-secondary hover:text-foreground"
          >
            View all
          </Link>
        </div>
        <ul className="space-y-0.5">
          {projectItems.map((project) => {
            const active = pathname === project.href;
            return (
              <li key={project.href}>
                <Link
                  href={project.href}
                  className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm ${active ? "bg-black/[0.07] font-medium text-foreground" : "text-secondary hover:bg-black/[0.04] hover:text-foreground"}`}
                >
                  <HugeiconsIcon
                    icon={Folder01Icon}
                    size={16}
                    strokeWidth={1.7}
                  />
                  <span className="truncate">{project.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-auto hidden pt-3 md:block">
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-secondary hover:bg-black/[0.04] hover:text-foreground"
        >
          <HugeiconsIcon icon={Settings01Icon} size={17} strokeWidth={1.7} />
          Settings
        </Link>
        <div className="mt-1 flex items-center gap-2.5 px-2.5 py-2">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-avatar text-[10px] font-semibold text-foreground">
            JC
          </span>
          <span className="truncate text-sm text-secondary">
            Personal workspace
          </span>
        </div>
      </div>
    </aside>
  );
}
