import { NoteAddIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function NotesHeader() {
  return (
    <header className="flex h-12 items-center justify-between border-b border-border px-4 sm:px-6">
      <h1 className="text-sm font-medium text-foreground">Notes</h1>
      <Link
        href="/dashboard/notes/new"
        className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-hover"
      >
        <HugeiconsIcon icon={NoteAddIcon} size={16} strokeWidth={1.7} />
        Add note
      </Link>
    </header>
  );
}
