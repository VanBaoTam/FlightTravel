import { Router } from "express";
import { flightInstance } from "../controller";

// -----------------------------------------------
const flightRouter = Router();
flightRouter.post("/sync-content", authenToken, flightInstance.syncContent);
// -----------------------------------------------
export { flightRouter };
