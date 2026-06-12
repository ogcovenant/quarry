"use client";

import { projects as defaultProjects, type Project } from "@/lib/workspace-data";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "quarry.custom-projects";
const PROJECTS_CHANGED_EVENT = "quarry:projects-changed";

function readCustomProjects() {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as Project[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readProjects() {
  return [...defaultProjects, ...readCustomProjects()];
}

function projectSlug(name: string) {
  const base =
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "project";
  const existingIds = new Set(readProjects().map((project) => project.id));
  if (!existingIds.has(base)) return base;

  let suffix = 2;
  while (existingIds.has(`${base}-${suffix}`)) suffix += 1;
  return `${base}-${suffix}`;
}

export function createWorkspaceProject(input: {
  name: string;
  description: string;
  status: Project["status"];
}) {
  const project: Project = {
    id: projectSlug(input.name),
    name: input.name.trim(),
    description: input.description.trim(),
    status: input.status,
    accent: "#9A6B45",
    updatedAt: "Just now",
  };
  const customProjects = readCustomProjects();
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...customProjects, project]),
  );
  window.dispatchEvent(new Event(PROJECTS_CHANGED_EVENT));
  return project;
}

export function useWorkspaceProjects() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [hydrated, setHydrated] = useState(false);

  const refresh = useCallback(() => {
    setProjects(readProjects());
    setHydrated(true);
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(PROJECTS_CHANGED_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(PROJECTS_CHANGED_EVENT, refresh);
    };
  }, [refresh]);

  return { projects, hydrated };
}
