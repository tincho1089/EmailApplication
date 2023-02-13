import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { Login } from '../pages/Login'
import * as ReactRouterDom from 'react-router-dom'
import { RoutesManager } from '@/components'
import axios from 'axios'
import { PrivateRoutes } from '@/models'

vi.mock('axios')

const mockedUsedNavigate = vi.fn()
vi.mock('react-router-dom', async () => ({
  ...((await vi.importActual('react-router-dom')) as typeof ReactRouterDom),
  useNavigate: () => mockedUsedNavigate,
}))

describe('Login', () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({ data: { jwtToken: '123', status: 200 } })
    render(
      <RoutesManager>
        <Login />
      </RoutesManager>,
    )
  })

  test('should exist two inputs in the view', () => {
    const usernameField = screen.getByRole('textbox', { name: /username/i })
    const passwordField = screen.getByLabelText(/password/i)
    expect(usernameField).to.exist
    expect(passwordField).to.exist
  })

  test('should exist the submit button', () => {
    const submitButton = screen.getByRole('button', { name: /Log In/i })
    expect(submitButton).toBeInTheDocument()
  })

  test('should have the correct value when the user type in the fields', async () => {
    const usernameField = screen.getByRole('textbox', { name: /username/i })
    const passwordField = screen.getByLabelText(/password/i)
    const submitButton = await screen.getByRole('button', { name: /Log In/i })

    const usernameValue = 'USER'
    const passwordValue = 'PASS'

    await user.type(usernameField, usernameValue)
    await user.type(passwordField, passwordValue)

    await waitFor(() => expect(usernameField).toHaveValue(usernameValue))
    await waitFor(() => expect(passwordField).toHaveValue(passwordValue))

    await user.click(submitButton)

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.MYEMAILS}`, { replace: true })
      expect(mockedUsedNavigate).toHaveBeenCalled()
    })
  })

  test('should have errors message when the value of the fields are invalid', async () => {
    const submitButton = await screen.getByRole('button', { name: /Log In/i })

    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Username is required')).toBeInTheDocument()
      expect(screen.getByText('password is required')).toBeInTheDocument()
    })
  })

  test('should have errors message when the password is too short', async () => {
    const usernameField = screen.getByRole('textbox', { name: /username/i })
    const passwordField = screen.getByLabelText(/password/i)
    const submitButton = await screen.getByRole('button', { name: /Log In/i })

    const usernameValue = 'USER'
    const passwordValue = 'PAS'

    await user.type(usernameField, usernameValue)
    await user.type(passwordField, passwordValue)

    await waitFor(() => expect(usernameField).toHaveValue(usernameValue))
    await waitFor(() => expect(passwordField).toHaveValue(passwordValue))

    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Password too short')).toBeInTheDocument()
    })
  })
})
