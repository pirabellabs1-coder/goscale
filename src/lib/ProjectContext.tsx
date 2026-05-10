"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface Project {
  id: number;
  title: string;
  title_en?: string;
  category: string;
  description: string;
  description_en?: string;
  long_description: string;
  long_description_en?: string;
  result: string;
  result_en?: string;
  tools: string;
  status: "published" | "draft";
  image_url: string;
  video_url: string;
  images?: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface ProjectContextType {
  projects: Project[];
  messages: Message[];
  loading: boolean;
  refreshProjects: () => Promise<void>;
  refreshMessages: () => Promise<void>;
  addProject: (p: Partial<Project>) => Promise<void>;
  updateProject: (id: number, data: Partial<Project>) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  toggleStatus: (id: number) => Promise<void>;
  duplicateProject: (id: number) => Promise<void>;
  markMessageRead: (id: number) => Promise<void>;
  deleteMessage: (id: number) => Promise<void>;
  publishedProjects: Project[];
  setupDatabase: () => Promise<boolean>;
  dbReady: boolean;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbReady, setDbReady] = useState(false);

  const refreshProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
        setDbReady(true);
      }
    } catch {
      // DB not available yet
    }
  }, []);

  const refreshMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch {
      // DB not available yet
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      await Promise.all([refreshProjects(), refreshMessages()]);
      if (!cancelled) setLoading(false);
    };
    // Defer one microtask so the effect body itself is side-effect-free
    queueMicrotask(run);
    return () => {
      cancelled = true;
    };
  }, [refreshProjects, refreshMessages]);

  const addProject = async (p: Partial<Project>) => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });
    if (res.ok) await refreshProjects();
  };

  const updateProject = async (id: number, data: Partial<Project>) => {
    const res = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) await refreshProjects();
  };

  const deleteProject = async (id: number) => {
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) await refreshProjects();
  };

  const toggleStatus = async (id: number) => {
    const res = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "toggle" }),
    });
    if (res.ok) await refreshProjects();
  };

  const duplicateProject = async (id: number) => {
    const res = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "duplicate" }),
    });
    if (res.ok) await refreshProjects();
  };

  const markMessageRead = async (id: number) => {
    const res = await fetch(`/api/messages/${id}`, { method: "PUT" });
    if (res.ok) await refreshMessages();
  };

  const deleteMessage = async (id: number) => {
    const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
    if (res.ok) await refreshMessages();
  };

  const setupDatabase = async () => {
    try {
      const res = await fetch("/api/setup", { method: "POST" });
      if (res.ok) {
        setDbReady(true);
        await refreshProjects();
        await refreshMessages();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const publishedProjects = projects.filter((p) => p.status === "published");

  return (
    <ProjectContext.Provider
      value={{
        projects,
        messages,
        loading,
        refreshProjects,
        refreshMessages,
        addProject,
        updateProject,
        deleteProject,
        toggleStatus,
        duplicateProject,
        markMessageRead,
        deleteMessage,
        publishedProjects,
        setupDatabase,
        dbReady,
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
