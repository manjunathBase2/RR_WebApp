
import React, { useState } from 'react';
import axios from 'axios';

function Searchbar({ selectedCountry, cardType, onResultsFetched }) {
  const [searchType, setSearchType] = useState('Product Name');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (!selectedCountry || !cardType) {
      alert("Please select a country and card type.");
      return;
    }

    setLoading(true);

    // Construct the file path based on selectedCountry and cardType
    let filePath;
    if (cardType === 'MA') {
      filePath = "1";
    } else if (cardType === 'Reimbursement') {
      filePath = "2";
    } else {
      alert("Invalid card type.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/search', {
        file_path: filePath,
        column_name: searchType,
        search_term: searchQuery,
      });
      onResultsFetched(response.data);  // Pass the data to the parent component
    } catch (error) {
      console.error("There was an error with the search:", error);
      alert("Failed to fetch results. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="searchbar-container">
      <select
        value={searchType}
        onChange={handleSearchTypeChange}
        className="searchbar-dropdown"
      >
        <option value="Product Name">Product Name</option>
        <option value="Active Substance">Active Substance</option>
        <option value="Therapeutic Area">Therapeutic Area</option>
      </select>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        className="searchbar-input"
        placeholder={`Search by ${searchType}`}
      />
      <button onClick={handleSearch} className="searchbar-button" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}

export default Searchbar;

