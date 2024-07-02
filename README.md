# poWallet Chrome Extension

## Overview
poWallet is a Chrome extension designed to provide secure cryptocurrency transactions by integrating an ML-based risk detection API. It helps users assess the risk associated with blockchain addresses in real-time.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Features
- Integration with the SCAN SCAM API for real-time risk assessment
- User-friendly Chrome extension interface
- Secure wallet transactions
- Comprehensive logging and error handling

## Installation

### Prerequisites
- Google Chrome browser
- Node.js and npm

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/powallet-chrome-extension.git
   cd powallet-chrome-extension
2. Open terminal
   ```bash
   cd backend
   npm i
   node index.js
5. Open new terminal
    ```bash
    cd frontend
    npm i
    npm run start
    
### Load the extension in Chrome:

1. Open Chrome and go to chrome://extensions/.
2. Enable "Developer mode" by clicking the toggle switch.
3. Build app running
   ```bash
   npm run build
5. Click "Load unpacked" and select the extension build directory.

## Usage
Open the poWallet extension from the Chrome toolbar.
Enter a wallet address to check its risk level.
The extension will display the risk assessment based on the SCAN SCAM API.
