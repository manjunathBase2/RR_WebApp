import React, { useState, useEffect } from 'react';
import germanyImage from './assets/country_img/germany.png';
import scotlandImage from './assets/country_img/scotland.png';
import ukImage from './assets/country_img/uk.png';
import europeImage from './assets/country_img/europe.png';
import usaImage from './assets/country_img/usa.png';
import australiaImage from './assets/country_img/australia.png';

function Card({ setSelectedCountry, setCardType }) {
  const [selectedCountry, setSelectedCountryLocal] = useState(null);
  const [countryUrl, setCountryUrl] = useState('');
  const [maBodyName, setMaBodyName] = useState('');
  const [maBodyUrl, setMaBodyUrl] = useState('');

  useEffect(() => {
    if (selectedCountry) {
      if (selectedCountry === 'Germany') {
        setCountryUrl("https://docs.google.com/document/d/1oEOdFCjHb9umnTWeju0w7NBCfbtf4usY904Tw8mae1A/edit?usp=sharing");
        setMaBodyName("BfArM - Federal Institute for Drugs and Medical Devices");
        setMaBodyUrl("https://www.bfarm.de/EN/Medicinal-products/Licensing/Licensing-procedures/_node.html");
      } else if (selectedCountry === 'European Union') {
        setCountryUrl('https://docs.google.com/document/d/10GRfl8GDVBQxiv0V5chL51NQdwWKvNJgqkTkvabu_1k/edit?usp=sharing');
        setMaBodyName('European Medicies Agency');
        setMaBodyUrl('https://www.ema.europa.eu/en/human-regulatory-overview/marketing-authorisation/obtaining-eu-marketing-authorisation-step-step');
      } else if(selectedCountry === 'UK'){
        setCountryUrl('https://docs.google.com/document/d/1pZb5SaVaTvCQsvsChr0vdaLDymgzu2eK6-u8kKxxYZ0/edit?usp=sharing');
        setMaBodyName('MHRA - Medicines and Healthcare products Regulatory Agency');
        setMaBodyUrl('https://www.gov.uk/government/publications/more-information-about-the-mhra/more-information-about-the-mhra--2#medicines-and-vaccines');
      } else if(selectedCountry === 'Scotland'){
        setCountryUrl('https://docs.google.com/document/d/1DPF-V3AUzjK_k68pI139Y4ZRO-Sh3pInwZz1_zSPR1Q/edit?usp=sharing');
        setMaBodyName('MHRA - Medicines and Healthcare products Regulatory Agency');
        setMaBodyUrl('https://www.gov.uk/government/publications/more-information-about-the-mhra/more-information-about-the-mhra--2#medicines-and-vaccines');
      } else if(selectedCountry === 'Australia'){
        setCountryUrl('https://docs.google.com/document/d/12UsGDDaLU58BPmd5UhykzkMPDLpUgxXbp_TQJwpiQjs/edit?usp=sharing');
        setMaBodyName('Therapeutic Goods Administration (TGA) ');
        setMaBodyUrl('https://www.tga.gov.au/sites/default/files/prescription-medicines-registration-process.pdf');
      } else if(selectedCountry === 'USA'){
        setCountryUrl('https://docs.google.com/document/d/12UsGDDaLU58BPmd5UhykzkMPDLpUgxXbp_TQJwpiQjs/edit?usp=sharing');
        setMaBodyName('FDA(Food and Drug Administration)');
        setMaBodyUrl('https://www.fda.gov/drugs/information-consumers-and-patients-drugs/fdas-drug-review-process-ensuring-drugs-are-safe-and-effective');
      }
    } else {
      setCountryUrl('');
      setMaBodyName('');
      setMaBodyUrl('');
    }
  }, [selectedCountry]);

  const europeCountries = [
    { name: 'Germany', imgSrc: germanyImage },
    { name: 'Scotland', imgSrc: scotlandImage },
    { name: 'UK', imgSrc: ukImage },
    { name: 'European Union', imgSrc: europeImage },
  ];

  const northAmericaCountries = [
    { name: 'USA', imgSrc: usaImage },
  ];

  const australiaCountries = [
    { name: 'Australia', imgSrc: australiaImage },
  ];

  const handleCountryClick = (countryName) => {
    setSelectedCountryLocal(countryName);
    setSelectedCountry(countryName);
    setCardType("MA");
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
        <h2>Market Authorization Details</h2>
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
                        <a href={maBodyUrl} target="_blank" rel="noopener noreferrer">
                          {maBodyName} <i className="fas fa-external-link-alt"></i>
                        </a>
                      </td>
                      <td>
                        <a href={countryUrl} target="_blank" rel="noopener noreferrer">
                          Market Authorization Process <i className="fas fa-external-link-alt"></i>
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

export default Card;