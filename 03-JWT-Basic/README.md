# Express.js JWT API

This is a simple API built using Express.js framework that demonstrates the usage of JSON Web Tokens (JWT) for authentication and authorization.

## Prerequisites

Make sure you have the following software installed on your system:

- Node.js
- npm (Node Package Manager)

## Getting Started

1. Clone the repository or download the source code:

```
git clone <repository-url>
```

2. Navigate to the project directory:

```
cd 03-JWT-Basic
```

3. Install the dependencies:

```
npm install
```

4. Configure the environment variables:

   - Create a `.env` file in the root directory.
   - Add the following variables to the `.env` file:
     ```
     JWT_SECRET=your_secret_key
     ```

   Replace `your_secret_key` with your preferred secret key for JWT token encryption.

5. Start the server:

```
npm start
```

By default, the server will run on `http://localhost:5000`.

## API Endpoints

The following API endpoints are available:

### Authentication

- `GET /api/v1/dashboard`: Get a random number as an authorized data
- `POST /api/auth/login`: Login and obtain a JWT token

## JWT Token

The JWT token is generated upon successful login and is required to access protected routes.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to open an issue or submit a pull request.
