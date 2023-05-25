# Express.js Store API

This is a simple Store API built using Express.js framework. It provides basic functionalities for managing products and orders in a store.

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
cd 02-Store-API
```

3. Install the dependencies:

```
npm install
```

4. Start the server:

```
npm start
```

By default, the server will run on `http://localhost:5000`.

## API Endpoints

The following API endpoints are available:

### Products

- `GET /api/v1/products/static`: Get all products static
- `GET /api/v1/products`: Get all products

### Filters 

?sort=price - sort for price
?numericFilter=price>100,rating>4.6 - filter for price or/and rating
?name - filter by name
?company - filter by company

## Data Structure

The API uses the following data structure for products and orders:

### Product model

```json
{
    name: {
        type: String,
        required:[true, 'product name must be provided']
    },
    price: {
        type: Number,
        required:[true, 'product price must be provided'],
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        }
    }
}
```

## Testing the API

You can use tools like Postman or cURL to test the API endpoints.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to open an issue or submit a pull request.
