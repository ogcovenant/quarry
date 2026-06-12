import {
  AiChat02Icon,
  ArrowRight01Icon,
  CloudUploadIcon,
  Folder01Icon,
  Note01Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { projects } from "@/lib/workspace-data";

const recentItems = [
  {
    title: "Quarry Product Direction",
    meta: "Quarry · edited 18 minutes ago",
    href: "/dashboard/notes/quarry-product-direction",
    icon: Note01Icon,
  },
  {
    title: "Quarry v2 Product Brief",
    meta: "Quarry · brief note",
    href: "/dashboard/notes/quarry-product-brief",
    icon: Note01Icon,
  },
  {
    title: "Product scope and next milestone",
    meta: "Quarry · conversation",
    href: "/dashboard/chat/project-review",
    icon: AiChat02Icon,
  },
  {
    title: "AI workspace research.md",
    meta: "Quarry · source",
    href: "/dashboard/projects/quarry",
    icon: CloudUploadIcon,
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-4xl px-6 py-12 sm:px-10 sm:py-16">
        <p className="text-sm text-secondary">Personal workspace</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground">
          Good afternoon.
        </h1>

        <Link
          href="/dashboard/chat"
          className="mt-8 flex w-full items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm text-secondary shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:bg-muted/50"
        >
          <HugeiconsIcon icon={Search01Icon} size={18} strokeWidth={1.7} />
          <span className="flex-1">
            Ask Quarry about your notes and sources...
          </span>
          <span className="text-xs text-secondary/60">Enter</span>
        </Link>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/dashboard/notes/new"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white"
          >
            <HugeiconsIcon icon={Note01Icon} size={16} strokeWidth={1.7} />
            New note
          </Link>
          <Link
            href="/dashboard/projects"
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-secondary hover:bg-muted"
          >
            <HugeiconsIcon icon={Folder01Icon} size={16} strokeWidth={1.7} />
            Projects
          </Link>
          <Link
            href="/dashboard/uploads"
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-secondary hover:bg-muted"
          >
            <HugeiconsIcon icon={CloudUploadIcon} size={16} strokeWidth={1.7} />
            Add source
          </Link>
        </div>

        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Projects</h2>
            <Link
              href="/dashboard/projects"
              className="text-xs text-secondary hover:text-foreground"
            >
              View all
            </Link>
          </div>
          <div className="mt-2 divide-y divide-border">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="group flex items-center gap-3 py-3 hover:bg-muted/40"
              >
                <HugeiconsIcon
                  icon={Folder01Icon}
                  size={18}
                  strokeWidth={1.7}
                  className="text-secondary"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {project.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-secondary">
                    {project.description}
                  </p>
                </div>
                <span className="text-xs text-secondary">
                  {project.updatedAt}
                </span>
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={15}
                  strokeWidth={1.7}
                  className="text-secondary/60"
                />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">
              Recently viewed
            </h2>
            <Link
              href="/dashboard/notes"
              className="text-xs text-secondary hover:text-foreground"
            >
              All notes
            </Link>
          </div>
          <div className="mt-2 divide-y divide-border">
            {recentItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-3 py-3 hover:bg-muted/40"
              >
                <HugeiconsIcon
                  icon={item.icon}
                  size={18}
                  strokeWidth={1.7}
                  className="text-secondary"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs text-secondary">{item.meta}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
