import React, { Fragment, useEffect, useRef, useState } from 'react'
import styles from './Timeline.module.scss'
import { IconComponent, TimelineComponent } from './types'
import { WORK_HISTORY } from '../../../../constants/personalInfo'
import { Box, Grow, useMediaQuery } from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  FreelanceIcon,
  LeverIcon,
  NexonIcon,
  SabbaticalIcon,
  WargamingIcon,
} from '../../../Custom/Icons/Motion'

export const Timeline: TimelineComponent = ({ setObserver }) => {
  const [activeStep, setActiveStep] = useState<number>(-1)
  const isDekstop = useMediaQuery('(min-width:768px)')

  const timeline0 = useRef<null | HTMLDivElement>(null)
  const timeline1 = useRef<null | HTMLDivElement>(null)
  const timeline2 = useRef<null | HTMLDivElement>(null)
  const timeline3 = useRef<null | HTMLDivElement>(null)
  const timeline4 = useRef<null | HTMLDivElement>(null)
  const circle0 = useRef<null | HTMLDivElement>(null)
  const circle1 = useRef<null | HTMLDivElement>(null)
  const circle2 = useRef<null | HTMLDivElement>(null)
  const circle3 = useRef<null | HTMLDivElement>(null)
  const circle4 = useRef<null | HTMLDivElement>(null)

  const timelines = [timeline0, timeline1, timeline2, timeline3, timeline4]
  const corcles = [circle0, circle1, circle2, circle3, circle4]
  const activateStep = (step: number) => () => {
    setActiveStep(step)
  }

  useEffect(() => {
    setObserver(timeline0.current)
    setObserver(timeline1.current)
    setObserver(timeline2.current)
    setObserver(timeline3.current)
    setObserver(timeline4.current)
    setObserver(circle0.current, activateStep(0))
    setObserver(circle1.current, activateStep(1))
    setObserver(circle2.current, activateStep(2))
    setObserver(circle3.current, activateStep(3))
    setObserver(circle4.current, activateStep(4))
  }, [])

  return (
    <div className={styles.wrapper}>
      {WORK_HISTORY.map((step, index) => (
        <Fragment key={step.date}>
          <div id={`timeline${index}`} ref={timelines[index]} className={styles.timeline} />
          <div className={styles.circleWrapper}>
            <div id={`circle${index}`} ref={corcles[index]} className={styles.circle}>
              <Icon activeStep={activeStep} index={index} />
            </div>

            <Grow
              in={activeStep >= index}
              style={{ transformOrigin: '0 0 0' }}
              {...(activeStep >= index ? { timeout: 1000 } : {})}
            >
              <Box
                className={styles.workBox}
                sx={{
                  left: `${isDekstop && index % 2 === 0 ? '-1rem' : '4rem'}`,
                  transform: `translateY(-50%) ${
                    isDekstop && index % 2 === 0 ? 'translateX(-100%)' : ''
                  } !important`,
                }}
              >
                <h4 className={styles.label}>{step.label}</h4>
                <h6 className={styles.place}>{step.place}</h6>
                <div className={styles.spec}>
                  <span className={styles.date}>{step.date}</span>
                  <span className={styles.occupation}>{step.occupation}</span>
                </div>

                <div className={styles.description}>{step.description}</div>
              </Box>
            </Grow>
          </div>
        </Fragment>
      ))}
    </div>
  )
}

export default Timeline

const IconRoot = styled('div')(() => ({
  zIndex: 1,
  color: '#fff',
  width: '3.125rem',
  height: '3.125rem',
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}))

const Icon: IconComponent = ({ activeStep, index }) => {
  const icons: { [index: string]: React.ReactElement } = {
    0: activeStep >= index ? <NexonIcon sx={{ fontSize: '2.5rem' }} /> : <div>I</div>,
    1: activeStep >= index ? <SabbaticalIcon sx={{ fontSize: '6rem' }} /> : <div>I</div>,
    2: activeStep >= index ? <WargamingIcon sx={{ fontSize: '4rem' }} /> : <div>I</div>,
    3: activeStep >= index ? <LeverIcon sx={{ fontSize: '5.5rem' }} /> : <div>I</div>,
    4: activeStep >= index ? <FreelanceIcon sx={{ fontSize: '20rem' }} /> : <div>I</div>,
  }

  return <IconRoot>{icons[String(index)]}</IconRoot>
}
