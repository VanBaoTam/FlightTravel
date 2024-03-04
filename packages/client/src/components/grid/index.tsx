import { DataGrid } from "@mui/x-data-grid";
import { flightBothCols, flightOnceCols } from "../../constants";
import { useCallback, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import { displayToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

function FlightGrid() {
  const [ids, setIds] = useState<number[]>([]);
  const [flights, setFlights] = useState<JSON[]>([]);
  const [type, setType] = useState<number>(0); //true - both | false - once
  const [flightRows, setFlightRows] = useState<any[]>([]);
  const navigation = useNavigate();
  const getValues = () => {
    const storedJsonString = sessionStorage.getItem("flightData");
    const storedJsonData = JSON.parse(storedJsonString || "");
    setFlights(storedJsonData);
    let data: any[] = [];
    if (storedJsonData[0].itineraries[1]) {
      setType(2);
      storedJsonData.map((ele: any) => {
        const value = {
          id: ele.id,
          carrier: ele.itineraries[0].segments[0].operating.carrierCode,
          price: ele.price.total,
          arrivalTime: dayjs(ele.itineraries[0].segments[0].arrival.at).format(
            "HH:mm:ss DD/MM/YYYY"
          ),
          departureTime: dayjs(
            ele.itineraries[0].segments[0].departure.at
          ).format("HH:mm:ss DD/MM/YYYY"),
          cabin: ele.travelerPricings[0].fareDetailsBySegment[0].cabin,
          class: ele.travelerPricings[0].fareDetailsBySegment[0].class,
          arrivalReturnTime: dayjs(
            ele.itineraries[1].segments[0].arrival.at
          ).format("HH:mm:ss DD/MM/YYYY"),
          departureReturnTime: dayjs(
            ele.itineraries[1].segments[0].departure.at
          ).format("HH:mm:ss DD/MM/YYYY"),
        };
        data.push(value);
      });
    } else {
      setType(1);
      storedJsonData.map((ele: any) => {
        const value = {
          id: ele.id,
          carrier: ele.itineraries[0].segments[0].operating.carrierCode,
          price: ele.price.total,
          arrivalTime: dayjs(ele.itineraries[0].segments[0].arrival.at).format(
            "HH:mm:ss DD/MM/YYYY"
          ),
          departureTime: dayjs(
            ele.itineraries[0].segments[0].departure.at
          ).format("HH:mm:ss DD/MM/YYYY"),
          cabin: ele.travelerPricings[0].fareDetailsBySegment[0].cabin,
          class: ele.travelerPricings[0].fareDetailsBySegment[0].class,
        };
        data.push(value);
      });
    }
    setFlightRows(data);
  };
  useEffect(() => {
    getValues();
  }, []);
  const handleCheckout = () => {
    if (ids.length < 1) {
      displayToast("Xin hãy chọn 1 chuyến bay để tiếp tục!", "warning");
      return;
    }
    if (ids.length > 1) {
      displayToast("Xin hãy chọn duy nhất 1 chuyến bay!", "warning");
      return;
    }

    if (sessionStorage.getItem("SelectedFlight")) {
      sessionStorage.removeItem("SelectedFlight");
    }
    const jsonString = JSON.stringify(flights[ids[0] - 1]);
    sessionStorage.setItem("SelectedFlight", jsonString);
    navigation(`/checkout/${ids[0]}`);
  };
  const handleSelectionModel = useCallback((ids: any[]) => {
    if (!ids.length) {
      return;
    }
    setIds(ids);
  }, []);
  return flights ? (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 1,
        }}
      >
        <h3 style={{ fontSize: "20px" }}>Danh sách các chuyến bay</h3>{" "}
        <Button
          variant="contained"
          sx={{ mr: 10, height: "50px", fontWeight: "Bold" }}
          onClick={handleCheckout}
        >
          Thanh toán
        </Button>
      </Box>
      {type === 2 ? (
        <DataGrid
          rows={flightRows}
          columns={flightBothCols}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          onRowSelectionModelChange={handleSelectionModel}
        />
      ) : (
        <DataGrid
          rows={flightRows}
          columns={flightOnceCols}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          onRowSelectionModelChange={handleSelectionModel}
        />
      )}
    </Box>
  ) : (
    <Typography component={"h5"}>LOADING....</Typography>
  );
}

export default FlightGrid;
