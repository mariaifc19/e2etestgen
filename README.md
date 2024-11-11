# Test Automation Framework with Playwright & Axios

This repository contains a test automation framework for both UI and API testing using Playwright and Typescript. For API testing, it also uses Axios (a promise-based HTTP Client for node.js and the browser).


## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [UI Test Automation with Playwright](#ui-test-automation-with-playwright)
- [API Test Automation with Axios](#api-test-automation-with-axios)
- [Running the Tests](#running-the-tests)

## Introduction

This project provides a framework for automated testing of both web user interfaces (UI) and APIs. 

- **UI Testing**: Uses [Playwright](https://playwright.dev/) to automate browser interactions and validate the UI functionality for [Airalo website](https://www.airalo.com).
- **API Testing**: Uses [Axios](https://axios-http.com/) to send HTTP requests and validate API responses for [Airalo Partner API](https://partners-doc.airalo.com/) .

## Prerequisites

To get started with this project, ensure that you have the following installed:

- **Node.js** (v16+ recommended): [Install Node.js](https://nodejs.org/)
- **npm** or **yarn** (npm is included with Node.js)
- **Playwright** browser dependencies (which are installed automatically via the Playwright package)
- **Visual Studio Code** IDE used develop framework

## Project Structure

Here’s a brief overview of the project structure:

```bash
.
├── src/
│   ├── api/
│   │   ├── tests/             # API test files
│   │   ├── utils/             # Helper functions for API tests
│   ├── ui/
│   │   ├── pages/             # Page Object Model (POM) files for UI tests
│   │   ├── tests/             # Test files for UI
│   │   ├── utils/             # Helper functions for UI tests
├── test-results/              # Directory where test results will be stored
├── package.json               # Project dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── playwright.config.ts#      # Playwright configuration
└── README.md                  # Project documentation (this file)
└── .gitignore                 # File with what to ignore when commiting to github repo
```

## Setup & Installation

- Clone the repository

```shell script
git clone https://github.com/your-repo/e2etestgen.git
cd e2etestgen
```

- Install dependencies
Run the following command to install the required dependencies:

```shell script
npm install
```
This will install the necessary libraries for Playwright, Axios, and TypeScript.

- Install Playwright Browsers
To run Playwright tests, you need to install the necessary browsers. Run the following command to install them:
```shell script
npx playwright install
```
This will download and install the supported browsers (Chromium, Firefox, and WebKit) for your automation tests.

## Running Tests

Running UI Tests
Playwright is used to automate the UI interactions, such as navigating through pages, clicking buttons, and verifying elements on the page. 

Run UI tests in browser chromium (considered as the most critical browser for this testing scope):
```shell script
npm run test:ui
```

Run UI tests in firefox browser:
```shell script
npm run test:ui-firefox
```

Run UI tests in webkit browser:
```shell script
npm run test:ui-webkit
```

Running API Tests

To run the API tests, use the following npm command:
```shell script
npm run test:api
```

## Generating Tests Reports
The framework is integrated with two types of reporting: Built-in Html report and [Allure report](https://allurereport.org/docs/). Screenshot and video are taken in case test fails.
Reports will be generated after the 

Generate built-in html report:
```shell script
npx playwright show-report
```

Generate Allure report:
```shell script
allure serve allure-results
```

## Test Cases Approach
Here it is described the approach test cases design.

### UI test:
- **Test objective**: Validate functionality of view package details
- **Test Scenario**: 
  1. Open Home page
  2. Search data packages for local "Japan"
  3. Click on the first Buy now button
  4. Validate title, coverage, data, validity and price according to what is described ar ./preferred-package-test-data.json.
- **Technical implementation**: Test case was developed using Page Object Model pattern. With the support of Playwright Projects Browser fixtures, tests can run for different browsers.
- **Environment**: Chromium was considered the default browser for test execution. For checking the compatibility, test can be run for webkit and firefox browsers as well.

### API test:
**Test objective**: Validate functionality of POST v2/orders and get v2/sims endpoints
Test Scenarios**: 
  - TC1: 
  
  Steps:
  1. Call POST /token

  Expected results:
- Response status is 200
- access_token is not undefined
- token is valid (current time in seconds is less then token expiration time).
  
  - TC2: 
  
  Precondition:
  1. Call POST token
  
  Steps:
  1. Call POST /order
  
  Expected results:
  - response status is 200
  - number of sims in response is 6
  - package_id is merhaba-7days-1gb 
  - esim type is prepaid
  - each sim in the response has one non-empty id (sim id is truthy)

- TC3: 
  Precondition:
  1. Call POST token
  
  Steps:
  1. Call POST /order 
  2. Call GET /sims

  Expected results:
  - response status is 200
  - for each sim in the response: id is non-empty, is_roaming is true and iccid is non-empty
  
- **Technical implementation**: Developed client using Axios and developed http requests in api-client.ts file. Logic to check if token is valid happens inside the http request itself to keep the test file only of requests calls and validations.
- **Environment**: Chromium was considered the default browser for test execution. For checking the compatibility, test can be run for webkit and firefox browsers as well.. 