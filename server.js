const express = require('express');
const app = express();
const port = 3000;
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
  //apis: ["server.js", "routes.js", "user_routes.js"]
    apis: ["server.js", "user_routes.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware for parsing JSON bodies from POST requests
app.use(express.json());

// Import routes from routes.js
const routes = require('./routes');
app.use('/', routes);

//import routes from user_routes.js
const user_routes = require('./user_routes');
app.use('/users', user_routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});