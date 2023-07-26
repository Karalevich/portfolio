import React from 'react'
import { render, screen } from '@testing-library/react'
import DropZone from './DropZone'

const mockRemoveFileFromForm = jest.fn()
const mockSetMyFiles = jest.fn()
const mockError = 'Invalid file format.'
const mockFiles = [
  new File(['file contents'], 'file1.png', { type: 'image/png' }),
  new File(['file contents'], 'file2.png', { type: 'image/png' }),
]

// Mock the useDropzone hook

describe('DropZone Component', () => {
  test('renders the drop zone with the correct message', () => {
    render(
      <DropZone
        removeFileFromForm={mockRemoveFileFromForm}
        myFiles={mockFiles}
        setMyFiles={mockSetMyFiles}
      />
    )
    const message = screen.getByText('Drag photos here or click')
    expect(message).toBeInTheDocument()
  })

  test('displays error message if there is an error', () => {
    render(
      <DropZone
        removeFileFromForm={mockRemoveFileFromForm}
        myFiles={mockFiles}
        setMyFiles={mockSetMyFiles}
        error={mockError}
      />
    )
    const errorMessage = screen.getByText(mockError)
    expect(errorMessage).toBeInTheDocument()
  })

  // TODO
  // test('calls setMyFiles when files are dropped', () => {
  //   // Create a custom mock for the useDropzone hook
  //   const useDropzoneMock = (options: any) => ({
  //     getRootProps: () => ({ style: {} }),
  //     getInputProps: () => ({ onChange: options.onDrop }),
  //     isFocused: true,
  //     isDragAccept: true,
  //   })
  //
  //   jest.mock('react-dropzone', () => ({
  //     useDropzone: useDropzoneMock,
  //   }))
  //   render(
  //     <DropZone
  //       removeFileFromForm={mockRemoveFileFromForm}
  //       myFiles={mockFiles}
  //       setMyFiles={mockSetMyFiles}
  //     />,
  //   )
  //
  //   const dropzone = screen.getByLabelText('drop-zone-input')
  //   expect(dropzone).toBeInTheDocument()
  //
  //   // Simulate file drop event by triggering 'change' event on the input element with the files
  //   fireEvent.change(dropzone, { target: { files: mockFiles } })
  //
  //   // Ensure that setMyFiles was called with the mockFiles array
  //   expect(mockSetMyFiles).toHaveBeenCalled()
  // })
})
