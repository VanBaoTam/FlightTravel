import { Router } from "express";
import { paymentInstance } from "../controllers/payment.controller.js";

// -----------------------------------------------
const paymentRouter = Router();
paymentRouter.post("/payment", paymentInstance.OnlinePayment);
// -----------------------------------------------
export { paymentRouter };
