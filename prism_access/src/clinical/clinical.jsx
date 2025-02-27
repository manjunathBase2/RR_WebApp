/* ==========================================================================

File: clinical.jsx

Description:
This file is the entry point for the clinical trials page. It renders the ClinicalTrials component.

Features:
- Renders the ClinicalTrials component  

========================================================================== */

import React from 'react'
// import ReactDOM from 'react-dom/client'
import ReactDOM from 'react-dom'
import ClinicalTrials from './ClinicalTrials.jsx'
// import '../index.css'


ReactDOM.createRoot(document.getElementById('foot')).render(
    <React.StrictMode>
        <ClinicalTrials />
    </React.StrictMode>,
)
