
// import React from 'react';

// function Resulttable({ results }) {
//     console.log("Results in Resulttable:", results);

//     // Check if results is not defined or not an array
//     if (!results || !Array.isArray(results)) {
//         return <p>No results found.</p>;
//     }

//     // Check if results array is empty
//     if (results.length === 0) {
//         return <p>No results found.</p>;
//     }

//     // Assuming results[0] exists and contains all necessary columns
//     const columns = Object.keys(results[0]);

//     return (
//         <div className="results-table-container">
//             <table className="results-table">
//                 <thead>
//                     <tr>
//                         {columns.map((column, index) => (
//                             <th key={index}>{column}</th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {results.map((row, rowIndex) => (
//                         <tr key={rowIndex}>
//                             {columns.map((column, columnIndex) => (
//                                 <td key={columnIndex}>
//                                     {row[column] !== null ? row[column] : 'N/A'}
//                                 </td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default Resulttable;
import React from 'react';

function Resulttable({ results }) {
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
                                <td key={columnIndex}>
                                    {column === 'Source of truth' && row[column] ? (
                                        <a href={row[column]} target="_blank" rel="noopener noreferrer">
                                            {row[column]}
                                        </a>
                                    ) : (
                                        row[column] !== null ? row[column] : '-'
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
