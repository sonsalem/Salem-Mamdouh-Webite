"use client";

import { useQuery } from "@tanstack/react-query";
import supabase from "@/config/supabaseClients";
import type Project from "@/types/projects";

/** All projects, newest first. Shared by the works list and the detail pages. */
export const useProjects = () =>
  useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").order("id", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error.message);
        return [];
      }

      return data || [];
    },
    gcTime: 1000 * 60,
  });

export const projectHref = (locale: string, project: Pick<Project, "id">) => `/${locale}/projects/${project.id}`;
