import React, { useState, useEffect } from 'react';
import germanyImage from './assets/country_img/germany.png';
import scotlandImage from './assets/country_img/scotland.png';
import ukImage from './assets/country_img/uk.png';
import europeImage from './assets/country_img/europe.png';
import usaImage from './assets/country_img/usa.png';
import australiaImage from './assets/country_img/australia.png';
import franceImage from './assets/country_img/france.png';
import canadaImage from './assets/country_img/canada.png';
import spainImage from './assets/country_img/spain.png';
import swedenImage from './assets/country_img/sweden.png';
import italyImage from './assets/country_img/italy.png';
import brazilImage from './assets/country_img/brazil.png';
import southkoreaImage from './assets/country_img/southkorea.png';

function Card({ setSelectedCountry, cardType, setCardType }) {
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [countryData, setCountryData] = useState({});

    const europeCountries = [
        { name: 'Germany', imgSrc: germanyImage },
        { name: 'Scotland', imgSrc: scotlandImage },
        { name: 'UK', imgSrc: ukImage },
        { name: 'European Union', imgSrc: europeImage },
        { name: 'Sweden', imgSrc: swedenImage },
        { name: 'Spain', imgSrc: spainImage },
        { name: 'France', imgSrc: franceImage },
        { name: 'Italy', imgSrc: italyImage },
    ];

    const northAmericaCountries = [
        { name: 'USA', imgSrc: usaImage },
        { name: 'Canada', imgSrc: canadaImage },
    ];

    const southAmericaCountries = [
        { name: 'Brazil', imgSrc: brazilImage },
    ];

    const australiaCountries = [
        { name: 'Australia', imgSrc: australiaImage },
    ];

    const eastAsiaCountries = [
        { name: 'South Korea', imgSrc: southkoreaImage },
    ];

    const allCountries = [
        ...europeCountries,
        ...northAmericaCountries,
        ...southAmericaCountries,
        ...australiaCountries,
        ...eastAsiaCountries,
    ];

    useEffect(() => {
        const countryInfo = selectedCountries.reduce((info, country) => {
            info[country] = { url: '', maBodyName: '', maBodyUrl: '' };
            if (country === 'Germany') {
                info[country] = {
                    url: "https://docs.google.com/document/d/1oEOdFCjHb9umnTWeju0w7NBCfbtf4usY904Tw8mae1A/edit?usp=sharing",
                    maBodyName: "BfArM - Federal Institute for Drugs and Medical Devices",
                    maBodyUrl: "https://www.bfarm.de/EN/Medicinal-products/Licensing/Licensing-procedures/_node.html",
                };
            } else if (country === 'European Union') {
                info[country] = {
                    url: 'https://docs.google.com/document/d/10GRfl8GDVBQxiv0V5chL51NQdwWKvNJgqkTkvabu_1k/edit?usp=sharing',
                    maBodyName: 'European Medicines Agency',
                    maBodyUrl: 'https://www.ema.europa.eu/en/human-regulatory-overview/marketing-authorisation/obtaining-eu-marketing-authorisation-step-step',
                };
            } else if (country === 'UK') {
                info[country] = {
                    url: 'https://docs.google.com/document/d/1pZb5SaVaTvCQsvsChr0vdaLDymgzu2eK6-u8kKxxYZ0/edit?usp=sharing',
                    maBodyName: 'MHRA - Medicines and Healthcare products Regulatory Agency',
                    maBodyUrl: 'https://www.gov.uk/government/publications/more-information-about-the-mhra/more-information-about-the-mhra--2#medicines-and-vaccines',
                };
            }
            // Add other countries in a similar manner
            return info;
        }, {});
        setCountryData(countryInfo);
    }, [selectedCountries]);

    const handleCountrySelection = (country) => {
        setSelectedCountries((prevSelected) => {
            if (prevSelected.includes(country)) {
                return prevSelected.filter((selectedCountry) => selectedCountry !== country);
            } else {
                return [...prevSelected, country];
            }
        });
    };

    const selectAllCountries = () => {
        setSelectedCountries(allCountries.map((country) => country.name));
    };

    const deselectAllCountries = () => {
        setSelectedCountries([]);
    };

    const renderCountries = (countries) => (
        <ul>
            {countries.map((country) => (
                <li key={country.name}>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedCountries.includes(country.name)}
                            onChange={() => handleCountrySelection(country.name)}
                        />
                        <img src={country.imgSrc} alt={country.name} />
                        {country.name}
                    </label>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="card-container">
            <div className="card-title">
                <h2>Market Authorization Details</h2>
            </div>
            <div>
                <button onClick={selectAllCountries}>Select All</button>
                <button onClick={deselectAllCountries}>Deselect All</button>
            </div>
            <div className="sections-container">
                <div className="section">
                    <div className="section-header">
                        <h2 className='continent'>Europe</h2>
                    </div>
                    {renderCountries(europeCountries)}
                </div>
                <div className="section">
                    <div className="section-header">
                        <h2 className='continent'>North America</h2>
                    </div>
                    {renderCountries(northAmericaCountries)}
                    <div className="section-header">
                        <h2 className='continent'>South America</h2>
                    </div>
                    {renderCountries(southAmericaCountries)}
                </div>
                <div className="section">
                    <div className="section-header">
                        <h2 className='continent'>Australia</h2>
                    </div>
                    {renderCountries(australiaCountries)}
                    <div className="section-header">
                        <h2 className='continent'>East Asia</h2>
                    </div>
                    {renderCountries(eastAsiaCountries)}
                </div>
            </div>
            {selectedCountries.length > 0 && (
                <table className="country-details-table">
                    <tbody>
                        {selectedCountries.map((country) => (
                            <tr key={country}>
                                <td>{country}</td>
                                <td>
                                    <a href={countryData[country].maBodyUrl} target="_blank" rel="noopener noreferrer">
                                        {countryData[country].maBodyName} <i className="fas fa-external-link-alt"></i>
                                    </a>
                                </td>
                                <td>
                                    <a href={countryData[country].url} target="_blank" rel="noopener noreferrer">
                                        Market Authorization Process <i className="fas fa-external-link-alt"></i>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Card;
