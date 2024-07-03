import React, { useState } from 'react';
import axios from 'axios';

function Searchbar({ onResultsFetched, selectedCountry, cardType }) {
    const [searchType, setSearchType] = useState('Product Name');
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
    };

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleSearch = async () => {
        if (!selectedCountry) {
            alert("Please select a country.");
            return;
        }

        setLoading(true);

        let searchData = {
            start_date: startDate,
            end_date: endDate,
        };

        if (searchQuery !== '') {
            searchData.column_name = searchType;
            searchData.search_term = searchQuery;
        }

        // Set file_path based on cardType
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

        searchData.file_path = filePath;

        console.log("Search Data:", searchData);

        try {
            const response = await axios.post('http://localhost:5000/filter', searchData);
            console.log("Response Data:", response.data);
            onResultsFetched({
                results: response.data.results,
                visualization1: response.data.visualization1,
                visualization2: response.data.visualization2
            }); // Pass the data to the parent component
        } catch (error) {
            console.error("There was an error with the search:", error);
            alert("Failed to fetch results. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="searchbar-container">
                <div className="searchbar-left">
                    <div>
                        <label>Select Criteria:</label>
                        <select
                            value={searchType}
                            onChange={handleSearchTypeChange}
                            className="searchbar-dropdown"
                        >
                            <option value="Product Name">Product Name</option>
                            <option value="INN - Active Substance">Active Substance</option>
                            <option value="Therapeutic Area">Therapeutic Area</option>
                        </select>
                    </div>

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        className="searchbar-input-text"
                        placeholder={searchType === 'Product Name' ? 'Search by Product Name' : searchType === 'INN - Active Substance' ? 'Search by Active Substance' : 'Search by Therapeutic Area'}
                    />
                </div>
                <div className="searchbar-right">
                    <div>
                        <label htmlFor="start-date">Start Date:</label>
                        <input
                            type="date"
                            id="start-date"
                            value={startDate}
                            onChange={handleStartDateChange}
                            className="searchbar-input"
                        />
                    </div>
                    <div>
                        <label htmlFor="end-date">End Date:</label>
                        <input
                            type="date"
                            id="end-date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            className="searchbar-input"
                        />
                    </div>
                </div>
            </div>
            <div className='searchbar-button-container'>

                <div className="searchbar-button">
                    <button onClick={handleSearch} className="searchbar-button" disabled={loading}>
                        {loading ? "Searching..." : "Launch Search"}
                    </button>
                </div>
            </div>
        </>
    );
}

export default Searchbar;