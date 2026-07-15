"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Building2, Mail, Shield, Pencil } from "lucide-react";
import { ProfileSettings, DEFAULT_PROFILE } from "@/types/settings";

interface ProfileCardProps {
  data: ProfileSettings;
  onUpdate: (data: ProfileSettings) => void;
}

export default function ProfileCard({ data, onUpdate }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<ProfileSettings>(data);

  const handleSave = () => {
    onUpdate(form);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm(data);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            PROFILE
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">
            User Profile
          </h2>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-500/40 hover:text-cyan-400"
          >
            <Pencil className="h-4 w-4" />
            Edit Profile
          </button>
        )}
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/20">
          <User className="h-10 w-10 text-cyan-400" />
        </div>

        <div className="grid flex-1 gap-5 sm:grid-cols-2">
          <Field label="Name" value={form.name} editing={isEditing} onChange={(v) => setForm({ ...form, name: v })} icon={User} />
          <Field label="Email" value={form.email} editing={isEditing} onChange={(v) => setForm({ ...form, email: v })} icon={Mail} />
          <Field label="Role" value={form.role} editing={false} icon={Shield} />
          <Field label="Department" value={form.department} editing={isEditing} onChange={(v) => setForm({ ...form, department: v })} icon={Building2} />
          <Field label="Plant Name" value={form.plantName} editing={isEditing} onChange={(v) => setForm({ ...form, plantName: v })} icon={Building2} />
        </div>
      </div>

      {isEditing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 flex justify-end gap-3 border-t border-slate-800 pt-5"
        >
          <button
            onClick={handleCancel}
            className="rounded-xl border border-slate-700 px-5 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:from-cyan-400 hover:to-cyan-300"
          >
            Save Changes
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

function Field({
  label,
  value,
  editing,
  onChange,
  icon: Icon,
}: {
  label: string;
  value: string;
  editing: boolean;
  onChange?: (v: string) => void;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{label}</p>
      {editing && onChange ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40"
        />
      ) : (
        <p className="text-sm text-slate-300">{value}</p>
      )}
    </div>
  );
}
