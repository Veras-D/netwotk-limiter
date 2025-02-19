# Network Limiter for DevTools

<p align="center">
    <img src="https://github.com/user-attachments/assets/3a332416-5035-484e-92a6-d719c245716d" alt="Project Image">
</p>

## Overview

The **Network Limiter for DevTools** is a browser extension that allows developers to **simulate different network speeds** directly within Chrome's Developer Tools. It provides three modes for network speed simulation: **Slow**, **Medium**, and **Fast**. Additionally, you can disable the limitation altogether with the **No Limit** mode.

This extension is built using **React**, **TypeScript**, **Vite**, and **Node.js**.

---

## Features

- **Network Speed Modes**:  
  - **Slow**: Simulates slow network conditions.
  - **Medium**: Simulates a moderate network speed.
  - **Fast**: Simulates a fast network connection.
  - **No Limit**: Disables the speed limit (no simulation).

- Integrates directly with Chrome's **Developer Tools**.

---

## Technologies Used

- **React** – Frontend library for building the user interface.
- **TypeScript** – A typed superset of JavaScript for better code quality and maintainability.
- **Vite** – A build tool for fast and optimized development.
- **Node.js** – JavaScript runtime for the backend logic.

---

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/veras-d/network-limiter.git
   ```

2. Install dependencies:
   ```bash
   cd network-limiter
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. After building, follow the steps to **load the extension** in your browser (Chrome):

   - Open Chrome and go to `chrome://extensions/`.
   - Enable **Developer mode**.
   - Click **Load unpacked** and select the `dist` folder inside the project directory.

5. Once the extension is loaded, you can access it from the **Developer Tools** in Chrome. 

---

## Usage

After loading the extension, follow these steps to use it:

1. Open **Chrome Developer Tools** (right-click on the page > **Inspect**).
2. Go to the **Network** tab.
3. You will find a new section for **Network Limiter** with options to choose between **Slow**, **Medium**, **Fast**, and **No Limit**.
4. Choose the desired speed mode to simulate network conditions in your web applications.

---

## Contributing

This project is for personal use and does not have specific contribution guidelines. However, feel free to fork the project and create a pull request with any improvements you think are useful!

---

## License

This project does not have a specific license at the moment. You can use and modify it as per your requirements.
