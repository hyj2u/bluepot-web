import { useCallback } from "react";
import * as XLSX from "xlsx";

// Type for the function parameters
type UseExportToExcel = () => (
  tableRef: React.RefObject<HTMLTableElement>,
  fileName?: string
) => void;

const useExportToExcel: UseExportToExcel = () => {
  const exportToExcel = useCallback(
    (
      tableRef: React.RefObject<HTMLTableElement>,
      fileName: string = "table.xlsx"
    ) => {
      if (!tableRef.current) {
        console.warn("Table reference is not provided or invalid");
        return;
      }

      const worksheet = XLSX.utils.table_to_sheet(tableRef.current); // Create sheet from current table reference
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1"); // Add sheet to new workbook

      XLSX.writeFile(workbook, fileName);
    },
    []
  );

  return exportToExcel;
};

export default useExportToExcel;
