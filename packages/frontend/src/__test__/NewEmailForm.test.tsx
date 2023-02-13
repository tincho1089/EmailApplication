import { RoutesManager } from '@/components'
import { NewEmailForm, SocketWrapper } from '@/pages/MyEmails/components'
import { mockNewEmailForm } from '@/__mocks__/NewEmailForm.mock'
import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import axios from 'axios'
import * as ReactRouterDom from 'react-router-dom'
import { beforeEach, describe, expect, test, vi } from 'vitest'

vi.mock('axios')

const mockedUsedNavigate = vi.fn()
vi.mock('react-router-dom', async () => ({
  ...((await vi.importActual('react-router-dom')) as typeof ReactRouterDom),
  useNavigate: () => mockedUsedNavigate,
}))

describe('NewEmailForm', () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({ data: mockNewEmailForm })
    render(
      <RoutesManager>
        <SocketWrapper>
          <NewEmailForm />
        </SocketWrapper>
      </RoutesManager>,
    )
  })

  test('should exist three inputs in the view', () => {
    const toField = screen.getByRole('textbox', { name: /to/i })
    const subjectField = screen.getByRole('textbox', { name: /subject/i })
    const bodyField = screen.getByRole('textbox', { name: /body/i })
    expect(toField).to.exist
    expect(subjectField).to.exist
    expect(bodyField).to.exist
  })

  test('should exist the submit button', () => {
    const submitButton = screen.getByRole('button', { name: /Send Email/i })
    expect(submitButton).toBeInTheDocument()
  })

  test('should have the correct value when the user type in the fields', async () => {
    const toField = screen.getByRole('textbox', { name: /to/i })
    const subjectField = screen.getByRole('textbox', { name: /subject/i })
    const bodyField = screen.getByRole('textbox', { name: /body/i })
    const submitButton = screen.getByRole('button', { name: /Send Email/i })

    const formValues = {
      to: 'Mark',
      subject: 'IMPORTANT MESSAGE!',
      body: 'How are you?',
    }

    await user.type(toField, formValues.to)
    await user.type(subjectField, formValues.subject)
    await user.type(bodyField, formValues.body)

    await waitFor(() => expect(toField).toHaveValue(formValues.to))
    await waitFor(() => expect(subjectField).toHaveValue(formValues.subject))
    await waitFor(() => expect(bodyField).toHaveValue(formValues.body))

    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.queryByText('There are errors, please correct them.')).not.toBeInTheDocument()
    })
  })

  test('should have errors message when the values are empty', async () => {
    const submitButton = screen.getByRole('button', { name: /Send Email/i })

    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Receiver is required')).toBeInTheDocument()
      expect(screen.getByText('Subject is required')).toBeInTheDocument()
      expect(screen.getByText('Body is required')).toBeInTheDocument()
    })
  })
})
