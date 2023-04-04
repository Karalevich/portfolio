import {
  BackendIcon, ConsultingIcon, EcommerceIcon,
  FacebookIcon,
  FrontedIcon, GameIcon, LandingIcon,
  LeetcodeIcon,
  LinkedinIcon,
  TwitterIcon,
  VkIcon,
} from '../components/Custom/Icons'
import GitHubIcon from '@mui/icons-material/GitHub'
import React from 'react'
import { ServiceT } from './types'
import { PriceItemProps } from '../components/Home/Price/types'
import david from '../assets/img/David.png'
import { RecommendationProps } from 'src/components/Home/Recommendations/types'

export const ICONS = {
  'Linkedin': [<LinkedinIcon/>, 'https://www.linkedin.com/in/a112k/'],
  'Github': [<GitHubIcon/>, 'https://github.com/AndreyKorolevich'],
  'Vkontakte': [<VkIcon/>, 'https://vk.com/id134399064'],
  'Facebook': [<FacebookIcon/>, 'https://vk.com/id134399064'],
  'Twitter': [<TwitterIcon/>, 'https://twitter.com/Korol1Andrei'],
  'Leetcode': [<LeetcodeIcon/>, 'https://leetcode.com/korolevich1994/'],
}

export const INFO = {
  'Age': 28,
  'Address': 'Los Angeles, CA',
  'Status': 'Available',
  'Authorization': 'Green Card',
}

export const SKILLS = [
  {
    skillName: 'JavaScript',
    skillValue: 80,
  },
  {
    skillName: 'React',
    skillValue: 85,
  },
  {
    skillName: 'Vue',
    skillValue: 70,
  },
  {
    skillName: 'TypeScript',
    skillValue: 80,
  },
  {
    skillName: 'HTML',
    skillValue: 95,
  },
  {
    skillName: 'CSS',
    skillValue: 90,
  },
  {
    skillName: 'GIT',
    skillValue: 90,
  },
  {
    skillName: 'Node',
    skillValue: 80,
  },
  {
    skillName: 'Websockets',
    skillValue: 90,
  },
  {
    skillName: 'Jest',
    skillValue: 90,
  },
]

export const EXTRA_SKILLS = [
  {
    skillName: 'GitHub, GitLab',
  },
  {
    skillName: 'Babel, Eslint, Webpack',
  },
  {
    skillName: 'Sass, Less, Material UI',
  },
  {
    skillName: 'Redux, Vuex, MobX',
  },
  {
    skillName: 'Express.js, JWT, Axios',
  },
  {
    skillName: 'MongoDB, Docker',
  },
  {
    skillName: 'Python, Firebase, RxJS',
  },
  {
    skillName: 'Storybook, Figma',
  },
  {
    skillName: 'Web Worker',
  },
  {
    skillName: 'Service Worker',
  },
]

export const LANGUAGES = [
  {
    skillName: 'English',
    skillValue: 80,
  },
  {
    skillName: 'Belarusian',
    skillValue: 100,
  },
  {
    skillName: 'Russian',
    skillValue: 100,
  },
]

export const SERVICES: { [property: string]: ServiceT } = {
  'Front Development': {
    icon: FrontedIcon,
    preview: 'Client-side development.',
    description: 'Including the use of all the best practices and the most modern tools such as JS, TS, React, Vue.',
  },
  'E-Commerce': {
    icon: EcommerceIcon,
    preview: 'Build high-performing e-commerce.',
    description: 'And trading platforms, whether you’re dealing stocks or selling shoes.',
  },
  'Back Development': {
    icon: BackendIcon,
    preview: 'Server-side development.',
    description: 'Creation of moderate-complexity servers to support the client part using NodeJS, MongoDB, Python.',
  },
  'Web Game': {
    icon: GameIcon,
    preview: 'Design browser games.',
    description: 'And production of game architecture and create fascinating characters for entertaining clients.',
  },
  'Landing Page': {
    icon: LandingIcon,
    preview: 'Creation layouts of any complexity.',
    description: 'Including standalone pages for both B2B and B2C to collect user info, drive sales and more.',
  },
  'Product Consulting': {
    icon: ConsultingIcon,
    preview: 'Analyze and benchmark product.',
    description: 'Also create intelligent development strategies for a smoother, optimal UX.',
  },
}

export const PRICES: Array<PriceItemProps> = [
  {
    title: 'Silver',
    description: 'Most businesses that want just a landing page',
    price: 35,
    isPopular: false,
    duties: [{
      name: 'HTML,CSS for static pages',
      isRequired: true,
    },
      {
        name: 'SEO Optimization',
        isRequired: true,
      },
      {
        name: 'Creating complex web apps',
        isRequired: false,
      },
      {
        name: 'Work in modern frameworks',
        isRequired: false,
      },
      {
        name: 'Build involved animations',
        isRequired: false,
      },
      {
        name: 'Tests covered',
        isRequired: false,
      },
      {
        name: 'Performance optimization',
        isRequired: false,
      },
      {
        name: 'Server-side programming',
        isRequired: false,
      },
      {
        name: 'Integration with aside API',
        isRequired: false,
      }],
  },
  {
    title: 'Gold',
    description: 'Most businesses that want Frontend services',
    price: 55,
    isPopular: true,
    duties: [{
      name: 'HTML,CSS for static pages',
      isRequired: true,
    },
      {
        name: 'SEO Optimization',
        isRequired: true,
      },
      {
        name: 'Creating complex web apps',
        isRequired: true,
      },
      {
        name: 'Work in modern frameworks',
        isRequired: true,
      },
      {
        name: 'Build involved animations',
        isRequired: true,
      },
      {
        name: 'Tests covered',
        isRequired: true,
      },
      {
        name: 'Performance optimization',
        isRequired: true,
      },
      {
        name: 'Server-side programming',
        isRequired: false,
      },
      {
        name: 'Integration with aside API',
        isRequired: false,
      }],
  },
  {
    title: 'Diamond',
    description: 'Most businesses that want Fullstack services',
    price: 75,
    isPopular: false,
    duties: [{
      name: 'HTML,CSS for static pages',
      isRequired: true,
    },
      {
        name: 'SEO Optimization',
        isRequired: true,
      },
      {
        name: 'Creating complex web apps',
        isRequired: true,
      },
      {
        name: 'Work in modern frameworks',
        isRequired: true,
      },
      {
        name: 'Build involved animations',
        isRequired: true,
      },
      {
        name: 'Tests covered',
        isRequired: true,
      },
      {
        name: 'Performance optimization',
        isRequired: true,
      },
      {
        name: 'Server-side programming',
        isRequired: true,
      },
      {
        name: 'Integration with aside API',
        isRequired: true,
      }],
  },
]

export const RECOMMENDATIONS: Array<RecommendationProps> = [
  {
    author: 'David Tanaka',
    occupation: 'Program Manager',
    title: 'Responsible work!',
    description: 'Andrew spearheaded many projects including urgent Kartrider account login fixes requested ' +
      'by stakeholders, optimized userflows, internal tool updates, etc. Andrew is one of the most pleasant ' +
      'and positive co-workers that I have worked with, and I thoroughly enjoyed our time working on completing ' +
      'projects together! There were moments where our project scope increased or stakeholders led us to make an ' +
      'unforeseen pivot, but none of that interfered with Andrew\'s ability to adapt quickly to the situation. ' +
      'No matter what was thrown his way, he always found a way to get the work done! If he noticed anything ' +
      'concerning, Andrew made sure that I was aware of it immediately so I could properly address the situation ' +
      'and mitigate any potential delays. It was a pleasure working with an excellent talent like Andrew, and ' +
      'I would highly recommend working with him! Best of luck on your future endeavors, Andrew, and keep in touch!',
    image: david
  },
   {
    author: 'David Tanaka',
    occupation: 'Program Manager',
    title: 'Great work!',
    description: 'Andrew spearheaded many projects including urgent Kartrider account login fixes requested ' +
      'by stakeholders, optimized userflows, internal tool updates, etc. Andrew is one of the most pleasant ' +
      'and positive co-workers that I have worked with, and I thoroughly enjoyed our time working on completing ' +
      'projects together! There were moments where our project scope increased or stakeholders led us to make an ' +
      'unforeseen pivot, but none of that interfered with Andrew\'s ability to adapt quickly to the situation. ' +
      'No matter what was thrown his way, he always found a way to get the work done! If he noticed anything ' +
      'concerning, Andrew made sure that I was aware of it immediately so I could properly address the situation ' +
      'and mitigate any potential delays. It was a pleasure working with an excellent talent like Andrew, and ' +
      'I would highly recommend working with him! Best of luck on your future endeavors, Andrew, and keep in touch!',
    image: david
  },
   {
    author: 'David Tanaka',
    occupation: 'Program Manager',
    title: 'Awesome work!',
    description: 'Andrew spearheaded many projects including urgent Kartrider account login fixes requested ' +
      'by stakeholders, optimized userflows, internal tool updates, etc. Andrew is one of the most pleasant ' +
      'and positive co-workers that I have worked with, and I thoroughly enjoyed our time working on completing ' +
      'projects together! There were moments where our project scope increased or stakeholders led us to make an ' +
      'unforeseen pivot, but none of that interfered with Andrew\'s ability to adapt quickly to the situation. ' +
      'No matter what was thrown his way, he always found a way to get the work done! If he noticed anything ' +
      'concerning, Andrew made sure that I was aware of it immediately so I could properly address the situation ' +
      'and mitigate any potential delays. It was a pleasure working with an excellent talent like Andrew, and ' +
      'I would highly recommend working with him! Best of luck on your future endeavors, Andrew, and keep in touch!',
    image: david
  },
   {
    author: 'David Tanaka',
    occupation: 'Program Manager',
    title: 'Amazing work!',
    description: 'Andrew spearheaded many projects including urgent Kartrider account login fixes requested ' +
      'by stakeholders, optimized userflows, internal tool updates, etc. Andrew is one of the most pleasant ' +
      'and positive co-workers that I have worked with, and I thoroughly enjoyed our time working on completing ' +
      'projects together! There were moments where our project scope increased or stakeholders led us to make an ' +
      'unforeseen pivot, but none of that interfered with Andrew\'s ability to adapt quickly to the situation. ' +
      'No matter what was thrown his way, he always found a way to get the work done! If he noticed anything ' +
      'concerning, Andrew made sure that I was aware of it immediately so I could properly address the situation ' +
      'and mitigate any potential delays. It was a pleasure working with an excellent talent like Andrew, and ' +
      'I would highly recommend working with him! Best of luck on your future endeavors, Andrew, and keep in touch!',
    image: david
  },
   {
    author: 'David Tanaka',
    occupation: 'Program Manager',
    title: 'Excellent work!',
    description: 'Andrew spearheaded many projects including urgent Kartrider account login fixes requested ' +
      'by stakeholders, optimized userflows, internal tool updates, etc. Andrew is one of the most pleasant ' +
      'and positive co-workers that I have worked with, and I thoroughly enjoyed our time working on completing ' +
      'projects together! There were moments where our project scope increased or stakeholders led us to make an ' +
      'unforeseen pivot, but none of that interfered with Andrew\'s ability to adapt quickly to the situation. ' +
      'No matter what was thrown his way, he always found a way to get the work done! If he noticed anything ' +
      'concerning, Andrew made sure that I was aware of it immediately so I could properly address the situation ' +
      'and mitigate any potential delays. It was a pleasure working with an excellent talent like Andrew, and ' +
      'I would highly recommend working with him! Best of luck on your future endeavors, Andrew, and keep in touch!',
    image: david
  }
]