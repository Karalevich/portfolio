import { render, screen } from '@testing-library/react'
import Map from './Map'

describe('Map', () => {
  test('renders the map iframe with the correct attributes', () => {
    render(<Map />)

    // Find the iframe element by its data-testid attribute
    const iframe = screen.getByTestId('map-iframe')

    // Check if the iframe exists
    expect(iframe).toBeInTheDocument()

    // Check if the iframe has the correct src attribute
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.5578865356!2d-118.37346872382672!3d33.926776624344086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b6bdb8ac402f%3A0xa9aa91b30f6e4938!2s5211%20Pacific%20Concourse%20Dr%2C%20Los%20Angeles%2C%20CA%2090045!5e0!3m2!1sen!2sus!4v1681363404615!5m2!1sen!2sus'
    )

    // Check if the iframe has the allowFullScreen attribute
    expect(iframe).toHaveAttribute('allowFullScreen')

    // Check if the iframe has the loading attribute set to 'lazy'
    expect(iframe).toHaveAttribute('loading', 'lazy')

    // Check if the iframe has the referrerPolicy attribute set to 'no-referrer-when-downgrade'
    expect(iframe).toHaveAttribute('referrerPolicy', 'no-referrer-when-downgrade')
  })
})
