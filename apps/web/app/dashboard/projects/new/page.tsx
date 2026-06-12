"use client";

import { createWorkspaceProject } from "@/hooks/use-workspace-projects";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function NewProjectPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Active" | "Planning">("Active");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) {
      setError("Give the project a name.");
      return;
    }
    if (!description.trim()) {
      setError("Add a short description.");
      return;
    }

    const project = createWorkspaceProject({ name, description, status });
    router.push(`/dashboard/projects/${project.id}`);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-2xl px-6 py-10 sm:px-10 sm:py-14">
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={15} strokeWidth={1.7} />
          Projects
        </Link>

        <h1 className="mt-8 text-4xl font-semibold tracking-tight text-foreground">
          New project
        </h1>

        <form onSubmit={submit} className="mt-8 border-t border-border pt-6">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="project-name"
                className="block text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                id="project-name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setError("");
                }}
                autoFocus
                maxLength={80}
                placeholder="Project name"
                className="mt-2 h-10 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground outline-none placeholder:text-secondary/60 focus:border-secondary"
              />
            </div>

            <div>
              <label
                htmlFor="project-description"
                className="block text-sm font-medium text-foreground"
              >
                Description
              </label>
              <textarea
                id="project-description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                  setError("");
                }}
                rows={3}
                maxLength={240}
                placeholder="What are you working on?"
                className="mt-2 w-full resize-none rounded-md border border-border bg-card px-3 py-2.5 text-sm leading-6 text-foreground outline-none placeholder:text-secondary/60 focus:border-secondary"
              />
            </div>

            <div>
              <label
                htmlFor="project-status"
                className="block text-sm font-medium text-foreground"
              >
                Status
              </label>
              <select
                id="project-status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as "Active" | "Planning")
                }
                className="mt-2 h-10 rounded-md border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-secondary"
              >
                <option value="Active">Active</option>
                <option value="Planning">Planning</option>
              </select>
            </div>
          </div>

          {error && (
            <p className="mt-5 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}

          <div className="mt-7 flex items-center gap-3">
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-hover"
            >
              Create project
            </button>
            <Link
              href="/dashboard/projects"
              className="rounded-md px-3 py-2.5 text-sm text-secondary hover:bg-muted hover:text-foreground"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
