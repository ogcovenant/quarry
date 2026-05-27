import { SentIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import TextareaAutosize from "react-textarea-autosize";

const messages = [
  {
    author: "Quarry",
    text: "What should we remember or work through today?",
  },
  {
    author: "You",
    text: "Help me connect my project notes with the decisions from last week.",
  },
  {
    author: "Quarry",
    text: "I can do that. Add the notes or describe the project, and I will keep the context together as we go.",
  },
  {
    author: "You",
    text: "I also want the system to surface related ideas automatically over time.",
  },
  {
    author: "Quarry",
    text: "That could evolve naturally through semantic linking and persistent workspace memory.",
  },
  {
    author: "You",
    text: "For now, I want Quarry to stay personal-first, not team-focused.",
  },
  {
    author: "Quarry",
    text: "Then the first version should focus on private notes, quick capture, contextual chat, and a calm writing experience.",
  },
  {
    author: "You",
    text: "The dashboard should feel minimal, like a place to think, not a full SaaS control panel.",
  },
  {
    author: "Quarry",
    text: "A simple notes area, chat history, and expandable input is enough for the first version.",
  },
  {
    author: "You",
    text: "I want the AI responses to feel more like notes than a person talking back.",
  },
  {
    author: "Quarry",
    text: "The response style can stay neutral and document-like, with clean note cards instead of avatar bubbles.",
  },
  {
    author: "You",
    text: "Later, I may add semantic search and automatic connections between notes.",
  },
  {
    author: "Quarry",
    text: "That can become the intelligence layer after the core writing and chat experience feels solid.",
  },
];

export default function ChatPage() {
  return (
    <section className="flex h-full flex-1 flex-col py-6">
      {/* Messages */}
      <div className="w-full overflow-y-auto">
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 pb-6">
          {messages.map((message) => {
            const isQuarry = message.author === "Quarry";

            return (
              <article
                key={`${message.author}-${message.text}`}
                className={isQuarry ? "w-full" : "flex justify-end"}
              >
                {isQuarry ? (
                  <div className="rounded-2xl border border-border bg-card/70 px-5 py-4">
                    <p className="text-sm leading-7 text-foreground">
                      {message.text}
                    </p>
                  </div>
                ) : (
                  <div className="max-w-[80%] rounded-2xl bg-primary px-4 py-3 text-light-neutral">
                    <p className="text-sm leading-6">{message.text}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {/* Input */}
      <form className="mx-auto mt-4 w-full max-w-3xl">
        <label htmlFor="message" className="sr-only">
          Message
        </label>

        <div
          className="
            flex items-end gap-2 rounded-2xl border border-border
            bg-card px-3 py-3
            transition-colors focus-within:border-accent
          "
        >
          <TextareaAutosize
            id="message"
            minRows={1}
            maxRows={10}
            placeholder="Ask anything..."
            className="
              max-h-40 flex-1 resize-none bg-transparent
              px-1 py-1 text-sm text-foreground
              outline-none placeholder:text-secondary/60
            "
          />

          <button
            type="submit"
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl bg-primary text-light-neutral
              transition-all hover:opacity-90
            "
          >
            <HugeiconsIcon icon={SentIcon} size={18} strokeWidth={1.8} />
          </button>
        </div>
      </form>
    </section>
  );
}
