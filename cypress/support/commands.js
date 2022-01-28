// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('CloseCall', (wrPHNUM) =>
{
  //Selecting Close Call Reason Dropdown..
  cy.get('#selected-roles-reason-select').click({force:true})

  //Selecting Close Call Reason from the dropdown..
  cy.get('#selected-roles-reason-select_6').click({force:true})

  cy.get('#selected-roles-reason-select').invoke('text').as('calldip')
  cy.get('#close-call-confirmation-checkbox-input').click({force:true})
  cy.get('#close-call-confirmation-checkbox_label').invoke('text').as('ConfNum')
  cy.get('#close-call-phone-number-text').type(wrPHNUM)

  //Assertion to check if Close Call button is enabled after filling required fields in Close Call Widget.
  cy.get('#save-close-close-call-button').should('be.enabled')

  //Clicking Save&Close call Button in Close Call widget
  cy.get('#save-close-close-call-button').click({force:true})
})
