"use client";

import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Task = {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  status: "Todo" | "In Progress" | "Completed";
  assignedTo: string[];
  activeMembers: string[];
};

export default function TeamTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase.from("tasks").select("*");

    if (!error && data) {
      const formatted = data.map((t) => ({
        id: t.id,
        title: t.title,
        description: t.description,
        priority: t.priority || "Low",
        status: t.status || "Todo",
        assignedTo: t.assigned_to || [],
        activeMembers: t.active_members || [],
      }));

      setTasks(formatted);
    }
  };

  const handleWorking = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.activeMembers.includes("You")) return;

    const updatedMembers = [...task.activeMembers, "You"];

    // Optimistic UI update
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? { ...t, status: "In Progress", activeMembers: updatedMembers }
          : t
      )
    );

    await supabase
      .from("tasks")
      .update({
        active_members: updatedMembers,
        status: "In Progress",
      })
      .eq("id", taskId);
  };

  const handleComplete = async (taskId: string) => {
    // Optimistic UI update
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? { ...t, status: "Completed", activeMembers: [] }
          : t
      )
    );

    await supabase
      .from("tasks")
      .update({
        status: "Completed",
        active_members: [],
      })
      .eq("id", taskId);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">Team Tasks</h1>

      {["Todo", "In Progress", "Completed"].map((section) => (
        <div key={section} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{section}</h2>

          <div className="grid gap-6">
            {tasks
              .filter((task) => task.status === section)
              .map((task) => (
                <div
                  key={task.id}
                  className={`rounded-xl border p-6 ${
                    section === "Completed"
                      ? "bg-green-900 border-green-700"
                      : "bg-slate-900 border-slate-700"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold">{task.title}</h2>
                      <p className="text-sm text-slate-400 mt-1">
                        {task.description}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        task.priority === "High"
                          ? "bg-red-500/20 text-red-400"
                          : task.priority === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm">
                    <span className="px-3 py-1 bg-slate-800 rounded-full">
                      Status: {task.status}
                    </span>

                    <span className="px-3 py-1 bg-slate-800 rounded-full">
                      Assigned: {task.assignedTo.join(", ")}
                    </span>
                  </div>

                  <div className="mt-4 text-sm text-slate-400">
                    <strong className="text-slate-300">Active:</strong>{" "}
                    {task.activeMembers.length
                      ? task.activeMembers.join(", ")
                      : "No one working yet"}
                  </div>

                  {task.status !== "Completed" && (
                    <div className="mt-5 flex gap-3">
                      <button
                        onClick={() => handleWorking(task.id)}
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm"
                      >
                        I'm Working
                      </button>

                      <button
                        onClick={() => handleComplete(task.id)}
                        className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm"
                      >
                        Mark Done
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}