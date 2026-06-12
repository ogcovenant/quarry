import {
  AiChat02Icon,
  ArrowLeft01Icon,
  CloudUploadIcon,
  Delete02Icon,
  Edit02Icon,
  Link01Icon,
  Note01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProject,
  workspaceNotes,
  workspaceSources,
} from "@/lib/workspace-data";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = workspaceNotes.find((item) => item.id === id);
  if (!note) notFound();
  const project = getProject(note.projectId);
  const linkedSources = workspaceSources
    .filter((source) => source.projectId === note.projectId)
    .slice(0, 2);
  const relatedNotes = workspaceNotes
    .filter((item) => item.projectId === note.projectId && item.id !== note.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-10 sm:py-14">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard/notes"
            className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={15} strokeWidth={1.7} />
            Notes
          </Link>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Edit note"
              className="rounded p-1.5 text-secondary hover:bg-muted hover:text-foreground"
            >
              <HugeiconsIcon icon={Edit02Icon} size={17} strokeWidth={1.7} />
            </button>
            <button
              type="button"
              aria-label="Delete note"
              className="rounded p-1.5 text-secondary hover:bg-muted hover:text-foreground"
            >
              <HugeiconsIcon icon={Delete02Icon} size={17} strokeWidth={1.7} />
            </button>
          </div>
        </div>

        <article className="mt-10">
          <div className="flex flex-wrap items-center gap-2 text-xs text-secondary">
            <span>{note.category}</span>
            <span>·</span>
            {project ? (
              <Link
                href={`/dashboard/projects/${project.id}`}
                className="hover:text-foreground"
              >
                {project.name}
              </Link>
            ) : (
              <span>Freeform</span>
            )}
            <span>·</span>
            <span>Edited {note.updatedAt}</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {note.title}
          </h1>

          <div className="mt-10 space-y-7 text-[15px] leading-8 text-foreground">
            <p>{note.excerpt}</p>
            <section>
              <h2 className="text-xl font-semibold">Product principle</h2>
              <p className="mt-2">
                The primary unit is not a conversation. It is a body of work
                with durable context. Conversations help users reason over that
                context and can create or modify the notes that remain after the
                chat ends.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold">Core workflow</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-secondary">
                <li>Capture freeform thoughts without requiring a project.</li>
                <li>
                  Scope active work inside projects with their own notes and
                  sources.
                </li>
                <li>Select exact context before asking Quarry a question.</li>
                <li>
                  Turn useful chat output into typed notes such as briefs,
                  tables, checklists, or prototypes.
                </li>
              </ul>
            </section>
            <blockquote className="border-l-2 border-secondary/40 pl-4 text-secondary">
              The workspace should make it obvious what Quarry knows, which
              project it is operating in, and what durable changes a
              conversation made.
            </blockquote>
            <section>
              <h2 className="text-xl font-semibold">Next decisions</h2>
              <p className="mt-2">
                Define the permission model for chat actions, the review step
                before destructive changes, and how generated notes preserve
                links to the context used to create them.
              </p>
            </section>
          </div>
        </article>

        <div className="mt-12 flex flex-wrap gap-2">
          <Link
            href={`/dashboard/chat?note=${note.id}`}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white"
          >
            <HugeiconsIcon icon={AiChat02Icon} size={16} strokeWidth={1.7} />
            Chat with this note
          </Link>
          {linkedSources.map((source) => (
            <span
              key={source.id}
              className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-2 text-xs text-secondary"
            >
              <HugeiconsIcon
                icon={CloudUploadIcon}
                size={14}
                strokeWidth={1.7}
              />
              {source.name}
            </span>
          ))}
        </div>

        <section className="mt-12">
          <div className="flex items-center gap-2">
            <HugeiconsIcon
              icon={Note01Icon}
              size={16}
              strokeWidth={1.7}
              className="text-secondary"
            />
            <h2 className="text-sm font-semibold text-foreground">
              Related notes
            </h2>
          </div>
          <div className="mt-2 border-t border-border">
            {relatedNotes.map((related) => (
              <Link
                key={related.id}
                href={`/dashboard/notes/${related.id}`}
                className="flex items-center gap-3 border-b border-border py-3 hover:bg-muted/40"
              >
                <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                  {related.title}
                </span>
                <span className="text-xs text-secondary">
                  {related.category}
                </span>
              </Link>
            ))}
          </div>
        </section>
        <div className="mt-8 flex items-center gap-2 text-xs text-secondary">
          <HugeiconsIcon icon={Link01Icon} size={14} strokeWidth={1.7} />
          <span>Referenced by 3 conversations and 2 related notes</span>
        </div>
      </div>
    </div>
  );
}
