import * as exceljs from 'exceljs'

class XSLXService {
    private workbook: exceljs.Workbook

    constructor() {
        this.workbook = new exceljs.Workbook()
        this.workbook.creator = 'Scholarship Management System'
        this.workbook.created = new Date()
        this.workbook.modified = new Date()

        this.workbook.views = [
            {
                x: 0,
                y: 0,
                width: 100,
                height: 200,
                firstSheet: 0,
                activeTab: 0,
                visibility: 'visible',
            },
        ]
    }

    /**
     * Creates a new sheet with hierarchical header structure for nested objects
     */
    public async createSheet<T extends object>(sheetName: string, data: T[], addTotalsRow: boolean = false, styleOptions?: {
        headerColor?: string;
        headerFontColor?: string;
        alternateRowColor?: string;
        borderStyle?: boolean;
        nestedHeaderColor?: string;
    }) {
        const worksheet = this.workbook.addWorksheet(sheetName)

        // Configure default styling options
        const options = {
            headerColor: styleOptions?.headerColor || '4167B8',
            headerFontColor: styleOptions?.headerFontColor || 'FFFFFF',
            alternateRowColor: styleOptions?.alternateRowColor || 'F2F2F2',
            borderStyle: styleOptions?.borderStyle !== undefined ? styleOptions.borderStyle : true,
            nestedHeaderColor: styleOptions?.nestedHeaderColor || '6C8EBF',
        }

        if (data.length === 0) {
            return
        }

        // Create hierarchical headers and track the flattened structure
        const { headers, flattenedColumns } = this.createHierarchicalHeaders(data[0])

        // Apply the hierarchical headers to the worksheet
        this.applyHierarchicalHeaders(worksheet, headers, options)

        // Calculate the header depth (number of header rows)
        const headerDepth = this.calculateHeaderDepth(headers)

        // Freeze panes at the appropriate row based on header depth
        worksheet.views = [
            { state: 'frozen', xSplit: 0, ySplit: 2, activeCell: `A${headerDepth + 1}` }
        ]

        // Define column structure with properly flattened keys
        worksheet.columns = flattenedColumns.map(col => ({
            key: col.key, // Usamos la key completa (incluyendo path para nested objects)
            width: this.calculateColumnWidth(col.key, data, col.path),
        }))

        // Add data rows with flattened objects
        const flattenedData = data.map(item => this.flattenObject(item))

        // Add each flattened data row
        let rowIndex = headerDepth + 1
        flattenedData.forEach((item) => {
            const row = worksheet.addRow(item)
            row.height = 20

            // Apply alternating row colors
            if (options.alternateRowColor && (rowIndex - headerDepth) % 2 === 0) {
                row.eachCell((cell) => {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: options.alternateRowColor },
                    }
                })
            }

            // Apply cell styles
            row.eachCell((cell) => {
                cell.alignment = {
                    vertical: 'middle',
                    horizontal: this.getAlignmentForType(cell.value),
                }

                // Apply borders if enabled
                if (options.borderStyle) {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    }
                }

                // Format dates properly
                if (cell.value instanceof Date) {
                    cell.numFmt = 'dd/mm/yyyy'
                }

                // Format numbers
                if (typeof cell.value === 'number' && !Number.isInteger(cell.value)) {
                    cell.numFmt = '0.00'
                }
            })

            rowIndex++
        })

        // Add totals row if data contains numbers
        if (addTotalsRow === true)
            this.addTotalsRowIfApplicable(worksheet, flattenedData, flattenedColumns);


        // Auto-filter for all data
        worksheet.autoFilter = {
            from: { row: headerDepth, column: 1 },
            to: { row: flattenedData.length + headerDepth, column: flattenedColumns.length }
        }
    }

    /**
     * Creates hierarchical headers structure from an object
     */
    private createHierarchicalHeaders(obj: object): {
        headers: Array<{
            title: string;
            colspan?: number;
            children?: Array<{
                title: string;
                key: string;
            }>;
            key?: string;
        }>;
        flattenedColumns: Array<{
            header: string;
            key: string;
            path: string;
        }>;
    } {
        const headers: Array<{
            title: string;
            colspan?: number;
            children?: Array<{
                title: string;
                key: string;
            }>;
            key?: string;
        }> = [];
        const flattenedColumns: Array<{
            header: string;
            key: string;
            path: string;
        }> = [];

        for (const [key, value] of Object.entries(obj)) {
            if (value !== null && typeof value === 'object' && !(value instanceof Date) && !Array.isArray(value)) {
                // Es un objeto anidado
                const nestedKeys = Object.keys(value);
                const childHeaders: Array<{ title: string; key: string }> = [];

                // Crear headers hijos
                for (const nestedKey of nestedKeys) {
                    const flatKey = `${key}.${nestedKey}`;
                    childHeaders.push({
                        title: this.formatHeaderText(nestedKey),
                        key: flatKey,
                    });

                    // Añadir a columnas aplanadas
                    flattenedColumns.push({
                        header: nestedKey,
                        key: flatKey,
                        path: flatKey,
                    });
                }

                // Añadir header principal con SU NOMBRE ORIGINAL (key)
                headers.push({
                    title: this.formatHeaderText(key), // <-- Aquí usamos el nombre del objeto padre
                    colspan: nestedKeys.length,
                    children: childHeaders
                });
            } else {
                // Es una propiedad simple
                headers.push({
                    title: this.formatHeaderText(key),
                    key: key,
                });

                // Añadir a columnas aplanadas
                flattenedColumns.push({
                    header: key,
                    key: key,
                    path: key,
                });
            }
        }

        return { headers, flattenedColumns };
    }

    /**
     * Calculates the maximum depth of the hierarchical headers
     */
    private calculateHeaderDepth(headers: Array<{
        title: string;
        colspan?: number;
        children?: Array<{
            title: string;
            key: string;
        }>;
        key?: string;
    }>): number {
        let maxDepth = 1; // Start with minimum depth of 1

        for (const header of headers) {
            if (header.children && header.children.length > 0) {
                // This header has children, so its depth is at least 2
                maxDepth = Math.max(maxDepth, 2);
            }
        }

        return maxDepth;
    }

    /**
     * Applies hierarchical headers to the worksheet
     */
    private applyHierarchicalHeaders(
        worksheet: exceljs.Worksheet,
        headers: Array<{
            title: string;
            colspan?: number;
            children?: Array<{ title: string; key: string }>;
            key?: string;
        }>,
        options: {
            headerColor: string;
            headerFontColor: string;
            nestedHeaderColor: string;
            borderStyle: boolean;
        }
    ) {
        // Create the top-level header row
        const topHeaderRow = worksheet.getRow(1);
        topHeaderRow.height = 24;

        let colIndex = 1;

        // Process each top-level header
        for (const header of headers) {
            const cell = topHeaderRow.getCell(colIndex);
            cell.value = header.title;

            // Apply style to top-level header
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: options.headerColor },
            };
            cell.font = {
                bold: true,
                color: { argb: options.headerFontColor },
                size: 12,
            };
            cell.alignment = {
                vertical: 'middle',
                horizontal: 'center',
            };

            if (options.borderStyle) {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
            }

            // If this header has children, merge cells and create subheaders
            if (header.children && header.children.length > 0) {
                const colspan = header.colspan || header.children.length;

                // Merge the top-level cells if there's more than one child
                if (colspan > 1) {
                    worksheet.mergeCells(1, colIndex, 1, colIndex + colspan - 1);
                }

                // Create subheader row and cells
                const subHeaderRow = worksheet.getRow(2);
                subHeaderRow.height = 22;

                // Add each child header
                header.children.forEach((child, i) => {
                    const subCell = subHeaderRow.getCell(colIndex + i);
                    subCell.value = child.title;

                    // Apply style to sub-level header
                    subCell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: options.nestedHeaderColor },
                    };
                    subCell.font = {
                        bold: true,
                        color: { argb: options.headerFontColor },
                        size: 11,
                    };
                    subCell.alignment = {
                        vertical: 'middle',
                        horizontal: 'center',
                    };

                    if (options.borderStyle) {
                        subCell.border = {
                            top: { style: 'thin' },
                            left: { style: 'thin' },
                            bottom: { style: 'thin' },
                            right: { style: 'thin' },
                        };
                    }
                });

                colIndex += colspan;
            } else {
                // For regular headers, merge vertically across two rows
                worksheet.mergeCells(1, colIndex, 2, colIndex);
                colIndex++;
            }
        }
    }

    /**
     * Flattens nested objects for data rows
     */
    private flattenObject(obj: object, prefix = ''): Record<string, unknown> {
        const result: Record<string, unknown> = {};

        for (const [key, value] of Object.entries(obj)) {
            const newKey = prefix ? `${prefix}.${key}` : key;

            if (value !== null && typeof value === 'object' && !(value instanceof Date) && !Array.isArray(value)) {
                // Recursively flatten nested objects
                Object.assign(result, this.flattenObject(value as Record<string, unknown>, newKey));
            } else {
                result[newKey] = value;
            }
        }

        return result;
    }

    private formatHeaderText(text: string): string {
        return text
            .replace(/([A-Z])/g, ' $1') // Insert a space before capitals in camelCase
            .replace(/_/g, ' ')          // Replace underscores with spaces
            .replace(/^\w/, (c) => c.toUpperCase()) // Capitalize first letter
            .replace(/\s\w/g, (match) => match.toUpperCase()) // Capitalize first letter of each word
            .trim();
    }

    private calculateColumnWidth(key: string, data: object[], path: string): number {
        // Asegurarnos que path sea siempre string
        const safePath = typeof path === 'string' ? path : key;

        // Obtener el nombre de la columna para el cálculo del ancho
        const headerParts = safePath.split('.');
        const headerText = this.formatHeaderText(headerParts[headerParts.length - 1]);
        const headerLength = headerText.length;

        // Calcular el ancho máximo del contenido
        let maxContentLength = 0;
        data.forEach(item => {
            try {
                const value = this.getNestedValue(item, safePath);
                if (value !== null && value !== undefined) {
                    const contentLength = String(value).length;
                    maxContentLength = Math.max(maxContentLength, contentLength);
                }
            } catch (e) {
                console.warn(`Error processing path ${safePath}:`, e);
            }
        });

        // Calcular el ancho final con límites
        const width = Math.max(headerLength, maxContentLength) + 2;
        return Math.min(Math.max(width, 10), 50);
    }

    private getNestedValue(obj: object, path: string): unknown {
        if (!path || typeof path !== 'string') return undefined;

        return path.split('.').reduce((acc: unknown, part: string) => {
            if (acc && typeof acc === 'object' && !Array.isArray(acc) && part in (acc as Record<string, unknown>)) {
                return (acc as Record<string, unknown>)[part];
            }
            return undefined;
        }, obj);
    }

    private getAlignmentForType(value: unknown): exceljs.Alignment['horizontal'] {
        if (typeof value === 'number') {
            return 'right';
        } else if (value instanceof Date) {
            return 'center';
        } else if (typeof value === 'boolean') {
            return 'center';
        }
        return 'left';
    }

    private addTotalsRowIfApplicable(
        worksheet: exceljs.Worksheet,
        data: Record<string, unknown>[],
        flattenedColumns: Array<{ key: string }>
    ): void {
        if (data.length === 0) return;

        const numericColumns: string[] = [];

        // Identify columns with numeric values
        flattenedColumns.forEach(col => {
            // Check if at least half of the values in this column are numbers
            const numericCount = data.filter(row => typeof row[col.key] === 'number').length;
            if (numericCount > data.length / 2) {
                numericColumns.push(col.key);
            }
        });

        // If we have numeric columns, add a totals row
        if (numericColumns.length > 0) {
            const headerDepth = worksheet.getRow(1).height > 0 && worksheet.getRow(2).height > 0 ? 2 : 1;
            const totalRowIndex = data.length + headerDepth + 1;
            const totalRow = worksheet.getRow(totalRowIndex);

            // Add "Totals" label in the first column
            totalRow.getCell(1).value = 'TOTALES';
            totalRow.getCell(1).font = { bold: true };

            // Add sum formulas for numeric columns
            numericColumns.forEach(column => {
                const colIndex = flattenedColumns.findIndex(col => col.key === column) + 1;
                if (colIndex > 0) {
                    const cellRef = totalRow.getCell(colIndex);
                    const startRow = headerDepth + 1;
                    const endRow = data.length + headerDepth;

                    // Create SUM formula
                    cellRef.value = {
                        formula: `SUM(${worksheet.getColumn(colIndex).letter}${startRow}:${worksheet.getColumn(colIndex).letter}${endRow})`,
                        date1904: false
                    };

                    // Style the totals
                    cellRef.font = { bold: true };
                    cellRef.numFmt = '0.00';
                }
            });

            // Style the totals row
            totalRow.height = 22;
            totalRow.eachCell(cell => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'E6E6E6' }, // Light gray
                };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'double' },
                    right: { style: 'thin' },
                };
            });
        }
    }

    public async saveToFile(fileName: string) {
        const buffer = await this.workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    public async exportToExcel<T extends object>(
        sheetName: string,
        data: T[],
        fileName: string,
        styleOptions?: {
            headerColor?: string;
            headerFontColor?: string;
            alternateRowColor?: string;
            borderStyle?: boolean;
            nestedHeaderColor?: string;
        }
    ) {
        await this.createSheet(sheetName, data, true, styleOptions);
        await this.saveToFile(fileName);
    }

    public async exportMultipleSheets(
        sheets: Array<{
            name: string;
            data: object[];
            styleOptions?: {
                headerColor?: string;
                headerFontColor?: string;
                alternateRowColor?: string;
                borderStyle?: boolean;
                nestedHeaderColor?: string;
            }
        }>,
        fileName: string
    ) {
        // Clear first to ensure we're working with a fresh workbook
        await this.clearWorkbook();

        // Create each sheet
        for (const sheet of sheets) {
            await this.createSheet(sheet.name, sheet.data, true, sheet.styleOptions);
        }

        // Save the multi-sheet workbook
        await this.saveToFile(fileName);
    }

    public async clearWorkbook() {
        this.workbook = new exceljs.Workbook();
        this.workbook.creator = 'Scholarship Management System';
        this.workbook.created = new Date();
        this.workbook.modified = new Date();

        this.workbook.views = [
            {
                x: 0,
                y: 0,
                width: 100,
                height: 200,
                firstSheet: 0,
                activeTab: 0,
                visibility: 'visible',
            },
        ];
    }
}

export default XSLXService