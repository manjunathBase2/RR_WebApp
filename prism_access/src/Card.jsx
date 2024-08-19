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


function Card({ selectedCountries, setSelectedCountries, cardType, setCardType}) {
  const [selectedCountry, setSelectedCountry] = useState(null);
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
      else if(selectedCountry==='France'){
        setCountryUrl('https://docs.google.com/document/d/12UsGDDaLU58BPmd5UhykzkMPDLpUgxXbp_TQJwpiQjs/edit?usp=sharing');
        setMaBodyName('FDA(Food and Drug Administration)');
        setMaBodyUrl('https://www.fda.gov/drugs/information-consumers-and-patients-drugs/fdas-drug-review-process-ensuring-drugs-are-safe-and-effective');
      }
      else if(selectedCountry==="Spain"){
        setCountryUrl("https://docs.google.com/document/d/19ohXaL-tgW2iqNKqzDAVROat3LBdm3KSMTRl91OVC8A/edit?usp=sharing");
        setMaBodyName("Agency of Medicines and Medical Devices (AEMPS)");
        setMaBodyUrl("https://www.aemps.gob.es/informa-en/the-spanish-agency-of-medicines-and-medical-devices-aemps-recommends-using-voluntary-harmonisation-procedure-before-the-official-submission-of-a-multi-state-ct-application/?lang=en");
      }
      else if(selectedCountry==="South Korea"){
        setCountryUrl("https://docs.google.com/document/d/1UDx1I7nCxGlbBCQncFC3r38RF0FWzm-UG-UEo9Qp0Qo/edit?usp=sharing");
        setMaBodyName("Ministry of Food and Drug Safety ( MFDS )");
        setMaBodyUrl("https://www.mfds.go.kr/eng/index.do");
      }
      else if(selectedCountry==="Sweden"){
        setCountryUrl("https://docs.google.com/document/d/1sBvbpvPpdymsoXxDVk3q4vsKKJ5SL8sSTpzP9HZ4b48/edit?usp=sharing");
        setMaBodyName(" Swedish Medical Products Agency (MPA)");
        setMaBodyUrl("https://www.lakemedelsverket.se/en");
      }
      else if(selectedCountry==="Italy"){
        setCountryUrl("https://docs.google.com/document/d/1Zjs7z5d8cUcCmkXj7Vjcm7mJMWWQ56023bdh4uHtAqY/edit");
        setMaBodyName("AIFA (Italian Medicines Agency)");
        setMaBodyUrl("https://www.aifa.gov.it/en/home");
      }
      else if(selectedCountry==="France"){
        setCountryUrl("https://docs.google.com/document/d/1tWU7RaP51x7uEIaSgmfkukVF97bBomobyrOsU9SvzX4/edit");
        setMaBodyName("National Agency for Medicines and Health Products Safety (ANSM)");
        setMaBodyUrl("https://ansm.sante.fr/");
      }
      else if(selectedCountry==="Canada"){
        setCountryUrl("https://docs.google.com/document/d/1h2qolf5joqDC2cB7BGymKJyJlQ0cYO-hUhft6SsD0VU/edit");
        setMaBodyName("Health Products and Food Branch (HPFB)");
        setMaBodyUrl("https://www.canada.ca/en/health-canada.html");
      }
      else if(selectedCountry==="Brazil"){
        setCountryUrl("https://docs.google.com/document/d/1mbVgeUhJtpOKy_vxhodrrQOjibPKmtId-3EXRwXhxDs/edit");
        setMaBodyName("Brazilian Health Regulatory Agency (Anvisa)");
        setMaBodyUrl("https://consultas.anvisa.gov.br/#/");
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
    { name: 'Sweden', imgSrc: swedenImage},
    { name: 'Spain', imgSrc: spainImage},
    { name: 'France', imgSrc: franceImage},
    { name: 'Italy', imgSrc: italyImage},
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



  const handleCountryToggle = (countryName) => {
    if (selectedCountries.includes(countryName)) {
      setSelectedCountries(selectedCountries.filter((name) => name !== countryName));
    } else {
      setSelectedCountries([...selectedCountries, countryName]);
    }
    // setSelectedCountry(selectedCountries);
    setCardType("MA");
  };

  const selectAllCountries = () => {
    const allCountries = [
      ...europeCountries,
      ...northAmericaCountries,
      ...southAmericaCountries,
      ...australiaCountries,
      ...eastAsiaCountries,
    ].map((country) => country.name);
    setSelectedCountries(allCountries);
    setSelectedCountry(allCountries);
    setCardType("MA");
  };

  const deselectAllCountries = () => {
    setSelectedCountries([]);
    setSelectedCountry(null);
  };

  const handleCountryClick = (countryName) => {
    // setSelectedCountryLocal(countryName);
    setSelectedCountry(countryName);
    setCardType("MA");
    console.log(selectedCountry);
  };

  const clearSelection = () => {
    setSelectedCountry(null);
  };

  const renderCountries = (countries) => (
    <ul>
      {countries.map((country) => (
        <li
          key={country.name}
          className={((selectedCountry === country.name) && (cardType === 'MA') )? 'selected' : ''}
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
        <h2>Market Authorization Details</h2>
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
      {selectedCountry && (cardType === 'MA') && (
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
      {/* {selectedCountry && (cardType === 'MA') && (
        <button className="clear-button" onClick={clearSelection}>Clear Selection</button>
      )} */}
    </div>
  );
}

export default Card;