import { TableField } from "../types";

function convertToCSV(fields: TableField[], data: any) {
  const csvRows = [];

  // Add header row
  const headers = fields.map((field) => field.label);
  csvRows.push(headers.join(","));

  // Add data rows
  data.forEach((item: any) => {
    const row = fields.map((field) => {
      const value = item[field.value];
      return typeof value === "object"
        ? `"${value?.length ? value[0] : ""}"`
        : value;
    });
    csvRows.push(row.join(","));
  });

  return csvRows.join("\n");
}

export const downloadCSV = (fields: TableField[], data: any) => {
  const csvData = convertToCSV(fields, data);
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "table_data.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
