"use client";

import {
  Add01Icon,
  ArrowRight01Icon,
  CloudUploadIcon,
  Folder01Icon,
  Note01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useWorkspaceProjects } from "@/hooks/use-workspace-projects";
import { workspaceNotes, workspaceSources } from "@/lib/workspace-data";

export default function ProjectsPage() {
  const { projects } = useWorkspaceProjects();

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-4xl px-6 py-12 sm:px-10 sm:py-16">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground">
              Projects
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-secondary">
              Keep related notes, sources, and conversations together.
            </p>
          </div>
          <Link
            href="/dashboard/projects/new"
            className="mt-1 inline-flex shrink-0 items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-hover"
          >
            <HugeiconsIcon icon={Add01Icon} size={16} strokeWidth={1.7} />
            New project
          </Link>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">
            Your projects
          </h2>
          <span className="text-xs text-secondary">{projects.length}</span>
        </div>
        <div className="mt-2 border-t border-border">
          {projects.map((project) => {
            const noteCount = workspaceNotes.filter(
              (note) => note.projectId === project.id,
            ).length;
            const sourceCount = workspaceSources.filter(
              (source) => source.projectId === project.id,
            ).length;
            return (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="group flex items-center gap-4 border-b border-border py-4 hover:bg-muted/40"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-secondary">
                  <HugeiconsIcon
                    icon={Folder01Icon}
                    size={18}
                    strokeWidth={1.7}
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-foreground">
                      {project.name}
                    </h3>
                    <span className="text-xs text-secondary">
                      {project.status}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-secondary">
                    {project.description}
                  </p>
                </div>
                <div className="hidden items-center gap-4 text-xs text-secondary sm:flex">
                  <span className="inline-flex items-center gap-1">
                    <HugeiconsIcon
                      icon={Note01Icon}
                      size={14}
                      strokeWidth={1.7}
                    />
                    {noteCount}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <HugeiconsIcon
                      icon={CloudUploadIcon}
                      size={14}
                      strokeWidth={1.7}
                    />
                    {sourceCount}
                  </span>
                  <span>{project.updatedAt}</span>
                </div>
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={15}
                  strokeWidth={1.7}
                  className="text-secondary/60"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
