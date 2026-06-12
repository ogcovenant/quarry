import {
  AiChat02Icon,
  ArrowRight01Icon,
  CloudUploadIcon,
  Folder01Icon,
  Home01Icon,
  Note01Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import Logo from "@/components/logo";

const workflow = [
  {
    number: "01",
    title: "Capture your thinking",
    description:
      "Write freeform notes or keep them inside a project when the work needs structure.",
    icon: Note01Icon,
  },
  {
    number: "02",
    title: "Add your sources",
    description:
      "Bring in the documents and research that should stay close to your work.",
    icon: CloudUploadIcon,
  },
  {
    number: "03",
    title: "Ask with context",
    description:
      "Use your notes and sources to get grounded answers and move ideas forward.",
    icon: AiChat02Icon,
  },
];

const previewProjects = [
  {
    title: "Quarry",
    description: "Product direction and workspace research",
    updatedAt: "18m",
  },
  {
    title: "Rodoh",
    description: "Brand notes and launch planning",
    updatedAt: "2h",
  },
  {
    title: "Polymint",
    description: "Market research and product briefs",
    updatedAt: "Yesterday",
  },
];

const previewNav = [
  { label: "Home", icon: Home01Icon, active: true },
  { label: "Ask", icon: AiChat02Icon, active: false },
  { label: "Notes", icon: Note01Icon, active: false },
  { label: "Sources", icon: CloudUploadIcon, active: false },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="Quarry home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-secondary md:flex">
            <a href="#workspace" className="hover:text-foreground">
              Product
            </a>
            <a href="#workflow" className="hover:text-foreground">
              How it works
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/auth"
              className="hidden rounded-md px-3 py-2 text-sm text-secondary hover:bg-muted hover:text-foreground sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-hover"
            >
              Get started
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={15}
                strokeWidth={1.7}
              />
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-4xl px-6 pb-14 pt-20 text-center sm:px-10 sm:pb-16 sm:pt-24">
        <p className="text-sm text-secondary">Personal memory workspace</p>
        <h1 className="mx-auto mt-3 max-w-3xl text-5xl font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-6xl">
          Keep your thinking in one place.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-secondary sm:text-lg sm:leading-8">
          Quarry brings your notes, sources, projects, and conversations
          together, so the context behind your work stays useful.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/auth"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-hover sm:w-auto"
          >
            Start building memory
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={16}
              strokeWidth={1.7}
            />
          </Link>
          <a
            href="#workspace"
            className="inline-flex w-full items-center justify-center rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/60 sm:w-auto"
          >
            See the workspace
          </a>
        </div>
        <p className="mt-4 text-xs text-secondary">
          Built for personal thinking. Private by default.
        </p>
      </section>

      <section
        id="workspace"
        className="mx-auto w-full max-w-6xl scroll-mt-8 px-5 pb-24 sm:px-8"
      >
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[0_12px_40px_rgba(55,53,47,0.08)]">
          <div className="flex min-h-[520px]">
            <aside className="hidden w-52 shrink-0 bg-sidebar p-3 md:block">
              <div className="flex items-center gap-2 px-2 py-1">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-semibold text-white">
                  Q
                </span>
                <span className="text-sm font-semibold text-foreground">
                  Quarry
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-md px-2.5 py-2 text-xs text-secondary">
                <HugeiconsIcon
                  icon={Search01Icon}
                  size={15}
                  strokeWidth={1.7}
                />
                <span className="flex-1">Search</span>
                <span className="text-secondary/60">Cmd K</span>
              </div>
              <div className="mt-2 space-y-0.5">
                {previewNav.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs ${
                      item.active
                        ? "bg-black/[0.07] font-medium text-foreground"
                        : "text-secondary"
                    }`}
                  >
                    <HugeiconsIcon
                      icon={item.icon}
                      size={16}
                      strokeWidth={1.7}
                    />
                    {item.label}
                  </div>
                ))}
              </div>
              <p className="mb-1 mt-6 px-2 text-[11px] font-medium text-secondary">
                Projects
              </p>
              {previewProjects.map((project) => (
                <div
                  key={project.title}
                  className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-secondary"
                >
                  <HugeiconsIcon
                    icon={Folder01Icon}
                    size={15}
                    strokeWidth={1.7}
                  />
                  {project.title}
                </div>
              ))}
            </aside>

            <div className="min-w-0 flex-1">
              <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-10 sm:py-12">
                <p className="text-xs text-secondary">Personal workspace</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Good afternoon.
                </h2>

                <div className="mt-7 flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm text-secondary shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  <HugeiconsIcon
                    icon={Search01Icon}
                    size={17}
                    strokeWidth={1.7}
                  />
                  <span className="min-w-0 flex-1 truncate">
                    Ask Quarry about your notes and sources...
                  </span>
                  <span className="hidden text-xs text-secondary/60 sm:block">
                    Enter
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-medium text-white">
                    <HugeiconsIcon
                      icon={Note01Icon}
                      size={15}
                      strokeWidth={1.7}
                    />
                    New note
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs text-secondary">
                    <HugeiconsIcon
                      icon={Folder01Icon}
                      size={15}
                      strokeWidth={1.7}
                    />
                    Projects
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs text-secondary">
                    <HugeiconsIcon
                      icon={CloudUploadIcon}
                      size={15}
                      strokeWidth={1.7}
                    />
                    Add source
                  </span>
                </div>

                <div className="mt-10 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">
                    Projects
                  </h3>
                  <span className="text-xs text-secondary">View all</span>
                </div>
                <div className="mt-2 divide-y divide-border border-y border-border">
                  {previewProjects.map((project) => (
                    <div
                      key={project.title}
                      className="flex items-center gap-3 py-3"
                    >
                      <HugeiconsIcon
                        icon={Folder01Icon}
                        size={17}
                        strokeWidth={1.7}
                        className="shrink-0 text-secondary"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {project.title}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-secondary">
                          {project.description}
                        </p>
                      </div>
                      <span className="hidden text-xs text-secondary sm:block">
                        {project.updatedAt}
                      </span>
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        size={14}
                        strokeWidth={1.7}
                        className="text-secondary/60"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="scroll-mt-8 border-y border-border">
        <div className="mx-auto w-full max-w-4xl px-6 py-20 sm:px-10 sm:py-24">
          <p className="text-sm text-secondary">One continuous workflow</p>
          <h2 className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight text-foreground">
            From scattered context to useful memory.
          </h2>
          <div className="mt-12 border-t border-border">
            {workflow.map((item) => (
              <article
                key={item.number}
                className="grid gap-4 border-b border-border py-6 sm:grid-cols-[52px_1fr_1.35fr] sm:items-start"
              >
                <span className="text-xs font-medium text-secondary">
                  {item.number}
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-secondary">
                    <HugeiconsIcon
                      icon={item.icon}
                      size={17}
                      strokeWidth={1.7}
                    />
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm leading-6 text-secondary">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-6 py-20 sm:px-10 sm:py-24">
        <div className="flex flex-col gap-8 border-b border-t border-border py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-secondary">Start with what you have</p>
            <h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight text-foreground">
              Give your work a place to remember itself.
            </h2>
          </div>
          <Link
            href="/auth"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-hover"
          >
            Start with Quarry
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={16}
              strokeWidth={1.7}
            />
          </Link>
        </div>
        <footer className="flex flex-col gap-3 pt-8 text-xs text-secondary sm:flex-row sm:items-center sm:justify-between">
          <span>(c) 2026 Quarry</span>
          <span>Notes, sources, projects, and conversations in context.</span>
        </footer>
      </section>
    </main>
  );
}
