import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import MainLayout from "./components/layout";
import Home from "./pages/home";
import Checkout from "./pages/checkout";
import List from "./pages/list-flights";
import NotFound from "./pages/not-found";
function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <MainLayout>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/list-flights" element={<List />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
