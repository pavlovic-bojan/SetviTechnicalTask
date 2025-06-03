const { defineConfig } = require("cypress")
const allureWriter = require('@shelex/cypress-allure-plugin/writer')
const dotenv = require('dotenv')

dotenv.config()

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config)
      config.env.API_KEY = process.env.API_KEY
      config.env.API_URL = process.env.API_URL
      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    env: {
      allure: true
    },
    video: true,
    screenshotOnRunFailure: true
  }
})
