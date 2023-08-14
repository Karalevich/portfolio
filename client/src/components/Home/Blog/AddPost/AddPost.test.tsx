import React from 'react'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import { AddPost } from './AddPost'
import { useAppDispatch } from '../../../../hooks/hooks'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userEvent from '@testing-library/user-event'
import { createPostThunk } from '../../../../actions/postAction'
import { useNavigate } from 'react-router-dom'

// Mock Redux hooks
jest.mock('../../../../hooks/hooks', () => ({
  ...jest.requireActual('../../../../hooks/hooks'),
  useAppDispatch: jest.fn(),
}))

jest.mock('react-router-dom')
// Mock userActions and signInThunk
jest.mock('../../../../actions/postAction', () => ({
  updatePostThunk: jest.fn(),
  createPostThunk: jest.fn(),
  postActions: {
    setErrSignInMessageAC: jest.fn(),
    resetPostAC: jest.fn(),
  },
}))
jest.setTimeout(10000)

describe('AddPost Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  const renderComponent = (mockedState: any) => {
    const reducers = combineReducers({
      post: (state = mockedState) => state,
    })

    const mockedStore = configureStore({
      reducer: reducers,
    })
    return render(
      <Provider store={mockedStore}>
        <AddPost />
      </Provider>
    )
  }

  test('should render correct title', async () => {
    const mockedState = {
      _id: 'testId',
      title: 'Test Title',
      description: 'Test Description',
      tags: ['tag1', 'tag2', 'tag3'],
      content: 'Test Content',
      isFetchingForm: false,
    }

    await act(async () => {
      renderComponent(mockedState)
    })

    expect(screen.getByText('Edit Post')).toBeInTheDocument()

    await act(async () => {
      mockedState._id = ''
      renderComponent(mockedState)
    })

    expect(screen.getByText('Create post')).toBeInTheDocument()
  })
  test('should display and submit the form with valid data', async () => {
    const mockedState = {
      _id: '',
      title: '',
      description: '',
      tags: [],
      content: '',
      isFetchingForm: false,
    }
    const mockNavigate = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)
    const mockFile = new File(['file contents'], 'file1.png', { type: 'image/png' })

    const { container } = renderComponent(mockedState)

    // Get input elements
    const titleInput = screen.getByLabelText('Title')
    const descriptionInput = screen.getByLabelText('Description')
    const tagsInput = screen.getByLabelText('Tags')
    const fileInput = screen.getByLabelText('drop-zone-input')
    const contentInput = container.querySelector('.ql-editor')
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    expect(titleInput).toBeInTheDocument()
    expect(descriptionInput).toBeInTheDocument()
    expect(tagsInput).toBeInTheDocument()
    expect(fileInput).toBeInTheDocument()
    expect(contentInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()

    // Type valid email and password
    await userEvent.type(titleInput, 'Test title')
    await userEvent.type(
      descriptionInput,
      'Test description with correct test length test string test string test string test string test string'
    )
    await userEvent.type(tagsInput, 'testTag')
    await waitFor(() =>
      fireEvent.change(fileInput, {
        target: { files: [mockFile] },
      })
    )
    await userEvent.type(contentInput!, 'Test content with at lest 5 word')

    // Submit the form
    await userEvent.click(submitButton)

    // Wait for the form submission (for asynchronous actions)
    await waitFor(() => {
      // Assert that createPostThunk is called with the correct values
      expect(createPostThunk).toHaveBeenCalledWith(
        {
          title: 'Test title',
          description:
            'Test description with correct test length test string test string test string test string test string',
          tags: 'testTag',
          content: '<p>Test content with at lest 5 word</p>',
          img: [mockFile],
        },
        mockNavigate
      )
    })
  })
  test('should display error with submit invalid data', async () => {
    const mockedState = {
      _id: '',
      title: '',
      description: '',
      tags: [],
      content: '',
      isFetchingForm: false,
    }
    const mockNavigate = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)

    renderComponent(mockedState)

    // Get input elements
    const titleInput = screen.getByLabelText('Title')
    const descriptionInput = screen.getByLabelText('Description')
    const tagsInput = screen.getByLabelText('Tags')
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    // Type valid email and password
    await userEvent.type(titleInput, 'Te')
    await userEvent.type(descriptionInput, 'Test description')
    await userEvent.type(
      tagsInput,
      'testTag testTag testTag testTag testTag testTag testTag testTag testTag'
    )

    // Submit the form
    await userEvent.click(submitButton)

    // Wait for the form submission (for asynchronous actions)
    await waitFor(() => {
      expect(screen.getByText('Title should be at least 3 symbols')).toBeInTheDocument()
      expect(screen.getByText('Description should be at least 90 symbols')).toBeInTheDocument()
      expect(screen.getByText('Tags is too long')).toBeInTheDocument()
      expect(screen.getByText('Content is required')).toBeInTheDocument()
      expect(screen.getByText('Image is required')).toBeInTheDocument()
    })
  })
  test('should display errors without data', async () => {
    const mockedState = {
      _id: '',
      title: '',
      description: '',
      tags: [],
      content: '',
      isFetchingForm: false,
    }
    const mockNavigate = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)

    renderComponent(mockedState)

    const submitButton = screen.getByRole('button', { name: 'Submit' })

    expect(submitButton).toBeInTheDocument()

    // Submit the form
    await userEvent.click(submitButton)
    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument()
      expect(screen.getByText('Description is required')).toBeInTheDocument()
      expect(screen.getByText('Tags is required')).toBeInTheDocument()
      expect(screen.getByText('Image is required')).toBeInTheDocument()
      expect(screen.getByText('Content is required')).toBeInTheDocument()
    })
  })
  test('clears the form when clear button is clicked', async () => {
    const mockedState = {
      _id: '',
      title: '',
      description: '',
      tags: [],
      content: '',
      isFetchingForm: false,
    }

    const mockFile = new File(['file contents'], 'file1.png', { type: 'image/png' })

    renderComponent(mockedState)

    // Get input elements
    const titleInput = screen.getByLabelText('Title')
    const descriptionInput = screen.getByLabelText('Description')
    const tagsInput = screen.getByLabelText('Tags')
    const fileInput = screen.getByLabelText('drop-zone-input')
    const clearButton = screen.getByRole('button', { name: 'Clear' })

    // Type valid email and password
    await userEvent.type(titleInput, 'Test title')
    await userEvent.type(
      descriptionInput,
      'Test description with correct test length test string test string test string test string test string'
    )
    await userEvent.type(tagsInput, 'testTag')
    await waitFor(() =>
      fireEvent.change(fileInput, {
        target: { files: [mockFile] },
      })
    )

    // Submit the form
    await userEvent.click(clearButton)

    // Assert that the form inputs are cleared
    expect(screen.getByLabelText('Title')).toHaveValue('')
    expect(screen.getByLabelText('Description')).toHaveValue('')
    expect(screen.getByLabelText('Tags')).toHaveValue('')
    expect(screen.getByLabelText('drop-zone-input')).toHaveValue('')
  })
  test('should disabled inputs and button when isFetchingForm=true', async () => {
    const mockedState = {
      _id: '',
      title: '',
      description: '',
      tags: [],
      content: '',
      isFetchingForm: true,
    }
    renderComponent(mockedState)

    // Get input elements
    const titleInput = screen.getByLabelText('Title')
    const descriptionInput = screen.getByLabelText('Description')
    const tagsInput = screen.getByLabelText('Tags')
    const fileInput = screen.getByLabelText('drop-zone-input')
    const clearButton = screen.getByRole('button', { name: 'Clear' })
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    expect(titleInput).toBeDisabled()
    expect(descriptionInput).toBeDisabled()
    expect(tagsInput).toBeDisabled()
    expect(fileInput).toBeDisabled()
    expect(clearButton).toBeDisabled()
    expect(submitButton).toBeDisabled()
  })
})
