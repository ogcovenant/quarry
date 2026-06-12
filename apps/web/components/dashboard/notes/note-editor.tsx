"use client";

import { noteTheme } from "@/lib/note-theme";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

export default function NoteEditor() {
  const editor = useCreateBlockNote();

  return (
    <>
      <BlockNoteView
        editor={editor}
        theme={noteTheme.light}
        className="quarry-note-editor h-full w-full overflow-hidden rounded-lg border border-border bg-card shadow-sm"
      />
      <style>{`
        .quarry-note-editor.bn-container {
          height: 100%;
          min-height: 0;
          overflow: hidden;
          width: 100%;
          background: var(--card);
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
    </>
  );
}
