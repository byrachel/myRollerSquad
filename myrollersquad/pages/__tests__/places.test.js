
import { render, screen } from '@testing-library/react'
import Places from '../places'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Places />)

    const heading = screen.getByRole('heading', {
      name: /Places/i,
    })

    expect(heading).toBeInTheDocument()
  })
})