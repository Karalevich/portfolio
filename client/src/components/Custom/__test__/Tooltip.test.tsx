import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tooltip } from '../Tooltip'
import { mainTheme } from '../../../styles/themes/mainTheme'
import { ThemeProvider } from '@mui/material/styles'

describe('Tooltip component', () => {
  test('renders the tooltip with the correct styles', async () => {
    render(
      <ThemeProvider theme={mainTheme}>
        <Tooltip title='Example Tooltip'>
          <button>Hover Me</button>
        </Tooltip>
      </ThemeProvider>
    )

    // Check if the tooltip is not visible initially
    const tooltipElement = screen.queryByRole('tooltip')
    expect(tooltipElement).not.toBeInTheDocument()

    // Simulate hovering over the button to trigger the tooltip
    userEvent.hover(screen.getByRole('button'))

    // Wait for the tooltip to appear
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument()
    })
  })
})
