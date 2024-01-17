# TourTitan

## Description

This is a web application developed using Angular and NestJS for CM.com.
The application facilitates ride-sharing among employees, allowing users to add, view, and join rides. Additionally, it provides full CRUD functionality for managing users and cars.

## Table of Contents

-   Features
-   Prerequisites
-   Installation
-   Usage
-   API Documentation

## Features

-   **Ride Management:**

    -   Add rides to share with other employees.
    -   View available rides.
    -   Join rides if they are available.

-   **User Management:**

    -   Full CRUD functionality for managing users.

-   **Car Management:**
    -   Full CRUD functionality for managing cars.

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   Node.js and npm installed.
-   Angular CLI installed (`npm install -g @angular/cli`).
-   NestJS installed (`npm install -g @nestjs/cli`).
-   Database (e.g., MongoDB, MySQL) configured and running.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/stefan-dekkers/TourTitan.git
    Install dependencies:
    Copy code.
    cd your-repository.
    npm install.
    Set up the database and configure connection settings in server/src/config/database.config.ts.
    ```

Start the NestJS server:

Copy code.

cd server.

npm run start.

Start the Angular application

Copy code.

cd client.

ng serve.

Open your browser and navigate to http://localhost:4200/ to access the application.

## Usage

Ride Management:

Navigate to the "Rides" section.
Add rides using the provided form.
View available rides.
Join rides if they are available.

User Management:
Navigate to the "Users" section.
Perform CRUD operations on users.

Car Management:
Navigate to the "Cars" section.
Perform CRUD operations on cars.

## API Documentation

For API documentation view the swagger UI docs.

Start the Angular application:
Copy code
cd client
ng serve
Open your browser and navigate to http://localhost:3000/api-docs to access the application.
