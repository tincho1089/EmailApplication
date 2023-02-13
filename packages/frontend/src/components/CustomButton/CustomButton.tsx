import Button, { ButtonProps } from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText('#ec5990'),
  backgroundColor: '#ec5990',
  '&:hover': {
    backgroundColor: '#bf1650',
  },
}))

export default function CustomButton({ children, onClick }: { children: string; onClick: () => void }) {
  return (
    <Stack spacing={2} direction='row'>
      <ColorButton variant='contained' onClick={onClick}>
        {children}
      </ColorButton>
    </Stack>
  )
}
