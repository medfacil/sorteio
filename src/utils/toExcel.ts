import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface ExportData {
  [key: string]: string | number | Date;
}

export function exportToExcel(data: ExportData[], filename: string): void {
  // Cria uma nova planilha
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Cria o buffer do Excel
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // Salva o arquivo
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), filename);
}