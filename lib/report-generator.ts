import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const reportData = [
  {
    Report: "Plant Health Report",
    Type: "Daily",
    Status: "Completed",
    Generated: "Today",
  },
  {
    Report: "Safety Audit",
    Type: "Weekly",
    Status: "Completed",
    Generated: "Today",
  },
  {
    Report: "Incident Summary",
    Type: "Emergency",
    Status: "Processing",
    Generated: "Now",
  },
  {
    Report: "Sensor Performance",
    Type: "Monthly",
    Status: "Scheduled",
    Generated: "Tomorrow",
  },
  {
    Report: "Energy Consumption",
    Type: "Daily",
    Status: "Completed",
    Generated: "Today",
  },
];

export function generatePDF() {
  const pdf = new jsPDF();

  pdf.setFontSize(22);
  pdf.text("Sentinel AI", 20, 20);

  pdf.setFontSize(16);
  pdf.text("Industrial Safety Report", 20, 32);

  pdf.setFontSize(11);

  let y = 50;

  reportData.forEach((item, index) => {
    pdf.text(
      `${index + 1}. ${item.Report} | ${item.Type} | ${item.Status}`,
      20,
      y
    );

    y += 10;
  });

  pdf.save("Sentinel_Report.pdf");
}

export function generateExcel() {
  const worksheet = XLSX.utils.json_to_sheet(reportData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Reports"
  );

  XLSX.writeFile(workbook, "Sentinel_Report.xlsx");
}

export function generateCSV() {
  const worksheet = XLSX.utils.json_to_sheet(reportData);

  const csv = XLSX.utils.sheet_to_csv(worksheet);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, "Sentinel_Report.csv");
}