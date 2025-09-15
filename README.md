# Food Recipes
Food Recipes is a web application built with React for the frontend and Node.js/Express with MySQL for the backend.

## structure:
  - Frontend/: React application
  - Backend/: Node.js + Express backend
  - sql/: SQL queries

## setup:
  database:
    - import 'sql/foodrecipes.sql'.
    - Execute queries from the 'sql' folder.

### backend:
    path: Backend
    commands:
      - npm install
      - node server.js
    dependencies:
      - express
      - mysql
      - cors

### frontend:
    path: Frontend
    commands:
      - npm install
      - npm run build
      - npm start
