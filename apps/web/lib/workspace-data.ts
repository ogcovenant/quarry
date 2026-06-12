export type Project = {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Planning" | "Paused";
  accent: string;
  updatedAt: string;
};

export type WorkspaceNote = {
  id: string;
  title: string;
  excerpt: string;
  projectId: string | null;
  category: string;
  updatedAt: string;
};

export type WorkspaceSource = {
  id: string;
  name: string;
  type: string;
  size: string;
  projectId: string | null;
  status: "Ready" | "Indexed";
  uploadedAt: string;
};

export const projects: Project[] = [
  {
    id: "quarry",
    name: "Quarry",
    description: "A personal memory workspace for connected thinking.",
    status: "Active",
    accent: "#9A6B45",
    updatedAt: "18 minutes ago",
  },
  {
    id: "rodoh",
    name: "Rodoh",
    description:
      "Cross-border treasury and stablecoin settlement infrastructure.",
    status: "Planning",
    accent: "#787774",
    updatedAt: "Yesterday",
  },
  {
    id: "polymint",
    name: "Polymint",
    description: "Model monetization and creator-owned AI economics.",
    status: "Paused",
    accent: "#9B9995",
    updatedAt: "4 days ago",
  },
];

export const workspaceNotes: WorkspaceNote[] = [
  {
    id: "quarry-product-direction",
    title: "Quarry Product Direction",
    excerpt:
      "Quarry should feel less like a chatbot and more like an AI-native thinking environment built around persistent memory, connected notes, and contextual intelligence.",
    projectId: "quarry",
    category: "Strategy",
    updatedAt: "18 minutes ago",
  },
  {
    id: "quarry-memory-ranking",
    title: "Open Questions About Memory",
    excerpt:
      "How should long-term memory ranking balance recency, relevance, semantic importance, and explicit user intent?",
    projectId: "quarry",
    category: "Research",
    updatedAt: "Yesterday",
  },
  {
    id: "quarry-ui-direction",
    title: "UI Direction for Quarry",
    excerpt:
      "Warm, quiet surfaces should make the product feel like a place to think rather than a conventional SaaS dashboard.",
    projectId: "quarry",
    category: "Design",
    updatedAt: "3 days ago",
  },
  {
    id: "rodoh-treasury",
    title: "Rodoh Treasury Notes",
    excerpt:
      "A stablecoin settlement layer can combine local collection providers with automated routing and treasury controls.",
    projectId: "rodoh",
    category: "Architecture",
    updatedAt: "Yesterday",
  },
  {
    id: "polymint-monetization",
    title: "Polymint AI Monetization Ideas",
    excerpt:
      "Explore revenue sharing where model creators retain inference revenue while the platform captures usage and ecosystem value.",
    projectId: "polymint",
    category: "Ideas",
    updatedAt: "4 days ago",
  },
  {
    id: "ambient-intelligence",
    title: "Thoughts on Ambient Intelligence",
    excerpt:
      "The best personal AI may feel less like an assistant and more like context that becomes available at exactly the right moment.",
    projectId: null,
    category: "Freeform",
    updatedAt: "Last week",
  },
  {
    id: "building-calm-software",
    title: "Building Calm Software",
    excerpt:
      "Good tools reduce the number of decisions needed to resume work and keep navigation subordinate to the user's actual material.",
    projectId: null,
    category: "Freeform",
    updatedAt: "Last week",
  },
  {
    id: "quarry-product-brief",
    title: "Quarry v2 Product Brief",
    excerpt:
      "A structured product brief generated from the product direction note and AI workspace research.",
    projectId: "quarry",
    category: "Brief",
    updatedAt: "8 minutes ago",
  },
  {
    id: "memory-priority-matrix",
    title: "Memory Priority Matrix",
    excerpt:
      "A comparison of recency, relevance, frequency, and explicit pinning signals for memory ranking.",
    projectId: "quarry",
    category: "Table",
    updatedAt: "Yesterday",
  },
  {
    id: "rodoh-provider-checklist",
    title: "Provider Evaluation Checklist",
    excerpt:
      "A reusable checklist for comparing collection and settlement providers.",
    projectId: "rodoh",
    category: "Checklist",
    updatedAt: "2 days ago",
  },
  {
    id: "thinking-system-sketch",
    title: "Personal Thinking System",
    excerpt:
      "A freeform prototype note exploring capture, synthesis, and retrieval loops.",
    projectId: null,
    category: "Prototype",
    updatedAt: "Last week",
  },
];

export const workspaceSources: WorkspaceSource[] = [
  {
    id: "quarry-direction-pdf",
    name: "Quarry product direction.pdf",
    type: "PDF",
    size: "1.8 MB",
    projectId: "quarry",
    status: "Indexed",
    uploadedAt: "Today",
  },
  {
    id: "ai-workspace-research",
    name: "AI workspace research.md",
    type: "Markdown",
    size: "84 KB",
    projectId: "quarry",
    status: "Indexed",
    uploadedAt: "Yesterday",
  },
  {
    id: "rodoh-routing",
    name: "stablecoin-routing-options.pdf",
    type: "PDF",
    size: "2.4 MB",
    projectId: "rodoh",
    status: "Indexed",
    uploadedAt: "Yesterday",
  },
  {
    id: "memory-meeting",
    name: "memory-system-meeting.txt",
    type: "Text",
    size: "42 KB",
    projectId: null,
    status: "Ready",
    uploadedAt: "May 24",
  },
];

export function getProject(projectId: string | null) {
  if (!projectId) return null;
  return projects.find((project) => project.id === projectId) ?? null;
}
