const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const port = 3000;
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
let _db;

const uri = 'mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err) => {
    if (err) {
        console.error('Error connecting to MongoDB Atlas:', err);
        process.exit(1);
    }
    console.log('Connected to MongoDB Atlas');
    _db = client.db('<database>');
    app.locals.db = _db; // Pass the connection to the express app
});

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});