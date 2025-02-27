'''
Module: server.py

Description:
- This script defines the Flask server that serves the API endpoints for data filtering.
- It also serves the excel data files for the React frontend.

API Endpoints:
1. GET /
    - Returns 'Hello World!!' as a test response.

2. POST /filter
    - Accepts a JSON payload with the
        - 'file_paths' (list of file IDs) to load data from multiple Excel files
        - 'column_name' (string) to filter data based on a specific column
        - 'search_term' (string) to filter data based on a search term
        - 'start_date' (string) to filter data based on a start date
        - 'end_date' (string) to filter data based on an end date
    - Returns the filtered data as a JSON response.

3. POST /studies
    - Accepts a JSON payload with the
        - 'column_name' (string) to filter clinical trials data based on a specific column
        - 'search_term' (string) to filter clinical trials data based on a search term
    - Returns the filtered clinical trials data as a JSON response.

Dependencies:
- Flask: pip install Flask
- All other dependencies are included in the requirements.txt file.

Usage:
- Run the Flask server using the command: python server.py
- The server will be accessible at http://localhost:5000/

Note:
- This script assumes that the Excel files are stored in the 'data' folder.
- The 'ctg-studies.csv' file is used for clinical trials data.
- The 'data' folder and 'ctg-studies.csv' file should be present in the same directory as this script.
- The 'build' folder of the React frontend should be present in the 'client' folder at the same level as this script.
- The React frontend should be built using 'npm run build' before running this server.
- The server can be run in development mode (debug=True) or production mode (using Waitress).
- The server is configured to allow CORS for all origins on all routes.

'''

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
import re

# Set logging level for matplotlib.font_manager to WARNING
logging.getLogger('matplotlib.font_manager').setLevel(logging.WARNING)

# app = Flask(__name__)
app = Flask(__name__, static_folder="../client/build", static_url_path="/")
app.json.sort_keys = False
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow CORS for all origins on all routes

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Set default font family for Matplotlib
matplotlib.rcParams['font.family'] = 'Arial'

# Function to clean text (removes non-alphanumeric characters, including hyphens)
def clean_text(text):
    # Replace hyphens with spaces, remove other non-alphanumeric characters, and convert to uppercase
    text = re.sub(r'[-]', ' ', text)  # Replace hyphens with spaces
    return re.sub(r'[^A-Za-z0-9\s]', '', text).upper()


# Function to filter rows with wordwise match for 'Therapeutic Area' column
def wordwise_match(cell_value, search_term):
    input_words = set(clean_text(search_term).split())
    cell_words = set(clean_text(cell_value).split())
    return input_words.issubset(cell_words)

# Function to load data from multiple Excel files
def load_data(file_paths):
    path = os.getcwd()
    data_frames = []
    
    file_mapping = {
        '1': 'Germany_MA.xlsx',
        '2': 'Germany_Reimbursement.xlsx',
        '3': 'Europe_MA.xlsx',
        '4': 'USA_MA.xlsx',
        '5': 'Scotland_MA.xlsx',
        '6': 'Scotland_Reimbursement.xlsx',
        '7': 'Australia_MA.xlsx',
        '8': 'Australia_Reimbursement.xlsx',
        '9': 'UK_Reimbursement.xlsx',
        '10': 'UK_MA.xlsx',
        '11': 'France_MA.xlsx',
        '12': 'France_Reimbursement.xlsx',
        '13': 'Spain_MA.xlsx',
        '14': 'Spain_Reimbursement.xlsx',
        '15': 'Sweden_MA.xlsx',
        '16': 'Sweden_Reimbursement.xlsx',
        '17': 'Canada_MA.xlsx',
        '18': 'Canada_Reimbursement.xlsx',
        '19': 'South Korea_MA.xlsx',
        '20': 'Italy_MA.xlsx',
        '21': 'Brazil_MA.xlsx'
    }
    
    for file_id in file_paths:
        file_name = file_mapping.get(file_id)
        if file_name:
            file_path = os.path.join(path, 'data', file_name)
            df = pd.read_excel(file_path)
            df['Date of decision'] = pd.to_datetime(df['Date of decision'], errors='coerce', format='mixed')
            data_frames.append(df)
        else:
            logging.warning(f"No file mapping found for ID: {file_id}")
    
    # Combine all DataFrames
    combined_df = pd.concat(data_frames, ignore_index=True)
    # print(combined_df) 
    return combined_df


# Function to filter data based on criteria
def filter_data(df, column_name, search_term, start_date, end_date):
    logging.debug(f"Start date: {start_date}, End date: {end_date}, Column: {column_name}, Term: {search_term}")

    # Check if 'Date of decision' column exists and contains non-null values
    if 'Date of decision' in df.columns and df['Date of decision'].notna().any():
        # Remove the rows with empty 'Date of decision' column if start_date or end_date is provided
        if start_date is not None or end_date is not None:
            # replace NaT with None
            df['Date of decision'] = df['Date of decision'].where(pd.notnull(df['Date of decision']), None)

    if start_date and end_date:
        df = df.dropna(subset=['Date of decision'])
        start_date = pd.to_datetime(start_date, errors='coerce')
        end_date = pd.to_datetime(end_date, errors='coerce')
        df = df[(df['Date of decision'] >= start_date) & (df['Date of decision'] <= end_date)]
    elif start_date:
        df = df.dropna(subset=['Date of decision'])
        start_date = pd.to_datetime(start_date, errors='coerce')
        df = df[df['Date of decision'] >= start_date]
    elif end_date:
        df = df.dropna(subset=['Date of decision'])
        end_date = pd.to_datetime(end_date, errors='coerce')
        df = df[df['Date of decision'] <= end_date]
    # else case if the Date of decision is empty 

    df['Date of decision'] = df['Date of decision'].fillna('-')

    # Column-based filtering logic
    if column_name and search_term:
        if column_name == 'Therapeutic Area':
            # Apply wordwise match logic for the 'Therapeutic Area' column
            df = df[df[column_name].apply(lambda x: wordwise_match(x, search_term) if pd.notnull(x) else False)]
        else:
            # Regular filtering for other columns
            df = df[df[column_name].astype(str).str.contains(search_term, case=False, na=False, regex=False)]

    logging.debug(f"Filtered data: {df.head()}")

    df = df.dropna(axis=1, how='all')  # Remove columns with all missing values
    df = df.where(pd.notnull(df), None)  # Replace NaN with None

    result = [OrderedDict(zip(df.columns, row)) for row in df.values]

    
    # Determine the status column
    st = ''
    if "Market Authorization Status" in df.columns:
        st = "Market Authorization Status"
    elif "Reimbursement Status" in df.columns:
        st = "Reimbursement Status"
    
    # no viz if no status column
    if st:
        color_list = ['#1f77b4', '#ff7f0e', '#2ca02c', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']
        grouped_counts = df[st].value_counts()
        status_color_map = dict(zip(grouped_counts.index, color_list))

        #donut chart
        fig, ax = plt.subplots(figsize=(4,3))
        wedges, texts, autotexts = ax.pie(grouped_counts.values, labels=grouped_counts.index,
                                        autopct=lambda pct: f'{int(round(pct / 100 * sum(grouped_counts.values)))}',
                                        startangle=120, colors=[status_color_map.get(status, 'gray') for status in grouped_counts.index],
                                        wedgeprops={'edgecolor': 'white'})
        ax.axis('equal')
        centre_circle = plt.Circle((0, 0), 0.70, color='white')
        ax.add_artist(centre_circle)
            
        plt.setp(texts, size=8)
        plt.setp(autotexts, size=8)

        # Adjust title position and add padding
        fig.subplots_adjust(top=0.85)
        ax.set_title('Number of Decisions', fontsize=16, weight='bold', pad=20)
        ax.legend(fontsize=8, loc='upper center', bbox_to_anchor=(0.5, -0.1), fancybox=True, shadow=True, ncol=1)
            
        # Save the donut chart to a bytes buffer
        donut_buf = io.BytesIO()
        plt.savefig(donut_buf, format='png', bbox_inches='tight')
        donut_buf.seek(0)
        donut_chart = base64.b64encode(donut_buf.getvalue()).decode('utf-8')
        plt.tight_layout()
        plt.close(fig)

        # Generate the bar chart
        def wrap_text(text, max_length=30, max_lines=2):
            lines = []
            while len(text) > 0 and len(lines) < max_lines:
                # Find the last space within the max_length limit
                wrap_index = text.rfind(' ', 0, max_length)
                if wrap_index == -1:
                    # No spaces found; break at max_length
                    wrap_index = max_length
                lines.append(text[:wrap_index].strip())
                text = text[wrap_index:].strip()

            # If there's leftover text and we're on the last line, truncate it
            if len(lines) == max_lines and len(text) > 0:
                lines[-1] = lines[-1][:max_length - 3] + '...'  # Append '...' to indicate truncation

            return '\n'.join(lines)

        op=''
        if "Therapeutic Area" in df.columns and not df["Therapeutic Area"].isnull().all():
            op = "Therapeutic Area"
        elif "Manufacturer" in df.columns and not df["Manufacturer"].isnull().all():
            op = "Manufacturer"
        #no bar chart if either columns are absent
        if op:
            top_areas = df[op].value_counts().head(5).index.tolist()
            nested_dict = {}

            for area in top_areas:
                subset_df = df[df[op] == area]
                status_counts = subset_df[st].value_counts().to_dict()
                nested_dict[area] = status_counts

            therapeutic_areas = list(nested_dict.keys())
            therapeutic_areas_sorted = sorted(therapeutic_areas, key=lambda area: sum(nested_dict[area].values()), reverse=False)
                
            fig, ax = plt.subplots(figsize=(6,3))
            bar_width = 0.25
            bar_positions = np.arange(len(therapeutic_areas_sorted))

            for i, status in enumerate(grouped_counts.index):
                counts_sorted = [nested_dict[area].get(status, 0) for area in therapeutic_areas_sorted]
                bars = ax.barh(bar_positions - bar_width / 2 + i * bar_width, counts_sorted, height=bar_width, label=status, color=status_color_map.get(status, 'gray'))
                for bar, value in zip(bars, counts_sorted):
                    if value>0:
                        ax.annotate(f'{value}', xy=(bar.get_width(), bar.get_y() + bar.get_height() / 2), 
                                    xytext=(5, 0), textcoords='offset points',
                                    ha='left', va='center', fontsize=10)

            wrapped_labels = [wrap_text(label, max_length=60) for label in therapeutic_areas_sorted]
            ax.set_yticks(bar_positions)
            ax.set_yticklabels(wrapped_labels, fontsize=10)
            ax.legend(fontsize=10, loc='upper center', bbox_to_anchor=(0.5, -0.15), fancybox=True, shadow=True, ncol=1)
            ax.tick_params(axis='x', which='major', labelsize=10, length=3)
            ax.set_xlabel('Count', fontsize=10)
                
            # Adjust title position and add padding
            fig.subplots_adjust(top=0.9)
            ax.set_title("Top 5 "+op+" by Status", fontsize=16, weight='bold', pad=20,loc="left")
            ax.set_aspect('auto')
            # Save the bar chart to a bytes buffer
            bar_buf = io.BytesIO()
            plt.savefig(bar_buf, format='png', bbox_inches='tight')
            bar_buf.seek(0)
            bar_chart = base64.b64encode(bar_buf.getvalue()).decode('utf-8')
            plt.close(fig)
            legend=ax.legend()
            num_legends=len(legend.get_texts())
            if num_legends>9:
                bar_chart=None
                donut_chart=None
        else: 
            bar_chart=None
    else:
        donut_chart=None
        bar_chart=None

    return {
        'results': result,
        'visualization1': donut_chart,
        'visualization2': bar_chart
   }

clinical_trials_data = None

def load_clinical_trials_data():
    global clinical_trials_data
    if clinical_trials_data is None:
        path = os.getcwd()
        file_path = r'data/ctg-studies.csv'
        file_path = os.path.join(path, file_path)
        clinical_trials_data = pd.read_csv(file_path)
    return clinical_trials_data

# Function to filter clinical trials data based on criteria
def filter_clinical_trials(df, column_name, search_term):
    if column_name and search_term:
        df = df[df[column_name].astype(str).str.contains(search_term, case=False, na=False, regex=False)]
    df = df.dropna(axis=1, how='all')  # Remove columns with all missing values
    df = df.where(pd.notnull(df), None)  # Replace NaN with None
    result = [OrderedDict(zip(df.columns, row)) for row in df.values]
    return result

# Route to return Hello World on homepage
@app.route('/')
def helloworld():
    return 'Hello World!!'

# Route to handle POST requests for data filtering
@app.route('/filter', methods=['OPTIONS', 'POST'])
def filter_data_route():
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
        return '', 200, headers
    
    data = request.get_json()
    file_paths = data.get('file_paths')
    column_name = data.get('column_name', '')
    search_term = data.get('search_term', '')
    start_date = data.get('start_date')
    end_date = data.get('end_date')
    if not file_paths: 
        return jsonify([])  # Return an empty list if no file path is provided

    try:
        df = load_data(file_paths)
        results = filter_data(df, column_name, search_term, start_date, end_date)
        return jsonify(results)
    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        return jsonify({'error': str(e)}), 500
    
@app.route('/studies', methods=['POST'])
def filter_clinical_trials_route():
    data = request.get_json()
    column_name = data.get('column_name', '')
    search_term = data.get('search_term', '')

    try:
        df = load_clinical_trials_data()
        results = filter_clinical_trials(df, column_name, search_term)
        return jsonify(results)
    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        return jsonify({'error': str(e)}), 500

mode = 'prod'

if __name__ == "__main__":
    if mode == 'dev':
        app.run(debug=True)
    elif mode == 'prod':
        serve(app,host="localhost",port=5000,threads=7)
