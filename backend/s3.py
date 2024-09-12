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
import textwrap

# ... (keep the existing imports and setup)

def wrap_labels(labels, max_words=7):
    """Wrap labels to a maximum number of words."""
    return ['\n'.join(textwrap.wrap(label, width=max_words*10, max_lines=3, break_long_words=False)) for label in labels]

def filter_data(df, column_name, search_term, start_date, end_date):
    logging.debug(f"Start date: {start_date}, End date: {end_date}, Column: {column_name}, Term: {search_term}")

    # Create a copy of the original dataframe
    filtered_df = df.copy()

    # Convert 'Date of decision' to datetime, replacing NaT with None
    filtered_df['Date of decision'] = pd.to_datetime(filtered_df['Date of decision'], errors='coerce')
    
    # Apply date filtering only if both start_date and end_date are provided
    if start_date and end_date:
        start_date = pd.to_datetime(start_date, errors='coerce')
        end_date = pd.to_datetime(end_date, errors='coerce')
        
        # Remove rows with NaT 'Date of decision' only when date filtering is applied
        date_mask = filtered_df['Date of decision'].notna()
        date_mask &= (filtered_df['Date of decision'] >= start_date) & (filtered_df['Date of decision'] <= end_date)
        filtered_df = filtered_df[date_mask | filtered_df['Date of decision'].isna()]
    elif start_date:
        start_date = pd.to_datetime(start_date, errors='coerce')
        date_mask = filtered_df['Date of decision'].notna() & (filtered_df['Date of decision'] >= start_date)
        filtered_df = filtered_df[date_mask | filtered_df['Date of decision'].isna()]
    elif end_date:
        end_date = pd.to_datetime(end_date, errors='coerce')
        date_mask = filtered_df['Date of decision'].notna() & (filtered_df['Date of decision'] <= end_date)
        filtered_df = filtered_df[date_mask | filtered_df['Date of decision'].isna()]

    # Apply column name and search term filtering
    if column_name and search_term:
        filtered_df = filtered_df[filtered_df[column_name].astype(str).str.contains(search_term, case=False, na=False, regex=False)]

    logging.debug(f"Filtered data: {filtered_df.head()}")

    filtered_df = filtered_df.dropna(axis=1, how='all')  # Remove columns with all missing values
    filtered_df = filtered_df.where(pd.notnull(filtered_df), None)  # Replace NaN with None

    result = [OrderedDict(zip(filtered_df.columns, row)) for row in filtered_df.values]

    # Determine the status column
    st = ''
    if "Market Authorization Status" in filtered_df.columns:
        st = "Market Authorization Status"
    elif "Reimbursement Status" in filtered_df.columns:
        st = "Reimbursement Status"
    
    # Generate visualizations only if status column exists
    donut_chart = None
    bar_chart = None
    if st:
        color_list = ['#1f77b4', '#ff7f0e', '#2ca02c', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']
        grouped_counts = filtered_df[st].value_counts()
        status_color_map = dict(zip(grouped_counts.index, color_list))

        # Generate donut chart
        fig, ax = plt.subplots(figsize=(4,3))
        wedges, texts, autotexts = ax.pie(grouped_counts.values, 
                                          labels=wrap_labels(grouped_counts.index),
                                          autopct=lambda pct: f'{int(round(pct / 100 * sum(grouped_counts.values)))}',
                                          startangle=120, 
                                          colors=[status_color_map.get(status, 'gray') for status in grouped_counts.index],
                                          wedgeprops={'edgecolor': 'white'})
        ax.axis('equal')
        centre_circle = plt.Circle((0, 0), 0.70, color='white')
        ax.add_artist(centre_circle)
            
        plt.setp(texts, size=8)
        plt.setp(autotexts, size=8)

        fig.subplots_adjust(top=0.85)
        ax.set_title('Number of Decisions', fontsize=16, weight='bold', pad=20)
        ax.legend(fontsize=8, loc='upper center', bbox_to_anchor=(0.5, -0.1), fancybox=True, shadow=True, ncol=1)
            
        donut_buf = io.BytesIO()
        plt.savefig(donut_buf, format='png', bbox_inches='tight')
        donut_buf.seek(0)
        donut_chart = base64.b64encode(donut_buf.getvalue()).decode('utf-8')
        plt.close(fig)

        # Generate bar chart
        op=''
        if "Therapeutic Area" in filtered_df.columns and not filtered_df["Therapeutic Area"].isnull().all():
            op = "Therapeutic Area"
        elif "Manufacturer" in filtered_df.columns and not filtered_df["Manufacturer"].isnull().all():
            op = "Manufacturer"
        
        if op:
            top_areas = filtered_df[op].value_counts().head(5).index.tolist()
            nested_dict = {}

            for area in top_areas:
                subset_df = filtered_df[filtered_df[op] == area]
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
                                    ha='left', va='center', fontsize=8)

            wrapped_labels = wrap_labels(therapeutic_areas_sorted)
            ax.set_yticks(bar_positions)
            ax.set_yticklabels(wrapped_labels, fontsize=8)
            ax.legend(fontsize=8, loc='upper center', bbox_to_anchor=(0.5, -0.15), fancybox=True, shadow=True, ncol=1)
            ax.tick_params(axis='x', which='major', labelsize=8, length=3)
            ax.set_xlabel('Count', fontsize=10)
                
            fig.subplots_adjust(top=0.9)
            ax.set_title(f"Top 5 {op} by Status", fontsize=16, weight='bold', pad=20, loc="left")
            ax.set_aspect('auto')
            
            bar_buf = io.BytesIO()
            plt.savefig(bar_buf, format='png', bbox_inches='tight')
            bar_buf.seek(0)
            bar_chart = base64.b64encode(bar_buf.getvalue()).decode('utf-8')
            plt.close(fig)

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