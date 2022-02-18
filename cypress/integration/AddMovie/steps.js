/* eslint-disable no-undef */
/// <reference types="Cypress" />
import { Given, Then, When, Before } from "cypress-cucumber-preprocessor/steps";

let movies = [];

function addMovie(movieName) {
  movies.push({ id: movies.length + 1, name: movieName });
}

Before(() => {
  movies = [];

  cy.intercept({ url: "/movies/", method: "GET" }, (req) => {
    req.reply(movies);
  });

  cy.intercept({ url: "/movies/", method: "POST" }, (req) => {
    addMovie(req.body.name);
    req.reply({});
  }).as("postMovie");
});

Given("I have no movies in my list", () => {});

When("I visit the site", () => {
  cy.visit("http://localhost:3000/");
});

When("I add a movie with name {string}", (movieName) => {
  cy.get("input[id=name]").type(movieName);
  cy.get("button[type=submit]").click();

  cy.wait("@postMovie").its("request.body").should("deep.equal", { name: movieName });
});

Then("I see an empty list", () => {
  cy.contains("No hay películas añadidas");
});

Then("I see a list with:", (dataset) => {
  dataset.rawTable.slice(1).forEach(([index, movieName]) => {
    cy.contains(index);
    cy.contains(movieName);
  });
});
