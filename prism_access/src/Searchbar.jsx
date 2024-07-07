
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

function Searchbar({ onResultsFetched, selectedCountry, cardType }) {
    const [searchType, setSearchType] = useState('Product Name');
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [availableColumns, setAvailableColumns] = useState(["Product Name", "Active Substance", "Therapeutic Area"]); // Default options
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchColumns = async () => {
            if (!selectedCountry || !cardType) return;

            let filePath;
            if (cardType === 'MA' && selectedCountry === 'Germany') {
                filePath = "1";
            } else if (cardType === 'Reimbursement' && selectedCountry === 'Germany') {
                filePath = "2";
            } else if (cardType === 'MA' && selectedCountry === 'European Union') {
                filePath = "3";
            } else if (cardType === 'MA' && selectedCountry === 'USA') {
                filePath = "4";
            } else if (cardType === 'MA' && selectedCountry === 'Scotland') {
                filePath = "5";
            } else if (cardType === 'Reimbursement' && selectedCountry === 'Scotland') {
                filePath = "6";
            } else if (cardType === 'MA' && selectedCountry === 'Australia') {
                filePath = "7";
            } else if (cardType === 'Reimbursement' && selectedCountry === 'Australia') {
                filePath = "8";
            } else if (cardType === 'Reimbursement' && selectedCountry === 'UK') {
                filePath = "9";
            } else if (cardType === 'MA' && selectedCountry === 'UK') {
                filePath = "10";
            } else {
                alert("Invalid card type.");
                return;
            }

            try {
                const response = await axios.post('http://localhost:5000/get_columns', { file_path: filePath });
                console.log("Fetched columns:", response.data.columns);  // Log the response for debugging
                setAvailableColumns(response.data.columns);
            } catch (error) {
                console.error("There was an error fetching columns:", error);
            }
        };

        fetchColumns();
    }, [selectedCountry, cardType]);

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
        setSearchQuery('');
    };

    const handleSearchQueryChange = (e, { newValue }) => {
        setSearchQuery(newValue);
    };

    const fetchSuggestions = async ({ value }) => {
        if (!selectedCountry || !cardType) return;

        let filePath;
        // Map selectedCountry and cardType to filePath (same as above)
        if (cardType === 'MA' && selectedCountry === 'Germany') {
            filePath = "1";
        } else if (cardType === 'Reimbursement' && selectedCountry === 'Germany') {
            filePath = "2";
        } else if (cardType === 'MA' && selectedCountry === 'European Union') {
            filePath = "3";
        } else if (cardType === 'MA' && selectedCountry === 'USA') {
            filePath = "4";
        } else if (cardType === 'MA' && selectedCountry === 'Scotland') {
            filePath = "5";
        } else if (cardType === 'Reimbursement' && selectedCountry === 'Scotland') {
            filePath = "6";
        } else if (cardType === 'MA' && selectedCountry === 'Australia') {
            filePath = "7";
        } else if (cardType === 'Reimbursement' && selectedCountry === 'Australia') {
            filePath = "8";
        } else if (cardType === 'Reimbursement' && selectedCountry === 'UK') {
            filePath = "9";
        } else if (cardType === 'MA' && selectedCountry === 'UK') {
            filePath = "10";
        }

        try {
            const response = await axios.get('http://localhost:5000/autosuggest', {
                params: { query: value, column_name: searchType, file_path: filePath }
            });
            setSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const clearSuggestions = () => {
        setSuggestions([]);
    };

    const getSuggestionValue = suggestion => suggestion;

    const renderSuggestion = suggestion => (
        <div className="suggestion-item">
            {suggestion}
        </div>
    );

    const inputProps = {
        placeholder: `Search by ${searchType}`,
        value: searchQuery,
        onChange: handleSearchQueryChange
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

        let filePath;
        if (cardType === 'MA' && selectedCountry === 'Germany') {
            filePath = "1";
        } else if (cardType === 'Reimbursement' && selectedCountry === 'Germany') {
            filePath = "2";
        } else if (cardType === 'MA' && selectedCountry === 'European Union') {
            filePath = "3";
        } else if (cardType === 'MA' && selectedCountry === 'USA') {
            filePath = "4";
        } else if (cardType === 'MA' && selectedCountry === 'Scotland') {
            filePath = "5";
        } else if (cardType === 'Reimbursement' && selectedCountry === 'Scotland') {
            filePath = "6";
        } else if (cardType === 'MA' && selectedCountry === 'Australia') {
            filePath = "7";
        } else if (cardType === 'Reimbursement' && selectedCountry === 'Australia') {
            filePath = "8";
        } else if (cardType === 'Reimbursement' && selectedCountry === 'UK') {
            filePath = "9";
        } else if (cardType === 'MA' && selectedCountry === 'UK') {
            filePath = "10";
        }else {
            alert("Invalid card type.");
            setLoading(false);
            return;
        }

        searchData.file_path = filePath;

        console.log("Search Data:", searchData);

        try {
            const response = await axios.post('http://localhost:5000/filter', searchData);
            console.log("Response Data:", response.data);

            if (response.data.results.length === 0) {
                alert("No records found.");
            }

            onResultsFetched({
                results: response.data.results,
                visualization1: response.data.visualization1,
                visualization2: response.data.visualization2
            });
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
                            {availableColumns.includes("Product Name") && <option value="Product Name">Product Name</option>}
                            {availableColumns.includes("Active Substance") && <option value="Active Substance">Active Substance</option>}
                            {availableColumns.includes("Therapeutic Area") && <option value="Therapeutic Area">Therapeutic Area</option>}
                        </select>
                    </div>
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={fetchSuggestions}
                            onSuggestionsClearRequested={clearSuggestions}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                            className="searchbar-input-text"
                        />
                </div>
                <div className="searchbar-right">
                    <div>
                        <label htmlFor="start-date">Start Date:</label>
                        <input
                            type="date"
                            id="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="searchbar-input"
                        />
                    </div>
                    <div>
                        <label htmlFor="end-date">End Date:</label>
                        <input
                            type="date"
                            id="end-date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
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
