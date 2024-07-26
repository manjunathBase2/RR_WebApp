import React, { useState } from 'react';

function Resulttable({ results }) {
    const [expandedCells, setExpandedCells] = useState({});

    const downloadCSV = () => {
        if (!results || results.length === 0) return;

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
        a.download = 'results.csv';
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
            <button onClick={downloadCSV} className="download-button">
                Download <i class="fa fa-download"></i>
            </button>
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
