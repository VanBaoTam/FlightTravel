export class ResponseMessage {
  static instance;

  static getInstance() {
    if (!this.instance) {
      return this.instance;
    }
  }

  getError(response, statusCode, errorMessage) {
    return response.status(statusCode).json({
      error: errorMessage,
    });
  }

  getSuccess(response, statusCode, errorMessage, data) {
    return response.status(statusCode).json({
      message: errorMessage,
      ...data,
    });
  }
}
export const responseMessageInstance = new ResponseMessage();
