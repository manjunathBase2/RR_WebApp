import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import combinedData from './prism_access/src/assets/combined_data.json'; // Adjust the path as necessary
import columnsData from './prism_access/src/assets/columns.json'; // Adjust the path as necessary

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
                    alert("Invalid card type.");
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

    const getFilteredSuggestions = (query) => {
        if (!query || !selectedCountries.length || !cardType) return [];
        let filteredSuggestions = [];

        selectedCountries.forEach((country) => {
            const data = combinedData[country]?.[cardType]?.[searchType] || [];
            filteredSuggestions = [...filteredSuggestions, ...data.filter(item => item.toLowerCase().includes(query.toLowerCase()))];
        });

        return [...new Set(filteredSuggestions)]; // Remove duplicates
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getFilteredSuggestions(value));
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
            alert("Please select at least one country.");
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
                alert("Invalid card type.");
                setLoading(false);
                return;
            }
            filePaths.push(filePath);
        });

        searchData.file_paths = filePaths;

        console.log("Search Data:", searchData);

        try {
            const response = await axios.post(
                'http://localhost:5000/filter',
                searchData
            );
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
            handleSearch();
        }
    };

    return (
        <div className="search-bar">
            <div className="search-controls">
                <select value={searchType} onChange={handleSearchTypeChange}>
                    {availableColumns.map((column, index) => (
                        <option key={index} value={column}>
                            {column}
                        </option>
                    ))}
                </select>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={{
                        placeholder: 'Search...',
                        value: searchQuery,
                        onChange: (_, { newValue }) => setSearchQuery(newValue),
                        onKeyDown: handleKeyDown,
                    }}
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Start Date"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="End Date"
                />
                <button onClick={handleSearch} disabled={loading}>
                    {loading ? 'Loading...' : 'Search'}
                </button>
            </div>
        </div>
    );
}

export default Searchbar;
