import { Grid } from "@mui/material";
import FlightGrid from "../../components/grid";

function List() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <FlightGrid />
      </Grid>
    </Grid>
  );
}

export default List;
