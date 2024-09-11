import React, { useState } from 'react';
import Header2 from './Header2';
import Footer from '../Footer';
import axios from 'axios';
import '../index.css';
import Roche_logo from '../assets/Roche_Logo.png';

function ClinicalTrials() {
    const [columnName, setColumnName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [expandedCells, setExpandedCells] = useState({});
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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

    // const downloadDOC = () => {
    //     if (!results || results.length === 0) return;

    //     const timestamp = getTimestamp();
    //     const headers = Object.keys(results[0]);

    //     const tableHeaders = headers.map(header => `<td style="border: 1px solid black; padding: 2px;">${header}</td>`).join('');
    //     const tableRows = results.map(row => {
    //         const cells = headers.map(header => `<td style="border: 1px solid black; padding: 2px;">${row[header] !== null ? row[header] : '-'}</td>`).join('');
    //         return `<tr>${cells}</tr>`;
    //     }).join('');

    //     const htmlContent = `
    //         <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
    //         <head><meta charset="utf-8"></head>
    //         <body>
    //             <style>
    //                 @page {
    //                     size: landscape;
    //                     margin: 1cm 0.5cm 1cm 1.5cm; /* Top, right, bottom, left */
    //                 }
    //                 body {
    //                     margin: 0;
    //                 }
    //                 table {
    //                     width: 100%;
    //                     border-collapse: collapse;
    //                     font-size: 5px;
    //                     margin-left: 0.5cm;
    //                 }
    //                 td, th {
    //                     border: 1px solid black;
    //                     padding: 2px;
    //                     text-align: left;
    //                 }
    //             </style>
    //             <table>
    //                 <thead>
    //                     <tr>${tableHeaders}</tr>
    //                 </thead>
    //                 <tbody>
    //                     ${tableRows}
    //                 </tbody>
    //             </table>
    //         </body>
    //         </html>
    //     `;

    //     const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
    //     const url = URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = `results_${timestamp}.doc`;
    //     document.body.appendChild(a);
    //     a.click();
    //     document.body.removeChild(a);
    // };

    const handleFilter = async () => {
        if (!columnName || !searchTerm) {
            alert('Please provide both search criteria and search term.');
            return;
        }
        setErrorMessage('');
        setLoading(true);
        try {
            const response = await axios.post(
                `http://localhost:5000/studies`,
                // `http://10.146.71.0:5000/studies/`,
                // `/studies/`,
                // `https://rr-backend-m7hi.onrender.com/studies/`,
                // 'https://drug-reimbursement-regulatory-status.roche.com/443/studies/',
                {
                    column_name: columnName,
                    search_term: searchTerm
                }
            );
            setResults(response.data);
            if (response.data.length === 0) {
                setErrorMessage('No results found.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to fetch results. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const toggleExpandCell = (rowIndex, cellIndex) => {
        const key = `${rowIndex}-${cellIndex}`;
        setExpandedCells(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div className='clinical-container'>
            <div className="header-container">
                <img src={Roche_logo} className="logo" alt="Logo" />
                <Header2 />
                <nav>
                    <ul>
                        <li><a className="navigation-link" href="./..">R&R Data</a></li>
                    </ul>
                </nav>
            </div>
            <div className="search-container card-container clinical-search">
                <div>
                    <label>Select Criteria:</label>
                    <select className="searchbar-dropdown-clinical" value={columnName} onChange={e => setColumnName(e.target.value)}>
                        <option value="NCT Number">NCT Number</option>
                        <option value="Phases">Phases</option>
                        <option value="Study Title">Study Title</option>
                        <option value="Study Title">Drug Name</option>
                    </select>

                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Enter search term"
                />
                <button
                    className="search-container-child"
                    onClick={handleFilter}
                    disabled={loading}
                >
                    {loading ? "Searching..." : "Launch Search"}
                </button>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className="results--container">
                {results.length > 0 ? (
                    <div className="results-table-container clinical-table-container">
                        <div>
                            <button onClick={downloadCSV} className="download-button">
                                Download CSV <i className="fa fa-download"></i>
                            </button>
                            {/* <button onClick={downloadDOC} className="download-button">
                                Download DOC <i className="fa fa-download"></i>
                            </button> */}
                        </div>
                        <table className="results-table">
                            <thead>
                                <tr>
                                    {Object.keys(results[0]).map(key => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {Object.values(row).map((value, cellIndex) => (
                                            <td
                                                key={cellIndex}
                                                className={expandedCells[`${rowIndex}-${cellIndex}`] ? 'expanded' : ''}
                                                onClick={() => toggleExpandCell(rowIndex, cellIndex)}
                                            >
                                                {value}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    !loading && <p> </p>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default ClinicalTrials;
