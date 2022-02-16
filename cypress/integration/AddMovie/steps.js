/* eslint-disable no-undef */
/// <reference types="Cypress" />
import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given("I have no movies in my list", () => {});

When("I visit the site", () => {
  cy.visit("http://localhost:3000/");
});

When("I add a movie with name {string}", (movieName) => {
  cy.get("input[id=name]").type(movieName);
  cy.get("button[type=submit]").click();
});

Then("I see an empty list", () => {
  cy.contains("No movies in your list");
});
