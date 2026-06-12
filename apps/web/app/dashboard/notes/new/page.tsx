"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { projects } from "@/lib/workspace-data";

const NoteEditor = dynamic(
  () => import("@/components/dashboard/notes/note-editor"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse rounded-lg border border-border bg-card" />
    ),
  },
);

export default function NewNotePage() {
  return (
    <section className="flex h-[calc(100vh-4rem)] min-w-0 flex-col overflow-hidden bg-background md:h-screen">
      <header className="flex shrink-0 items-center justify-between border-b border-border px-5 py-3 sm:px-8">
        <div>
          <p className="text-xs text-secondary">Notes</p>
          <h1 className="mt-1 text-xl font-semibold text-foreground">
            Create note
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <select
            defaultValue="freeform"
            aria-label="Note scope"
            className="hidden h-9 rounded-md border border-border bg-card px-3 text-xs text-secondary outline-none focus:border-secondary sm:block"
          >
            <option value="freeform">Freeform note</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name} project
              </option>
            ))}
          </select>
          <Link
            href="/dashboard/notes"
            className="rounded-md px-3 py-2 text-sm text-secondary hover:bg-muted hover:text-foreground"
          >
            Back to notes
          </Link>
        </div>
      </header>

      <div className="min-h-0 flex-1 p-4 sm:p-6">
        <NoteEditor />
      </div>
    </section>
  );
}
