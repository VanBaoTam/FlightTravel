import { flightRouter } from "./flight.routes.js";
export const routes = (app) => {
  app.use("/v1/api/flights", flightRouter);
};
