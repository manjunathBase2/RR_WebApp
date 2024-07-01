import React, { useState } from 'react';
import Header from "./Header.jsx";
import Card from "./Card.jsx";
import Card2 from "./Card2.jsx";
import Searchbar from './Searchbar.jsx';
import Resulttable from './Resulttable.jsx';
import Roche_logo from "./assets/Roche_Logo.png"

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cardType, setCardType] = useState(null);
  const [results, setResults] = useState([]);

  const handleCountrySelect = (country, type) => {
    setSelectedCountry(country);
    setCardType(type);
  };

  const handleResultsFetched = (data) => {
    setResults(data);
  };

  return (
    <>
      <div className="container">
        <div className="header-container">
          <img src={Roche_logo} className="logo" alt="Logo" />
          <Header />
        </div>
        <div className="cards-wrapper">
          <Card setSelectedCountry={setSelectedCountry} setCardType={setCardType} />
          <Card2 setSelectedCountry={setSelectedCountry} setCardType={setCardType} />
        </div>
        <div className='search'>
          <Searchbar selectedCountry={selectedCountry} cardType={cardType} onResultsFetched={handleResultsFetched} />
        </div>
        <div className='results'>
          <Resulttable results={results} />
        </div>
      </div>
    </>
  );
}

export default App;



