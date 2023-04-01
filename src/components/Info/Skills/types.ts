import { FunctionComponent } from "react"

type SkillsProps = {
  title: string,
  skills: Array<{ skillName: string, skillValue?: number }>,
  isProgressBar: boolean
}
export type SkillsComponent = FunctionComponent<SkillsProps>