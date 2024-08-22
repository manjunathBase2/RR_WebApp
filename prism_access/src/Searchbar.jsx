import React, { useState, useEffect, useMemo } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import combinedData from './assets/combined_data.json'; // Adjust the path as necessary
import columnsData from './assets/columns.json'; // Adjust the path as necessary

function Searchbar({ onResultsFetched, selectedCountries, cardType }) {
    const [searchType, setSearchType] = useState('Product Name');
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [availableColumns, setAvailableColumns] = useState(["Product Name", "Active Substance", "Therapeutic Area"]); // Default options

    useEffect(() => {
        const fetchColumns = () => {
            if (!selectedCountries.length || !cardType) return;

            let columns = [];

            selectedCountries.forEach((country) => {
            let fileKey;
            if (cardType === 'MA' && country === 'Germany') {
                fileKey = "Germany_MA.xlsx";
            } else if (cardType === 'Reimbursement' && country === 'Germany') {
                fileKey = "Germany_Reimbursement.xlsx";
            } else if (cardType === 'MA' && country === 'European Union') {
                fileKey = "Europe_MA.xlsx";
            } else if (cardType === 'MA' && country === 'USA') {
                fileKey = "USA_MA.xlsx";
            } else if (cardType === 'MA' && country === 'Scotland') {
                fileKey = "Scotland_MA.xlsx";
            } else if (cardType === 'Reimbursement' && country === 'Scotland') {
                fileKey = "Scotland_Reimbursement.xlsx";
            } else if (cardType === 'MA' && country === 'Australia') {
                fileKey = "Australia_MA.xlsx";
            } else if (cardType === 'Reimbursement' && country === 'Australia') {
                fileKey = "Australia_Reimbursement.xlsx";
            } else if (cardType === 'Reimbursement' && country === 'UK') {
                fileKey = "UK_Reimbursement.xlsx";
            } else if (cardType === 'MA' && country === 'UK') {
                fileKey = "UK_MA.xlsx";
            } else if (cardType === 'MA' && country === 'France') {
                fileKey = "France_MA.xlsx";
            } else if (cardType === 'Reimbursement' && country === 'France') {
                fileKey = "France_Reimbursement.xlsx";
            } else if (cardType === 'MA' && country === 'Spain') {
                fileKey = "Spain_MA.xlsx";
            } else if (cardType === 'Reimbursement' && country === 'Spain') {
                fileKey = "Spain_Reimbursement.xlsx";
            } else if (cardType === 'MA' && country === 'Sweden') {
                fileKey = "Sweden_MA.xlsx";
            } else if (cardType === 'Reimbursement' && country === 'Sweden') {
                fileKey = "Sweden_Reimbursement.xlsx";
            } else if (cardType === 'MA' && country === 'Canada') {
                fileKey = "Canada_MA.xlsx";
            } else if (cardType === 'Reimbursement' && country === 'Canada') {
                fileKey = "Canada_Reimbursement.xlsx";
            } else if (cardType === 'MA' && country === 'South Korea') {
                fileKey = "South Korea_MA.xlsx";
            } else if (cardType === 'MA' && country === 'Italy') {
                fileKey = "Italy_MA.xlsx";
            } else if (cardType === 'MA' && country === 'Brazil') {
                fileKey = "Brazil_MA.xlsx";
            } else {
                // alert("Invalid card type.");
                return;
            }

                const countryColumns = columnsData[fileKey] || [];
                columns = [...columns, ...countryColumns];
            });

            setAvailableColumns([...new Set(columns)]); // Remove duplicates
        };

        fetchColumns();
    }, [selectedCountries, cardType]);

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
        setSearchQuery('');
        setSuggestions([]);
    };

    // Memoize the filtered data
    const filteredData = useMemo(() => {
        const result = [];
        selectedCountries.forEach(country => {
            if (combinedData[country] && combinedData[country][cardType] && combinedData[country][cardType][searchType]) {
                result.push(...combinedData[country][cardType][searchType]);
            }
        });
        return [...new Set(result)]; // Remove duplicates
    }, [selectedCountries, cardType, searchType]);

    // Efficient search function
    const searchSuggestions = (query) => {
        if (!query) return [];
        query = query.toLowerCase();
        return filteredData
            .filter(item => item.toLowerCase().includes(query))
            .slice(0, 20); // Limit to 20 suggestions for better performance
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(searchSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const getSuggestionValue = (suggestion) => suggestion;

    const renderSuggestion = (suggestion) => (
        <div className="suggestion-item">
            {suggestion}
        </div>
    );

    const handleSearch = async () => {
        if (!selectedCountries.length) {
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
        let filePaths = [];
        selectedCountries.forEach((country) => {
        let filePath;
        if (cardType === 'MA' && country === 'Germany') {
            filePath = "1";
        } else if (cardType === 'Reimbursement' && country === 'Germany') {
            filePath = "2";
        } else if (cardType === 'MA' && country === 'European Union') {
            filePath = "3";
        } else if (cardType === 'MA' && country === 'USA') {
            filePath = "4";
        } else if (cardType === 'MA' && country === 'Scotland') {
            filePath = "5";
        } else if (cardType === 'Reimbursement' && country === 'Scotland') {
            filePath = "6";
        } else if (cardType === 'MA' && country === 'Australia') {
            filePath = "7";
        } else if (cardType === 'Reimbursement' && country === 'Australia') {
            filePath = "8";
        } else if (cardType === 'Reimbursement' && country === 'UK') {
            filePath = "9";
        } else if (cardType === 'MA' && country === 'UK') {
            filePath = "10";
        } else if (cardType === 'MA' && country === 'France') {
            filePath = "11";
        } else if (cardType === 'Reimbursement' && country === 'France') {
            filePath = "12";
        } else if (cardType === 'MA' && country === 'Spain') {
            filePath = "13";
        } else if (cardType === 'Reimbursement' && country === 'Spain') {
            filePath = "14";
        } else if (cardType === 'MA' && country === 'Sweden') {
            filePath = "15";
        } else if (cardType === 'Reimbursement' && country === 'Sweden') {
            filePath = "16";
        } else if (cardType === 'MA' && country === 'Canada') {
            filePath = "17";
        } else if (cardType === 'Reimbursement' && country === 'Canada') {
            filePath = "18";
        } else if (cardType === 'MA' && country === 'South Korea') {
            filePath = "19";
        } else if (cardType === 'MA' && country === 'Italy') {
            filePath = "20";
        } else if (cardType === 'MA' && country === 'Brazil') {
            filePath = "21";
        } else {
            // alert("Invalid card type.");
            setLoading(false);
            return;
        }
        filePaths.push(filePath);
    });

        searchData.file_paths = filePaths;

        console.log("Search Data:", searchData);

        try {
            const response = await axios.post(

                // 'http://localhost:5000/filter',
                // 'http://10.146.71.0:5000/filter',
                '/filter',

            searchData);
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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    const handleClear = () => {
        setSearchType('Product Name');
        setSearchQuery('');
        setStartDate('');
        setEndDate('');
        setSuggestions([]);
        onResultsFetched({
            results: 0,
            visualization1: null,
            visualization2: null
        });
        
    };
    const inputProps = {
        placeholder: 'Enter search query',
        value: searchQuery,
        onChange: (e, { newValue }) => setSearchQuery(newValue),
        onKeyDown: handleKeyDown
    };

    return (
        <>
            <div className="searchbar-container" onKeyDown={handleKeyDown}>
                <div className="searchbar-left">
                    <div>
                        <label>Select Criteria:</label>
                        <select
                            value={searchType}
                            onChange={handleSearchTypeChange}
                            className="searchbar-dropdown"
                        >
                            {availableColumns.map((column, index) => (
                                <option key={index} value={column}>
                                    {column}
                                </option>
                            ))}
                        </select>
                    </div>
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={onSuggestionsClearRequested}
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
                <div className="searchbar-button">
                    <button onClick={handleClear} className="searchbar-button">
                        Clear Search
                    </button>
                </div>
            </div>
        </>
    );
}

export default Searchbar;
