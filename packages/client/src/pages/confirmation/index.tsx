import { useEffect } from "react";

import { useDataProvider } from "../../services";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
function Confirm() {
  const provider = useDataProvider();

  const OnlinePayment = async () => {
    const price = sessionStorage.getItem("PRICE");
    const tickets = sessionStorage.getItem("BOUGHT_SEATS");

    try {
      const resp = await provider.post({
        path: "payment/payment",
        body: { price, tickets },
      });
      if (resp.status === 200) {
        console.log(resp);
        window.open(resp.data.result.orderurl, "_self");
      }
    } catch (error: any) {
      console.log("ERROR", error.response);
    }
  };
  useEffect(() => {
    OnlinePayment();
  }, []);
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      Bạn đang được chuyển trang đến ZALOPAY để thực hiện thanh toán, xin vui
      lòng chờ ....
      <Link to="/" style={{ marginTop: "30px" }}>
        <Button variant="contained">
          {" "}
          Nếu chờ quá lâu, bạn có thể quay lại trang chủ
        </Button>
      </Link>
    </Box>
  );
}

export default Confirm;
