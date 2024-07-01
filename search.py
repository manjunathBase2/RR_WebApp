import pandas as pd

def search_excel(file_path, column_name, search_term):
    # Load the Excel file into a DataFrame
    df = pd.read_excel(file_path)
    
    # Check if the column exists in the DataFrame
    if column_name not in df.columns:
        raise ValueError(f"Column '{column_name}' not found in the Excel file.")
    
    # Search for the term in the specified column
    result_df = df[df[column_name].astype(str).str.contains(search_term, case=False, na=False)]
    
    return result_df

# Example usage
if __name__ == "__main__":
    file_path = r"E:\Roche Project docs - SASTRA\PA AUTOMATION\drive-download-20240611T185737Z-001\Germany_Reimbursement.xlsx"
    column_name = input("Enter the column name you want to search in: ")
    search_term = input("Enter the search term: ")
    
    try:
        result = search_excel(file_path, column_name, search_term)
        print("Search Results:")
        print(result)
    except ValueError as e:
        print(e)
