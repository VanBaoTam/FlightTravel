import axios from "axios";
import CryptoJS from "crypto-js";
import { v1 as uuidv1 } from "uuid";
import moment from "moment";
import dotenv from "dotenv";
import { responseMessageInstance } from "../utils/index.js";
dotenv.config();

export class PaymentService {
  static instance;
  static config = {
    appid: "554",
    key1: "8NdU5pG5R2spGHGhyO99HN1OhD8IQJBn",
    key2: "uUfsWgfLkRLzq6W2uNXTCxrfxs51auny",
    endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/createorder",
  };
  static getInstance() {
    if (!this.instance) {
      this.instance = new PaymentService();
    }
    return this.instance;
  }

  async OnlinePayment(req, res) {
    const { price, tickets } = req.body ?? {};
    console.log(price, tickets);
    try {
      const embeddata = {
        merchantinfo: "Flight Travel",
      };

      const items = [
        {
          itemid: "tix",
          itemname: "Vé máy bay",
          itemprice: price,
          itemquantity: tickets,
        },
      ];

      const order = {
        appid: PaymentService.config.appid,
        apptransid: `${moment().format("YYMMDD")}_${uuidv1()}`,
        appuser: "Flight Travel",
        apptime: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embeddata: JSON.stringify(embeddata),
        amount: price,
        description: "Flight Travel Payment Confirmation",
        bankcode: "zalopayapp",
      };

      const data = `${PaymentService.config.appid}|${order.apptransid}|${order.appuser}|${order.amount}|${order.apptime}|${order.embeddata}|${order.item}`;
      order.mac = CryptoJS.HmacSHA256(
        data,
        PaymentService.config.key1
      ).toString();
      const response = await axios.post(PaymentService.config.endpoint, null, {
        params: order,
      });
      console.log(response);
      return responseMessageInstance.getSuccess(res, 200, "successfully!", {
        result: response.data,
      });
    } catch (error) {
      console.error("Error occurred while paying online:", error);
      return responseMessageInstance.getError(res, 500, error.message);
    }
  }
}
export const paymentServiceInstance = PaymentService.getInstance();
