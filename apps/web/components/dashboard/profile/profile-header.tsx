import { Login01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function ProfileHeader() {
  return (
    <header className="border-b border-border px-8 py-4 flex justify-between items-center">
      {/*<p className="text-sm font-medium text-accent">Chat</p>*/}
      <h1 className="mt-2 text-xl font-semibold text-primary">Profile</h1>
      <div>
        <button className="bg-linear-to-b from-red-700 to-red-800 text-white px-4 py-2 rounded cursor-pointer flex items-center gap-2">
          <HugeiconsIcon icon={Login01Icon} size={20} />
          <span>Log out</span>
        </button>
      </div>
    </header>
  );
}
