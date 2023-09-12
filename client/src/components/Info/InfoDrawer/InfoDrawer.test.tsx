import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import InfoDrawer from './InfoDrawer'
import { notistackActions } from '../../../actions/notistackAction'
import { LANGUAGES, SKILLS, EXTRA_SKILLS } from '../../../constants/personalInfo'
import { useAppDispatch } from '../../../hooks/hooks'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { InfoDrawerProps } from './types'

// Mock the useAppDispatch hook and enqueueSnackbarAC action
jest.mock('../../../hooks/hooks', () => ({
  useAppDispatch: jest.fn(),
}))

jest.mock('../../../actions/notistackAction', () => ({
  notistackActions: {
    enqueueSnackbarAC: jest.fn(),
  },
}))

const initialMockedProps = {
  className: 'test class',
  closeDrawer: jest.fn(),
  isFixed: false,
}

describe('InfoDrawer Component', () => {
  beforeEach(() => {
    // Reset any mock implementation or calls before each test
    jest.clearAllMocks()
    const mockDispatch = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  const renderComponent = (mockedProps: InfoDrawerProps) => {
    const reducers = combineReducers({
      post: (state = {}) => state,
    })

    const mockedStore = configureStore({
      reducer: reducers,
    })
    return render(
      <Provider store={mockedStore}>
        <InfoDrawer {...mockedProps} />
      </Provider>
    )
  }

  test('renders correctly with languages, skills, and extra skills', () => {
    renderComponent(initialMockedProps)

    // Check if the component renders with the correct titles
    expect(screen.getByText('Languages')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Extra Skills')).toBeInTheDocument()

    // Check if the component renders skills data
    LANGUAGES.forEach((language) => {
      expect(screen.getByText(language.skillName)).toBeInTheDocument()
    })

    SKILLS.forEach((skill) => {
      expect(screen.getByText(skill.skillName)).toBeInTheDocument()
    })

    EXTRA_SKILLS.forEach((extraSkill) => {
      expect(screen.getByText(extraSkill.skillName)).toBeInTheDocument()
    })
  })

  test('triggers the download handler when Download CV button is clicked', async () => {
    const mockFetch = jest.fn(() => ({
      blob: jest.fn(() => ({
        text: jest.fn(() => 'fake PDF data'),
      })),
    }))

    window.URL.createObjectURL = jest.fn()
    // Mock the fetch function
    // @ts-ignore
    window.fetch = mockFetch

    renderComponent(initialMockedProps)

    const downloadButton = screen.getByLabelText('Wish download my resume in pdf format?')
    // Trigger the click event on the Download CV button
    fireEvent.click(downloadButton)

    await waitFor(() => {
      expect(notistackActions.enqueueSnackbarAC).toHaveBeenCalledWith({
        message: 'Resume successfully downloaded',
        options: {
          variant: 'success',
        },
      })
    })
  })
})
