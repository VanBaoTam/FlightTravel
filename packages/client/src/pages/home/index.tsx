import React, { useState } from "react";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Button,
  Container,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { VN_AIRPORT } from "../../constants";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { TAirPort } from "../../types";
import { displayToast } from "../../utils/toast";
import { useDataProvider } from "../../services";

enum EFlightType {
  once = "once",
  both = "both",
}
interface FormData {
  FlightType: EFlightType;
  Members: number;
  StartedAirport: string;
  returnDate?: string;
  EndAirport: string;
}
const Home: React.FC = () => {
  const [StartAirport, setStartAirPort] = useState<TAirPort>(VN_AIRPORT[0]);
  const [EndAirport, setEndAirPort] = useState<TAirPort>(VN_AIRPORT[1]);
  const [startedDate, setStartedDate] = useState<any>(dayjs());
  const [endDate, setEndDate] = useState<any>(dayjs());
  const [members, setMembers] = useState<number>(0);
  const [kids, setKids] = useState<number>(0);
  const [flightType, setFlightType] = useState<EFlightType>(EFlightType.once);
  const provider = useDataProvider();

  const SearchFlights = async (data: any) => {
    try {
      const params = {
        originLocationCode: data.StartedAirport,
        destinationLocationCode: data.EndAirport,
        departureDate: dayjs(startedDate).format("YYYY-MM-DD"),
        adults: data.Members,
        returnDate: data.returnDate
          ? dayjs(data.returnDate).format("YYYY-MM-DD")
          : null,
        kids,
        currencyCode: "VND",
      };
      console.log("PARAMS", params);
      const resp = await provider.get({
        path: "flights/flight-search",
        params,
      });
      if (resp.status === 200) console.log(resp);
      displayToast("Đã tìm được thông tin các chuyến bay đi!", "success");
    } catch (error: any) {
      console.log(error.response.data.error);
      displayToast(error.response.data.error, "error");
    }
  };

  const onSubmit = async (data: FormData) => {
    const returnData = {
      ...data,
      StartedAirport: data.StartedAirport,
      EndAirport: data.EndAirport,
      returnDate: endDate ?? undefined,
    };
    SearchFlights(returnData);
  };

  const handleChangeMembers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value as unknown;
    const num = value as number;
    if (num > 0 && num < 10) setMembers(num);
    else setMembers(0);
  };
  const handleChangeKids = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value as unknown;
    const num = value as number;
    if (num > 0) setKids(num);
    else setKids(0);
  };
  const handleChangeFlightType = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = (event.target as HTMLInputElement).value;
    if (value === EFlightType.once) setFlightType(EFlightType.once);
    else setFlightType(EFlightType.both);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!members || !startedDate || !flightType) {
      displayToast("Có trường dữ liệu để trống!", "error");
      return;
    }
    if (flightType === EFlightType.once && !startedDate) {
      displayToast("Hãy chọn ngày khứ hồi!", "error");
      return;
    }
    if (flightType === EFlightType.both && !endDate) {
      displayToast("Hãy chọn ngày khứ hồi!", "error");
      return;
    }
    if (members > 9) {
      displayToast("Chỉ có thể đặt vé cho tối đa 9 người mỗi phiên!", "error");
      return;
    }
    if (members < 1) {
      displayToast("Hãy đảm bảo có ít nhất 1 khách đặt vé!", "error");
      return;
    }
    if (kids > 9) {
      displayToast("Chỉ có thể đặt vé cho tối đa 9 trẻ em mỗi phiên!", "error");
      return;
    }
    if (kids < 0) {
      displayToast("Số lượng trẻ em đặt vé không hợp lệ!", "error");
      return;
    }
    if (members <= 0) {
      displayToast("Số lượng hành khách phải lớn hơn 0!", "error");
      return;
    }
    if (startedDate.isBefore(dayjs(), "day")) {
      displayToast("Ngày khởi hành không được chọn trong quá khứ!", "error");
      return;
    }
    if (flightType === EFlightType.both && endDate < startedDate) {
      displayToast("Ngày khứ hồi không được sớm hơn ngày khởi hành!", "error");
      return;
    }

    onSubmit({
      FlightType: flightType,
      Members: members,
      StartedAirport: StartAirport.code,
      EndAirport: EndAirport.code,
    });
  };

  return (
    <Container>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RadioGroup
              onChange={handleChangeFlightType}
              name="FlightType"
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel
                value={EFlightType.once}
                control={<Radio />}
                label="Một Chiều"
                sx={{ display: "inline", width: "15%" }}
              />
              <FormControlLabel
                value={EFlightType.both}
                control={<Radio />}
                label="Khứ hồi"
                sx={{ display: "inline", width: "15%" }}
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              label="Số lượng hành khách"
              value={members}
              onChange={handleChangeMembers}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              label="Số lượng trẻ em (optional)"
              value={kids}
              onChange={handleChangeKids}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              value={StartAirport.code}
              onChange={(e) => {
                const airportCode = e.target.value;
                const selectedAirport = VN_AIRPORT.find(
                  (airport) => airport.code === airportCode
                );
                if (selectedAirport) setStartAirPort(selectedAirport);
              }}
              fullWidth
            >
              {VN_AIRPORT.map((ele) => (
                <MenuItem value={ele.code} key={ele.code}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Box>
                      <Typography component={"p"}>{ele.name}</Typography>
                      <Typography
                        component={"p"}
                        sx={{ fontSize: "13px", color: "#333" }}
                      >
                        {ele.city}
                      </Typography>
                    </Box>
                    <Typography
                      component={"p"}
                      sx={{ fontWeight: "bold", fontSize: "18px", pt: 0.8 }}
                    >
                      {ele.code}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              value={startedDate}
              onChange={(value) => {
                if (value) setStartedDate(value);
              }}
              label="Ngày đi"
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              value={EndAirport.code}
              onChange={(e) => {
                const airportCode = e.target.value;
                const selectedAirport = VN_AIRPORT.find(
                  (airport) => airport.code === airportCode
                );
                if (selectedAirport) setEndAirPort(selectedAirport);
              }}
              fullWidth
            >
              {VN_AIRPORT.map((ele) => (
                <MenuItem value={ele.code} key={ele.code}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Box>
                      <Typography component={"p"}>{ele.name}</Typography>
                      <Typography
                        component={"p"}
                        sx={{ fontSize: "13px", color: "#333" }}
                      >
                        {ele.city}
                      </Typography>
                    </Box>
                    <Typography
                      component={"p"}
                      sx={{ fontWeight: "bold", fontSize: "18px", pt: 0.8 }}
                    >
                      {ele.code}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </Grid>
          {flightType === EFlightType.both ? (
            <Grid item xs={6}>
              <DatePicker
                value={endDate}
                onChange={(value) => {
                  if (value) setEndDate(value);
                }}
                label="Ngày về"
              />
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Home;
