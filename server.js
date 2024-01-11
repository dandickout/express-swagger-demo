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
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


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
    apis: ["server.js", "routes/user_routes.js", "routes/org_routes.js"]
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
client.connect((err) => {
  if (err) {
      console.error('Error connecting to MongoDB Atlas:', err);
      process.exit(1);
  }
  console.log('Connected to MongoDB Atlas');
  _db = client.db();
  app.locals.db = _db; // Pass the connection to the express app

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
