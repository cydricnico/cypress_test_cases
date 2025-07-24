# 🏦 Cypress Test Automation for Parabank Website

## ✨ Features of the Parabank Website
- 🔒 Open New Account
- 📱 Accounts Overview
- 💱 Transfer Funds
- 💸 Bill Pay
- 🔎 Find Transactions
- 🔢 Update Contact Info
- 🏦 Request Loan
- ⚙️ Log Out


# 🧪 Cypress Installation Guide

Follow these steps to install and set up Cypress in your project.

## ✅ Prerequisites

Before installing Cypress, make sure the following are installed:

- [Node.js (v12 or higher)](https://nodejs.org/en/download/)
- [npm (comes with Node.js)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

You can verify the installation by running:
```bash
node -v
npm -v

📦 Step 1: Initialize Your Project
### bash
npm init -y


⚒️ Step 2: Install Cypress as a development dependency
### bash
npm install cypress --save-dev

🧰 Step 3: Open Cypress Test Runner
Once installed, open Cypress for the first time with
### bash
npx cypress open

🛠 Step 4: Project Structure
Cypress will create this folder structure:
cypress/
  ├── e2e/         # Test specs go here
  ├── fixtures/    # Static test data
  ├── support/     # Custom commands and config
cypress.config.js  # Main config file

🧪 Step 5: Run Tests
You can run tests using:
npx cypress open    # GUI mode
npx cypress run     # Headless mode (CI)

💫 Created by: Nico


