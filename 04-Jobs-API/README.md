# Express.js Jobs API

This is a Jobs API built using Express.js framework. It provides endpoints to manage job listings, including creating, updating, deleting, and retrieving job information.

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
cd 04-Jobs-API
```

3. Install the dependencies:

```
npm install
```

4. Set up the database:

   - Create a new Mongo database.

6. Start the server:

```
npm start
```

By default, the server will run on `http://localhost:5000`.

## API Endpoints

The following API endpoints are available:

### Jobs

- `GET /jobs`: Get all jobs
- `GET /jobs/:id`: Get a single job by ID
- `POST /jobs`: Create a new job
- `PUT /jobs/:id`: Update a job by ID
- `DELETE /jobs/:id`: Delete a job by ID

## Data Structure

The API uses the following data structure for jobs:

```
JOBS:
company: {
        type: String,
        required: [true, 'Please provide company'],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, 'Please provide position'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
}, { timestamps: true })

USER:
name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6
    }
```

## Authentication

The API uses JWT for authentication the user and restrict the data for each user.

## Testing the API

You can use tools like Postman or cURL to test the API endpoints.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to open an issue or submit a pull request.
