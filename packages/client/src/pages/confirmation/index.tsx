import { Box, Button } from "@mui/material";

import { Link } from "react-router-dom";

function Confirm() {
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
