import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Banner } from './Banner'

import React from 'react'

describe('Banner', () => {
  const renderHelper = () => {
    return render(
      <MemoryRouter initialEntries={['/home']}>
        <Routes>
          <Route path='/home' element={<Banner />} />
          <Route path='/contact' element={<div>Contact Information</div>} />
        </Routes>
      </MemoryRouter>
    )
  }

  test('renders the name and occupation', () => {
    renderHelper()
    expect(screen.getByText('Andrei Karalevich')).toBeInTheDocument()
    expect(screen.getByText('Front-End')).toBeInTheDocument()
  })

  test('renders the message', () => {
    renderHelper()
    expect(screen.getByText(/3 years of experience in Software Engineering/i)).toBeInTheDocument()
  })

  test('button click triggers handleRedirect function', () => {
    renderHelper()
    const button = screen.getByText('Hire me')
    fireEvent.click(button)

    expect(screen.getByText('Contact Information')).toBeInTheDocument()
  })
})
