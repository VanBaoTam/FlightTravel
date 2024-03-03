import { Router } from "express";
import { flightInstance } from "../controllers/flights.controller.js";

// -----------------------------------------------
const flightRouter = Router();
flightRouter.post("/sync-content", flightInstance.syncContent);
flightRouter.get("/flight-search", flightInstance.getFlightOffers);
flightRouter.post("/flight-confirmation", flightInstance.flightConfirmation);
// -----------------------------------------------
export { flightRouter };
