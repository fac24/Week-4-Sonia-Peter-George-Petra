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

const { execFileSync } = require("child_process");

module.exports = (on, config) => {
  on("task", {
    resetDb: () => {
      console.log("Resetting DB...");
      return execFileSync("./scripts/populate_db");
    },
  });
};
