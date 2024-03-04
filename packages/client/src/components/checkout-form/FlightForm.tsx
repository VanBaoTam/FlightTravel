import { Box, Button, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

function FLightForm(props: {
  flightDetail: any;
  formData: any;
  selectedSeat: number[];
  handleCloseAdd: () => void;
}) {
  const { flightDetail, formData, selectedSeat, handleCloseAdd } = props;
  const totalPrice = flightDetail.travelerPricings.reduce(
    (totalPrice: number, ele: any) => {
      return totalPrice + parseFloat(ele.price.total);
    },
    0
  );

  const totalPriceWithCurrency = totalPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "VND",
  });
  useEffect(() => {
    console.log(flightDetail, formData, selectedSeat);
  }, []);

  return (
    <Box sx={{ display: "flex", p: 1 }}>
      <Box sx={{ width: "50%" }}>
        <Grid
          container
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            component="h3"
            sx={{ pb: 1, fontWeight: "bold", fontSize: "20px" }}
          >
            Thông tin khách hàng
          </Typography>
          <Typography component="p" sx={{ pb: 1 }}>
            Họ tên: {formData.fullName}
          </Typography>
          <Typography component="p" sx={{ pb: 1 }}>
            Giới tính: {formData.gender === "male" ? "Nam" : "Nữ"}
          </Typography>
          <Typography component="p" sx={{ pb: 1 }}>
            CCCD: {formData.idCard}
          </Typography>
          <Typography component="p" sx={{ pb: 1 }}>
            Số điện thoại: {formData.phoneNumber}
          </Typography>
          <Typography component="p" sx={{ pb: 1 }}>
            Email: {formData.email}
          </Typography>
          <Typography component="p" sx={{ pb: 1 }}>
            Tổng số ghế: {flightDetail.travelerPricings.length}
          </Typography>
          <Typography component="p" sx={{ pb: 1 }}>
            Vị trí: &nbsp;
            {selectedSeat.map((seat, index) => (
              <span key={index} style={{ marginLeft: "5px" }}>
                {seat} &nbsp; &nbsp;
              </span>
            ))}
          </Typography>
        </Grid>
      </Box>
      <Box sx={{ width: "50%", borderLeft: "1px solid gray" }}>
        <Grid
          container
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            component="h3"
            sx={{ pb: 1, fontWeight: "bold", fontSize: "20px" }}
          >
            Thông tin chuyến bay
          </Typography>
          <Typography component="p" sx={{ pb: 1 }}>
            Hãng: {flightDetail.itineraries[0].segments[0].carrierCode}
          </Typography>
          <Typography component="p" sx={{ pb: 1 }}>
            Đi tại: {flightDetail.itineraries[0].segments[0].departure.iataCode}
            , Lúc&nbsp;
            {dayjs(flightDetail.itineraries[0].segments[0].departure.at).format(
              "HH:mm:ss DD/MM/YYYY"
            )}
          </Typography>
          <Typography component="p" sx={{ pb: 1 }}>
            tới tại: {flightDetail.itineraries[0].segments[0].arrival.iataCode},
            Lúc &nbsp;
            {dayjs(flightDetail.itineraries[0].segments[0].arrival.at).format(
              "HH:mm:ss DD/MM/YYYY"
            )}
          </Typography>
          {flightDetail.itineraries[1].segments[0] ? (
            <Box>
              <Typography component="p" sx={{ pb: 1 }}>
                Về tại:
                {flightDetail.itineraries[1].segments[0].departure.iataCode},
                Lúc&nbsp;
                {dayjs(
                  flightDetail.itineraries[1].segments[0].departure.at
                ).format("HH:mm:ss DD/MM/YYYY")}
              </Typography>
              <Typography component="p" sx={{ pb: 1 }}>
                Đáp tại:
                {flightDetail.itineraries[1].segments[0].arrival.iataCode}, Lúc
                &nbsp;
                {dayjs(
                  flightDetail.itineraries[1].segments[0].arrival.at
                ).format("HH:mm:ss DD/MM/YYYY")}
              </Typography>
            </Box>
          ) : null}
          <Typography component="p" sx={{ pb: 1 }}>
            Tổng Tiền: &nbsp;&nbsp;
            {totalPriceWithCurrency}
          </Typography>
          <Button variant="contained" onClick={handleCloseAdd}>
            Xác Nhận
          </Button>
        </Grid>
      </Box>
    </Box>
  );
}

export default FLightForm;
