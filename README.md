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
- get all users ~ https://dsa-tracker-api.herokuapp.com/user (GET)
- get user by id ~ https://dsa-tracker-api.herokuapp.com/user/:id (GET)
- delete a user ~ https://dsa-tracker-api.herokuapp.com/user/:id (DELETE)
- update a user ~ https://dsa-tracker-api.herokuapp.com/user/:id (PATCH - body needs to be passed {user fields})
- create a user ~ https://dsa-tracker-api.herokuapp.com/user (POST - body needs to be passed {user fields})
- login ~ https://dsa-tracker-api.herokuapp.com/user/auth/login/ (POST - body needs to be passed {email, password})

## QUESTION
- get all questions ~ https://dsa-tracker-api.herokuapp.com/question (GET)
- get question by id ~ https://dsa-tracker-api.herokuapp.com/question/:id (GET)
- delete a question ~ https://dsa-tracker-api.herokuapp.com/question/:id (DELETE)
- update a question ~ https://dsa-tracker-api.herokuapp.com/question/:id (PATCH - body needs to be passed {question fields})
- create a question ~ https://dsa-tracker-api.herokuapp.com/user (POST - body needs to be passed {question fields})
- get questions of a specific user ~ https://dsa-tracker-api.herokuapp.com/question/user/:userid (GET)
- 
