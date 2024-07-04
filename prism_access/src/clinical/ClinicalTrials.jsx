// ClinicalTrials.jsx
import React, { useState } from 'react';
import Header2 from './Header2';
import Footer from '../Footer';
import axios from 'axios';
import '../index.css';
import Roche_logo from '../assets/Roche_Logo.png';

function ClinicalTrials()  {
    const [columnName, setColumnName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    const handleFilter = async () => {
        try {
            const response = await axios.post('http://localhost:5000/clinical/', {
                column_name: columnName,
                search_term: searchTerm
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
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
            <div className="search-container card-container">
                <select className= "search-container-child" value={columnName} onChange={e => setColumnName(e.target.value)}>
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
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(results[0]).map(key => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, idx) => (
                                        <td key={idx}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>This page is under development.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ClinicalTrials;
