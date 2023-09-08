import React from 'react'
import styles from './Price.module.scss'
import { PriceComponent } from './types'
import SectionHeader from '../SectionHeader/SectionHeader'
import { PRICES } from 'src/constants/personalInfo'
import PriceItem from './PriceItem/PriceItem'

export const Price: PriceComponent = () => {
  const prices = PRICES.map((price) => <PriceItem key={price.title} {...price} />)
  return (
    <section className={styles.price}>
      <SectionHeader
        title={'Price Plan'}
        introduction={
          'This is the typical base pay range for this role across the U.S. ' +
          'This range may vary to specific work locations, like San Francisco ' +
          'area or New York area. And also it depends on specifics, types, and models of work.'
        }
      />
      <main>
        <ul className={styles.list}>{prices}</ul>
      </main>
    </section>
  )
}

export default Price
