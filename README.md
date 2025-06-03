# Setvi Technical Task

This repository is the result of my independent project for SETVI.

## What can you find here
* Quick summary about this repo: I spent 2 days on the realization and setting up this project. The JavaScript programming language was used to write the code. The URL for the endpoint I got for SETVI, and I had no intention of harming the company itself, but only to increase and improve my skills.
* Folder structure: inside the Cypress folder, there is an e2e folder containing a test file. The main class is located in the modules folder, which is also inside the cypress folder, and this class contains all the methods.
* Side information: To use the application in a special environment, the author accepts no responsibility if you cause damage to third parties
* Detailed bug report [5 positive, 5 negative](https://github.com/pavlovic-bojan/SetviTechnicalTask/blob/main/BUG_REPORT/BUG_REPORT.md)

##  How To Clone and Set Up a Project

### Install the dependencies
```bash
npm ci
```
### Run Cypress test locally in the terminal
* In the root folder, there is a .env.example file. If you want to run the project locally, you need to rename it to .env and fill it in with your own data.
```bash
npm run cy:run
```
### Clear Allure Report locally for the previous run
```bash
npm run allure:clear
```
### Generate Allure Report locally for the last run
```bash
npm run allure:report
```

## Execution of tests in CI/CD using GitHub Actions
Go to [Actions](https://github.com/pavlovic-bojan/SetviTechnicalTask/actions), then choose on the left side [Setvi Technical Task](https://github.com/pavlovic-bojan/SetviTechnicalTask/actions/workflows/main.yml), then on the right side click on Run workflow in the text box, insert branches if not want to run from the main branch, and then click on the  green button Run workflow.
***
[The results of the last test execution are visible at this link](https://pavlovic-bojan.github.io/SetviTechnicalTask/)
> In the meantime, if the owners changed something on the endpoint and some tests failed, maybe all the tests failed due to changes in the endpoint itself. I don't have any influence, nor is the company obliged to let me know about changes, because this project is only a demo project.

## A list of technologies used within the project
***
A list of technologies used within the project:
* [macOS Sonoma](https://support.apple.com/en-us/HT214032): macOS Sonoma Version 14.1.2 (23B92)
* [Intellij idea](https://www.jetbrains.com/idea/): Version 2022.3.3
* [Cypress](https://www.cypress.io/) Cypress 14.4.0
* [@shelex/cypress-allure-plugin](https://www.npmjs.com/package/@shelex/cypress-allure-plugin) @shelex/cypress-allure-plugin 2.41.2

Feel free to copy the project from this repository into your IDE, run the test, and make sure all the scenarios are automated.

## Collaboration
***
This is my project, which I upgrade with new things and test scenarios from time to time, and I do not accept any collaboration
> Please do not change the code. 
> I am available for any questions. <bojanpavlovicoffice@gmail.com>
