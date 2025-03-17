import express from "express";
const api_endpoint = express();
import auth_route from "./auth.route.js";
import company_route from "./company.route.js";
import network_route from "./network.route.js";

api_endpoint.use("/auth", auth_route);
api_endpoint.use("/companies", company_route);
api_endpoint.use("/networking", network_route);

export default api_endpoint;
