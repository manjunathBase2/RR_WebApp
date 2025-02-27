/* ==========================================================================

File: App.jsx
Description: This file defines the main component of the application. It contains the header, cards, search bar, visualizations, and results table components. It also contains the state and functions to manage the selected countries and results.

IMPORTANT: This file contains the main component of the application. It is the root component of the application and is responsible for managing the state and rendering the other components.
This file is part of the core functionality of the application. Making changes to this file can cause the application to fail or not work as expected
-- DO NOT DELETE THIS FILE --

========================================================================== */


import React, { useState, useEffect } from 'react';
import Header from "./Header.jsx";
import Card from "./Card.jsx";
import Card2 from "./Card2.jsx";
import Searchbar from './Searchbar.jsx';
import Resulttable from './Resulttable.jsx';
import Footer from './Footer.jsx';
import Roche_logo from "./assets/Roche_Logo.png";

function App() {
    const [selectedCountriesMA, setSelectedCountriesMA] = useState([]);
    const [selectedCountriesReimbursement, setSelectedCountriesReimbursement] = useState([]);
    const [cardType, setCardType] = useState(null);
    const [results, setResults] = useState([]);
    const [visualization1, setVisualization1] = useState('');
    const [visualization2, setVisualization2] = useState('');
    const [searchInfo, setSearchInfo] = useState(null);

    const handleMASelection = (countries) => {
        setSelectedCountriesMA(countries);
        setSelectedCountriesReimbursement([]); // Clear Reimbursement selections
        setCardType("MA");
    };

    const handleReimbursementSelection = (countries) => {
        setSelectedCountriesReimbursement(countries);
        setSelectedCountriesMA([]); // Clear MA selections
        setCardType("Reimbursement");
    };

    const handleResultsFetched = (data) => {
        console.log("Data fetched:", data);
        setResults(data.results);
        setVisualization1(data.visualization1);
        setVisualization2(data.visualization2);
        setSearchInfo(data.searchInfo);
    };

    useEffect(() => {
        console.log("Results state updated:", results);  // Log state update for results
    }, [results]);

    const selectedCountries = [...new Set([...selectedCountriesMA, ...selectedCountriesReimbursement])];

    return (
        <>
            <div className="container">
                <div className="header-container">
                    <img src={Roche_logo} className="logo" alt="Logo" />
                    <Header />
                    <nav>
                        <ul>
                            <li><a className="navigation-link" href="./clinical/">Clinical Trials</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="cards-wrapper">
                    <Card
                        selectedCountries={selectedCountriesMA}
                        setSelectedCountries={handleMASelection}
                        cardType={cardType}
                        setCardType={setCardType}
                    />
                    <Card2
                        selectedCountries={selectedCountriesReimbursement}
                        setSelectedCountries={handleReimbursementSelection}
                        cardType={cardType}
                        setCardType={setCardType}
                    />
                </div>
                <div className='search'>
                    <Searchbar
                        selectedCountries={selectedCountries}
                        cardType={cardType}
                        onResultsFetched={handleResultsFetched}
                    />
                </div>
                <>
                    {(visualization1 || visualization2) && (
                        <div className="visualizations-container">
                            <div className="visualization.donut-chart ">
                                {visualization1 && (
                                    <div>
                                        <img src={`data:image/png;base64,${visualization1}`} alt="Donut Chart" />
                                    </div>
                                )}
                            </div>
                            <div className="visualization.bar-chart">
                                {visualization2 && (
                                    <div>
                                        <img src={`data:image/png;base64,${visualization2}`} alt="Bar Graph" />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </>
                <div className='results'>
                    {results.length > 0 ? (
                        <Resulttable
                            results={results}
                            searchInfo={searchInfo}
                            selectedCountries={selectedCountries}
                        />
                    ) : (
                        <p></p>
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
}

export default App;