# Setup Guide for R&R Data Explorer

## Prerequisites
- Ensure you have [Git](https://git-scm.com/downloads) installed.
- Install [Node.js](https://nodejs.org/) (which includes npm).
- Install [Python](https://www.python.org/downloads/) (version 3.6 or higher).

## Cloning the Repository
1. Open a terminal or command prompt.
2. Clone the repository:
    ```sh
    git clone https://github.com/manjunathBase2/RR_WebApp.git
    ```
3. Navigate to the project directory:
    ```sh
    cd RR_WebApp
    ```

## Frontend Setup (React with Vite)
1. Navigate to the frontend directory:
    ```sh
    cd prism_access
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
3. Start the development server:
    ```sh
    npm run dev
    ```
4. Open your browser and go to `http://localhost:5173` to see the running application.

## Backend Setup (Flask)
1. Navigate to the backend directory:
    ```sh
    cd backend
    ```
2. Create a virtual environment:
    ```sh
    python -m venv venv
    ```
3. Activate the virtual environment:
    - On Windows:
        ```sh
        venv\Scripts\activate
        ```
4. Install the dependencies:
    ```sh
    pip install -r requirements.txt
    ```
5. Run the Flask application using Waitress:
    ```sh
    python server.py
    ```
6. Open your browser and go to `http://localhost:5000` to see the running application.

## Additional Notes
- Ensure that both the frontend and backend servers are running simultaneously for the full application to work.
- If you encounter any issues, refer to the project's documentation or reach out to [manjunath.p@roche.com](mailto:manjunath.p@roche.com)
- The `server.py` file supports two modes: `dev` and `prod`.
  - **Development Mode (`dev`)**: This mode is used for development purposes. It enables debug mode in Flask, which provides detailed error messages and auto-reloads the server when code changes are detected. To run the server in development mode, set the `mode` variable to `'dev'` and execute the script.
  - **Production Mode (`prod`)**: This mode is used for deploying the application in a production environment. It uses the Waitress WSGI server to serve the Flask application. To run the server in production mode, set the `mode` variable to `'prod'` and execute the script.
