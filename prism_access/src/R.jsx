import React, { useState } from 'react';

function Resulttable({ results, searchInfo, selectedCountries }) {
    const [expandedCells, setExpandedCells] = useState({});

    const getTimestamp = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
    };

    const downloadCSV = () => {
        if (!results || results.length === 0) return;

        const timestamp = getTimestamp();
        const headers = Object.keys(results[0]);

        // Create HTML content with colored rows
        let htmlContent = '<html><head><style>';
        htmlContent += 'table {border-collapse: collapse; width: 100%;}';
        htmlContent += 'th, td {border: 1px solid black; padding: 8px; text-align: left;}';
        htmlContent += '.metadata {background-color: #FFD700;}'; // Gold color for metadata
        htmlContent += '.header {background-color: #87CEEB;}'; // Sky Blue color for header
        htmlContent += '</style></head><body>';
        htmlContent += '<table>';

        // Add metadata rows
        htmlContent += `<tr class="metadata"><td colspan="${headers.length}">Search Type: ${searchInfo.cardType}</td></tr>`;
        htmlContent += `<tr class="metadata"><td colspan="${headers.length}">Search Criteria: ${searchInfo.searchType}</td></tr>`;
        htmlContent += `<tr class="metadata"><td colspan="${headers.length}">Search Term: ${searchInfo.searchQuery}</td></tr>`;
        htmlContent += `<tr class="metadata"><td colspan="${headers.length}">Regions: ${selectedCountries.join(', ')}</td></tr>`;
        htmlContent += `<tr class="metadata"><td colspan="${headers.length}">Start Date: ${searchInfo.startDate}</td></tr>`;
        htmlContent += `<tr class="metadata"><td colspan="${headers.length}">End Date: ${searchInfo.endDate}</td></tr>`;

        // Add header row
        htmlContent += '<tr class="header">';
        headers.forEach(header => {
            htmlContent += `<th>${header}</th>`;
        });
        htmlContent += '</tr>';

        // Add data rows
        results.forEach(row => {
            htmlContent += '<tr>';
            headers.forEach(header => {
                htmlContent += `<td>${row[header] !== null ? row[header] : ''}</td>`;
            });
            htmlContent += '</tr>';
        });

        htmlContent += '</table></body></html>';

        // Create a Blob with the HTML content
        const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `results_${timestamp}.xls`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const downloadDOC = () => {
        // ... (existing downloadDOC function remains unchanged)
    };

    // ... (rest of the component code remains unchanged)

    return (
        // ... (existing JSX code remains unchanged)
    );
}

export default Resulttable;