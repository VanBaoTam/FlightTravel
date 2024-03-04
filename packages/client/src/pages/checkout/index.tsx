import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { displayToast } from "../../utils/toast";
import { useDataProvider } from "../../services";
import FLightForm from "../../components/checkout-form/FlightForm";
import { useNavigate } from "react-router-dom";

enum EGender {
  MALE = "male",
  FEMALE = "female",
}

interface FormData {
  fullName: string;
  gender: EGender;
  idCard: string;
  phoneNumber: string;
  email: string;
}

const Checkout: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    gender: EGender.MALE,
    idCard: "",
    phoneNumber: "",
    email: "",
  });
  const [seats, setSeats] = useState<number>(0);
  const [boughtSeats, setBoughtSeats] = useState<number>(1);
  const provider = useDataProvider();
  const [flightDetail, setFlightDetail] = useState<any>();
  const [birthDate, setBirthDate] = useState<any>(dayjs("2000-01-01"));
  const [selectedSeat, setSelectedSeat] = useState<number[]>([]);
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const handleCloseAdd = useCallback(() => {
    setIsOpenAdd(false);
  }, []);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    let newValue = value;

    // Validate idCard field to accept only numbers and have length of 10
    if (name === "idCard") {
      const regex = /^[0-9]*$/;
      if (value.length <= 12 && regex.test(value)) {
        newValue = value;
      } else {
        newValue = "";
        displayToast("CCCD không được nhiều hơn 12 số!", "info");
      }
    }

    // Validate phoneNumber field to start with 0 and have length of 10
    if (name === "phoneNumber") {
      const regex = /^0[0-9]*$/;
      if (value.length <= 10 && regex.test(value)) {
        newValue = value;
      } else {
        newValue = "";
        displayToast("SDT phải đúng 10 số và bắt đầu bằng 0!", "info");
      }
    }

    setFormData({ ...formData, [name]: newValue });
  };
  const getAvailableSeats = async () => {
    const json = sessionStorage.getItem("SelectedFlight");
    const data = JSON.parse(json || "");
    setBoughtSeats(data.travelerPricings.length);

    setFlightDetail(data);
    const searchData = {
      originDestinations: [
        {
          id: data.id,
          originLocationCode:
            data.itineraries[0].segments[0].departure.iataCode,
          destinationLocationCode:
            data.itineraries[0].segments[0].arrival.iataCode,
          departureDateTime: {
            date: dayjs(data.itineraries[0].segments[0].departure.at).format(
              "YYYY-MM-DD"
            ),
            time: dayjs(data.itineraries[0].segments[0].departure.at).format(
              "HH:mm:ss"
            ),
          },
        },
      ],
      travelers: [
        {
          id: data.travelerPricings[0].travelerId,
          travelerType: data.travelerPricings[0].travelerType,
        },
      ],
      sources: ["GDS"],
    };

    try {
      const resp = await provider.post({
        path: "flights/flight-available-seats",
        body: { searchData },
      });
      if (resp.status === 200) {
        const flightSeats = resp.data.result.data.find(
          (ele: any) =>
            ele.segments[0].departure.at ===
            data.itineraries[0].segments[0].departure.at
        );

        const availSeats = flightSeats.segments[0].availabilityClasses.find(
          (ele: any) =>
            ele.class === data.travelerPricings[0].fareDetailsBySegment[0].class
        );
        setSeats(availSeats.numberOfBookableSeats);
      }
    } catch (error: any) {
      console.log("ERROR", error.response);
      displayToast(error.response, "error");
    }
  };
  useEffect(() => {
    getAvailableSeats();
  }, []);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.phoneNumber.length !== 10) {
      displayToast("SDT phải đảm bảo đúng 10 chữ số", "info");
      return;
    }
    if (formData.idCard.length !== 12) {
      displayToast("CCCD phải đúng 12 số!", "info");
      return;
    }
    if (sessionStorage.getItem("PERSONAL_INFORMATION"))
      sessionStorage.removeItem("PERSONAL_INFORMATION");
    const json = JSON.stringify(formData);
    sessionStorage.setItem("PERSONAL_INFORMATION", json);
    if (sessionStorage.getItem("BOUGHT_SEATS"))
      sessionStorage.removeItem("BOUGHT_SEATS");
    const boughtSeats = JSON.stringify(flightDetail.travelerPricings.length);
    sessionStorage.setItem("BOUGHT_SEATS", boughtSeats);

    setIsOpenAdd(true);
  };

  return seats > 0 ? (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ py: 1, px: 2, width: "50%" }}>
        <Dialog
          open={isOpenAdd}
          onClose={handleCloseAdd}
          maxWidth={"md"}
          fullWidth
        >
          <DialogTitle>Checkout Form</DialogTitle>
          <DialogContent>
            <FLightForm
              flightDetail={flightDetail}
              formData={formData}
              selectedSeat={selectedSeat}
              handleCloseAdd={handleCloseAdd}
            />
          </DialogContent>
        </Dialog>
        <Typography sx={{ py: 1 }} variant="h4">
          Thông tin hành khách đặt vé
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Họ và tên"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                value={birthDate}
                maxDate={dayjs("2005-12-31")}
                onChange={(value) => {
                  if (value && value < dayjs("2006-01-01")) setBirthDate(value);
                }}
                label="Ngày sinh"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Select
                value={formData.gender}
                onChange={(e) => {
                  const gender = e.target.value;
                  if (gender === EGender.MALE) {
                    setFormData({ ...formData, ["gender"]: EGender.MALE });
                  } else {
                    setFormData({ ...formData, ["gender"]: EGender.FEMALE });
                  }
                }}
                fullWidth
              >
                <MenuItem value={EGender.MALE} key={EGender.MALE}>
                  MALE
                </MenuItem>
                <MenuItem value={EGender.FEMALE} key={EGender.FEMALE}>
                  FEMALE
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                label=" CCCD"
                name="idCard"
                type="text"
                value={formData.idCard}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={2}></Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Số điện thoại"
                name="phoneNumber"
                type="tel"
                inputMode="numeric"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={2} sm={5}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Xác nhận thông tin
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Box
        sx={{ width: "50%", py: 1, px: 2, borderLeft: "1px solid lightgray" }}
      >
        <Typography sx={{ py: 1 }} variant="h4">
          Chọn số ghế
        </Typography>
        <Grid container>
          <Grid item xs={12}>
            <FormGroup row>
              {Array.from({ length: seats }, (_, index) => (
                <FormControlLabel
                  key={index + 1}
                  control={
                    <Checkbox
                      checked={selectedSeat.includes(index + 1)}
                      onChange={(e) => {
                        const seat = index + 1;
                        if (e.target.checked) {
                          if (selectedSeat.length < boughtSeats) {
                            setSelectedSeat((prevSelectedSeats) => [
                              ...prevSelectedSeats,
                              seat,
                            ]);
                          }
                        } else {
                          setSelectedSeat((prevSelectedSeats) =>
                            prevSelectedSeats.filter(
                              (selected) => selected !== seat
                            )
                          );
                        }
                      }}
                      disabled={
                        !selectedSeat.includes(index + 1) &&
                        selectedSeat.length >= seats
                      }
                    />
                  }
                  label={`${index + 1}`}
                />
              ))}
            </FormGroup>
          </Grid>
        </Grid>
      </Box>
    </Box>
  ) : (
    <h3>LOADING....</h3>
  );
};

export default Checkout;
