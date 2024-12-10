require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const routes = require("./routes");
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://kennyesidplatzi:v0ch22bKCkJbjwTg@cluster0.qfd1f.mongodb.net/usersdb"
);

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Mi API",
      version: "1.0.0",
      description: "Documentación de mi API",
    },
    servers: [
      {
        url: "http://localhost:4000/api/v1/user",
      },
    ],
  },
  apis: ["./routes/index.js"],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log("Server is running on http://localhost:" + process.env.PORT);
});
