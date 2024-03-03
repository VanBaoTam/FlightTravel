import { Router } from "express";
import { flightInstance } from "../controllers/flights.controller.js";

// -----------------------------------------------
const flightRouter = Router();
flightRouter.get("/sync-content", flightInstance.syncContent);
flightRouter.post("/get-flight-offers", flightInstance.getFlightOffers);
// -----------------------------------------------
export { flightRouter };
