import React from 'react';

function Resulttable({ results }) {
  if (results.length === 0) {
    return null;
  }

  return (
    <table className="results-table">
      <thead>
        <tr>
          {Object.keys(results[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => (
          <tr key={index}>
            {Object.entries(result).map(([key, value]) => (
              <td key={key}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Resulttable;
