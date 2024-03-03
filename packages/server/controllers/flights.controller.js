import { flightServiceInstance } from "../services/index.js";

//------------------------------------------------
export class FlightController {
  static instance;

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new FlightController();
    }
    return this.instance;
  }

  //-----------------------------------------------
  async syncContent(req, res) {
    return await flightServiceInstance.syncContent(req, res);
  }
  async getFlightOffers(req, res) {
    return await flightServiceInstance.getFlightOffers(req, res);
  }
}

//------------------------------------------------
export const flightInstance = FlightController.getInstance();
