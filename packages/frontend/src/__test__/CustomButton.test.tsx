import CustomButton from '../components/CustomButton/CustomButton'
import { render, screen } from '@testing-library/react'

describe('CustomButton', () => {
  beforeEach(() => {
    render(<CustomButton onClick={() => null}>Custom Button </CustomButton>)
  })

  test('test that the button was created successfully', () => {
    expect(screen.getByText(/Custom Button/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
