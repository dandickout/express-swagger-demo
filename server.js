const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const port = 3000;
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
let _db;

const uri = process.env.MONGODB_URI; // Get the connection string from the .env file
const client = new MongoClient(uri, {serverSelectionTimeoutMS: 5000 });
//log the uri to make sure it's correct, include text to make it easier to find in the logs
//console.log('uri: ' + uri);
// log the client to make sure it's correct
//console.log(client);


// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer"
      },
      servers: ["http://localhost:3000"]
    }
  },
  // ['.routes/*.js']
    apis: ["server.js", "./routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware for parsing JSON bodies from POST requests
app.use(express.json());

//import routes from user_routes.js
const user_routes = require('./routes/user_routes');
app.use('/users', user_routes);

// Import routes from org_routes.js
const org_routes = require('./routes/org_routes');
app.use('/orgs', org_routes);

console.log('Connecting to MongoDB Atlas...');
const connectToMongoDB = async () => {
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    _db = client.db(process.env.ENVIRONMENT); // Replace 'staging' with environment tag
    app.locals.db = _db;

    // Start the server here
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
};

connectToMongoDB();
