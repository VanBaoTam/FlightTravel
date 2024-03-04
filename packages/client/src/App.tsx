import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import MainLayout from "./components/layout";
import Home from "./pages/home";
import Checkout from "./pages/checkout";
import List from "./pages/list-flights";
import NotFound from "./pages/not-found";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Toast from "./components/toast";
import Confirm from "./pages/confirmation";
import Finish from "./pages/finish";
function App() {
  return (
    <BrowserRouter>
      <Toast />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <MainLayout>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/list-flights" element={<List />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/confirmation" element={<Confirm />} />
            <Route path="/finish" element={<Finish />} />
          </Routes>
        </MainLayout>
      </LocalizationProvider>
    </BrowserRouter>
  );
}

export default App;
