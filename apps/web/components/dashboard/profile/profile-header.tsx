import { Login01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function ProfileHeader() {
  return (
    <header className="flex flex-col items-start justify-between gap-6 sm:flex-row">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="mt-3 text-sm text-secondary">
          Manage your account and workspace preferences.
        </p>
      </div>
      <button
        type="button"
        className="mt-1 inline-flex shrink-0 items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-secondary hover:border-red-200 hover:bg-red-50 hover:text-red-700"
      >
        <HugeiconsIcon icon={Login01Icon} size={16} strokeWidth={1.7} />
        Log out
      </button>
    </header>
  );
}
