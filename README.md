# Table of Contents #

- [Coffee IT API](#coffee-it-api)
- [Purpose](#purpose)
- [Prerequisites](#prerequisites)
- [Basic Instructions](#basic-instructions)
- [Using Docker](#using-docker)
- [API Documentation](#api-documentation)
- [Code Structure](#code-structure)
- [Comments](#comments)


## Coffee IT API
A Weather app that saves cities records based upon user queries and updates them on regular intervals

## Purpose
To asses and evaluate my abilities for Backend Development


### Prerequisites
- Nodejs v15.x or above
- MongoDB server (Remote or local)
- Port
- Git
- Docker


### Basic Instructions

1. Clone repository.
2. `npm install` to install all the packages described in manifest.
3. `cd coffeeit-api` and open `.env` file and you can change the Cron Job interval or mongodb Connection string if you want. You can change the PORT from here as well.
4. `npm run build` to build the project.
5. `npm run start` to run the project.
6. `npm run start:dev` to debug.
7. `npm run test` to run tests.
8. `npm run lint` for static code analysis.

### Using Docker
1. `cd coffeeit-api`
2. `docker-compose up`
3. Note: As per requirement in assesment, I have provided connection string of my own mongodb Atlas hence there is only one service in `docker-compose.yml` file.

### API Documentation
  Open browser and hit `http://localhost:4000/api-docs/` for Swagger API Documenation

### Code Structure
I have tried to divide responsibilites hence created different directories for different aspects of application. Source Code is organized in following manner:
- src
  * main.ts : Entry point for application.
  * city
    * Contains DTOs, Service, Module and Controller for City
  * mongodbSchemas
    * Contains the database schemas
  * task-service
    * contains the cron job for updating Weather Data
  * utils
    * Contains helper modules/functions/schemas
  * weather
    * Contains DTOs, module and service for Weather Model.



### Comments
  * NestJS was completely a new paradigm for me and given the time frame and knowledge I tried my best to do it as good as possible
  * I have created the DTOs and Mongoose Schema for Future Weather data but could not completed it due to less time. Similarly Microservices within NestJs was somehow time taking and hence it is completely missing in this project.
  * I deliberately used javascript functions to manipulate the data, I could have used Aggregate functions but due to less knowledge of the mongoose, I took the other route just to solve the problem.
  * I have added .env in git because credentials were required in the assignment.