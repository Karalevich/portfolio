import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './PriceItem.module.scss'
import { CheckIcon, CloseIcon } from '../../../Custom/Icons'
import { Button, Card } from '@mui/material'
import CountUp from 'react-countup'
import { PriceItemComponent } from './types'

const PriceItem: PriceItemComponent = ({ title, description, price, isPopular, duties }) => {
  const [isCardHover, setIsCardHover] = useState(false)
  const navigate = useNavigate()

  const toggleIsCardHover = (value: boolean) => () => {
    setIsCardHover(value)
  }

  const handleRedirect = () => {
    navigate('/contact')
  }

  const dutiesList = duties.map((duty) => {
    return (
      <li className={styles.duty} key={duty.name}>
        {duty.isRequired ? (
          <CheckIcon className={styles.check} />
        ) : (
          <CloseIcon className={styles.close} />
        )}
        <p className={duty.isRequired ? styles.active : undefined}>{duty.name}</p>
      </li>
    )
  })
  return (
    <li className={styles.item}>
      <Card
        className={styles.card}
        elevation={isCardHover ? 2 : 0}
        onMouseEnter={toggleIsCardHover(true)}
        onMouseLeave={toggleIsCardHover(false)}
      >
        <header className={styles.header}>
          {isPopular && <span className={styles.popular}>Most Popular</span>}
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.charge}>
            <h2 className={styles.numbers}>
              <strong>
                $<CountUp end={price} duration={3} scrollSpyDelay={300} enableScrollSpy scrollSpyOnce />
                .00
              </strong>
            </h2>
            <span className={styles.hour}>/Hour</span>
          </div>
          <p className={styles.description}>{description}</p>
        </header>
        <main className={styles.main}>
          <ul>{dutiesList}</ul>
        </main>
        <footer className={styles.footer}>
          <Button
            className={styles.order}
            variant='contained'
            onClick={handleRedirect}
            color={isPopular ? 'primary' : 'secondary'}
          >
            Order now
          </Button>
        </footer>
      </Card>
    </li>
  )
}

export default PriceItem
