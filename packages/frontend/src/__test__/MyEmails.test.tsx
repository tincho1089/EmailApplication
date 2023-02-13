import { RoutesManager } from '@/components'
import { MyEmails } from '@/pages/MyEmails'
import { mockEmail } from '@/__mocks__/MyEmails.mock'
import { act, render, screen } from '@testing-library/react'
import axios from 'axios'
import * as ReactRouterDom from 'react-router-dom'
import { beforeEach, describe, expect, test, vi } from 'vitest'

vi.mock('axios')

const mockedUsedNavigate = vi.fn()
vi.mock('react-router-dom', async () => ({
  ...((await vi.importActual('react-router-dom')) as typeof ReactRouterDom),
  useNavigate: () => mockedUsedNavigate,
}))

describe('MyEmails', () => {
  beforeEach(async () => {
    ;(axios.get as jest.Mock).mockResolvedValue({ data: [mockEmail] })
    await act(async () =>
      render(
        <RoutesManager>
          <MyEmails />
        </RoutesManager>,
      ),
    )
  })

  test('should exist the grid in the view', () => {
    const grid = screen.getByRole('grid')
    expect(grid).to.exist
  })

  test('should exist the button to create a new email', () => {
    const newEmailButton = screen.getByRole('button', { name: /New Email/i })
    expect(newEmailButton).toBeInTheDocument()
  })
})
