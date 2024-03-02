import dotenv from "dotenv";
import { responseMessageInstance } from "../utils";

dotenv.config();

//------------------------------------------------
export class FlightService {
  static instance;

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new FlightService();
    }
    return this.instance;
  }

  // -----------------------------------------------

  async syncContent(_, res) {
    return responseMessageInstance.getSuccess(res, 200, "SYNCED", {});
  }
}

//------------------------------------------------
export const flightServiceInstance = FlightService.getInstance();
