"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Project, Message, initialProjects, initialMessages } from "./data";

interface ProjectContextType {
  projects: Project[];
  messages: Message[];
  addProject: (p: Omit<Project, "id">) => void;
  updateProject: (id: number, data: Partial<Project>) => void;
  deleteProject: (id: number) => void;
  toggleStatus: (id: number) => void;
  duplicateProject: (id: number) => void;
  publishedProjects: Project[];
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages] = useState<Message[]>(initialMessages);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("gs-projects");
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch {
        setProjects(initialProjects);
      }
    } else {
      setProjects(initialProjects);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("gs-projects", JSON.stringify(projects));
    }
  }, [projects, loaded]);

  const addProject = (p: Omit<Project, "id">) => {
    setProjects((prev) => [{ ...p, id: Date.now() }, ...prev]);
  };

  const updateProject = (id: number, data: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  };

  const deleteProject = (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleStatus = (id: number) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "published" ? "draft" : "published" }
          : p
      )
    );
  };

  const duplicateProject = (id: number) => {
    const p = projects.find((x) => x.id === id);
    if (p) {
      addProject({ ...p, title: p.title + " (copie)", status: "draft" });
    }
  };

  const publishedProjects = projects.filter((p) => p.status === "published");

  return (
    <ProjectContext.Provider
      value={{
        projects,
        messages,
        addProject,
        updateProject,
        deleteProject,
        toggleStatus,
        duplicateProject,
        publishedProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectProvider");
  return ctx;
}
