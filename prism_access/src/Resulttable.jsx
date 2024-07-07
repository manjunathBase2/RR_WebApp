import React, { useState } from 'react';

function Resulttable({ results }) {
    const [expandedCells, setExpandedCells] = useState({});

    console.log("Results in Resulttable:", results);

    // Check if results is not defined or not an array
    if (!results || !Array.isArray(results)) {
        return <p>No results found.</p>;
    }

    // Check if results array is empty
    if (results.length === 0) {
        return <p>No results found.</p>;
    }

    // Assuming results[0] exists and contains all necessary columns
    const columns = Object.keys(results[0]);

    const toggleExpand = (rowIndex, columnIndex) => {
        const cellKey = `${rowIndex}-${columnIndex}`;
        setExpandedCells(prevState => ({
            ...prevState,
            [cellKey]: !prevState[cellKey],
        }));
    };

    return (
        <div className="results-table-container">
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