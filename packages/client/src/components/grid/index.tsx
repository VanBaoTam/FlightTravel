import { DataGrid } from "@mui/x-data-grid";
import { flightCols } from "../../constants";
import { useCallback, useState } from "react";

function Grid({ flightRows }: { flightRows: any }) {
  const [ids, setIds] = useState<number[]>([]);
  const handleSelectionModel = useCallback((ids: any[]) => {
    if (!ids.length) {
      return;
    }

    setIds(ids);
  }, []);
  return (
    <DataGrid
      rows={flightRows}
      columns={flightCols}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      onRowSelectionModelChange={handleSelectionModel}
    />
  );
}

export default Grid;
