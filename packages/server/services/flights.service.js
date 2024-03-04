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
      adults = 1,
      kids = 0,
      returnDate = undefined,
      currencyCode,
    } = req.query ?? {};
    try {
      const { data } =
        await FlightService.amadeus.shopping.flightOffersSearch.get({
          originLocationCode,
          destinationLocationCode,
          departureDate,
          adults,
          returnDate,
          children: kids,
          currencyCode,
          max: 100,
        });
      return responseMessageInstance.getSuccess(
        res,
        200,
        "Load data successfully!",
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
    const flightOffers = req.body.flightOffers ?? [];

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
  async flightBooking(req, res) {
    try {
      const flight = req.body.flightOffers;
      const name = req.body.name;

      const response = await FlightService.amadeus.booking.flightOrders.post(
        JSON.stringify({
          data: {
            type: "flight-order",
            flightOffers: [flight],
            travelers: [
              {
                id: "1",
                dateOfBirth: "1982-01-16",
                name: {
                  firstName: name.first,
                  lastName: name.last,
                },
                gender: "MALE",
                contact: {
                  emailAddress: "jorge.gonzales833@telefonica.es",
                  phones: [
                    {
                      deviceType: "MOBILE",
                      countryCallingCode: "34",
                      number: "480080076",
                    },
                  ],
                },
                documents: [
                  {
                    documentType: "PASSPORT",
                    birthPlace: "Madrid",
                    issuanceLocation: "Madrid",
                    issuanceDate: "2015-04-14",
                    number: "00000000",
                    expiryDate: "2025-04-14",
                    issuanceCountry: "ES",
                    validityCountry: "ES",
                    nationality: "ES",
                    holder: true,
                  },
                ],
              },
            ],
          },
        })
      );

      return responseMessageInstance.getSuccess(
        res,
        200,
        "Flight booked successfully!",
        { result: response.result }
      );
    } catch (error) {
      console.error("Error occurred while booking flight:", error.description);
      return responseMessageInstance.getError(
        res,
        500,
        "THIS IS THE END OF BOOKING"
      );
    }
  }
  async flightAvailableSeats(req, res) {
    try {
      const { searchData } = req.body ?? {};
      console.log(searchData);
      const response =
        await FlightService.amadeus.shopping.availability.flightAvailabilities.post(
          JSON.stringify(searchData)
        );
      const result = JSON.parse(response.body);
      return responseMessageInstance.getSuccess(res, 200, "successfully!", {
        result,
      });
    } catch (error) {
      console.error(
        "Error occurred while finding available seats:",
        error.result
      );
      return responseMessageInstance.getError(res, 500, error.result);
    }
  }
}
export const flightServiceInstance = FlightService.getInstance();
