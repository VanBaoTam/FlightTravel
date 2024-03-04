import { flightRouter } from "./flight.routes.js";
import { paymentRouter } from "./payment.routes.js";
export const routes = (app) => {
  app.use("/v1/api/flights", flightRouter);
  app.use("/v1/api/payment", paymentRouter);
};
