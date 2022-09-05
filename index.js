const express = require("express");
const dotenv = require("dotenv");
const formidable = require("express-formidable");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cors = require('cors');
const app = express();
const PORT = 8099;

// load env variable
dotenv.config();

// load swagger json
swaggerDocument = require("./swagger.json");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Car Management API",
      version: "1.0.0",
    },
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ["./routes/routes.js"],
};

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const specs = swaggerJsdoc(options);

app.use(formidable());
app.use(require("./routes/routes.js"));

app.use(cors(corsOptions));
// api swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.info(`Server running at localhost:${PORT}`);
});
