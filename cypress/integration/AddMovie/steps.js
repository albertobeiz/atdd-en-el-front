/* eslint-disable no-undef */
/// <reference types="Cypress" />
import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given("I have no movies in my list", () => {});

When("I visit the site", () => {
  cy.visit("http://localhost:3000/");
});

When("I add a movie with name {string}", (movieName) => {
  cy.intercept({ url: "/movies/", method: "POST" }, {}).as("postMovie");

  cy.get("input[id=name]").type(movieName);
  cy.get("button[type=submit]").click();

  cy.wait("@postMovie")
    .its("request.body")
    .should("deep.equal", JSON.stringify({ name: movieName }));
});

Then("I see an empty list", () => {
  cy.contains("No movies in your list");
});

Then("I see a list with:", (dataset) => {
  dataset.rawTable.slice(1).forEach(([index, movieName]) => {
    cy.contains(index);
    cy.contains(movieName);
  });
});
