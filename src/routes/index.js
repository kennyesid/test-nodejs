const { Router } = require("express");
const userRoute = require("./userRoute");

const routes = Router();

routes.use("/api/v1/user", userRoute);
module.exports = routes;
