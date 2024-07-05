import React, { useState, useEffect} from 'react';
import germanyImage from './assets/country_img/germany.png';
import scotlandImage from './assets/country_img/scotland.png';
import ukImage from './assets/country_img/uk.png'
import australiaImage from './assets/country_img/australia.png';

function Card2({ setSelectedCountry, setCardType }) {
  const [selectedCountry, setSelectedCountryLocal] = useState(null);
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
      } else if(selectedCountry === 'A'){
        setRegionUrl('');
        setReimBodyName('');
        setReimBodyUrl('');
      } else if(selectedCountry === 'B'){
        setRegionUrl('');
        setReimBodyName('');
        setReimBodyUrl('');
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
    { name: 'UK', imgSrc: ukImage }
  ];

  const australiaCountries = [
    { name: 'Australia', imgSrc: australiaImage },
  ];

  const handleCountryClick = (countryName) => {
    setSelectedCountryLocal(countryName);
    setSelectedCountry(countryName);
    setCardType("Reimbursement"); // set card type to "Reimbursement"
  };

  const clearSelection = () => {
    setSelectedCountryLocal(null);
    setSelectedCountry(null);
  };

  const renderCountries = (countries) => (
    <ul>
      {countries.map((country) => (
        <li
          key={country.name}
          className={selectedCountry === country.name ? 'selected' : ''}
          onClick={() => handleCountryClick(country.name)}
        >
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
        </div>
      </div>
      {selectedCountry && (
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
      {selectedCountry && (
        <button className="clear-button" onClick={clearSelection}>Clear Selection</button>
      )}
    </div>
  );
}

export default Card2;