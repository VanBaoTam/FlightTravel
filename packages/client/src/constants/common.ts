import { GridColDef } from "@mui/x-data-grid";
import { TAirPort } from "../types";
export const VN_AIRPORT: TAirPort[] = [
  {
    code: "SGN",
    name: "Sân bay Tân Sơn Nhất",
    city: "Tp. Hồ Chí Minh",
  },
  {
    code: "HAN",
    name: "Sân bay Quốc tế Nội Bài",
    city: "Hà Nội",
  },
  {
    code: "BMV",
    name: "Sân bay Buôn Ma Thuột",
    city: "Buôn Ma Thuột",
  },
  {
    code: "CXR",
    name: "Sân bay Cam Ranh",
    city: "Khánh Hòa",
  },
  {
    code: "DAD",
    name: "Sân bay Quốc tế Đà Nẵng",
    city: "Đà Nẵng",
  },
  {
    code: "DIN",
    name: "Sân bay Điện Biên",
    city: "Điện Biên",
  },
  {
    code: "DLI",
    name: "Sân bay Liên Khương",
    city: "Đà Lạt",
  },

  {
    code: "HPH",
    name: "Sân bay Cát Bi",
    city: "Hải Phòng",
  },
  {
    code: "HUI",
    name: "Sân bay Phú Bài",
    city: "Thừa Thiên Huế",
  },
  {
    code: "PQC",
    name: "Sân bay Phú Quốc",
    city: "Kiên Giang",
  },
  {
    code: "PXU",
    name: "Sân bay Pleiku",
    city: "Pleiku",
  },

  {
    code: "THD",
    name: "Sân bay Thọ Xuân",
    city: "Thanh Hóa",
  },
  {
    code: "TBB",
    name: "Sân bay Tuy Hòa",
    city: "Tuy Hòa",
  },
  {
    code: "UIH",
    name: "Sân bay Phù Cát",
    city: "Bình Định",
  },
  {
    code: "VDH",
    name: "Sân bay Đồng Hới",
    city: "Đồng Hới",
  },
  {
    code: "VII",
    name: "Sân bay Quốc tế Vinh",
    city: "Vinh",
  },
  {
    code: "VCA",
    name: "Sân bay Cần Thơ",
    city: "Cần Thơ",
  },
  {
    code: "VCL",
    name: "Sân bay Cà Mau",
    city: "Cà Mau",
  },
  {
    code: "VDO",
    name: "Sân bay quốc tế Vân Đồn",
    city: "Hạ Long",
  },
];
export const flightOnceCols: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 50,
  },
  {
    field: "carrier",
    headerName: "Hãng",
    valueFormatter: ({ value }: { value: string }) => {
      switch (value) {
        case "VJ":
          return "Vietjet";
        case "QH":
          return "Bamboo Airways";
        case "VN":
          return "Vietnam Airlines";
        case "VN":
          return "Pacific Airlines";
        default:
          return value;
      }
    },
    width: 200,
  },
  {
    field: "cabin",
    headerName: "Hạng",
    width: 150,
  },
  {
    field: "class",
    headerName: "Phân lớp",
    width: 150,
  },
  {
    field: "departureTime",
    headerName: "Giờ bay",
    width: 220,
  },
  {
    field: "arrivalTime",
    headerName: "Giờ đáp",
    width: 220,
  },
  {
    field: "price",
    headerName: "Giá thành",
    valueFormatter: ({ value }: { value: string }) => {
      if (value) {
        const numberValue = parseFloat(value);
        const formattedValue = numberValue.toLocaleString("en-US", {
          style: "currency",
          currency: "VND",
        });
        return formattedValue;
      } else {
        return "";
      }
    },
    width: 220,
  },
];
export const flightBothCols: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 50,
  },
  {
    field: "carrier",
    headerName: "Hãng",
    valueFormatter: ({ value }: { value: string }) => {
      switch (value) {
        case "VJ":
          return "Vietjet";
        case "QH":
          return "Bamboo Airways";
        case "VN":
          return "Vietnam Airlines";
        case "BL":
          return "Pacific Airlines";
        default:
          return value;
      }
    },
    width: 200,
  },
  {
    field: "cabin",
    headerName: "Hạng",
    width: 150,
  },
  {
    field: "class",
    headerName: "Phân lớp",
    width: 150,
  },
  {
    field: "departureTime",
    headerName: "Giờ bay",
    width: 200,
  },
  {
    field: "arrivalTime",
    headerName: "Giờ đáp",
    width: 200,
  },
  {
    field: "departureReturnTime",
    headerName: "Giờ bay khứ hồi",
    width: 200,
  },
  {
    field: "arrivalReturnTime",
    headerName: "Giờ đáp  khứ hồi",
    width: 200,
  },
  {
    field: "price",
    headerName: "Tổng tiền",
    valueFormatter: ({ value }: { value: string }) => {
      if (value) {
        const numberValue = parseFloat(value);
        const formattedValue = numberValue.toLocaleString("en-US", {
          style: "currency",
          currency: "VND",
        });
        return formattedValue;
      } else {
        return "";
      }
    },
    width: 200,
  },
];
