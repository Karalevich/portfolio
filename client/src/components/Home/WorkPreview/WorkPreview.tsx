import React, { ChangeEvent, useState } from 'react'
import styles from './WorkPreview.module.scss'
import { WorkPreviewComponent } from './types'
import SectionHeader from '../SectionHeader/SectionHeader'
import TimelineObserver from 'react-timeline-animation'
import { Switch } from 'src/components/Custom/Switch'
import Timeline from './Timeline/Timeline'

export const WorkPreview: WorkPreviewComponent = () => {
  const [hasReverse, setHasReverse] = useState<boolean>(false)

  const handleSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setHasReverse(event.target.checked)
  }

  const onCallback = () => {
    console.log("awesome");
  }


  return (
    <section className={styles.workPreview}>
      <SectionHeader
        title={'Work History'}
        introduction={
          'I have a broad range of projects that I worked on: ' +
          'huge B2B platform, E-commerce and game companies like Wargaming and Nexon America which have different target markets.'
        }
      />

      <Switch className={styles.switch} checked={hasReverse} onChange={handleSwitch} />
      <TimelineObserver
        key={`${hasReverse}`}
        hasReverse={hasReverse}
        initialColor='#767676'
        fillColor='rgba(255,180,0,0.93)'
        handleObserve={(setObserver) => (
          <Timeline
            callback={onCallback}
            setObserver={setObserver}
          />
        )}
      />
    </section>
  )
}

export default WorkPreview
