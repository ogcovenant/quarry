import { getProject } from "@/lib/workspace-data";
import { Note01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

interface NoteSingleProps {
  id: string;
  title: string;
  excerpt: string;
  updatedAt: string;
  category: string;
  projectId: string | null;
  compact?: boolean;
}

export default function NoteSingle({
  id,
  title,
  excerpt,
  updatedAt,
  category,
  projectId,
}: NoteSingleProps) {
  const project = getProject(projectId);
  return (
    <Link
      href={`/dashboard/notes/${id}`}
      className="flex items-start gap-3 border-b border-border py-4 hover:bg-muted/40"
    >
      <HugeiconsIcon
        icon={Note01Icon}
        size={18}
        strokeWidth={1.7}
        className="mt-0.5 shrink-0 text-secondary"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h2 className="text-sm font-medium text-foreground">{title}</h2>
          <span className="text-xs text-secondary">{category}</span>
        </div>
        <p className="mt-1 line-clamp-1 text-sm text-secondary">{excerpt}</p>
        <p className="mt-1.5 text-xs text-secondary/80">
          {project?.name ?? "Freeform"} · {updatedAt}
        </p>
      </div>
    </Link>
  );
}
