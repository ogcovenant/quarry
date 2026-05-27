import NoteSingle from "@/components/dashboard/notes/note-single";
import NotesHeader from "@/components/dashboard/notes/notes-header";

export default function NotesPage() {
  const notes = [
    {
      id: 1,
      title: "Polymint AI Monetization Ideas",
      content:
        "Explored revenue-sharing mechanisms for model creators. Considering an 80/20 split where creators retain most inference revenue while the platform captures usage fees and token ecosystem value.",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Quarry Product Direction",
      content:
        "Quarry should feel less like a chatbot and more like an AI-native thinking environment. Focus on persistent memory, connected notes, and contextual intelligence rather than personalities or assistants.",
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: "Rodoh Treasury Notes",
      content:
        "Need a stablecoin settlement layer that can support cross-border payouts. Explore combining local collection providers with automated stablecoin routing infrastructure.",
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      title: "AI Workspace Research",
      content:
        "Most AI workspaces feel overloaded too early. Simplicity and writing experience should come before collaboration, agents, or complex workflows.",
      createdAt: new Date().toISOString(),
    },
    {
      id: 5,
      title: "Knowledge Graph Thoughts",
      content:
        "Automatic relationship mapping between notes could become a major differentiator. The system should surface connected ideas naturally over time.",
      createdAt: new Date().toISOString(),
    },
    {
      id: 6,
      title: "UI Direction for Quarry",
      content:
        "Warm dark tones feel more human and thoughtful compared to typical AI products. Brown, graphite, and muted bronze create a calmer workspace atmosphere.",
      createdAt: new Date().toISOString(),
    },
    {
      id: 7,
      title: "Open Questions About Memory",
      content:
        "How should long-term memory ranking work? Need a balance between recency, relevance, and semantic importance without overwhelming the user.",
      createdAt: new Date().toISOString(),
    },
    {
      id: 8,
      title: "Future Features",
      content:
        "Voice capture, semantic search, AI-generated summaries, and contextual linking could all evolve naturally from the current notes foundation.",
      createdAt: new Date().toISOString(),
    },
  ];

  return (
    <div>
      <NotesHeader />
      <div className="flex flex-wrap gap-6 p-8">
        {notes.map((note) => (
          <NoteSingle key={note.id} {...note} />
        ))}
      </div>
    </div>
  );
}
