import React from 'react'
import { SkeletonPostPageComponent } from './types'
import { Skeleton } from '@mui/material'
import styles from '../PostPage.module.scss'
import { getRandomNumber } from '../../../../../utils/randomFromRange'

export const SkeletonPostPage: SkeletonPostPageComponent = () => {
  return (
    <section aria-label='skeleton post page'>
      <header>
        <h2>
          {' '}
          <Skeleton animation='wave' width={'50%'} />
        </h2>
        <article className={styles.info}>
          <div className={styles.author}>
            <Skeleton className={styles.authorImg} animation='wave' variant='circular' />
            <div className={styles.authorData}>
              <Skeleton animation='wave' width={'6rem'} height={'1rem'} />
              <Skeleton animation='wave' width={'4rem'} height={'1rem'} />
            </div>
          </div>
          <div className={styles.share}>
            <Skeleton animation='wave' width={'3rem'} height={'2rem'} />
            <ul className={styles.shareList}>
              {Array(4)
                .fill('')
                .map((e, i) => (
                  <Skeleton
                    className={styles.iconWrapper}
                    sx={{ backgroundColor: 'var(--skeleton)!important' }}
                    key={i}
                    animation='wave'
                    variant='circular'
                  />
                ))}
            </ul>
          </div>
        </article>
        <div className={styles.actionGroup}>
          <Skeleton animation='wave' width={'30%'} height={'1.5rem'} />
          <div className={styles.buttonGroup}>
            <Skeleton className={styles.buttonPostAction} animation='wave' height={'3rem'} />
            <Skeleton className={styles.buttonPostAction} animation='wave' height={'3rem'} />
          </div>
        </div>
      </header>
      <main>
        <article className={styles.postContent}>
          <Skeleton animation='wave' className={styles.mainImg} variant='rectangular' />
          <h3>
            <Skeleton animation='wave' width={'40%'} />
          </h3>
          <ul className={styles.shareList}>
            {Array(15)
              .fill('')
              .map((e, i) => (
                <Skeleton
                  key={i}
                  animation='wave'
                  height={'1rem'}
                  width={`${getRandomNumber(80, 100)}%`}
                />
              ))}
          </ul>
        </article>
      </main>
    </section>
  )
}

export default SkeletonPostPage
