# Expense Tracker RESTful API

A secure, robust, and production-ready RESTful API built with **Node.js**, **Express.js**, and **MongoDB** for managing personal expenses. Features secure JWT-based authentication, password hashing, strict resource ownership validation, and flexible date-based filtering.

## Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database & ODM:** MongoDB, Mongoose
* **Authentication:** JSON Web Tokens (JWT)
* **Security:** Bcrypt.js (Password Hashing)

## Features

* **User Authentication:** Secure sign-up and login workflows with hashed passwords and token generation.
* **Protected Routes:** Custom authentication middleware requiring a valid Bearer token for sensitive endpoints.
* **Resource Ownership & Security:** Strict verification ensuring users can only manage their own expenses; unauthorized modifications trigger security errors.
* **Dynamic Expense Filtering:** List past expenses using flexible filters:
  * Past week (`?filter=week`)
  * Past month (`?filter=month`)
  * Last 3 months (`?filter=3months`)
  * Custom date range (`?filter=custom&startDate=...&endDate=...`)
* **Full CRUD Operations:** Create, read, update, and delete expense records seamlessly tied to individual user accounts.

## API Endpoints Reference

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/sign-up` | Register a new user | Public |
| **POST** | `/login` | Authenticate user & issue JWT | Public |
| **POST** | `/expenses` | Add a new expense record | Protected |
| **GET** | `/expenses` | Retrieve user expenses (supports filters) | Protected |
| **DELETE** | `/expenses/:id` | Remove an expense by ID (with ownership check) | Protected |

## Getting Started

