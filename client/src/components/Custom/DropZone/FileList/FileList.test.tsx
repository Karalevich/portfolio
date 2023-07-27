import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FileList from './FileList'

// Sample mock data for testing
const file1 = new File([], 'file1.jpg')
const file2 = new File([], 'file2.jpg')
const file3 = new File([], 'file3.jpg')
const mockFiles = [file1, file2, file3]

describe('FileList component', () => {
  test('renders the list of files correctly', () => {
    render(<FileList acceptedFiles={mockFiles} removeFile={() => {}} />)

    const fileItems = screen.getAllByRole('listitem')
    expect(fileItems).toHaveLength(mockFiles.length)

    // Check if file names are displayed correctly
    mockFiles.forEach((file) => {
      expect(screen.getByText(file.name)).toBeInTheDocument()
    })
  })

  test('calls removeFile when the delete button is clicked', () => {
    const mockRemoveFile = jest.fn()
    render(<FileList acceptedFiles={mockFiles} removeFile={mockRemoveFile} />)

    const deleteButtons = screen.getAllByRole('button')

    // Click the delete button for each file
    deleteButtons.forEach((button, index) => {
      fireEvent.click(button)
      expect(mockRemoveFile).toHaveBeenCalledWith(mockFiles[index].name)
    })
  })
})