import React, { useState } from 'react'
import styles from './WorkPreview.module.scss'
import { WorkPreviewComponent } from './types'
import ServiceHeader from '../ServiceHeader/ServiceHeader'
import { Box, Button, Step, StepContent, StepLabel, Stepper } from '@mui/material'
import { WORK_HISTORY } from '../../../constants/personalInfo'


export const WorkPreview: WorkPreviewComponent = () => {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const spec = (occupation: string, date: string) => (<div className={styles.spec}>
    <span className={styles.occupation}>{occupation}</span> <span className={styles.date}>{date}</span>
  </div>)

  return (
    <section className={styles.workPreview}>
      <ServiceHeader title={'Work History'} introduction={'I have a broad range of projects that I worked on: ' +
      'huge B2B platform, E-commerce and game companies like Wargaming and Nexon America which have different target markets.'}/>
      <Box sx={{
        backgroundColor: 'white',
        padding: '5vh 2.43vw',
        borderRadius: '2px',
      }}>
        <Stepper activeStep={activeStep} orientation="vertical" className={styles.stepper} sx={{
          '.MuiStepContent-root': {
            display: 'flex',
            justifyContent: 'flex-end',
            '.MuiCollapse-root': {
              width: '45vw',
            }
          },
        }}>
          {WORK_HISTORY.map((step, index) => (
            <Step key={step.label}>
              <StepLabel optional={spec(step.occupation, step.date)}
                         sx={{
                           '.MuiStepLabel-labelContainer': {
                             display: 'flex',
                             flexDirection: 'row-reverse',
                             justifyContent: 'flex-end',
                             gap: 'calc(25%)',
                           },
                         }}>
                <h4 className={styles.label}>{step.label}</h4>
                <h6 className={styles.place}>{step.place}</h6>
              </StepLabel>
              <StepContent>
                <p>{step.description}</p>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                  >
                    {index === WORK_HISTORY.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </section>
  )
}

export default WorkPreview