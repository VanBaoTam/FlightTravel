import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { displayToast } from "../../utils/toast";

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
  const [birthDate, setBirthDate] = useState<any>(dayjs("2000-01-01"));
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.phoneNumber.length !== 10) {
      displayToast("SDT phải đảm bảo đúng 10 chữ số", "info");
      return;
    }
    if (formData.idCard.length !== 12) {
      displayToast("CCCD phải đúng 12 số!", "info");
      return;
    }

    console.log(formData);
    // Add your logic to handle form submission here
  };

  return (
    <Box sx={{ py: 1, px: 2 }}>
      <Typography sx={{ py: 1 }} variant="h4">
        Thông tin hành khách đặt vé
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
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
          <Grid item xs={3}></Grid>
          <Grid item xs={12} sm={3}>
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
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label=" CCCD"
              name="idCard"
              type="text"
              value={formData.idCard}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={5}></Grid>
          <Grid item xs={12} sm={3}>
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
          <Grid item xs={2} sm={3}>
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
  );
};

export default Checkout;
