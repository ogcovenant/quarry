import { NoteAddIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function NotesHeader() {
  return (
    <header className="border-b border-border px-8 py-4 flex justify-between items-center">
      {/*<p className="text-sm font-medium text-accent">Chat</p>*/}
      <h1 className="mt-2 text-xl font-semibold text-primary">Notes</h1>
      <div>
        <Link
          href="/dashboard/notes/new"
          className="bg-linear-to-b from-secondary to-primary text-white px-4 py-2 rounded cursor-pointer flex items-center gap-2"
        >
          <HugeiconsIcon icon={NoteAddIcon} size={20} />
          <span>Add Note</span>
        </Link>
      </div>
    </header>
  );
}
