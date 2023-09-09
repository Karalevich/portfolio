import { render, screen } from '@testing-library/react'
import { CarouselProvider } from 'pure-react-carousel'
import SliderContent from './SliderContent'
import { RECOMMENDATIONS } from '../../../../constants/personalInfo'

describe('SliderContent Component', () => {
  const renderComponent = (isTabletOrMobile: boolean) => {
    return render(
      <CarouselProvider
        isIntrinsicHeight
        visibleSlides={1}
        totalSlides={5}
        step={1}
        naturalSlideWidth={310}
        naturalSlideHeight={440}
        currentSlide={1}
      >
        <SliderContent isTabletOrMobile={isTabletOrMobile} />
      </CarouselProvider>
    )
  }

  test('SliderContent component renders correctly', async () => {
    renderComponent(true)

    // Check if the component renders the expected number of recommendations
    const recommendationCards = screen.getAllByRole('option')

    expect(recommendationCards.length).toBe(RECOMMENDATIONS.length)

    // Check if the first recommendation card is visible
    expect(screen.getByText(RECOMMENDATIONS[0].title)).toBeInTheDocument()
  })
})
