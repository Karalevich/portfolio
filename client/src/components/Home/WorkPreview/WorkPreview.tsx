import React, { ChangeEvent, useState } from 'react'
import styles from './WorkPreview.module.scss'
import { styled } from '@mui/material/styles'
import { WorkPreviewComponent } from './types'
import SectionHeader from '../SectionHeader/SectionHeader'
import {
  Box,
  collapseClasses,
  Step,
  stepClasses,
  StepContent,
  stepContentClasses,
  StepIconProps,
  StepLabel,
  stepLabelClasses,
  Stepper,
} from '@mui/material'
import { WORK_HISTORY } from '../../../constants/personalInfo'
import { InView } from 'react-intersection-observer'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import {
  FreelanceIcon,
  LeverIcon,
  NexonIcon,
  SabbaticalIcon,
  WargamingIcon,
} from 'src/components/Custom/Icons/Motion'
import { Switch } from 'src/components/Custom/Switch'

export const WorkPreview: WorkPreviewComponent = () => {
  const [activeStep, setActiveStep] = useState<number>(-1)
  const [isStepsExpended, setIsStepsExpended] = useState<boolean>(false)

  const handleSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setIsStepsExpended(event.target.checked)
    if (event.target.checked) {
      setActiveStep(WORK_HISTORY.length)
    } else {
      setActiveStep(-1)
    }
  }

  const stepInViewHandler =
    (stepIndex: number) => (inView: boolean, entry: IntersectionObserverEntry) => {
      if (inView && !isStepsExpended) {
        if (stepIndex === WORK_HISTORY.length - 1) {
          setIsStepsExpended(true)
          setActiveStep(WORK_HISTORY.length)
        } else {
          setActiveStep(stepIndex)
        }
      }
    }

  const spec = (occupation: string, date: string) => (
    <div className={styles.spec}>
      <span className={styles.occupation}>{occupation}</span> <span className={styles.date}>{date}</span>
    </div>
  )

  return (
    <section className={styles.workPreview}>
      <SectionHeader
        title={'Work History'}
        introduction={
          'I have a broad range of projects that I worked on: ' +
          'huge B2B platform, E-commerce and game companies like Wargaming and Nexon America which have different target markets.'
        }
      />
      <Box
        sx={{
          backgroundColor: 'var(--background)',
          transition: 'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          padding: '2.8rem 2.43vw',
          borderRadius: '2px',
        }}
      >
        <Switch className={styles.switch} checked={isStepsExpended} onChange={handleSwitch} />
        <Stepper
          activeStep={activeStep}
          orientation='vertical'
          className={styles.stepper}
          connector={<ColorlibConnector />}
        >
          {WORK_HISTORY.map((step, index) => (
            <ColorlibStep expanded={isStepsExpended || index < activeStep} key={step.label}>
              <InView
                as='div'
                rootMargin={`0px 0px -${30 + index * 10}% 0px`}
                onChange={stepInViewHandler(index)}
              >
                <StepLabel
                  StepIconComponent={ColorlibStepIcon}
                  optional={spec(step.occupation, step.date)}
                >
                  <h4 className={styles.label}>{step.label}</h4>
                  <h6 className={styles.place}>{step.place}</h6>
                </StepLabel>
                <StepContent>
                  <div className={styles.description}>{step.description}</div>
                </StepContent>
              </InView>
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
        background:
          'linear-gradient(0deg, rgba(255,180,0,0.93) 0%, rgba(255,203,42,1) 50%, rgba(255,247,124,1) 100%)',
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
      borderBottom: '1.5px solid var(--substrate2)',
    },
    '&:before': {
      content: '""',
      width: 3,
      position: 'absolute',
      backgroundColor: '#eaeaf0',
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
  [`& .${stepLabelClasses.labelContainer}`]: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    gap: 'calc(25%)',
  },
  [`& .${stepLabelClasses.active} + span`]: {
    'span[class*="date"]': {
      backgroundColor: '#ffb400 !important',
      color: '#ffffff',
    },
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
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}))

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean }
}>(({ theme, ownerState }) => ({
  backgroundColor: '#ccc',
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
    1: active || completed ? <NexonIcon sx={{ fontSize: '2.5rem' }} /> : <div>I</div>,
    2: active || completed ? <SabbaticalIcon sx={{ fontSize: '6rem' }} /> : <div>I</div>,
    3: active || completed ? <WargamingIcon sx={{ fontSize: '4rem' }} /> : <div>I</div>,
    4: active || completed ? <LeverIcon sx={{ fontSize: '5.5rem' }} /> : <div>I</div>,
    5: active || completed ? <FreelanceIcon sx={{ fontSize: '20rem' }} /> : <div>I</div>,
  }

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}
