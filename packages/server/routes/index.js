import { flightRouter } from "./flight.routes";
export const routes = (app) => {
  app.use("/v1/api/flights", flightRouter);
};
