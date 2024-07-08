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

    const handleFilter = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/clinical/`, {
                column_name: columnName,
                search_term: searchTerm
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
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
                {/* <img src={Roche_logo} className="logo" alt="Logo" /> */}
                <Header2 />
                <nav>
                    <ul>
                        <li><a className="navigation-link" href="./..">R&R Data</a></li>
                    </ul>
                </nav>
            </div>
            <div className="search-container card-container clinical-search">
                <select className="search-container-child" value={columnName} onChange={e => setColumnName(e.target.value)}>
                    <option value="">Select Criteria</option>
                    <option value="NCT Number">NCT Number</option>
                    <option value="Phases">Phases</option>
                    <option value="Study Title">Study Title</option>
                </select>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Enter search term"
                />
                <button className="search-container-child" onClick={handleFilter}>Search</button>
            </div>
            <div className="results--container">
                {results.length > 0 ? (
                    <div className="results-table-container clinical-table-container">
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
                    <p></p>
                )}
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default ClinicalTrials;
