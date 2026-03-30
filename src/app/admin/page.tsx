"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const router = useRouter();

  const [announcement, setAnnouncement] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [members, setMembers] = useState<any[]>([]);
  const [memberName, setMemberName] = useState("");
  const [memberRoll, setMemberRoll] = useState("");
  const [memberYear, setMemberYear] = useState("");
  const [memberRole, setMemberRole] = useState("");
  const [memberDesc, setMemberDesc] = useState("");
  const [memberImage, setMemberImage] = useState<File | null>(null);

  useEffect(() => {
    fetchMembers();
    fetchTasks();
  }, []);

  const fetchMembers = async () => {
    const { data } = await supabase.from("team").select("*");
    if (data) setMembers(data);
  };

  const fetchTasks = async () => {
    const { data } = await supabase.from("tasks").select("*");
    if (data) setTasks(data);
  };

  return (
    <main className="min-h-screen bg-[#000000] px-6 py-14">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10">
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.replace("/admin/login");
          }}
          className="mt-4 px-4 py-1 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
        >
          Logout
        </button>

        <h1 className="text-2xl font-semibold text-white">
          Admin Dashboard
        </h1>
        <p className="text-sm text-white">
          Internal access · Enactus Aryabhatta
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* TEAM MANAGEMENT */}
        <div className="bg-[#1f1b1b] rounded-2xl p-6 shadow-sm border border-black">
          <h2 className="text-lg font-semibold text-blue-600 mb-4">
            Team Management
          </h2>

          <div className="space-y-3">
            <input className="admin-input" placeholder="Name" value={memberName} onChange={(e) => setMemberName(e.target.value)} />
            <input className="admin-input" placeholder="Roll Number" value={memberRoll} onChange={(e) => setMemberRoll(e.target.value)} />
            <input className="admin-input" placeholder="Year" value={memberYear} onChange={(e) => setMemberYear(e.target.value)} />
            <input className="admin-input" placeholder="Role" value={memberRole} onChange={(e) => setMemberRole(e.target.value)} />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setMemberImage(e.target.files?.[0] || null)}
              className="border p-2 rounded w-full text-white"
            />

            <textarea
              className="admin-input"
              placeholder="Description"
              value={memberDesc}
              onChange={(e) => setMemberDesc(e.target.value)}
            />

            <button
              className="admin-btn-blue"
              onClick={async () => {
                if (!memberName) return;

                let imageUrl = null;

                if (memberImage) {
                  const filePath = `members/${Date.now()}-${memberImage.name}`;
                  const { error } = await supabase.storage
                    .from("member-images")
                    .upload(filePath, memberImage);

                  if (!error) {
                    const { data } = supabase.storage
                      .from("member-images")
                      .getPublicUrl(filePath);
                    imageUrl = data.publicUrl;
                  }
                }

                await supabase.from("team").insert([
                  {
                    name: memberName,
                    roll_number: memberRoll,
                    year: memberYear,
                    role: memberRole,
                    description: memberDesc,
                    image_url: imageUrl,
                  },
                ]);

                setMemberName("");
                setMemberRoll("");
                setMemberYear("");
                setMemberRole("");
                setMemberDesc("");
                setMemberImage(null);

                fetchMembers();
              }}
            >
              Add Member
            </button>

            {/* MEMBERS LIST */}
            <div className="pt-4 space-y-2">
              <h3 className="text-md font-semibold text-white">
                Existing Members
              </h3>

              {members.map((member) => (
                <div key={member.id} className="admin-list-item">
                  <span>{member.name}</span>
                  <span
                    className="text-red-500 cursor-pointer"
                    onClick={async () => {
                      await supabase.from("team").delete().eq("id", member.id);
                      setMembers(members.filter((m) => m.id !== member.id));
                    }}
                  >
                    Delete
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ANNOUNCEMENTS */}
        <div className="bg-[#1f1b1b] rounded-2xl p-6 shadow-sm border border-white">
          <h2 className="text-lg font-semibold text-yellow-500 mb-4">
            Announcement
          </h2>

          <textarea
            className="admin-input"
            placeholder="Write announcement..."
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
          />

          <button
            className="admin-btn-blue mt-3"
            onClick={async () => {
              if (!announcement) return;

              await supabase.from("announcements").insert([
                { content: announcement },
              ]);

              setAnnouncement("");
              alert("Announcement published");
            }}
          >
            Publish Announcement
          </button>
        </div>

        {/* TASKS */}
        <div className="bg-[#1f1b1b] rounded-2xl p-6 shadow-sm border border-white">
          <h2 className="text-lg font-semibold text-green-600 mb-4">
            Tasks
          </h2>

          <input className="admin-input mb-2" placeholder="Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />

          <textarea className="admin-input mb-2" placeholder="Description" value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} />

          <button
            className="admin-btn-green"
            onClick={async () => {
              if (!taskTitle) return;

              const { data } = await supabase
                .from("tasks")
                .insert([{ title: taskTitle, description: taskDesc }])
                .select();

              if (data) {
                setTasks([...tasks, data[0]]);
                setTaskTitle("");
                setTaskDesc("");
              }
            }}
          >
            Add Task
          </button>

          {/* TASK LIST */}
          <div className="pt-4 space-y-2">
            <h3 className="text-md font-semibold text-white">
              Existing Tasks
            </h3>

            {tasks.map((task) => (
              <div key={task.id} className="admin-list-item">
                <span>{task.title}</span>
                <span
                  className="text-red-500 cursor-pointer"
                  onClick={async () => {
                    await supabase.from("tasks").delete().eq("id", task.id);
                    setTasks(tasks.filter((t) => t.id !== task.id));
                  }}
                >
                  Delete
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .admin-input {
          width: 100%;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          font-size: 14px;
          outline: none;
          color: #fff;
        }

        .admin-input::placeholder {
          color: #fff;
          opacity: 0.7;
        }

        .admin-btn-blue {
          width: 100%;
          background: #2563eb;
          color: white;
          padding: 10px;
          border-radius: 10px;
        }

        .admin-btn-green {
          width: 100%;
          background: #16a34a;
          color: white;
          padding: 10px;
          border-radius: 10px;
        }

        .admin-list-item {
          display: flex;
          justify-content: space-between;
          background: #f8fafc;
          padding: 10px;
          border-radius: 10px;
          color: black;
        }
      `}</style>
    </main>
  );
}