"use client";

import {
  workspaceSources,
  type WorkspaceSource,
} from "@/lib/workspace-data";
import {
  AiFileIcon,
  CloudUploadIcon,
  Delete02Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useWorkspaceProjects } from "@/hooks/use-workspace-projects";
import { ChangeEvent, DragEvent, useMemo, useState } from "react";

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}
function getFileType(file: File) {
  return file.name.split(".").pop()?.toUpperCase() || file.type || "File";
}

export default function UploadsPage() {
  const { projects } = useWorkspaceProjects();
  const [uploads, setUploads] = useState<WorkspaceSource[]>(workspaceSources);
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState("all");
  const [uploadScope, setUploadScope] = useState("quarry");
  const [isDragging, setIsDragging] = useState(false);
  const filteredUploads = useMemo(
    () =>
      uploads.filter((upload) => {
        const matchesScope =
          scope === "all" ||
          (scope === "freeform"
            ? !upload.projectId
            : upload.projectId === scope);
        return (
          matchesScope &&
          upload.name.toLowerCase().includes(query.trim().toLowerCase())
        );
      }),
    [query, scope, uploads],
  );

  function addFiles(files: FileList | File[]) {
    const next: WorkspaceSource[] = Array.from(files).map((file) => ({
      id: `${file.name}-${file.lastModified}-${file.size}`,
      name: file.name,
      type: getFileType(file),
      size: formatFileSize(file.size),
      uploadedAt: "Just now",
      projectId: uploadScope === "freeform" ? null : uploadScope,
      status: "Ready",
    }));
    setUploads((current) => [...next, ...current]);
  }
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length) addFiles(event.target.files);
    event.target.value = "";
  }
  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files.length) addFiles(event.dataTransfer.files);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-4xl px-6 py-12 sm:px-10 sm:py-16">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground">
              Sources
            </h1>
            <p className="mt-3 text-sm text-secondary">
              Files Quarry can use as context inside projects or across your
              workspace.
            </p>
          </div>
          <label
            htmlFor="upload-files"
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white"
          >
            <HugeiconsIcon icon={CloudUploadIcon} size={16} strokeWidth={1.7} />
            Add
          </label>
        </div>
        <input
          id="upload-files"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        <div
          className={`mt-8 flex items-center gap-3 rounded-md border border-dashed px-4 py-3 text-sm ${isDragging ? "border-secondary bg-muted" : "border-border"}`}
        >
          <label
            htmlFor="upload-files"
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
            className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-secondary"
          >
            <HugeiconsIcon icon={CloudUploadIcon} size={17} strokeWidth={1.7} />
            <span className="truncate">
              Drop files here or choose from your device
            </span>
          </label>
          <span className="hidden text-xs text-secondary sm:block">Add to</span>
          <select
            value={uploadScope}
            onChange={(event) => setUploadScope(event.target.value)}
            className="rounded border border-border bg-card px-2 py-1 text-xs text-secondary outline-none"
          >
            <option value="freeform">Freeform</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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
              placeholder="Search sources"
              className="h-9 w-full rounded-md border border-border pl-8 pr-3 text-sm outline-none focus:border-secondary"
            />
          </label>
          <select
            value={scope}
            onChange={(event) => setScope(event.target.value)}
            className="h-9 rounded-md border border-border bg-card px-3 text-sm text-secondary outline-none"
          >
            <option value="all">All projects</option>
            <option value="freeform">Freeform</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-7 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">All sources</h2>
          <span className="text-xs text-secondary">
            {filteredUploads.length}
          </span>
        </div>
        <div className="mt-2 border-t border-border">
          {filteredUploads.map((upload) => {
            const project = projects.find(
              (item) => item.id === upload.projectId,
            );
            return (
              <div
                key={upload.id}
                className="flex items-center gap-3 border-b border-border py-3 hover:bg-muted/40"
              >
                <HugeiconsIcon
                  icon={AiFileIcon}
                  size={18}
                  strokeWidth={1.7}
                  className="shrink-0 text-secondary"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-foreground">
                    {upload.name}
                  </p>
                  <p className="mt-0.5 text-xs text-secondary">
                    {upload.type} · {upload.size} ·{" "}
                    {project?.name ?? "Freeform"}
                  </p>
                </div>
                <span className="text-xs text-secondary">{upload.status}</span>
                <button
                  type="button"
                  onClick={() =>
                    setUploads((current) =>
                      current.filter((item) => item.id !== upload.id),
                    )
                  }
                  aria-label={`Remove ${upload.name}`}
                  className="p-1 text-secondary/60 hover:text-foreground"
                >
                  <HugeiconsIcon
                    icon={Delete02Icon}
                    size={16}
                    strokeWidth={1.7}
                  />
                </button>
              </div>
            );
          })}
          {filteredUploads.length === 0 && (
            <p className="py-12 text-center text-sm text-secondary">
              No sources found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
