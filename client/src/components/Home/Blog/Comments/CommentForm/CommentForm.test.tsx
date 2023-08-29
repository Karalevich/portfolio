import { render, screen, waitFor } from '@testing-library/react'
import { CommentFormProps } from './types'
import CommentForm from './CommentForm'
import userEvent from '@testing-library/user-event'

const mockedInitialProps = {
  value: 'test',
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  isLoadingComments: false,
  disabled: false,
}

describe('CommentForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const renderComponent = (mockedProps: CommentFormProps) => {
    return render(<CommentForm {...mockedProps} />)
  }

  test('render textbox with certain value', () => {
    renderComponent(mockedInitialProps)
    const textElement = screen.getByRole('textbox') as HTMLInputElement
    const buttonElement = screen.getByRole('button')
    const progressbarElement = screen.queryByRole('progressbar')

    expect(textElement).toBeInTheDocument()
    expect(buttonElement).toBeInTheDocument()
    expect(progressbarElement).toBeNull()

    expect(textElement.value).toBe(mockedInitialProps.value)
    expect(buttonElement).not.toBeDisabled()
  })

  test('button should be disabled', () => {
    renderComponent({
      ...mockedInitialProps,
      disabled: true,
    })

    const buttonElement = screen.getByRole('button')

    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toBeDisabled()
  })

  test('progressbar should be in the dom', () => {
    renderComponent({
      ...mockedInitialProps,
      isLoadingComments: true,
    })

    const progressbarElement = screen.queryByRole('progressbar')
    expect(progressbarElement).toBeInTheDocument()
  })

  test('onChange should be trigger on typing', async () => {
    renderComponent(mockedInitialProps)

    const textElement = screen.getByRole('textbox')
    expect(textElement).toBeInTheDocument()

    await userEvent.type(textElement, 'T')

    // Assert that the comment is submitted
    await waitFor(() => {
      // Assert that createPostThunk is called with the correct values
      expect(mockedInitialProps.onChange).toHaveBeenCalled()
    })
  })

  test('onSubmit should be trigger on click button', async () => {
    renderComponent(mockedInitialProps)

    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toBeInTheDocument()

    await userEvent.click(buttonElement)

    // Assert that the comment is submitted
    await waitFor(() => {
      // Assert that createPostThunk is called with the correct values
      expect(mockedInitialProps.onSubmit).toHaveBeenCalled()
    })
  })
})
