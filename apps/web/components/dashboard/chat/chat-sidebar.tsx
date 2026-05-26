export default function ChatSidebar() {
  const history = [
    "Polymint token economics draft",
    "Rodoh payout routing architecture",
    "Quarry memory engine ideas",
    "Inference gateway redesign",
    "Persistent AI context research",
    "Notes on AI-native workspaces",
    "OpenRouter compatibility layer",
    "Knowledge graph implementation",
    "Thoughts on second-brain UX",
    "Voice note transcription flow",
    "Model monetization strategy",
    "AI memory ranking system",
    "Workspace navigation concepts",
    "Semantic search experiments",
    "Cross-project relationship mapping",
    "Gemma deployment notes",
    "Ideas for autonomous agents",
    "Markdown editor improvements",
    "Future of AI operating systems",
    "AI-assisted writing workflows",
    "Research on Reflect and Tana",
    "Quarry onboarding experience",
    "Graph visualization direction",
    "Stablecoin settlement logic",
    "Creator monetization mechanics",
    "Deep dive into embeddings",
    "Realtime sync architecture",
    "Cursor-inspired UI patterns",
    "Building calm software",
    "Thoughts on ambient intelligence",
    "Entity extraction pipeline",
    "Personal knowledge infrastructure",
    "Designing persistent memory",
    "Idea dump for Quarry v2",
    "AI-generated documentation flow",
    "RAG vs long-term memory",
    "Structuring technical research",
    "Minimal dashboard explorations",
    "Notes on contextual retrieval",
    "The future of human-AI thinking",
  ];

  return (
    <aside className="h-full w-[280px] border-r border-border bg-background/70 backdrop-blur-xl">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-sm font-semibold tracking-wide text-primary uppercase">
            Conversations
          </h2>

          <button className="mt-4 flex w-full items-center justify-center rounded bg-linear-to-b from-secondary to-primary text-white px-4 py-2 text-sm font-medium transition-all hover:bg-foreground/70 cursor-pointer shadow-[inset_8px_12px_16px_2px,rgba(0,0,0,0.4)]">
            + New Chat
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          <ul className="space-y-1">
            {history.map((item, index) => (
              <li key={index}>
                <button
                  className="
                    flex w-full items-center gap-2 rounded-xl
                    px-3 py-2.5 text-left text-sm font-medium
                    transition-colors hover:underline cursor-pointer
                  "
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="truncate">{item}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
