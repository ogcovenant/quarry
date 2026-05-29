"use client";

import {
  AiFileIcon,
  CheckmarkCircle02Icon,
  CloudUploadIcon,
  Delete02Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChangeEvent, DragEvent, useMemo, useState } from "react";

type UploadItem = {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: "Ready" | "Indexed";
};

const initialUploads: UploadItem[] = [
  {
    id: "product-direction",
    name: "Quarry product direction.pdf",
    type: "PDF",
    size: "1.8 MB",
    uploadedAt: "Today",
    status: "Indexed",
  },
  {
    id: "research-notes",
    name: "AI workspace research.md",
    type: "Markdown",
    size: "84 KB",
    uploadedAt: "Yesterday",
    status: "Indexed",
  },
  {
    id: "meeting-capture",
    name: "memory-system-meeting.txt",
    type: "Text",
    size: "42 KB",
    uploadedAt: "May 24",
    status: "Ready",
  },
];

function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileType(file: File) {
  const extension = file.name.split(".").pop()?.toUpperCase();

  if (extension) {
    return extension;
  }

  return file.type || "File";
}

export default function UploadsPage() {
  const [uploads, setUploads] = useState(initialUploads);
  const [query, setQuery] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const filteredUploads = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return uploads;
    }

    return uploads.filter((upload) =>
      [upload.name, upload.type, upload.status]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query, uploads]);

  const indexedCount = uploads.filter(
    (upload) => upload.status === "Indexed",
  ).length;

  function addFiles(files: FileList | File[]) {
    const nextUploads = Array.from(files).map((file) => ({
      id: `${file.name}-${file.lastModified}-${file.size}`,
      name: file.name,
      type: getFileType(file),
      size: formatFileSize(file.size),
      uploadedAt: "Just now",
      status: "Ready" as const,
    }));

    setUploads((currentUploads) => [...nextUploads, ...currentUploads]);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length) {
      addFiles(event.target.files);
      event.target.value = "";
    }
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files.length) {
      addFiles(event.dataTransfer.files);
    }
  }

  return (
    <section className="flex h-screen min-w-0 flex-col overflow-hidden bg-background">
      <header className="flex shrink-0 items-center justify-between border-b border-border px-8 py-4">
        <div>
          {/*<p className="text-sm font-medium text-accent">Library</p>*/}
          <h1 className="mt-1 text-xl font-semibold text-primary">Uploads</h1>
        </div>

        <label
          htmlFor="upload-files"
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-linear-to-b from-secondary to-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <HugeiconsIcon icon={CloudUploadIcon} size={18} strokeWidth={1.8} />
          <span>Upload files</span>
        </label>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-8">
        <input
          id="upload-files"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        {/*<div className="">*/}
        <div className="space-y-6">
          <label
            htmlFor="upload-files"
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
            className={`flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed bg-card px-6 py-10 text-center transition-colors ${
              isDragging
                ? "border-accent bg-muted/70"
                : "border-border hover:border-accent hover:bg-card/80"
            }`}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted text-primary">
              <HugeiconsIcon
                icon={CloudUploadIcon}
                size={28}
                strokeWidth={1.7}
              />
            </span>
            <span className="mt-5 text-lg font-semibold text-foreground">
              Drop files here or choose from your device
            </span>
            <span className="mt-2 max-w-xl text-sm leading-6 text-secondary">
              Add PDFs, text files, Markdown notes, and research documents to
              keep Quarry context close to your workspace.
            </span>
          </label>

          <div className="rounded-lg border border-border bg-card">
            <div className="flex flex-col gap-4 border-b border-border px-5 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Uploaded sources
                </h2>
                <p className="mt-1 text-sm text-secondary">
                  {uploads.length} files available, {indexedCount} indexed
                </p>
              </div>

              <label className="relative block w-full md:w-72">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary/70">
                  <HugeiconsIcon
                    icon={Search01Icon}
                    size={17}
                    strokeWidth={1.8}
                  />
                </span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search uploads"
                  className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-secondary/60 focus:border-accent"
                />
              </label>
            </div>

            <div className="divide-y divide-border">
              {filteredUploads.map((upload) => (
                <article
                  key={upload.id}
                  className="flex flex-col gap-4 px-5 py-4 transition-colors hover:bg-muted/40 md:flex-row md:items-center md:justify-between cursor-pointer"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted text-primary">
                      <HugeiconsIcon
                        icon={AiFileIcon}
                        size={22}
                        strokeWidth={1.7}
                      />
                    </span>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-foreground">
                        {upload.name}
                      </h3>
                      <p className="mt-1 text-sm text-secondary">
                        {upload.type} / {upload.size} / {upload.uploadedAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 md:justify-end">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-secondary">
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        size={14}
                        strokeWidth={1.8}
                      />
                      {upload.status}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setUploads((currentUploads) =>
                          currentUploads.filter(
                            (item) => item.id !== upload.id,
                          ),
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-muted hover:text-primary"
                      aria-label={`Remove ${upload.name}`}
                    >
                      <HugeiconsIcon
                        icon={Delete02Icon}
                        size={18}
                        strokeWidth={1.8}
                      />
                    </button>
                  </div>
                </article>
              ))}

              {filteredUploads.length === 0 && (
                <div className="px-5 py-12 text-center">
                  <p className="text-sm font-medium text-foreground">
                    No uploads found
                  </p>
                  <p className="mt-1 text-sm text-secondary">
                    Try a different search or add a new source.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/*<aside className="rounded-lg border border-border bg-card p-5">
            <h2 className="text-base font-semibold text-foreground">Source health</h2>

            <div className="mt-5 space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary">Indexed</span>
                  <span className="font-medium text-foreground">{indexedCount}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-accent"
                    style={{
                      width: uploads.length
                        ? `${Math.round((indexedCount / uploads.length) * 100)}%`
                        : "0%",
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-background p-4">
                  <p className="text-2xl font-semibold text-primary">{uploads.length}</p>
                  <p className="mt-1 text-xs text-secondary">Total files</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <p className="text-2xl font-semibold text-primary">
                    {uploads.length - indexedCount}
                  </p>
                  <p className="mt-1 text-xs text-secondary">Pending</p>
                </div>
              </div>
            </div>
          </aside>*/}
        {/*</div>*/}
      </div>
    </section>
  );
}
