import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import styles from './WorkPreview.module.scss'
import { styled } from '@mui/material/styles'
import { DIRECTION, WorkPreviewComponent } from './types'
import SectionHeader from '../SectionHeader/SectionHeader'
import {
  Box, collapseClasses,
  Step, stepClasses,
  StepContent,
  stepContentClasses,
  StepIconProps,
  StepLabel, stepLabelClasses,
  Stepper,
} from '@mui/material'
import { WORK_HISTORY } from '../../../constants/personalInfo'
import { useInView } from 'react-intersection-observer'
import { useScrollLock } from 'src/hooks/useScrollLock'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { FreelanceIcon, LeverIcon, NexonIcon, SabbaticalIcon, WargamingIcon } from 'src/components/Custom/Icons/Motion'
import { SCROLL_DELAY } from '../../../constants/settings'
import { Switch } from 'src/components/Custom/Switch'


export const WorkPreview: WorkPreviewComponent = () => {
  const [activeStep, setActiveStep] = useState<number>(-1)
  const [isStepsExpended, setIsStepsExpended] = useState<boolean>(false)
  const { lockScroll, unlockScroll, isScrollLocked } = useScrollLock()
  const { ref: inViewRef, inView } = useInView({ rootMargin: '-30% 0px -50% 0px' })
  const workRef = useRef<null | HTMLElement>(null)
  let direction: DIRECTION = DIRECTION.DOWN
  let deltaY = 0

  const setRefs = useCallback((node: HTMLElement | null) => {
    workRef.current = node
    inViewRef(node)
  }, [inViewRef])

  const onScrollAction = (event: any) => {
    console.log(event)
    if (!isStepsExpended) {
      controlDirection(event)

      if (inView) {
        lockScroll()
      }

      if (activeStep === Math.floor(WORK_HISTORY.length / 2) || activeStep === Math.ceil(WORK_HISTORY.length / 2)) {
        workRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }

      if ((direction === DIRECTION.UP && activeStep === -1) ||
        (direction === DIRECTION.DOWN && activeStep === WORK_HISTORY.length)) {
        unlockScroll()
      } else if (isScrollLocked && direction === DIRECTION.DOWN) {
        deltaY += event.deltaY
        if (deltaY > SCROLL_DELAY) {
          handleNext()
          deltaY = 0
        }
      } else if (direction === DIRECTION.UP && isScrollLocked) {
        handleBack()
      }
    }
  }


  useEffect(() => {
    window.addEventListener('wheel', onScrollAction, { passive: false })
    const handleTouchmove = () => {
      console.log('kek')
      document.dispatchEvent(new Event('wheel'))
    }
    window.addEventListener('touchmove', onScrollAction)
    return () => {
      window.removeEventListener('wheel', onScrollAction)
      window.removeEventListener('touchmove', onScrollAction)
    }
  }, [onScrollAction, inView, isStepsExpended])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1 <= WORK_HISTORY.length ? prevActiveStep + 1 : WORK_HISTORY.length - 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1 >= -1 ? prevActiveStep - 1 : -1)
  }

  const controlDirection = (event: WheelEvent) => {
    if (event.deltaY > 0) {
      direction = DIRECTION.DOWN
    } else {
      direction = DIRECTION.UP
    }
  }

  const handleSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setIsStepsExpended(event.target.checked)
    if (event.target.checked) {
      unlockScroll()
      setActiveStep(WORK_HISTORY.length)
    } else {
      lockScroll()
      unlockScroll()
      setActiveStep(-1)
    }
  }

  const spec = (occupation: string, date: string) => (<div className={styles.spec}>
    <span className={styles.occupation}>{occupation}</span> <span className={styles.date}>{date}</span>
  </div>)

  return (
    <section className={styles.workPreview}>
      <SectionHeader title={'Work History'} introduction={'I have a broad range of projects that I worked on: ' +
      'huge B2B platform, E-commerce and game companies like Wargaming and Nexon America which have different target markets.'}/>
      <Box ref={setRefs} sx={{
        backgroundColor: 'white',
        padding: '2.8rem 2.43vw',
        borderRadius: '2px',
      }}>
        <Switch className={styles.switch} checked={isStepsExpended} onChange={handleSwitch}/>
        <Stepper activeStep={activeStep} orientation="vertical" className={styles.stepper}
                 connector={<ColorlibConnector/>}>
          {WORK_HISTORY.map((step, index) => (
            <ColorlibStep key={step.label} expanded={isStepsExpended}>
              <StepLabel StepIconComponent={ColorlibStepIcon} optional={spec(step.occupation, step.date)}>
                <h4 className={styles.label}>{step.label}</h4>
                <h6 className={styles.place}>{step.place}</h6>
              </StepLabel>
              <StepContent>
                <p>{step.description}</p>
              </StepContent>
            </ColorlibStep>
          ))}
        </Stepper>
      </Box>
    </section>
  )
}

export default WorkPreview

const ColorlibStep = styled(Step)(({ theme }) => ({
  [`&.${stepClasses.completed}`]: {
    [`& .${stepContentClasses.root}`]: {
      '&:before': {
        background: 'linear-gradient(0deg, rgba(255,180,0,0.93) 0%, rgba(255,203,42,1) 50%, rgba(255,247,124,1) 100%)',
      },
    },

    [`& .${stepLabelClasses.labelContainer}`]: {
      'span[class*="date"]': {
        backgroundColor: '#ffb400',
        color: '#ffffff',
      },
    },
  },
  [`& .${stepContentClasses.root}`]: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
    paddingTop: '30px',
    paddingBottom: '20px',
    borderLeft: 'none',
    marginLeft: '1.5rem',

    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '20px',
      width: '100%',
      borderBottom: '1.5px solid #F0F0F6',
    },
    '&:before': {
      content: '""',
      width: 3,
      position: 'absolute',
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      top: 0,
      left: 0,
      bottom: 0,
    },
  },
  [`&.${stepClasses.root}:last-child`]: {
    [`& .${stepContentClasses.root}`]: {
      '&:after': {
        border: 'none',
      },
    },

  },
  [`& .${collapseClasses.root}`]: {
    width: '45vw',
  },

  [`& .${stepLabelClasses.root}`]: {
    //paddingTop: '0px',
  },

  [`& .${stepLabelClasses.labelContainer}`]: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    gap: 'calc(25%)',
  },
}))

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(180deg, rgba(255,180,0,0.93) 0%, rgba(255,203,42,1) 50%, rgba(255,247,124,1) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(180deg, rgba(255,180,0,0.93) 0%, rgba(255,203,42,1) 50%, rgba(255,247,124,1) 100%)',
    },
  },
  [`&.${stepConnectorClasses.root}`]: {
    marginLeft: '1.5rem',
  },
  [`& .${stepConnectorClasses.line}`]: {
    width: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}))

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: '3.125rem',
  height: '3.125rem',
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    background:
      'linear-gradient(180deg, rgba(255,158,0,1) 0%, rgba(255,180,0,1) 50%, rgba(255,212,110,1) 100%)',
    boxShadow: '0 1px 5px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    background:
      'linear-gradient(180deg, rgba(255,158,0,1) 0%, rgba(255,180,0,1) 50%, rgba(255,212,110,1) 100%)',
  }),
}))

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props

  const icons: { [index: string]: React.ReactElement } = {
    1: active || completed ? <NexonIcon sx={{ fontSize: '2.5rem' }}/> : <div>I</div>,
    2: active || completed ? <SabbaticalIcon sx={{ fontSize: '6rem' }}/> : <div>I</div>,
    3: active || completed ? <WargamingIcon sx={{ fontSize: '4rem' }}/> : <div>I</div>,
    4: active || completed ? <LeverIcon sx={{ fontSize: '5.5rem' }}/> : <div>I</div>,
    5: active || completed ? <FreelanceIcon sx={{ fontSize: '20rem' }}/> : <div>I</div>,
  }

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}

