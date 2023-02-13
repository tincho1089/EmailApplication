import { GridColDef } from '@mui/x-data-grid'

export const inboxGrid: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 0 },
  {
    field: 'from',
    headerName: 'From',
    width: 100,
    editable: false,
  },
  {
    field: 'to',
    headerName: 'To',
    width: 100,
    editable: false,
  },
  {
    field: 'subject',
    headerName: 'Subject',
    width: 150,
    editable: false,
  },
  {
    field: 'date',
    headerName: 'date',
    width: 120,
    editable: false,
  },
  {
    field: 'state',
    headerName: 'State',
    width: 80,
    editable: false,
  },
]
