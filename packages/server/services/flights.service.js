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
      return responseMessageInstance.getSuccess(
        res,
        200,
        "Load datasuccessfully!",
        {
          data,
        }
      );
    } catch (error) {
      console.error("Error occurred during flight search:", error);
      // Handle the error here, e.g., send an error response
      res.status(500).json({ error: "An error occurred during flight search" });
    }
  }
}

export const flightServiceInstance = FlightService.getInstance();
