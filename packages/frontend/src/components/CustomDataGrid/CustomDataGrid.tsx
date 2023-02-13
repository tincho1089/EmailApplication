import { Email } from '@/models'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid'
import PropTypes from 'prop-types'
import { CustomPaper } from '../CustomPaper'

CustomDataGrid.prototype = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default function CustomDataGrid({
  columns,
  rows,
  handleClick,
}: {
  columns: GridColDef[]
  rows: Email[]
  handleClick: (row: Email) => void
}) {
  const handleRowClick: GridEventListener<'rowClick'> = ({ row }) => {
    handleClick(row)
  }

  return (
    <div>
      <CustomPaper>
        <Box sx={{ height: 600, width: 800 }}>
          <DataGrid
            disableColumnSelector
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            onRowClick={handleRowClick}
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: 'white',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
          />
        </Box>
      </CustomPaper>
    </div>
  )
}
