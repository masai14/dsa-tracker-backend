# dsa-tracker-backend
backend for dsa tracker

# Steps to install and run locally
- git clone https://github.com/masai14/dsa-tracker-backend.git
- npm install
- npm run server
- you should see the following messages if you installed successfully:
  "DSA Tracker Web App connected successfully to Express. Listening on port 2345..."
  "DSA Tracker Web App connected successfully to Mongoose."
  
# How to contribute
- create your branch with your name from main
- commit and push changes to your branch
- create pull request 
- once approved by other team members will be merged into main

# Base URL
DSA tracker API - https://dsa-tracker-api.herokuapp.com/

# Deployed repo
heroku git link - https://git.heroku.com/dsa-tracker-api.git

# Common Endpoints

## USER
- get all users ~ https://dsa-tracker-api.herokuapp.com/user (GET)(Required: Authorization)
- get user by token ~ https://dsa-tracker-api.herokuapp.com/user/details (GET)(Required: Authentication)
- delete a user ~ https://dsa-tracker-api.herokuapp.com/user/:id (DELETE)(Required: Authentication, Authorization)
- update a user ~ https://dsa-tracker-api.herokuapp.com/user/:id (PATCH - body needs to be passed {user fields})(Required: Authentication, Authorization)
- register ~ https://dsa-tracker-api.herokuapp.com/register (POST - body needs to be passed {user fields})
- login ~ https://dsa-tracker-api.herokuapp.com/login (POST - body needs to be passed {email, password})

## QUESTION
- get all questions ~ https://dsa-tracker-api.herokuapp.com/question (GET)(Required: Authentication, Authorization)
- get question by id ~ https://dsa-tracker-api.herokuapp.com/question/:id (GET)(Required: Authentication, Authorization)
- delete a question ~ https://dsa-tracker-api.herokuapp.com/question/:id (DELETE)(Required: Authentication, Authorization)
- update a question ~ https://dsa-tracker-api.herokuapp.com/question/:id (PATCH - body needs to be passed {question fields})(Required: Authentication, Authorization)
- create a question ~ https://dsa-tracker-api.herokuapp.com/user (POST - body needs to be passed {question fields})(Required: Authentication)
- get questions of a specific user ~ https://dsa-tracker-api.herokuapp.com/question/user/:userid (GET)(Required: Authentication, Authorization)