Feature: Login

  Scenario: User login success
   #  Given the app launch
    Given the user click button login by email
    When the user input "pokohix445@operades.com" and "Bimopuspa_12"
    When the user click button enter
    Then the user should see the home page with the scroll view
