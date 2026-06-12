"use client";

import NoteSingle from "@/components/dashboard/notes/note-single";
import { workspaceNotes } from "@/lib/workspace-data";
import { useWorkspaceProjects } from "@/hooks/use-workspace-projects";
import { NoteAddIcon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function NotesPage() {
  const { projects } = useWorkspaceProjects();
  const scopes = ["All", "Freeform", ...projects.map((project) => project.name)];
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState("All");
  const filteredNotes = useMemo(
    () =>
      workspaceNotes.filter((note) => {
        const project = projects.find((item) => item.id === note.projectId);
        const matchesScope =
          scope === "All" ||
          (scope === "Freeform" ? !note.projectId : project?.name === scope);
        return (
          matchesScope &&
          `${note.title} ${note.excerpt}`
            .toLowerCase()
            .includes(query.trim().toLowerCase())
        );
      }),
    [scope, query, projects],
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-4xl px-6 py-12 sm:px-10 sm:py-16">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground">
              Notes
            </h1>
            <p className="mt-3 text-sm text-secondary">
              Project notes and freeform thinking in one place.
            </p>
          </div>
          <Link
            href="/dashboard/notes/new"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white"
          >
            <HugeiconsIcon icon={NoteAddIcon} size={16} strokeWidth={1.7} />
            New
          </Link>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block flex-1">
            <HugeiconsIcon
              icon={Search01Icon}
              size={17}
              strokeWidth={1.7}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-secondary"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search notes"
              className="h-9 w-full rounded-md border border-border pl-8 pr-3 text-sm outline-none focus:border-secondary"
            />
          </label>
          <select
            value={scope}
            onChange={(event) => setScope(event.target.value)}
            className="h-9 rounded-md border border-border bg-card px-3 text-sm text-secondary outline-none focus:border-secondary"
          >
            {scopes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="mt-7 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">All notes</h2>
          <span className="text-xs text-secondary">{filteredNotes.length}</span>
        </div>
        <div className="mt-2 border-t border-border">
          {filteredNotes.map((note) => (
            <NoteSingle key={note.id} {...note} />
          ))}
          {filteredNotes.length === 0 && (
            <p className="py-12 text-center text-sm text-secondary">
              No notes found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
