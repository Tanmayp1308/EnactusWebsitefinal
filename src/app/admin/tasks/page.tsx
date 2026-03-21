"use client";

import { useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  status: "Todo" | "In Progress" | "Completed";
  assignedTo: string[];
  activeMembers: string[];
};

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design landing page",
    description: "Create hero + about sections",
    priority: "High",
    status: "Todo",
    assignedTo: ["Tanmay", "Aayush"],
    activeMembers: [],
  },
  {
    id: "2",
    title: "Fix dashboard bugs",
    description: "Resolve sidebar and filters",
    priority: "Medium",
    status: "In Progress",
    assignedTo: ["Riya"],
    activeMembers: ["Riya"],
  },
];

export default function TeamTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleWorking = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId && !task.activeMembers.includes("You")
          ? { ...task, activeMembers: [...task.activeMembers, "You"], status: "In Progress" }
          : task
      )
    );
  };

  const handleComplete = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, status: "Completed", activeMembers: [] }
          : task
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">Team Tasks</h1>

      <div className="grid gap-6">
        {tasks.map(task => (
          <div
            key={task.id}
            className="rounded-xl border border-slate-700 bg-slate-900 p-6"
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
  );
}