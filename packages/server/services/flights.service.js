import dotenv from "dotenv";
import { responseMessageInstance } from "../utils/index.js";
import Amadeus from "amadeus";

dotenv.config();

export class FlightService {
  static instance;

  static getInstance() {
    if (!this.instance) {
      this.instance = new FlightService();
    }
    return this.instance;
  }

  async syncContent(_, res) {
    return responseMessageInstance.getSuccess(res, 200, "SYNCED", {});
  }

  async getFlightOffers(req, res) {
    const {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults,
    } = req.body ?? {};
    const amadeus = new Amadeus({
      clientId: process.env.AMADEUS_CLIENT_ID,
      clientSecret: process.env.AMADEUS_CLIENT_SECRET,
    });

    try {
      const { data } = await amadeus.shopping.flightOffersSearch.get({
        originLocationCode,
        destinationLocationCode,
        departureDate,
        adults,
      });
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export const flightServiceInstance = FlightService.getInstance();
