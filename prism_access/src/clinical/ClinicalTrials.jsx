/* ==========================================================================

File: ClinicalTrials.jsx

Description:
 This component renders the ClinicalTrials interface, allowing users to search for clinical trials based on specific criteria.
 It displays the search results in a table format and provides an option to download the results as a CSV file.

Features:
 - Renders the ClinicalTrials component with a header and footer.
 - Allows users to select search criteria and enter a search term.
 - Fetches and displays search results from a backend API.
 - Provides an option to download the search results as a CSV file.
 - Allows users to expand and collapse table cells for detailed view.

Instructions:
 1. Select a search criterion from the dropdown menu.
 2. Enter a search term in the input field.
 3. Click the "Launch Search" button to fetch and display the results.
 4. Click on table cells to expand or collapse their content.
 5. Use the "Download CSV" button to download the search results as a CSV file.

 ========================================================================= */

import React, { useState } from 'react';
import Header2 from './Header2';
import Footer from '../Footer';
import axios from 'axios';
import '../index.css';
import Roche_logo from '../assets/Roche_Logo.png';

function ClinicalTrials() {
    const [columnName, setColumnName] = useState('NCT Number');
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
                // `/studies/`,
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
