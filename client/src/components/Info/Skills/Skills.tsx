import React from 'react'
import { ExtraSkillIcon } from 'src/components/Custom/Icons'
import styles from './Skills.module.scss'
import { SkillsComponent } from './types'

export const Skills: SkillsComponent = ({ title, skills, isProgressBar }) => {
  const skillsComponent = skills.map((skill) => (
    <li className={styles.skill} key={skill.skillName}>
      {isProgressBar ? (
        <>
          <div className={styles.description}>
            <span>{skill.skillName}</span>
            <span>{skill.skillValue}%</span>
          </div>
          <div className={styles.progress}>
            <div className={styles.size} style={{ width: `${skill.skillValue}%` }} />
          </div>
        </>
      ) : (
        <>
          <div className={styles.extra} aria-label='extra-skill'>
            <ExtraSkillIcon className={styles.extraSkill} />
            <span>{skill.skillName}</span>
          </div>
        </>
      )}
    </li>
  ))
  return (
    <section className={styles.skills}>
      <header className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
      </header>
      <main className={styles.body}>
        <ul className={styles.skillsList}>{skillsComponent}</ul>
      </main>
    </section>
  )
}

export default Skills
