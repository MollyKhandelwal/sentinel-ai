"use client";

import { useEffect, useState } from "react";

import {
  generatePDF,
  generateExcel,
  generateCSV,
} from "@/lib/report-generator";

import {
  FileText,
  Download,
  Eye,
  FileSpreadsheet,
  FileArchive,
  BarChart3,
  Clock3,
} from "lucide-react";

type Report = {
  id: string;
  name: string;
  type: string;
  generated: string;
  status: string;
};

const stats = [
  {
    title: "Reports Generated",
    value: "156",
    color: "text-cyan-400",
    icon: FileText,
  },
  {
    title: "Scheduled Reports",
    value: "12",
    color: "text-emerald-400",
    icon: Clock3,
  },
  {
    title: "Downloads Today",
    value: "48",
    color: "text-blue-400",
    icon: Download,
  },
  {
    title: "Storage Used",
    value: "2.8 GB",
    color: "text-yellow-400",
    icon: BarChart3,
  },
];

export default function ReportsCenter() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReports() {
      try {
        const res = await fetch("/api/reports");
        const data = await res.json();

        console.log("Reports API:", data);

        setReports(data.reports || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  return (
    <div className="space-y-8">

      {/* KPI Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl transition hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-400">
                    {item.title}
                  </p>

                  <h2 className={`mt-3 text-4xl font-bold ${item.color}`}>
                    {item.value}
                  </h2>
                </div>

                <div className="rounded-xl bg-slate-800 p-3">
                  <Icon className={`h-6 w-6 ${item.color}`} />
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Reports */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">

        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          RECENT REPORTS
        </p>

        <h2 className="mt-2 text-3xl font-bold text-white">
          Generated Reports
        </h2>

        <div className="mt-8 space-y-4">

          {loading && (
            <p className="text-slate-400">
              Loading reports...
            </p>
          )}

          {!loading &&
            reports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
              />
            ))}

        </div>

      </div>

      {/* Generate */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">

        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          GENERATE
        </p>

        <h2 className="mt-3 text-3xl font-bold text-white">
          Generate New Report
        </h2>

        <p className="mt-2 text-slate-400">
          Export industrial analytics in multiple formats.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">

          <button
            onClick={generatePDF}
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
          >
            <FileText size={18} />
            Generate PDF
          </button>

          <button
            onClick={generateExcel}
            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
          >
            <FileSpreadsheet size={18} />
            Generate Excel
          </button>

          <button
            onClick={generateCSV}
            className="flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3 font-semibold text-black transition hover:bg-blue-400"
          >
            <FileArchive size={18} />
            Generate CSV
          </button>

        </div>

      </div>

    </div>
  );
}

function ReportCard({
  report,
}: {
  report: {
    id?: string;
    name: string;
    type: string;
    generated: string;
    status: string;
  };
}) {
  const badge =
    report.status === "Completed"
      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
      : report.status === "Processing"
      ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
      : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 transition hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-cyan-500/10 p-3">
            <FileText className="h-6 w-6 text-cyan-400" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              {report.name}
            </h3>

            <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-400">
              <span>📁 {report.type}</span>
              <span>🕒 {report.generated}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${badge}`}
          >
            {report.status}
          </span>

          <button
            onClick={() => alert(`Preview: ${report.name}`)}
            className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-slate-300 transition hover:border-cyan-500 hover:text-cyan-400"
          >
            <Eye size={18} />
            Preview
          </button>

          <button
            onClick={generatePDF}
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-black transition hover:bg-cyan-400"
          >
            <Download size={18} />
            Download
          </button>
        </div>

      </div>
    </div>
  );
}