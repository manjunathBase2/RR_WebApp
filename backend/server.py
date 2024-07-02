
from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

def search_excel(file_path, column_name, search_term):
    try:
        print(file_path)
        df = pd.read_excel(file_path)
        if column_name not in df.columns:
            return {'error': f"Column '{column_name}' not found in the Excel file."}, 400
        result_df = df[df[column_name].astype(str).str.contains(search_term, case=False, na=False)]
        return result_df.to_dict(orient='records')
    except Exception as e:
        return {'error': str(e)}, 500

@app.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    file_path = data.get('file_path')
    column_name = data.get('column_name')
    search_term = data.get('search_term')
    path=os.getcwd()
    if file_path=='1':
        file_path=r'data\Germany_MA.xlsx'
        file_path=os.path.join(path, file_path)
    elif (file_path=='2'):
        file_path=r'data\Germany_Reimbursement.xlsx'
        file_path=os.path.join(path, file_path)
    if not file_path or not column_name or not search_term:
        return {'error': 'File path, column name, and search term are required'}, 400

    try:
        results = search_excel(file_path, column_name, search_term)
        return jsonify(results)
    except Exception as e:
        return {'error': str(e)}, 500

if __name__ == "__main__":
    app.run(debug=True)


