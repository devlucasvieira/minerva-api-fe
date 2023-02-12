const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const PDF_EXTENSION = '.pdf';

export const useExport = () => {

    const exportPdf = (data: { [key: string]: string }[], fileName: string) => {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then((autoTable) => {
                const doc = new jsPDF.default();
                autoTable.default(doc, {
                    body: data.map(o => Object.values(o)),
                    head: [Object.keys(data[0])],
                });
                doc.save(fileName + PDF_EXTENSION);
            })
        })
    }

    const exportExcel = (data: { [key: string]: string }[], fileName: string) => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(data);
            const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
            const excelBuffer = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
            saveExcelAsFile(excelBuffer, fileName);
        });
    }

    const saveExcelAsFile = (buffer: any, fileName: string) => {
        import('file-saver').then(module => {
            if (module && module.default) {
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + EXCEL_EXTENSION);
            }
        });
    }

    return {exportExcel, exportPdf};
};