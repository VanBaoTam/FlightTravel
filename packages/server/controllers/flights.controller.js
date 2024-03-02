import { Request, Response } from "express";
import { flightServiceInstance } from "../services";

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
}

//------------------------------------------------
export const calendarsInstance = FlightController.getInstance();
