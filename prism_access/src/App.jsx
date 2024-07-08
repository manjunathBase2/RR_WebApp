
import React, { useState, useEffect } from 'react';
import Header from "./Header.jsx";
import Card from "./Card.jsx";
import Card2 from "./Card2.jsx";
import Searchbar from './Searchbar.jsx';
import Resulttable from './Resulttable.jsx';
import Footer from './Footer.jsx';
import Roche_logo from "./assets/Roche_Logo.png"

function App() {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [cardType, setCardType] = useState(null);
    const [results, setResults] = useState([]);
    const [visualization1, setVisualization1] = useState('');
    const [visualization2, setVisualization2] = useState('');

    const handleCountrySelect = (country, type) => {
        setSelectedCountry(country);
        setCardType(type);
    };
    const handleResultsFetched = (data) => {
        console.log("Data fetched:", data);
        setResults(data.results);
        setVisualization1(data.visualization1);
        setVisualization2(data.visualization2);
    };

    useEffect(() => {
        console.log("Results state updated:", results);  // Log state update for results
    }, [results]);

    return (
        <>
            <div className="container">
                <div className="header-container">
                    {/* <img src={Roche_logo} className="logo" alt="Logo" /> */}
                    <Header />
                    <nav>
                        <ul>
                            <li><a className="navigation-link" href="./clinical/">Clinical Trials</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="cards-wrapper">
                    <Card setSelectedCountry={setSelectedCountry} setCardType={setCardType} />
                    <Card2 setSelectedCountry={setSelectedCountry} setCardType={setCardType} />
                </div>
                <div className='search'>
                    <Searchbar selectedCountry={selectedCountry} cardType={cardType} onResultsFetched={handleResultsFetched} />
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
                    {results.length > 0 ? <Resulttable results={results} /> : <p></p>}
                </div>
                {/* <Footer /> */}
            </div>
        </>
    );
}

export default App;
