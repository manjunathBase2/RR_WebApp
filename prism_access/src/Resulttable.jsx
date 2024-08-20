import React, { useState } from 'react';

function Resulttable({ results }) {
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

    const downloadCSV = () => {
        if (!results || results.length === 0) return;

        const timestamp = getTimestamp();
        const csvRows = [];
        const headers = Object.keys(results[0]);
        csvRows.push(headers.join(','));

        for (const row of results) {
            const values = headers.map(header => {
                const value = row[header];
                return value ? `"${String(value).replace(/"/g, '""')}"` : '';
            });
            csvRows.push(values.join(','));
        }

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `results_${timestamp}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const downloadDOC = () => {
        if (!results || results.length === 0) return;

        const timestamp = getTimestamp();
        const headers = Object.keys(results[0]);

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
            <button onClick={downloadCSV} className="download-button">
                Download CSV <i className="fa fa-download"></i>
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
