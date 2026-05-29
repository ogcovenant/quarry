"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import Link from "next/link";
import { noteTheme } from "@/lib/note-theme";

export default function NewNotePage() {
  const editor = useCreateBlockNote();

  return (
    <section className="flex h-screen min-w-0 flex-col overflow-hidden bg-background">
      <header className="flex shrink-0 items-center justify-between border-b border-border px-8 py-4">
        <div>
          <p className="text-sm font-medium text-accent">Notes</p>
          <h1 className="mt-1 text-xl font-semibold text-primary">
            Create note
          </h1>
        </div>

        <Link
          href="/dashboard/notes"
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          Back to notes
        </Link>
      </header>

      <div className="min-h-0 flex-1 p-6">
        <BlockNoteView
          editor={editor}
          theme={noteTheme.light}
          className="quarry-note-editor h-full w-full overflow-hidden rounded-lg border border-border bg-card shadow-sm"
        />
      </div>

      <style>{`
        .quarry-note-editor.bn-container {
          height: 100%;
          min-height: 0;
          overflow: hidden;
          width: 100%;
          background: #fffaf4;
        }

        .quarry-note-editor .bn-editor {
          box-sizing: border-box;
          display: block;
          height: 100%;
          min-height: 100%;
          max-width: none;
          overflow-y: auto;
          padding: 48px clamp(24px, 5vw, 72px);
          width: 100% !important;
        }

        .quarry-note-editor .ProseMirror {
          min-height: 100%;
          width: 100%;
        }

        @media (max-width: 768px) {
          .quarry-note-editor .bn-editor {
            padding: 28px 20px;
          }
        }
      `}</style>
    </section>
  );
}
