# poWallet Chrome Extension

## Overview
poWallet is a Chrome extension designed to provide secure cryptocurrency transactions by integrating an ML-based risk detection API. It helps users assess the risk associated with blockchain addresses in real-time.

![poWallet Chrome Extension](https://github.com/Tiramisu800/powallet-ex-wallet/assets/97789571/c76a3d33-ac6d-4b15-9994-f8cf10b9e224)
![poWallet Chrome Extension](https://github.com/Tiramisu800/powallet-ex-wallet/assets/97789571/de169fa7-95e8-48f0-b501-9382e73e44ee)
![poWallet Chrome Extension](https://github.com/Tiramisu800/powallet-ex-wallet/assets/97789571/277753ec-8c35-4ab1-a41e-25728e6d3923)
![poWallet Chrome Extension](https://github.com/Tiramisu800/powallet-ex-wallet/assets/97789571/4ba25f44-3722-4f12-b018-c8b3870a91e1)
![poWallet Chrome Extension](https://github.com/Tiramisu800/powallet-ex-wallet/assets/97789571/847d9399-d7a3-47c2-8e2d-c8fa671e3a7f)
![poWallet Chrome Extension](https://github.com/Tiramisu800/powallet-ex-wallet/assets/97789571/0dceb343-2f5f-4d7b-8a33-359fba68d9ec)





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
1.Open the poWallet extension from the Chrome toolbar.
2. Enter a wallet address to check its risk level.
3. The extension will display the risk assessment based on the [SCAN SCAM API](https://github.com/varenyeolad/scan-fraud-ml).



