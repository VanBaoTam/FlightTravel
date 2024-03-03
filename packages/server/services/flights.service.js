import dotenv from "dotenv";
import { responseMessageInstance } from "../utils/index.js";
import Amadeus from "amadeus";

dotenv.config();

export class FlightService {
  static instance;
  static amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET,
  });

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
    } = req.query ?? {};
    console.log(req.query);
    try {
      const { data } =
        await FlightService.amadeus.shopping.flightOffersSearch.get({
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
      console.error("Error occurred during flight search:", error.description);

      return responseMessageInstance.getError(
        res,
        500,
        "Internal Server Error"
      );
    }
  }

  async flightConfirmation(req, res) {
    const flightOffers = req.body.flightOffers ?? {};

    try {
      const response =
        await FlightService.amadeus.shopping.flightOffers.pricing.post(
          JSON.stringify({
            data: {
              type: "flight-offers-pricing",
              flightOffers,
            },
          })
        );

      return responseMessageInstance.getSuccess(
        res,
        200,
        "Flight availability confirmed successfully!",
        { result: response.result }
      );
    } catch (error) {
      console.error(
        "Error occurred while confirming flight availability:",
        error.description
      );
      return responseMessageInstance.getError(
        res,
        500,
        "Internal Server Error"
      );
    }
  }
}
export const flightServiceInstance = FlightService.getInstance();
