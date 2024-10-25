
# Dice Simulator and Visitor Logger

This project is a Node.js application demonstrating a dice simulator with graphical representation and a visitor logging system. It utilizes MongoDB for storing user data, Chart.js for displaying dice roll results, and Express.js as the server framework. The app also showcases cookie management and front-end user interaction using JavaScript and jQuery.

## Features
- **Dice Simulator:** Allows users to roll a virtual dice with customizable faces and roll counts, visualizing the results on a chart.
- **Visitor Logging:** Records visitor information (IP, user agent, language, etc.) in a MongoDB database, along with a unique user ID stored in a cookie.
- **CSS Styling:** Styled with [Spectre.css](https://picturepan2.github.io/spectre/) for a clean, minimalist look.

## Technologies Used
- **Node.js** and **Express** for the server
- **MongoDB** for database storage
- **Chart.js** for graphical data visualization of dice results
- **Spectre.css** for CSS styling
- **jQuery** for front-end scripting

## Installation

1. Clone the repository and navigate into the project folder:
    ```bash
    git clone <repository-url>
    cd dicenode
    ```

2. Install all necessary packages:
    ```bash
    npm install
    ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your MongoDB connection URI:
     ```plaintext
     MONGODB_URI=<your_mongodb_connection_string>
     ```

## Running the Application

Start the Express server:
```bash
npm start
```

For development with automatic restarts on file changes, use:
```bash
npm run dev
```

The app will be accessible on `http://localhost:3000`.

## Usage

### Dice Simulator
1. Visit the main page at `http://localhost:3000`.
2. Select the number of faces for the dice and the number of times to roll.
3. Click "Roll Dice" to generate results.
4. View the graphical representation of roll frequencies in a bar chart, powered by Chart.js.

### Visitor Logging
- When you access the page, the server checks for a unique user ID in cookies. If absent, it assigns a new ID.
- On each visit, the server logs the following details:
  - User IP
  - User agent
  - Browser language
  - Referer URL
- This data is saved in the MongoDB collection `collectedinfo` and can be retrieved or analyzed later.

## Project Structure

- **app.js**: Main server file initializing the Express app and middleware.
- **routes/**: Contains routes for dice simulation and visitor logging.
- **config/**: Includes database configuration and connection logic.
- **public/**: Static files, including JavaScript and CSS.
- **views/**: HTML templates rendered to the client.
  
## API Endpoints

### `GET /`
- Loads the main page and assigns a unique user ID if absent.

### `POST /`
- Simulates dice rolls.
- Request body:
  ```json
  {
    "diceFaces": <number>,
    "rollTimes": <number>
  }
  ```
- Response: JSON object with roll outcome frequencies.

### `POST /user-info`
- Collects and saves frontend and backend user data.
- Stores data in the `collectedinfo` collection in MongoDB.

## Learnings and Objectives

This project demonstrates:
- Implementing and visualizing a dice simulator using JavaScript, HTML Canvas, and Chart.js.
- Setting up and storing visitor information in MongoDB.
- Using Express to handle server-side operations, including cookie management and RESTful routes.
- Applying Spectre.css for a simple and responsive layout.

## License
This project is open-source and available under the ISC License.
