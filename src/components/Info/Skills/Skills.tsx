import React from 'react'
import styles from './Skills.module.scss'
import { SkillsComponent } from './types'


export const Skills: SkillsComponent = ({ title, skills }) => {
  const skillsComponent = skills.map(skill => (<li className={styles.skill} key={skill.skillName}>
    <div className={styles.description}>
      <span>{skill.skillName}</span><span>{skill.skillValue}%</span>
    </div>
    <div className={styles.progress}><div className={styles.size} style={{width: `${skill.skillValue}%`}}/></div>
  </li>))
  return (
    <section className={styles.skills}>
      <header className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
      </header>
      <main className={styles.body}>
        <ul className={styles.skillsList}>
          {skillsComponent}
        </ul>
      </main>
    </section>
  )
}

export default Skills