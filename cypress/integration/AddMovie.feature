Feature: Add Movie to the list
  As User
  I want to add movies to a list
  So that I can track the movies I've seen

  Scenario: Empty movies list
    Given I have no movies in my list
    When I visit the site
    Then I see an empty list

  Scenario: Add a movie to empty list
    Given I have no movies in my list
    When I visit the site
    And I add a movie with name "Matrix"
    Then I see a list with:
      | id | name   |
      | 1  | Matrix |

  Scenario: Add a movie to a list with items
    Then I have a list with:
      | id | name |
      | 1  | Dune |
    When I visit the site
    And I add a movie with name "Matrix"
    Then I see a list with:
      | id | name   |
      | 1  | Dune   |
      | 2  | Matrix |