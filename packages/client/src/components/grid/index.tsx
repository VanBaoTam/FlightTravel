import { DataGrid } from "@mui/x-data-grid";
import { flightBothCols, flightOnceCols } from "../../constants";
import { useCallback, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import dayjs from "dayjs";

function FlightGrid() {
  const [ids, setIds] = useState<number[]>([]);
  const [flights, setFlights] = useState<JSON[]>();
  const [type, setType] = useState<number>(0); //true - both | false - once
  const [flightRows, setFlightRows] = useState<any[]>([]);
  const getValues = () => {
    const storedJsonString = sessionStorage.getItem("flightData");
    const storedJsonData = JSON.parse(storedJsonString || "");
    setFlights(storedJsonData);
    console.log(storedJsonData);
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
      console.log("HERE");
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
    console.log(data);
  };
  useEffect(() => {
    getValues();
  }, []);
  const handleSelectionModel = useCallback((ids: any[]) => {
    if (!ids.length) {
      return;
    }
    setIds(ids);
  }, []);
  return flights ? (
    <div>
      <h1>Danh sách các chuyến bay</h1>
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
    </div>
  ) : (
    <Typography component={"h5"}>LOADING....</Typography>
  );
}

export default FlightGrid;
