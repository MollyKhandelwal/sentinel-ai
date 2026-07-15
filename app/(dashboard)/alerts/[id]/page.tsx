import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AlertDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AlertDetailsPage({
  params,
}: AlertDetailsPageProps) {
  const { id } = await params;

  const res = await fetch("http://localhost:3000/api/dashboard", {
    cache: "no-store",
  });

  const data = await res.json();

  const recommendation = data.recommendations.find(
    (item: any) => item.id === id
  );

  if (!recommendation) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="rounded-2xl border border-red-500/20 bg-slate-900 p-8">
          <h1 className="text-3xl font-bold text-red-400">
            Recommendation Not Found
          </h1>

          <Link
            href="/dashboard"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <Link
          href="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          AI RECOMMENDATION
        </p>

        <h1 className="mt-3 text-4xl font-bold text-white">
          {recommendation.title}
        </h1>

        <div className="mt-6 flex flex-wrap gap-4">

          <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-400">
            Priority: {recommendation.priority}
          </span>

          <span className="rounded-full bg-slate-800 px-4 py-2 text-slate-300">
            {new Date(recommendation.createdAt).toLocaleString()}
          </span>

        </div>

        <div className="mt-10 rounded-xl border border-slate-800 bg-slate-950 p-6">

          <h2 className="text-2xl font-semibold text-white">
            Description
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-300">
            {recommendation.description}
          </p>

        </div>

        <div className="mt-8 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6">

          <h2 className="text-xl font-semibold text-cyan-300">
            AI Suggested Action
          </h2>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-300">
            <li>Inspect the affected industrial zone immediately.</li>
            <li>Verify sensor readings before resuming operations.</li>
            <li>Notify maintenance personnel.</li>
            <li>Generate a compliance report after resolution.</li>
          </ul>

        </div>

      </div>
    </div>
  );
}