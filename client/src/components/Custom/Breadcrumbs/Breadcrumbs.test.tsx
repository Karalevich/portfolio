import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'
import userEvent from '@testing-library/user-event'

// Sample mock data for testing
const mockLinks = [
  { name: 'Home', link: '/' },
  { name: 'Products', link: '/products' },
  { name: 'Current Page' },
]

describe('Breadcrumbs component', () => {
  test('renders the breadcrumbs correctly', () => {
    render(
      <MemoryRouter initialEntries={['/products/current']}>
        <Routes>
          <Route path='/products/current' element={<Breadcrumbs links={mockLinks} />} />
        </Routes>
      </MemoryRouter>,
    )

    // Check if the breadcrumbs are rendered correctly with the correct links and separators.
    const homeLink = screen.getByRole('link', { name: /home/i })
    const productsLink = screen.getByRole('link', { name: /products/i })
    const currentPage = screen.getByText(/current page/i)

    expect(homeLink).toBeInTheDocument()
    expect(productsLink).toBeInTheDocument()
    expect(currentPage).toBeInTheDocument()

    // Check if the separators are rendered correctly between breadcrumbs.
    const allItems = screen.getAllByRole('listitem', { hidden: true })
    const links = screen.getAllByRole('listitem')
    const separators = allItems.length - links.length
    expect(separators).toBe(mockLinks.length - 1)
  })

  test('navigates to the correct page when a link is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Breadcrumbs links={mockLinks} />} />
          <Route path='/products' element={<div>Products page</div>} />
        </Routes>
      </MemoryRouter>,
    )

    // Click the "Products" link in the breadcrumbs
    const productsLink = screen.getByRole('link', { name: /products/i })

    userEvent.click(productsLink)

    // Check if the correct page is displayed after clicking the link.
    const currentPage = screen.getByText('Products page')
    expect(currentPage).toBeInTheDocument()
  })
})
