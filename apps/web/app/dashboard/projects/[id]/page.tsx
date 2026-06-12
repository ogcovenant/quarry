"use client";

import {
  AiChat02Icon,
  AiMagicIcon,
  ArrowLeft01Icon,
  CloudUploadIcon,
  Note01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useWorkspaceProjects } from "@/hooks/use-workspace-projects";
import { workspaceNotes, workspaceSources } from "@/lib/workspace-data";

export default function ProjectPage() {
  const params = useParams<{ id: string }>();
  const { projects, hydrated } = useWorkspaceProjects();
  const project = projects.find((item) => item.id === params.id);

  if (!project && !hydrated) {
    return (
      <div className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10 sm:py-14">
        <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
        <div className="mt-8 h-40 animate-pulse rounded-lg bg-muted/60" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="mx-auto w-full max-w-4xl px-6 py-16 text-center sm:px-10">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Project not found
        </h1>
        <p className="mt-3 text-sm text-secondary">
          This project may have been removed or created in another browser.
        </p>
        <Link
          href="/dashboard/projects"
          className="mt-6 inline-flex rounded-md bg-primary px-3 py-2 text-sm font-medium text-white"
        >
          View projects
        </Link>
      </div>
    );
  }

  const notes = workspaceNotes.filter((note) => note.projectId === project.id);
  const sources = workspaceSources.filter(
    (source) => source.projectId === project.id,
  );
  const hasContent = notes.length > 0 || sources.length > 0;

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10 sm:py-14">
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={15} strokeWidth={1.7} />
          Projects
        </Link>
        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: project.accent }}
              />
              <span className="text-xs text-secondary">{project.status}</span>
            </div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">
              {project.name}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-secondary">
              {project.description}
            </p>
            <div className="mt-4 flex gap-4 text-xs text-secondary">
              <span>{notes.length} notes</span>
              <span>{sources.length} sources</span>
              <span>{hasContent ? "4 chats" : "0 chats"}</span>
            </div>
          </div>
          <Link
            href={`/dashboard/chat?project=${project.id}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-hover"
          >
            <HugeiconsIcon icon={AiMagicIcon} size={16} strokeWidth={1.7} />
            Ask Quarry
          </Link>
        </div>

        {!hasContent && (
          <section className="mt-10 border-y border-border py-6">
            <h2 className="text-sm font-semibold text-foreground">
              Start building this project
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-secondary">
              Add the first piece of context. Notes capture your thinking,
              sources bring in reference material, and chats help you work
              across both.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href={`/dashboard/notes/new?project=${project.id}`}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white"
              >
                <HugeiconsIcon icon={Note01Icon} size={16} strokeWidth={1.7} />
                Write a note
              </Link>
              <Link
                href={`/dashboard/uploads?project=${project.id}`}
                className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-secondary hover:bg-muted hover:text-foreground"
              >
                <HugeiconsIcon
                  icon={CloudUploadIcon}
                  size={16}
                  strokeWidth={1.7}
                />
                Add a source
              </Link>
              <Link
                href={`/dashboard/chat?project=${project.id}`}
                className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-secondary hover:bg-muted hover:text-foreground"
              >
                <HugeiconsIcon
                  icon={AiChat02Icon}
                  size={16}
                  strokeWidth={1.7}
                />
                Start a chat
              </Link>
            </div>
          </section>
        )}

        <section className={hasContent ? "mt-12" : "mt-10"}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Notes</h2>
            <Link
              href={`/dashboard/notes/new?project=${project.id}`}
              className="text-xs text-secondary hover:text-foreground"
            >
              New note
            </Link>
          </div>
          <div className="mt-2 border-t border-border">
            {notes.map((note) => (
              <Link
                key={note.id}
                href={`/dashboard/notes/${note.id}`}
                className="flex items-center gap-3 border-b border-border py-3 hover:bg-muted/40"
              >
                <HugeiconsIcon
                  icon={Note01Icon}
                  size={17}
                  strokeWidth={1.7}
                  className="text-secondary"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-foreground">
                    {note.title}
                  </p>
                  <p className="mt-0.5 text-xs text-secondary">
                    {note.category} · edited {note.updatedAt}
                  </p>
                </div>
              </Link>
            ))}
            {notes.length === 0 && (
              <p className="border-b border-border py-4 text-sm text-secondary">
                No notes in this project yet.
              </p>
            )}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Sources</h2>
            <Link
              href={`/dashboard/uploads?project=${project.id}`}
              className="text-xs text-secondary hover:text-foreground"
            >
              Add source
            </Link>
          </div>
          <div className="mt-2 border-t border-border">
            {sources.map((source) => (
              <div
                key={source.id}
                className="flex items-center gap-3 border-b border-border py-3"
              >
                <HugeiconsIcon
                  icon={CloudUploadIcon}
                  size={17}
                  strokeWidth={1.7}
                  className="text-secondary"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-foreground">
                    {source.name}
                  </p>
                  <p className="mt-0.5 text-xs text-secondary">
                    {source.type} · {source.size}
                  </p>
                </div>
                <span className="text-xs text-secondary">{source.status}</span>
              </div>
            ))}
            {sources.length === 0 && (
              <p className="border-b border-border py-4 text-sm text-secondary">
                No sources in this project yet.
              </p>
            )}
          </div>
        </section>

        {hasContent && (
          <section className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">
                Recent chats
              </h2>
              <Link
                href={`/dashboard/chat?project=${project.id}`}
                className="text-xs text-secondary hover:text-foreground"
              >
                New chat
              </Link>
            </div>
            <div className="mt-2 border-t border-border">
              {[
                "Shape the next product milestone",
                "Compare memory ranking approaches",
                "Turn research into a product brief note",
              ].map((chat) => (
                <Link
                  key={chat}
                  href="/dashboard/chat/project-review"
                  className="flex items-center gap-3 border-b border-border py-3 hover:bg-muted/40"
                >
                  <HugeiconsIcon
                    icon={AiChat02Icon}
                    size={17}
                    strokeWidth={1.7}
                    className="text-secondary"
                  />
                  <p className="truncate text-sm text-foreground">{chat}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
