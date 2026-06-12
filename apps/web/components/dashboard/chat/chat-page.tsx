"use client";

import ChatComposer from "./chat-composer";
import {
  CheckmarkCircle02Icon,
  Edit02Icon,
  Folder01Icon,
  Note01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useState } from "react";

export default function ChatPage() {
  const [updateApplied, setUpdateApplied] = useState(false);

  return (
    <div className="flex h-full min-h-0">
      <section className="flex min-w-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-2xl px-6 py-10 sm:px-10">
            <div className="flex items-center gap-2 text-xs text-secondary">
              <HugeiconsIcon icon={Folder01Icon} size={14} strokeWidth={1.7} />
              <span>Quarry</span>
              <span>·</span>
              <span>5 notes and 2 sources</span>
            </div>
            <div className="mt-8 flex justify-end">
              <p className="max-w-[85%] rounded-lg bg-muted px-3 py-2 text-sm leading-6 text-foreground">
                Review the current product direction, add project scoping, and
                turn the result into a product brief note.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <p className="text-sm leading-7 text-foreground">
                  The current direction is strong, but the information model
                  needs one explicit layer between the workspace and individual
                  items: <strong>projects</strong>. Projects should own their
                  notes, sources, and conversations, while freeform notes remain
                  available at workspace level.
                </p>
                <div className="mt-3 flex gap-2 text-xs text-secondary">
                  <span>Quarry Product Direction</span>
                  <span>·</span>
                  <span>AI workspace research.md</span>
                </div>
              </div>

              <div className="border-l-2 border-accent pl-4">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Edit02Icon}
                    size={16}
                    strokeWidth={1.7}
                    className="text-accent"
                  />
                  <p className="text-sm font-medium text-foreground">
                    Update Quarry Product Direction
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-secondary">
                  <strong className="font-medium text-foreground">
                    Add “Project scoping”:
                  </strong>{" "}
                  Projects are durable containers for active work. Every project
                  keeps its notes, sources, and chats together. Notes may also
                  remain freeform.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  {updateApplied ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-accent">
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        size={15}
                        strokeWidth={1.7}
                      />
                      Applied
                    </span>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setUpdateApplied(true)}
                        className="rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-white"
                      >
                        Apply
                      </button>
                      <button
                        type="button"
                        className="rounded-md px-2.5 py-1.5 text-xs text-secondary hover:bg-muted"
                      >
                        Dismiss
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm leading-7 text-foreground">
                  I also created a brief note from the revised direction.
                </p>
                <Link
                  href="/dashboard/notes/quarry-product-brief"
                  className="mt-3 flex items-center gap-3 border-y border-border py-3 hover:bg-muted/40"
                >
                  <HugeiconsIcon
                    icon={Note01Icon}
                    size={18}
                    strokeWidth={1.7}
                    className="text-secondary"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">
                      Quarry v2 Product Brief
                    </p>
                    <p className="mt-0.5 text-xs text-secondary">
                      Brief note · Quarry project · created from this chat
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-border bg-card px-4 py-3">
          <div className="mx-auto max-w-2xl">
            <ChatComposer compact />
          </div>
        </div>
      </section>
    </div>
  );
}
