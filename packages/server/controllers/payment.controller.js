import { paymentServiceInstance } from "../services/index.js";

//------------------------------------------------
export class PaymentController {
  static instance;

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new PaymentController();
    }
    return this.instance;
  }

  //-----------------------------------------------

  async OnlinePayment(req, res) {
    return await paymentServiceInstance.OnlinePayment(req, res);
  }
}

//------------------------------------------------
export const paymentInstance = PaymentController.getInstance();
