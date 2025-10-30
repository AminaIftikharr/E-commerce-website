# Project Title

## Description
This project is a backend application built with TypeScript and Express. It provides RESTful APIs for managing users, products, and orders. The application is structured to facilitate easy maintenance and scalability.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd server
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file based on the `.env.example` file and fill in the required environment variables.

## Usage
To start the server, run:
```
npm run start
```
For development mode with hot reloading, use:
```
npm run dev
```

## API Endpoints
- **Authentication**
  - `POST /api/auth/login` - Login a user
  - `POST /api/auth/register` - Register a new user

- **Products**
  - `GET /api/products` - Retrieve all products
  - `POST /api/products` - Create a new product
  - `PUT /api/products/:id` - Update a product
  - `DELETE /api/products/:id` - Delete a product

- **Orders**
  - `GET /api/orders` - Retrieve all orders
  - `POST /api/orders` - Create a new order

## Testing
To run the tests, use:
```
npm run test
```
Integration tests are located in the `tests/integration` directory, and unit tests are in the `tests/unit` directory.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.