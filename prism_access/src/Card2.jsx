import React, { useState, useEffect} from 'react';
import germanyImage from './assets/country_img/germany.png';
import scotlandImage from './assets/country_img/scotland.png';
import ukImage from './assets/country_img/uk.png'
import australiaImage from './assets/country_img/australia.png';
import franceImage from './assets/country_img/france.png';
import canadaImage from './assets/country_img/canada.png';
import spainImage from './assets/country_img/spain.png';
import swedenImage from './assets/country_img/sweden.png';

function Card2({ selectedCountries, setSelectedCountries, cardType, setCardType }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [regionUrl, setRegionUrl] = useState('');
  const [reimBodyName, setReimBodyName] = useState('');
  const [reimBodyUrl, setReimBodyUrl] = useState('');


    useEffect(() => {
    if (selectedCountry) {
      if (selectedCountry === 'Germany') {
        setRegionUrl("https://docs.google.com/document/d/1B3m0bYUtCp5Dv0AtNKw4ro7VCKzepXuU7SpYUI5lBBw/edit?usp=sharing");
        setReimBodyName("G-BA - Gemeinsamer Bundesausschuss");
        setReimBodyUrl("https://www.g-ba.de/themen/arzneimittel/arzneimittel-richtlinie-anlagen/nutzenbewertung-35a/");
      }else if(selectedCountry === 'UK'){
        setRegionUrl('https://docs.google.com/document/d/1XbFvugZ-Vt-FtbEM6eOjTWBchcZcxkrQOg6JRSEPxFo/edit?usp=sharing');
        setReimBodyName('National Institute for Health and Care Excellence (NICE)');
        setReimBodyUrl('https://www.nice.org.uk/About/What-we-do/Our-Programmes/NICE-guidance/NICE-technology-appraisal-guidance');
      } else if(selectedCountry === 'Scotland'){
        setRegionUrl('https://docs.google.com/document/d/1-DaPRI-s0nt0gNFwL8xLh332NnxGNgHMzWh5iLzqvVg/edit?usp=sharing');
        setReimBodyName('Scottish Medicines Consortium (SMC)');
        setReimBodyUrl('https://www.scottishmedicines.org.uk/how-we-decide/');
      } else if(selectedCountry === 'Australia'){
        setRegionUrl('https://docs.google.com/document/d/1YkE6LTbmc9Stvv5FxuZtlqr_rL1GI_3qGfdTEAN4tS0/edit?usp=sharing');
        setReimBodyName('Pharmaceutical Benefits Scheme (PBS)');
        setReimBodyUrl('https://www.pbs.gov.au/industry/listing/procedure-guidance/files/Procedure-guidance-for-listing-medicines-on-the-Pharmaceutical-Benefits-Scheme-v2.5.pdf');
      } else if(selectedCountry === 'France'){
        setRegionUrl('https://docs.google.com/document/d/16C8E2sJNfclzZZ7DUVIRtUCcMb9bRUdd5gN1Gq5x7a4/edit');
        setReimBodyName('Haute Autorité de Santé (HAS)');
        setReimBodyUrl('https://www.has-sante.fr/');
      } else if(selectedCountry === 'Sweden'){
        setRegionUrl('https://docs.google.com/document/d/1FAFLDHjtjMMCHSJgAYM4ksH7wW3fpPDq4-6DKJfHwwk/edit');
        setReimBodyName(' Dental and Pharmaceutical Benefits Agency (TLV)');
        setReimBodyUrl('https://www.tlv.se/beslut/sok-priser-och-beslut-i-databasen.html');
      }
      else if(selectedCountry === 'Spain'){
        setRegionUrl('https://docs.google.com/document/d/1auhpaFNl8vojS_athl7tlAtiTVwLEWa00q5M5S4GsHw/edit');
        setReimBodyName('Spanish Agency of Medicines and Medical Devices (AEMPS)');
        setReimBodyUrl('https://www.aemps.gob.es/medicamentos-de-uso-humano/informes-de%20posicionamiento-terapeutico/#');
      }
      else if(selectedCountry === 'Canada'){
        setRegionUrl('https://docs.google.com/document/d/1NMSDSPgpXfXfrwNCjZrvXI-2TxTMPQksaecPwR1-WIo/edit');
        setReimBodyName("Canada's Drug Agency (CADTH");
        setReimBodyUrl('https://www.cadth.ca/reimbursement-review-reports');
      }
    } else {
      setRegionUrl('');
      setReimBodyName('');
      setReimBodyUrl('');
    }
  }, [selectedCountry]);


  const europeCountries = [
    { name: 'Germany', imgSrc: germanyImage },
    { name: 'Scotland', imgSrc: scotlandImage },
    { name: 'UK', imgSrc: ukImage },
    { name: 'Sweden', imgSrc: swedenImage},
    { name: 'Spain', imgSrc: spainImage},
    { name: 'France', imgSrc: franceImage},
  ];

  const australiaCountries = [
    { name: 'Australia', imgSrc: australiaImage },
  ];

  const northAmericaCountries = [
    { name: 'Canada', imgSrc: canadaImage },
  ];

  const handleCountryToggle = (countryName) => {
    let newSelection;
    if (selectedCountries.includes(countryName)) {
      newSelection = selectedCountries.filter((name) => name !== countryName);
    } else {
      newSelection = [...selectedCountries, countryName];
    }
    setSelectedCountries(newSelection);
  };

  const selectAllCountries = () => {
    const allCountries = [
      ...europeCountries,
      ...northAmericaCountries,
      ...australiaCountries,
    ].map((country) => country.name);
    setSelectedCountries(allCountries);
    setCardType("Reimbursement");
  };

  const deselectAllCountries = () => {
    setSelectedCountries([]);
    setSelectedCountry(null);
  };

  const handleCountryClick = (countryName) => {
    // setSelectedCountryLocal(countryName);
    setSelectedCountry(countryName);
    setCardType("Reimbursement"); // set card type to "Reimbursement"
    // cardType("Reimbursement");
    console.log(selectedCountry);
};

  const clearSelection = () => {
    // setSelectedCountryLocal(null);
    setSelectedCountry(null);
  };

  const renderCountries = (countries) => (
    <ul>
      {countries.map((country) => (
        <li
          key={country.name}
          className={((selectedCountry === country.name) && (cardType === 'Reimbursement')) ? 'selected' : ''}
          onClick={() => {
            handleCountryToggle(country.name);
            handleCountryClick(country.name);
          }
          }
        >
          <input
            type="checkbox"
            checked={selectedCountries.includes(country.name)}
            onChange={() => handleCountryToggle(country.name)}
            onClick={(e) => e.stopPropagation()} // Prevents the <li> onClick from firing when clicking directly on the checkbox
          />
          <img src={country.imgSrc} alt={country.name} />
          {country.name}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="card-container">
      <div className="card-title">
        <h2>Reimbursement Details</h2>
      </div>
        <div className="buttons-container">
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
            <h2 className='continent'>Australia</h2>
          </div>
          {renderCountries(australiaCountries)}
          <div className="section-header">
            <h2 className='continent'>North America</h2>
          </div>
          {renderCountries(northAmericaCountries)}
        </div>
      </div>
      {selectedCountry && (cardType === 'Reimbursement') && (
        <table className="country-details-table">
                  <tbody>
                    <tr>
                      <td>
                        <div>{selectedCountry}</div>
                        </td>
                      <td>
                        <a href={reimBodyUrl} target="_blank" rel="noopener noreferrer">
                          {reimBodyName} <i className="fas fa-external-link-alt"></i>
                        </a>
                      </td>
                      <td>
                        <a href={regionUrl} target="_blank" rel="noopener noreferrer">
                          Reimbursement Process <i className="fas fa-external-link-alt"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
      )}
      {/* {selectedCountry && (cardType === 'Reimbursement')  && (
        <button className="clear-button" onClick={clearSelection}>Clear Selection</button>
      )} */}
    </div>
  );
}

export default Card2;