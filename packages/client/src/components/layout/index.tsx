import { Box, Grid } from "@mui/material";
import { ReactNode } from "react";
import Header from "../header";

type MainLayoutProps = {
  children: ReactNode;
};
function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            height: "100vh",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          <Box>
            <Grid container>
              <Grid item xs={12} sx={{ height: "80px" }}>
                <Header />
              </Grid>
              <Grid item xs={12} sx={{ height: "100%", width: "100%" }}>
                {children}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MainLayout;
