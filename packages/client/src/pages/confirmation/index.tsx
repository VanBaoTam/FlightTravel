import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import emailjs from "emailjs-com";
function Confirm() {
  function generateRandomString() {
    let randomString = "";
    while (randomString.length < 10) {
      randomString += Math.floor(Math.random() * 10);
    }
    return randomString;
  }
  const handleSendingConfirmEmail = async () => {
    const passcode = generateRandomString();
    const personalInformationJSON = sessionStorage.getItem(
      "PERSONAL_INFORMATION"
    );
    const boughtSeatJSON = sessionStorage.getItem("BOUGHT_SEATS");
    const formData = JSON.parse(personalInformationJSON || "");
    const boughtSeats = JSON.parse(boughtSeatJSON || "");
    const emailParams = {
      to_email: formData.email,
      from_name: "Flight Travel",
      to_name: formData.fullName,
      message: `We confirmed your payment at Flight Travel for booking ${boughtSeats} seats for a flight on our website. Your passcode for your tickets are: ${passcode}. Please don't share this email to everyone else. Get the number and give it to the check-in table for your tickets.`,
      subject: "Payment Confirmation!",
      reply_to: formData.email,
    };
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_KEY,
        import.meta.env.VITE_EMAIL_TEMPLATE_KEY,
        emailParams,
        import.meta.env.VITE_SECRET_KEY
      );
    } catch (error) {
      console.error("Error occurred sending emails:", error);
    }
  };
  useEffect(() => {
    handleSendingConfirmEmail();
  }, []);
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      Vé máy bay của bạn đã được xác nhận, chúc bạn có 1 chuyến đi an toàn và
      vui vẻ!
      <Link to="/" style={{ marginTop: "30px" }}>
        <Button variant="contained">Quay lại trang chủ</Button>
      </Link>
    </Box>
  );
}

export default Confirm;
