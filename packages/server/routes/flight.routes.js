import { Router } from "express";
import { flightInstance } from "../controllers/flights.controller.js";

// -----------------------------------------------
const flightRouter = Router();
flightRouter.get("/flight-search", flightInstance.getFlightOffers);
flightRouter.post("/flight-confirmation", flightInstance.flightConfirmation);
flightRouter.post("/flight-booking", flightInstance.flightBooking);
// -----------------------------------------------
export { flightRouter };
