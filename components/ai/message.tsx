interface MessageProps {
  role: "user" | "assistant";
  message: string;
}

export default function Message({
  role,
  message,
}: MessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] rounded-2xl px-5 py-4 border transition-all

        ${
          isUser
            ? "bg-cyan-500 text-white border-cyan-500"
            : "bg-slate-900/70 border-slate-800 text-slate-100"
        }`}
      >
        <p className="text-sm leading-7 whitespace-pre-wrap">
          {message}
        </p>
      </div>
    </div>
  );
}