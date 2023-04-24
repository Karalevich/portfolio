import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import styles from './ServicePage.module.scss'
import { CustomSeparatorComponent, ServicePageComponent } from './types'
import Recommendations from '../../Recommendations/Recommendations'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { SERVICE_PAGES } from '../../../../constants/personalInfo'
import { Breadcrumbs, Link as MUILink } from '@mui/material'

const FONT_SIZE = 16
const ICON_SIZE = 3

export const ServicePage: ServicePageComponent = () => {
  const { servicePage } = useParams()
  const ref = useRef<HTMLHeadingElement | null>(null)
  const [targetSizeElement, setTargetSizeElement] = useState<Array<number>>([0, 0])
  const [isHovering, setIsHovering] = useState(false)

  const [dx, dy] = targetSizeElement
  const { serviceTitle, icons, projectsTitle, firstArticle, secondArticle, thirdArticle } = SERVICE_PAGES[servicePage as string]

  useLayoutEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect()
      setTargetSizeElement([width, height])
    }
  }, [dx, dy])

  const calculatePosition = useMemo(() => (index: number): Array<number> => {
    let left = dx / (2 * FONT_SIZE)
    let top = dy / (2 * FONT_SIZE)


    const angle = 360 / icons.length
    const radius = Math.sqrt(left * left + top * top)

    left = left + radius * Math.sin(angle * index * (Math.PI / 180))
    top = top + radius * Math.cos(angle * index * (Math.PI / 180))
    if (top <= 0) {
      top -= (ICON_SIZE)
    }else{
      top += (ICON_SIZE)
    }

    if (left <= 0) {
      left -= ICON_SIZE
    }else{
       left += ICON_SIZE
    }
    console.log(left, top)

    return [left, top]

  }, [dx, dy])


  const onTriggerAnimation = () => setIsHovering(true)
  const StackIcons = icons.map((icon, index) => {
    const [left, top] = calculatePosition(index)
    const transform = isHovering ? `rotate(${Math.random() * 360}deg)` : 'none'

    return icon({
      className: `${styles.iconWrapper}`,  //${styles[icon.name]}
      style: {
        top: `${top}rem`,
        left: `${left}rem`,
      },
      key: icon.name,
    })
  })

  return (
    <section className={styles.servicePage}>
      <header className={styles.header}>
        <h2 className={styles.serviceTitle}>{serviceTitle}</h2>
        <CustomSeparator currentService={servicePage as string}/>
        <div className={styles.previewImg} onMouseEnter={onTriggerAnimation}>
          <h1 className={styles.stack} ref={ref}>
            <span className={styles.first}>{serviceTitle.split(' ')[0]} </span>
            <span className={styles.second}>{' stack'}</span>
            {StackIcons}
          </h1>
        </div>
      </header>
      <main className={styles.main}>
        <h3 className={styles.projectsTitle}>{projectsTitle}</h3>
        <article className={styles.firstArticle}>
          <img className={styles.firstArticleImage} src={firstArticle.image} alt={'project image'}/>
          <p className={styles.text}>{firstArticle.text}</p>
        </article>
        <article className={styles.secondArticle}>
          <img className={styles.secondArticleImage} src={secondArticle.image} alt={'project image'}/>
          <p>{secondArticle.text}</p>

        </article>
        <article className={styles.thirdArticle}>
          <p>{thirdArticle}</p>
        </article>
      </main>
      <footer>
        <Recommendations/>
      </footer>
    </section>
  )
}

export default ServicePage

const CustomSeparator: CustomSeparatorComponent = ({ currentService }) => {
  const breadcrumbs = [
    <Link to={'/home'} key="1">
      <p className={styles.link}>Home</p>
    </Link>,
    <Link to={'/services'} key="2">
      <p className={styles.link}>Services</p>
    </Link>,
    <p className={styles.currentService} key="3">
      {currentService}
    </p>,
  ]

  return (
    <Breadcrumbs separator="›" className={styles.breadcrumbs} sx={{
      '.MuiBreadcrumbs-separator': {
        color: '#767676',
      },
    }}>
      {breadcrumbs}
    </Breadcrumbs>

  )
}