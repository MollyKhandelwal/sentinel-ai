"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileText, Image, FileSpreadsheet } from "lucide-react";
import { UploadedFile, formatFileSize, SUPPORTED_FILE_TYPES, MAX_FILE_SIZE } from "@/types/chat";
import { toast } from "sonner";

interface FileUploadProps {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
}

const typeIcon = (type: string) => {
  if (type.startsWith("image/")) return Image;
  if (type.includes("pdf")) return FileText;
  if (type.includes("spreadsheet") || type.includes("csv") || type.includes("excel")) return FileSpreadsheet;
  return FileText;
};

export default function FileUpload({ files, onFilesChange }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = [];
    const existingNames = new Set(files.map((f) => f.name));

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      if (existingNames.has(file.name)) continue;
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File too large: ${file.name}`, {
          description: `Maximum file size is ${formatFileSize(MAX_FILE_SIZE)}.`,
          style: { background: "#0f172a", border: "1px solid #334155", color: "#e2e8f0" },
        });
        continue;
      }
      newFiles.push({
        id: crypto.randomUUID?.() ?? `${Date.now()}-${i}`,
        name: file.name,
        size: file.size,
        type: file.type || file.name.split(".").pop() || "unknown",
      });
    }

    if (newFiles.length > 0) {
      onFilesChange([...files, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    onFilesChange(files.filter((f) => f.id !== id));
  };

  return (
    <div>
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 flex flex-wrap gap-2 px-1"
          >
            {files.map((file) => {
              const Icon = typeIcon(file.type);
              return (
                <div
                  key={file.id}
                  className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-1.5 text-xs"
                >
                  <Icon className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="max-w-[120px] truncate text-slate-300">{file.name}</span>
                  <span className="text-slate-600">{formatFileSize(file.size)}</span>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="ml-1 rounded p-0.5 text-slate-500 transition hover:text-red-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileSelect(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-xl border-2 border-dashed px-4 py-2.5 text-center text-xs text-slate-500 transition ${
          isDragging
            ? "border-cyan-500/60 bg-cyan-500/10 text-cyan-400"
            : "border-slate-700 bg-slate-950/40 hover:border-slate-600"
        }`}
      >
        <Upload className="mx-auto mb-1 h-4 w-4" />
        <span>Drop files or click to upload</span>
        <span className="ml-1 text-slate-600">(PDF, CSV, Excel, Images · max 10MB)</span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={SUPPORTED_FILE_TYPES}
        multiple
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />
    </div>
  );
}
