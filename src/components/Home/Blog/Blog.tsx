import React, { useEffect, useState } from 'react'
import styles from './Blog.module.scss'
import { BlogComponent } from './types'
import SectionHeader from '../SectionHeader/SectionHeader'
import { ButtonBack, ButtonNext, CarouselProvider } from 'pure-react-carousel'
import { POSTS } from 'src/constants/personalInfo'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Posts from './Posts'
import DynamicCSS from 'src/components/Custom/DynamicCSS/DynamicCSS'
import { useMediaQuery } from '@mui/material'
import classnames from 'classnames'
import { alpha, styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'


export const Blog: BlogComponent = ({ isFullVersion }) => {
  const [countOfSlide, setCountOfSlide] = useState(3)
  const [step, setStep] = useState(2)
  const isTabletOrMobile = useMediaQuery('(max-width:767px)')

  useEffect(() => {
    if (isTabletOrMobile) {
      setCountOfSlide(1)
      setStep(1)
    } else {
      setCountOfSlide(3)
      setStep(2)
    }
  }, [isTabletOrMobile])


  return (
    <section className={styles.blog}>
      <DynamicCSS properties={[{ value: POSTS.length, prop: 'posts-count' }]}/>
      <SectionHeader title={'Blog'}
                     introduction={`I like to share my experience and knowledge, that is why I decided to create my own small blog.`}/>
      {isFullVersion && <article className={styles.filter}>
        <div className={styles.search}>
          <div className={styles.searchIconWrapper}>
            <SearchIcon/>
          </div>
          <StyledInputBase placeholder="Search…"/>
        </div>
      </article>}
      <main className={classnames(styles.main, { [styles.fullMain]: isFullVersion })}>
        {isFullVersion
          ? <Posts isTabletOrMobile={isTabletOrMobile} isFullVersion/>
          : <CarouselProvider
            isIntrinsicHeight
            visibleSlides={countOfSlide}
            totalSlides={POSTS.length}
            step={step}
            naturalSlideWidth={310}
            naturalSlideHeight={440}
            currentSlide={0}
          >
            <Posts isTabletOrMobile={isTabletOrMobile} isFullVersion={false}/>
            <ButtonBack className={styles.buttonBack}>
              <ArrowBackIosNewIcon color={'secondary'} fontSize={'inherit'}/>
            </ButtonBack>
            <ButtonNext className={styles.buttonNext}>
              <ArrowForwardIosIcon color={'secondary'} fontSize={'inherit'}/>
            </ButtonNext>
          </CarouselProvider>}

      </main>
    </section>
  )
}

export default Blog

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    backgroundColor: 'var(--bcg-search-input)',
    borderRadius: '4px',
    width: '100%',

    [theme.breakpoints.up('sm')]: {
      width: '10rem',
      '&:focus': {
        width: '20rem',
      },
    },


  },
  '&:hover': {
    opacity: 0.9,
  },
}))
