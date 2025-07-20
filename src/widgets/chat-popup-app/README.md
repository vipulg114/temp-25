# Chat Popup App

## Overview
The Chat Popup App is a React-based application that provides a chat interface for users to interact with an AI assistant. The application utilizes various widgets to display different types of responses, including text, lists, and charts.

## File Structure
```
chat-popup-app
├── src
│   ├── ChatWidget.js          # Main chat widget component managing the chat interface
│   └── widgets
│       ├── ChartWidget.js     # Component for displaying trends using Chart.js
│       ├── ListWidget.js      # Component for displaying lists with fade-in effects
│       ├── TextWidget.js      # Component for displaying text with a typing effect
│       └── CsvWidget.js       # Component for displaying CSV data in a structured format
├── package.json               # Configuration file for npm, listing dependencies and scripts
└── README.md                  # Documentation for the project, including setup and usage details
```

## Installation
To get started with the Chat Popup App, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd chat-popup-app
   ```

2. Install the dependencies:
   ```
   npm install
   ```

## Usage
To run the application, use the following command:
```
npm start
```
This will start the development server and open the application in your default web browser.

## Components
- **ChatWidget**: The main component that handles user input and displays messages.
- **ChartWidget**: A widget that uses Chart.js to visualize trends based on provided data.
- **ListWidget**: Displays a list of items with a fade-in effect.
- **TextWidget**: Shows text with a typing effect, gradually revealing characters.
- **CsvWidget**: Renders CSV data in a structured format.

## Dependencies
The project relies on the following key dependencies:
- **React**: A JavaScript library for building user interfaces.
- **Chart.js**: A library for creating charts and visualizations.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.