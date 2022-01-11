## Project description

This project is a pre-assignment for applying to Solita Dev Academy/spring 2022. The assignment was to create a web application that uses farm data that is fetched in CSV format.

**Database structure:**
- Farm database:
  - _id: String
  - name: String
  - measurements: Array[ObjectId]
- Measurement database:
  - _id: String
  - farm: ObjectId
  - type: String (options: pH, temperature, rainFall)
  - value: Number (pH: 0-14, temperature: -50-100,rainFall: 0-500)

## Technologies used:
- Frontend: React, Bootstrap, Jest(tests)
- Backend: Node.js, Express, Mongoose, Jest+Supertest(tests)
- E2E tests: Cypress
- Database: MongoDB Atlas

## Prerequisites for running the project:
- [Node](https://nodejs.org/en/download/) v16.13.1 with v8.1.2
- for sending backend requests: Visual Studio Code with [VSC Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- the project was created with macOS, other operating systems have not been tested


## Configurations:
- for the database connection to work, a .env file is needed at the root of the backend folder (provided privately if necessary)

## How to run the project?
- copy the project
- add a file named .env (see configurations)
- terminal commands (at the root of the corresponding file)
    - Frontend: `npm start` (runs at http://localhost:3000/)
    - Backend: `npm run dev` (development)/ `npm start (production) (runs at http://localhost:3001/)
    - to view data in the database, visit:
        - http://localhost:3001/api/farms 
        - http://localhost:3001/api/measurements

### How to run tests?
- backend: `npm run test`
- frontend: `CI=true npm test`
- E2E:
    - run frontend with `npm start`
    - run backend with `npm run start:test`
    - run Cypress with `npm run cypress:open`

## TODO:
### Weaknesses
- backend: 
    - fetching data from csv files is extremely slow!
    - measurement controller: start and end date according to UTC?
    - handling exceptions
- frontend
    - useState is not updated if database is modified
    - AddData component: select time when adding farm data 
    - error handling and error messages, e.g. required fields in forms or missing data
    - usability and visual look

### What next?
- More comprehensive tests
- User management and login
- Nicer visual look, css
