import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function Resulttable({ results, searchInfo, selectedCountries }) {
    const [expandedCells, setExpandedCells] = useState({});

    const getTimestamp = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
    };

    const downloadXLSX = () => {
        if (!results || results.length === 0) return;

        const timestamp = getTimestamp();
        const headers = Object.keys(results[0]);

        // Create workbook
        const wb = XLSX.utils.book_new();

        // Create metadata sheet
        const wsMetadata = XLSX.utils.aoa_to_sheet([
            ['Search Information'],
            ['Search Type', searchInfo.cardType],
            ['Search Criteria', searchInfo.searchType],
            ['Search Term', searchInfo.searchQuery],
            ['Regions', selectedCountries.join(', ')],
            ['Start Date (yyyy-mm-dd)', searchInfo.startDate],
            ['End Date (yyyy-mm-dd)', searchInfo.endDate]
        ]);

        // Style metadata sheet
        const metadataRange = XLSX.utils.decode_range(wsMetadata['!ref']);
        for (let R = metadataRange.s.r; R <= metadataRange.e.r; R++) {
            for (let C = metadataRange.s.c; C <= metadataRange.e.c; C++) {
                const cellAddress = { c: C, r: R };
                const cellRef = XLSX.utils.encode_cell(cellAddress);
                if (!wsMetadata[cellRef]) continue;
                wsMetadata[cellRef].s = {
                    fill: { fgColor: { rgb: "FFF8DC" } }, // Light yellow background
                    font: { bold: true },
                    border: {
                        top: { style: "thin", color: { auto: 1 } },
                        bottom: { style: "thin", color: { auto: 1 } },
                        left: { style: "thin", color: { auto: 1 } },
                        right: { style: "thin", color: { auto: 1 } }
                    }
                };
            }
        }

        
        // Create data sheet
        const wsData = XLSX.utils.json_to_sheet(results);
        
        // Style header row
        const headerRange = XLSX.utils.decode_range(wsData['!ref']);
        for (let C = headerRange.s.c; C <= headerRange.e.c; C++) {
            const cellAddress = { c: C, r: headerRange.s.r };
            const cellRef = XLSX.utils.encode_cell(cellAddress);
            wsData[cellRef].s = {
                fill: { fgColor: { rgb: "4682B4" } }, // Steel blue background
                font: { bold: true, color: { rgb: "FFFFFF" } }, // White text
                border: {
                    top: { style: "medium", color: { auto: 1 } },
                    bottom: { style: "medium", color: { auto: 1 } },
                    left: { style: "medium", color: { auto: 1 } },
                    right: { style: "medium", color: { auto: 1 } }
                }
            };
        }
        
        // Style data rows with alternating colors
        for (let R = headerRange.s.r + 1; R <= headerRange.e.r; R++) {
            const rowColor = R % 2 === 0 ? "F0F8FF" : "FFFFFF"; // Light blue for even rows, white for odd
            for (let C = headerRange.s.c; C <= headerRange.e.c; C++) {
                const cellAddress = { c: C, r: R };
                const cellRef = XLSX.utils.encode_cell(cellAddress);
                if (!wsData[cellRef]) continue;
                wsData[cellRef].s = {
                    fill: { fgColor: { rgb: rowColor } },
                    border: {
                        top: { style: "thin", color: { auto: 1 } },
                        bottom: { style: "thin", color: { auto: 1 } },
                        left: { style: "thin", color: { auto: 1 } },
                        right: { style: "thin", color: { auto: 1 } }
                    }
                };
            }
        }
        
        // Set column widths
        const maxWidth = 50;
        const columnWidths = headers.map(header =>
            Math.min(maxWidth, Math.max(...results.map(row => row[header] ? row[header].toString().length : 0), header.length))
        );
        wsData['!cols'] = columnWidths.map(width => ({ width }));
        
        // Add data sheet to workbook
        XLSX.utils.book_append_sheet(wb, wsData, "Results");

        // Add metadata sheet to workbook
        XLSX.utils.book_append_sheet(wb, wsMetadata, "Search Metadata");
        
        // Generate file
        XLSX.writeFile(wb, `results_${timestamp}.xlsx`);
    };

    const downloadDOC = () => {
        if (!results || results.length === 0) return;

        const timestamp = getTimestamp();
        const headers = Object.keys(results[0]);
        const searchInfoTable = `
            <table style="border-collapse: collapse; margin-bottom: 20px;">
                <tr><td style="border: 1px solid black; padding: 2px;">Search Type</td><td style="border: 1px solid black; padding: 2px;">${searchInfo.cardType}</td></tr>
                <tr><td style="border: 1px solid black; padding: 2px;">Search Criteria</td><td style="border: 1px solid black; padding: 2px;">${searchInfo.searchType}</td></tr>
                <tr><td style="border: 1px solid black; padding: 2px;">Search Term</td><td style="border: 1px solid black; padding: 2px;">${searchInfo.searchQuery}</td></tr>
                <tr><td style="border: 1px solid black; padding: 2px;">Regions</td><td style="border: 1px solid black; padding: 2px;">${selectedCountries.join(', ')}</td></tr>
                <tr><td style="border: 1px solid black; padding: 2px;">Start Date (yyyy-mm-dd)</td><td style="border: 1px solid black; padding: 2px;">${searchInfo.startDate}</td></tr>
                <tr><td style="border: 1px solid black; padding: 2px;">End Date (yyyy-mm-dd)</td><td style="border: 1px solid black; padding: 2px;">${searchInfo.endDate}</td></tr>
            </table>
        `;

        const tableHeaders = headers.map(header => `<td style="border: 1px solid black; padding: 2px;">${header}</td>`).join('');
        const tableRows = results.map(row => {
            const cells = headers.map(header => `<td style="border: 1px solid black; padding: 2px;">${row[header] !== null ? row[header] : '-'}</td>`).join('');
            return `<tr>${cells}</tr>`;
        }).join('');

        const htmlContent = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
            <head><meta charset="utf-8"></head>
            <body>
                <style>
                    @page {
                        size: landscape;
                        margin: 1cm 0.5cm 1cm 1.5cm; /* Top, right, bottom, left */
                    }
                    body {
                        margin: 0;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        font-size: 5px;
                        margin-left: 0.5cm;
                    }
                    td, th {
                        border: 1px solid black;
                        padding: 2px;
                        text-align: left;
                    }
                </style>
                ${searchInfoTable}
                <table>
                    <thead>
                        <tr>${tableHeaders}</tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </body>
            </html>
        `;

        const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `results_${timestamp}.doc`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const toggleExpand = (rowIndex, columnIndex) => {
        const cellKey = `${rowIndex}-${columnIndex}`;
        setExpandedCells(prevState => ({
            ...prevState,
            [cellKey]: !prevState[cellKey],
        }));
    };

    if (!results || !Array.isArray(results) || results.length === 0) {
        return <p>No results found.</p>;
    }

    const columns = Object.keys(results[0]);

    return (
        <div className="results-table-container">
            <div>
                <button onClick={downloadXLSX} className="download-button">
                    Download Excel <i className="fa fa-download"></i>
                </button>
                <button onClick={downloadDOC} className="download-button">
                    Download DOC <i className="fa fa-download"></i>
                </button>
            </div>
            <table className="results-table">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {results.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, columnIndex) => (
                                <td
                                    key={columnIndex}
                                    className={`table-cell ${expandedCells[`${rowIndex}-${columnIndex}`] ? 'expanded' : ''}`}
                                    onClick={() => toggleExpand(rowIndex, columnIndex)}
                                >
                                    {column === 'Source of truth' && row[column] ? (
                                        <a href={row[column]} target="_blank" rel="noopener noreferrer">
                                            {row[column]}
                                        </a>
                                    ) : (
                                        <>
                                            <span className="ellipsis-text">{row[column] !== null ? row[column] : '-'}</span>
                                            <span className="full-text">{row[column] !== null ? row[column] : '-'}</span>
                                        </>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Resulttable;