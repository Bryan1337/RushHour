require('dotenv').config();
const fs = require('fs');

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  // Pass values from .env file to Cypress.env
  config.env.TEST_USER = process.env.TEST_USER || 'TestUser@example.com';

  config.env.TEST_FREE_USER = process.env.TEST_FREE_USER
  config.env.TEST_FREE_PASSWORD = process.env.TEST_FREE_PASSWORD

  on('task', {
    readDir: (dir) => fs.existsSync(dir) ? fs.readdirSync(dir) : null,
    readFile: (dir) => fs.existsSync(dir) ? fs.readFileSync(dir) : null,
  })
  return config;
}
