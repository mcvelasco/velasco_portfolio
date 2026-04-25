import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export const useProjects = (user) => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id);

    setProjects(data || []);
  };

  const addProject = async (project) => {
    await supabase.from("projects").insert([project]);
    fetchProjects();
  };

  const deleteProject = async (id) => {
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  };

  useEffect(() => {
    if (user) fetchProjects();
  }, [user]);

  return { projects, addProject, deleteProject };
};