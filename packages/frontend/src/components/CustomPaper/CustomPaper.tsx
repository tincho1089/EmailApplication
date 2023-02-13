import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

export default function CustomPaper({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      <Paper elevation={8} style={{ minWidth: '400px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {children}
      </Paper>
    </Box>
  )
}
