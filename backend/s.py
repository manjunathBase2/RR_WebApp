from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
import os
import logging
import matplotlib
matplotlib.use('Agg')  # Use a non-GUI backend
import matplotlib.pyplot as plt
import io
import base64
import numpy as np
from waitress import serve
from collections import OrderedDict

# Set logging level for matplotlib.font_manager to WARNING
logging.getLogger('matplotlib.font_manager').setLevel(logging.WARNING)

app = Flask(__name__, static_folder="../client/build", static_url_path="/")
app.json.sort_keys = False
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow CORS for all origins on all routes

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Set default font family for Matplotlib
matplotlib.rcParams['font.family'] = 'Arial'

# Function to load data from multiple Excel files
def load_data(file_paths):
    # ... (keep the existing load_data function as is)

# Function to filter data based on criteria
def filter_data(df, column_name, search_term, start_date, end_date):
    logging.debug(f"Start date: {start_date}, End date: {end_date}, Column: {column_name}, Term: {search_term}")

    # Create a copy of the original dataframe
    filtered_df = df.copy()

    # Apply date filtering only if both start_date and end_date are provided
    if start_date and end_date:
        start_date = pd.to_datetime(start_date, errors='coerce')
        end_date = pd.to_datetime(end_date, errors='coerce')
        
        # Remove rows with empty 'Date of decision' only when date filtering is applied
        filtered_df = filtered_df.dropna(subset=['Date of decision'])
        filtered_df = filtered_df[(filtered_df['Date of decision'] >= start_date) & (filtered_df['Date of decision'] <= end_date)]
    elif start_date:
        start_date = pd.to_datetime(start_date, errors='coerce')
        filtered_df = filtered_df.dropna(subset=['Date of decision'])
        filtered_df = filtered_df[filtered_df['Date of decision'] >= start_date]
    elif end_date:
        end_date = pd.to_datetime(end_date, errors='coerce')
        filtered_df = filtered_df.dropna(subset=['Date of decision'])
        filtered_df = filtered_df[filtered_df['Date of decision'] <= end_date]
    
    # Apply column name and search term filtering
    if column_name and search_term:
        filtered_df = filtered_df[filtered_df[column_name].astype(str).str.contains(search_term, case=False, na=False, regex=False)]

    logging.debug(f"Filtered data: {filtered_df.head()}")

    filtered_df = filtered_df.dropna(axis=1, how='all')  # Remove columns with all missing values
    filtered_df = filtered_df.where(pd.notnull(filtered_df), None)  # Replace NaN with None

    result = [OrderedDict(zip(filtered_df.columns, row)) for row in filtered_df.values]

    # ... (keep the rest of the function for visualization as is)

    return {
        'results': result,
        'visualization1': donut_chart,
        'visualization2': bar_chart
    }

# ... (keep the rest of the file, including clinical trials functions and routes, as is)

mode = 'prod'

if __name__ == "__main__":
    if mode == 'dev':
        app.run(debug=True)
    elif mode == 'prod':
        serve(app, host="localhost", port=5000, threads=7)