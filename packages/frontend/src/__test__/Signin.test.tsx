import { RoutesManager } from '@/components'
import { PublicRoutes } from '@/models'
import { mockSignin } from '@/__mocks__/signin.mock'
import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import axios from 'axios'
import * as ReactRouterDom from 'react-router-dom'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { Signin } from '../pages/Signin'

vi.mock('axios')

const mockedUsedNavigate = vi.fn()
vi.mock('react-router-dom', async () => ({
  ...((await vi.importActual('react-router-dom')) as typeof ReactRouterDom),
  useNavigate: () => mockedUsedNavigate,
}))

describe('Signin', () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({ data: mockSignin })
    render(
      <RoutesManager>
        <Signin />
      </RoutesManager>,
    )
  })

  test('should exist three inputs in the view', () => {
    const nameField = screen.getByRole('textbox', { name: 'name' })
    const usernameField = screen.getByRole('textbox', { name: 'username' })
    const passwordField = screen.getByLabelText(/password/i)
    expect(nameField).to.exist
    expect(usernameField).to.exist
    expect(passwordField).to.exist
  })

  test('should exist the submit button', () => {
    const submitButton = screen.getByRole('button', { name: /Sign In/i })
    expect(submitButton).toBeInTheDocument()
  })

  test('should have the correct value when the user type in the fields', async () => {
    const nameField = screen.getByRole('textbox', { name: 'name' })
    const usernameField = screen.getByRole('textbox', { name: 'username' })
    const passwordField = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /Sign In/i })

    const password = 'PASS'

    await user.type(nameField, mockSignin.name)
    await user.type(usernameField, mockSignin.username)
    await user.type(passwordField, password)

    await waitFor(() => expect(nameField).toHaveValue(mockSignin.name))
    await waitFor(() => expect(usernameField).toHaveValue(mockSignin.username))
    await waitFor(() => expect(passwordField).toHaveValue(password))

    await user.click(submitButton)

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith(`/${PublicRoutes.LOGIN}`, { replace: true })
      expect(mockedUsedNavigate).toHaveBeenCalled()
    })
  })

  test('should have errors message when the value of the fields are invalid', async () => {
    const submitButton = await screen.getByRole('button', { name: /Sign In/i })

    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
      expect(screen.getByText('Username is required')).toBeInTheDocument()
      expect(screen.getByText('password is required')).toBeInTheDocument()
    })
  })

  test('should have errors message when the password is too short', async () => {
    const nameField = screen.getByRole('textbox', { name: 'name' })
    const usernameField = screen.getByRole('textbox', { name: 'username' })
    const passwordField = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /Sign In/i })

    const password = 'PAS'

    await user.type(nameField, mockSignin.name)
    await user.type(usernameField, mockSignin.username)
    await user.type(passwordField, password)

    await waitFor(() => expect(nameField).toHaveValue(mockSignin.name))
    await waitFor(() => expect(usernameField).toHaveValue(mockSignin.username))
    await waitFor(() => expect(passwordField).toHaveValue(password))

    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Password too short')).toBeInTheDocument()
    })
  })
})
