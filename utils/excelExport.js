import * as XLSX from 'xlsx';

export const exportToExcel = (data, fileName = 'clearpost_booking.xlsx') => {
    // Flatten data for easier reading in Excel
    const flatData = {
        ...data,
        files: data.files ? data.files.map(f => f.name).join(', ') : 'None',
        items: data.items ? JSON.stringify(data.items) : 'N/A'
    };

    const worksheet = XLSX.utils.json_to_sheet([flatData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Booking Data");

    XLSX.writeFile(workbook, fileName);
};
