import {
  BackendIcon, ConsultingIcon, EcommerceIcon,
  FacebookIcon,
  FrontedIcon, GameIcon, LandingIcon,
  LeetcodeIcon,
  LinkedinIcon, LocationIcon,
  MailIcon,
  MobileIcon, ReactIcon, ReduxIcon,
  TwitterIcon, TypeScriptIcon,
  VkIcon, VueIcon, VueXIcon,
} from '../components/Custom/Icons'
import GitHubIcon from '@mui/icons-material/GitHub'
import React from 'react'
import { ServiceT } from './types'
import { PriceItemProps } from '../components/Home/Price/types'
import david from '../assets/img/David.png'
import { RecommendationProps } from 'src/components/Home/Recommendations/types'
import { ProjectT } from 'src/components/Home/Portfolio/types'
import blog from '../assets/img/blog.avif'
import demandbase from '../assets/img/services/demandbase.avif'
import nexon from '../assets/img/services/nexon.avif'
import { ContactCardProps } from '../components/Home/Contact/types'
import { PostProps } from '../components/Home/Blog/types'
import { ServicePage } from '../components/Home/Services/ServicePage/types'

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

export enum SERVICES_NAVIGATION {
  FRONTEND = 'frontend',
  ECOMMERCE = 'ecommerce',
  BACKEND = 'backend',
  WEBGAME = 'webgame',
  LANDING = 'landing',
  CONSULTING = 'consulting',
}

export const SERVICES: { [property: string]: ServiceT } = {
  'FrontEnd Development': {
    icon: FrontedIcon,
    preview: 'Client-side development.',
    description: 'Including the use of all the best practices and the most modern tools such as JS, TS, React, Vue.',
    navigatePath: SERVICES_NAVIGATION.FRONTEND,
  },
  'E-Commerce': {
    icon: EcommerceIcon,
    preview: 'Build high-performing e-commerce.',
    description: 'And trading platforms, whether you’re dealing stocks or selling shoes.',
    navigatePath: SERVICES_NAVIGATION.ECOMMERCE,
  },
  'BackEnd Development': {
    icon: BackendIcon,
    preview: 'Server-side development.',
    description: 'Creation of moderate-complexity servers to support the client part using NodeJS, MongoDB, Python.',
    navigatePath: SERVICES_NAVIGATION.BACKEND,
  },
  'Web Game': {
    icon: GameIcon,
    preview: 'Design browser games.',
    description: 'And production of game architecture and create fascinating characters for entertaining clients.',
    navigatePath: SERVICES_NAVIGATION.WEBGAME,
  },
  'Landing Page': {
    icon: LandingIcon,
    preview: 'Creation layouts of any complexity.',
    description: 'Including standalone pages for both B2B and B2C to collect user info, drive sales and more.',
    navigatePath: SERVICES_NAVIGATION.LANDING,
  },
  'Product Consulting': {
    icon: ConsultingIcon,
    preview: 'Analyze and benchmark product.',
    description: 'Also create intelligent development strategies for a smoother, optimal UX.',
    navigatePath: SERVICES_NAVIGATION.CONSULTING,
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

export const linkedInRecommendations = 'https://www.linkedin.com/in/a112k/details/recommendations/'

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
    image: david,
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
    image: david,
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
    image: david,
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
    image: david,
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
    image: david,
  },
]

export const WORK_HISTORY = [
  {
    label: 'Nexon America',
    place: 'Los Angeles, CA',
    occupation: 'FrontEnd Engineer',
    date: 'Jul 2022 - Mar 2023',
    description: `Nexon Co., Ltd. is a Japanese-South Korean video game publisher. It publishes titles including MapleStory, Dungeon&Fighter, Sudden Attack, and KartRider.
     Headquartered in Japan, the company has offices located in South Korea, the United States, Taiwan and Thailand.`,
  },
  {
    label: 'Unemployment gap',
    place: 'Grassau, Germany',
    occupation: 'Sabbatical',
    date: 'Apr 2022 - Jun 2023',
    description: `I was preparing for a big international move.`,
  },
  {
    label: 'Wargaming',
    place: 'Saint Petersburg, Russia',
    occupation: 'Web Engineer',
    date: 'May 2021 - Mar 2022',
    description: `Wargaming Group Limited is a global video game company headquartered in Nicosia, Cyprus. 
    The group operates across more than 16 offices and development studios globally`,
  },
  {
    label: 'LeverX Group',
    place: 'Minsk, Belarus',
    occupation: 'FrontEnd Engineer',
    date: 'Nov 2020 - May 2021',
    description: `LeverX Group is an international company and systems integrator. Includes LeverX and Emerline. 
    LeverX specializes in implementing and customizing SAP solutions. The company has been successfully 
    cooperating with SAP for over 19 years.`,
  },
  {
    label: 'Freelance',
    place: 'Belarus',
    occupation: 'FrontEnd Engineer',
    date: 'Oct 2019 - Nov 2020',
    description: `ClimateGuard is a technological startup developer of software and technical solutions 
    in the field of climate monitoring`,
  },
]

export const EDUCATION_HISTORY = [
  {
    name: 'Online University «Netology»',
    occupation: 'Student',
    date: 'Sep 2018 - Oct 2019',
    document: 'Certificate of web training',
    description: `Frontenders create the face of the site - what you see on any page on the Internet. 
    They also organize the work of components: content, buttons, internal links. The key task of such specialists is 
    to transfer the design layout to the code and make sure that verything worked conveniently and quickly.`,
  },
  {
    name: 'Belarusian National Technical University',
    occupation: 'Student',
    date: 'Sep 2011 - Jun 2016',
    document: 'Engineer diploma',
    description: `The Belarusian National Technical University (BNTU) is one of the leading technical
     universities of Belarus and the CIS. The BNTU has been training engineers since 1920. BNTU comprises 17 faculties 
     offering high-quality training in 89 specialities and 121 specializations. Trains over 35 000 students in advanced 
     BA, MA, PhD, and post-doctoral programs.`,
  },
  {
    name: 'Lyceum BNTU',
    occupation: 'Student',
    date: 'Oct 2009 - Nov 2011',
    document: 'High School Diploma',
    description: `The school provided graduates with a general secondary education, while providing in-depth training in the disciplines of physics and mathematics.
    Also development of students' interest in technical disciplines. Familiarization of students with the main directions of development of modern science and technology.
    Active involvement of students in the research work of the departments, the public life of the institute.`,
  },
]

export const PORTFOLIO: Array<{ tab: string, projects: Array<ProjectT> }> = [
  {
    tab: 'All Categories',
    projects: [{ name: 'Placeholder' }, { name: 'Placeholder' }, { name: 'Placeholder' }, { name: 'Placeholder' }, { name: 'Placeholder' }, { name: 'Placeholder' }, { name: 'Placeholder' }, { name: 'Placeholder' }, { name: 'Placeholder' }],
  },
  {
    tab: 'Frontend',
    projects: [{ name: 'Placeholder' }, { name: 'Placeholder' }, { name: 'Placeholder' }, { name: 'Placeholder' }, { name: 'Placeholder' }],
  },
  {
    tab: 'Full Stack',
    projects: [{ name: 'Placeholder' }, { name: 'Placeholder' }, { name: 'Placeholder' }, { name: 'Placeholder' }],
  },
  {
    tab: 'Games',
    projects: [{ name: 'Placeholder' }, { name: 'Placeholder' }, { name: 'Placeholder' }],
  },
  {
    tab: 'Landings',
    projects: [{ name: 'Placeholder' }, { name: 'Placeholder' }],
  },
]

export const POSTS: Array<PostProps> = [
  {
    title: 'How to create animated svg',
    description: 'As we all know that the best practice for icons it uses svg formats, but what if we also want to add some small animation, it can be trike to find a good approach for this.',
    img: blog,
  },
  {
    title: 'How to creat animated svg',
    description: 'As we all know that the best practice for icons it uses svg formats, but what if we also want to add some small animation, it can be trike to find a good approach for this.',
    img: blog,
  },
  {
    title: 'How to creae animated svg',
    description: 'As we all know that the best practice for icons it uses svg formats, but what if we also want to add some small animation, it can be trike to find a good approach for this.',
    img: blog,
  },
  {
    title: 'How to ceate animated svg',
    description: 'As we all know that the best practice for icons it uses svg formats, but what if we also want to add some small animation, it can be trike to find a good approach for this.',
    img: blog,
  },
  {
    title: 'How t create animated svg',
    description: 'As we all know that the best practice for icons it uses svg formats, but what if we also want to add some small animation, it can be trike to find a good approach for this.',
    img: blog,
  },
  {
    title: 'How o create animated svg',
    description: 'As we all know that the best practice for icons it uses svg formats, but what if we also want to add some small animation, it can be trike to find a good approach for this.',
    img: blog,
  },
  {
    title: 'Ho to create animated svg',
    description: 'As we all know that the best practice for icons it uses svg formats, but what if we also want to add some small animation, it can be trike to find a good approach for this.',
    img: blog,
  },
  {
    title: 'How to create animated sg',
    description: 'As we all know that the best practice for icons it uses svg formats, but what if we also want to add some small animation, it can be trike to find a good approach for this.',
    img: blog,
  },
  {
    title: 'How to create anmated svg',
    description: 'As we all know that the best practice for icons it uses svg formats, but what if we also want to add some small animation, it can be trike to find a good approach for this.',
    img: blog,
  },
  {
    title: 'How to create animaed svg',
    description: 'As we all know that the best practice for icons it uses svg formats, but what if we also want to add some small animation, it can be trike to find a good approach for this.',
    img: blog,
  },
]

export const CONTACT_INFO: Array<ContactCardProps> = [
  {
    icon: LocationIcon,
    info: [
      {
        title: 'Country',
        value: 'USA',
        href: 'http://maps.google.com/?q=1200 5211 Pacific Concourse Dr, Los Angeles, CA 90045-6907, USA',
      },
      {
        title: 'City',
        value: 'Los Angeles',
        href: 'http://maps.google.com/?q=1200 5211 Pacific Concourse Dr, Los Angeles, CA 90045-6907, USA',
      },
      {
        title: 'Street',
        value: '5211 Pacific Concourse Dr',
        href: 'http://maps.google.com/?q=1200 5211 Pacific Concourse Dr, Los Angeles, CA 90045-6907, USA',
      },
    ],
  },
  {
    icon: MailIcon,
    info: [
      {
        title: 'Email',
        value: 'karalevichandrei@gmail.com',
        href: 'mailto:karalevichandrei@gmail.com',
      },
      {
        title: 'Skype',
        value: 'live:.cid.c2a08e082c21be73',
        href: 'skype:live:.cid.c2a08e082c21be73?chat',
      },
      {
        title: 'Teams',
        value: 'karalevichandrei@gmail.com',
        href: 'https://teams.microsoft.com/l/chat/0/0?users=sam98kris@gmail.com',
      },
    ],
  },
  {
    icon: MobileIcon,
    info: [
      {
        title: 'Personal',
        value: '+1 (253) 212 8501',
        href: 'tel:+12532128501',
      },
      {
        title: 'Telegram',
        value: 'why_nnot',
        href: 'https://t.me/why_nnot',
      },
      {
        title: 'WhatsApp',
        value: '+1 (253) 212 8501',
        href: 'https://wa.me/+12532128501',
      },
    ],
  },
]

export const SERVICE_PAGES: { [property: string]: ServicePage } = {
  [SERVICES_NAVIGATION.FRONTEND]: {
    serviceTitle: 'Frontend Development',
    icons: [VueIcon, ReduxIcon, VueXIcon, TypeScriptIcon, ReactIcon],
    projectsTitle: 'At vero eos et accusam et justo duo dolores rebum stet clita kasd gubergren.',
    examples: [
      {
        image: nexon,
        link: 'https://www.nexon.com/main/en',
        text: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ullamcorper habitant hendrerit ut bibendum augue. Eget aliquet vel in purus. Sem netus sed est et est neque. Risus ac, sed aliquet vestibulum',
          'A nec, leo, sed dictum orci adipiscing mauris vestibulum in. Ornare mauris quisque nunc quam. Sed egestas ante aenean tristique non integer nisl est. Nec habitasse in a, bibendum vitae, enim ipsum. Urna sagittis aenean et, malesuada. Duis faucibus in orci nulla.',
          'Senectus massa porttitor id odio id semper aenean ut at. Non est cras risus sed. Integer ornare lorem blandit tortor, hendrerit tortor quam lacus',
        ],
      },
      {
        image: demandbase,
        link: 'https://www.g2.com/products/demandbase-abm-abx-cloud/interactive_demo',
        text: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ullamcorper habitant hendrerit ut bibendum augue. Eget aliquet vel in purus. Sem netus sed est et est neque. Risus ac, sed aliquet vestibulum',
          'A nec, leo, sed dictum orci adipiscing mauris vestibulum in. Ornare mauris quisque nunc quam. Sed egestas ante aenean tristique non integer nisl est. Nec habitasse in a, bibendum vitae, enim ipsum. Urna sagittis aenean et, malesuada. Duis faucibus in orci nulla.',
          'Senectus massa porttitor id odio id semper aenean ut at. Non est cras risus sed. Integer ornare lorem blandit tortor, hendrerit tortor quam lacus',
        ],
      }, {
        text: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ullamcorper habitant hendrerit ut bibendum augue. Eget aliquet vel in purus. Sem netus sed est et est neque. Risus ac, sed aliquet vestibulum',
          'A nec, leo, sed dictum orci adipiscing mauris vestibulum in. Ornare mauris quisque nunc quam. Sed egestas ante aenean tristique non integer nisl est. Nec habitasse in a, bibendum vitae, enim ipsum. Urna sagittis aenean et, malesuada. Duis faucibus in orci nulla.',
          'Senectus massa porttitor id odio id semper aenean ut at. Non est cras risus sed. Integer ornare lorem blandit tortor, hendrerit tortor quam lacus',
        ],
      }],
  },
  [SERVICES_NAVIGATION.ECOMMERCE]: {
    serviceTitle: 'E-Commerce',
    icons: [ReactIcon, ReduxIcon, VueIcon, VueXIcon, TypeScriptIcon],
    projectsTitle: 'At vero eos et accusam et justo duo dolores rebum stet clita kasd gubergren.',
    examples: [
      {
        image: nexon,
        link: 'https://www.nexon.com/main/en',
        text: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ullamcorper habitant hendrerit ut bibendum augue. Eget aliquet vel in purus. Sem netus sed est et est neque. Risus ac, sed aliquet vestibulum',
          'A nec, leo, sed dictum orci adipiscing mauris vestibulum in. Ornare mauris quisque nunc quam. Sed egestas ante aenean tristique non integer nisl est. Nec habitasse in a, bibendum vitae, enim ipsum. Urna sagittis aenean et, malesuada. Duis faucibus in orci nulla.',
          'Senectus massa porttitor id odio id semper aenean ut at. Non est cras risus sed. Integer ornare lorem blandit tortor, hendrerit tortor quam lacus',
        ],
      },
      {
        image: demandbase,
        link: 'https://www.g2.com/products/demandbase-abm-abx-cloud/interactive_demo',
        text: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ullamcorper habitant hendrerit ut bibendum augue. Eget aliquet vel in purus. Sem netus sed est et est neque. Risus ac, sed aliquet vestibulum',
          'A nec, leo, sed dictum orci adipiscing mauris vestibulum in. Ornare mauris quisque nunc quam. Sed egestas ante aenean tristique non integer nisl est. Nec habitasse in a, bibendum vitae, enim ipsum. Urna sagittis aenean et, malesuada. Duis faucibus in orci nulla.',
          'Senectus massa porttitor id odio id semper aenean ut at. Non est cras risus sed. Integer ornare lorem blandit tortor, hendrerit tortor quam lacus',
        ],
      }, {
        text: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ullamcorper habitant hendrerit ut bibendum augue. Eget aliquet vel in purus. Sem netus sed est et est neque. Risus ac, sed aliquet vestibulum',
          'A nec, leo, sed dictum orci adipiscing mauris vestibulum in. Ornare mauris quisque nunc quam. Sed egestas ante aenean tristique non integer nisl est. Nec habitasse in a, bibendum vitae, enim ipsum. Urna sagittis aenean et, malesuada. Duis faucibus in orci nulla.',
          'Senectus massa porttitor id odio id semper aenean ut at. Non est cras risus sed. Integer ornare lorem blandit tortor, hendrerit tortor quam lacus',
        ],
      }],
  },
  [SERVICES_NAVIGATION.BACKEND]: {
    serviceTitle: 'Backend Development',
    icons: [ReactIcon, ReduxIcon, VueIcon, VueXIcon, TypeScriptIcon],
    projectsTitle: 'At vero eos et accusam et justo duo dolores rebum stet clita kasd gubergren.',
    examples: [
      {
        image: nexon,
        link: 'https://www.nexon.com/main/en',
        text: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ullamcorper habitant hendrerit ut bibendum augue. Eget aliquet vel in purus. Sem netus sed est et est neque. Risus ac, sed aliquet vestibulum',
          'A nec, leo, sed dictum orci adipiscing mauris vestibulum in. Ornare mauris quisque nunc quam. Sed egestas ante aenean tristique non integer nisl est. Nec habitasse in a, bibendum vitae, enim ipsum. Urna sagittis aenean et, malesuada. Duis faucibus in orci nulla.',
          'Senectus massa porttitor id odio id semper aenean ut at. Non est cras risus sed. Integer ornare lorem blandit tortor, hendrerit tortor quam lacus',
        ],
      },
      {
        image: demandbase,
        link: 'https://www.g2.com/products/demandbase-abm-abx-cloud/interactive_demo',
        text: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ullamcorper habitant hendrerit ut bibendum augue. Eget aliquet vel in purus. Sem netus sed est et est neque. Risus ac, sed aliquet vestibulum',
          'A nec, leo, sed dictum orci adipiscing mauris vestibulum in. Ornare mauris quisque nunc quam. Sed egestas ante aenean tristique non integer nisl est. Nec habitasse in a, bibendum vitae, enim ipsum. Urna sagittis aenean et, malesuada. Duis faucibus in orci nulla.',
          'Senectus massa porttitor id odio id semper aenean ut at. Non est cras risus sed. Integer ornare lorem blandit tortor, hendrerit tortor quam lacus',
        ],
      }, {
        text: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ullamcorper habitant hendrerit ut bibendum augue. Eget aliquet vel in purus. Sem netus sed est et est neque. Risus ac, sed aliquet vestibulum',
          'A nec, leo, sed dictum orci adipiscing mauris vestibulum in. Ornare mauris quisque nunc quam. Sed egestas ante aenean tristique non integer nisl est. Nec habitasse in a, bibendum vitae, enim ipsum. Urna sagittis aenean et, malesuada. Duis faucibus in orci nulla.',
          'Senectus massa porttitor id odio id semper aenean ut at. Non est cras risus sed. Integer ornare lorem blandit tortor, hendrerit tortor quam lacus',
        ],
      }],
  },
  [SERVICES_NAVIGATION.WEBGAME]: {
    serviceTitle: 'Web Game',
    icons: [ReactIcon, ReduxIcon, VueIcon, VueXIcon, TypeScriptIcon],
    projectsTitle: 'At vero eos et accusam et justo duo dolores rebum stet clita kasd gubergren.',
    examples: [
      {
        image: nexon,
        link: 'https://www.nexon.com/main/en',
        text: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ullamcorper habitant hendrerit ut bibendum augue. Eget aliquet vel in purus. Sem netus sed est et est neque. Risus ac, sed aliquet vestibulum',
          'A nec, leo, sed dictum orci adipiscing mauris vestibulum in. Ornare mauris quisque nunc quam. Sed egestas ante aenean tristique non integer nisl est. Nec habitasse in a, bibendum vitae, enim ipsum. Urna sagittis aenean et, malesuada. Duis faucibus in orci nulla.',
          'Senectus massa porttitor id odio id semper aenean ut at. Non est cras risus sed. Integer ornare lorem blandit tortor, hendrerit tortor quam lacus',
        ],
      },
      {
        image: demandbase,
        link: 'https://www.g2.com/products/demandbase-abm-abx-cloud/interactive_demo',
        text: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ullamcorper habitant hendrerit ut bibendum augue. Eget aliquet vel in purus. Sem netus sed est et est neque. Risus ac, sed aliquet vestibulum',
          'A nec, leo, sed dictum orci adipiscing mauris vestibulum in. Ornare mauris quisque nunc quam. Sed egestas ante aenean tristique non integer nisl est. Nec habitasse in a, bibendum vitae, enim ipsum. Urna sagittis aenean et, malesuada. Duis faucibus in orci nulla.',
          'Senectus massa porttitor id odio id semper aenean ut at. Non est cras risus sed. Integer ornare lorem blandit tortor, hendrerit tortor quam lacus',
        ],
      }, {
        text: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ullamcorper habitant hendrerit ut bibendum augue. Eget aliquet vel in purus. Sem netus sed est et est neque. Risus ac, sed aliquet vestibulum',
          'A nec, leo, sed dictum orci adipiscing mauris vestibulum in. Ornare mauris quisque nunc quam. Sed egestas ante aenean tristique non integer nisl est. Nec habitasse in a, bibendum vitae, enim ipsum. Urna sagittis aenean et, malesuada. Duis faucibus in orci nulla.',
          'Senectus massa porttitor id odio id semper aenean ut at. Non est cras risus sed. Integer ornare lorem blandit tortor, hendrerit tortor quam lacus',
        ],
      }],
  },
  [SERVICES_NAVIGATION.LANDING]: {
    serviceTitle: 'Landing page',
    icons: [ReactIcon, ReduxIcon, VueIcon, VueXIcon, TypeScriptIcon],
    projectsTitle: 'At vero eos et accusam et justo duo dolores rebum stet clita kasd gubergren.',
    examples: [
      {
        image: nexon,
        link: 'https://www.nexon.com/main/en',
        text: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ullamcorper habitant hendrerit ut bibendum augue. Eget aliquet vel in purus. Sem netus sed est et est neque. Risus ac, sed aliquet vestibulum',
          'A nec, leo, sed dictum orci adipiscing mauris vestibulum in. Ornare mauris quisque nunc quam. Sed egestas ante aenean tristique non integer nisl est. Nec habitasse in a, bibendum vitae, enim ipsum. Urna sagittis aenean et, malesuada. Duis faucibus in orci nulla.',
          'Senectus massa porttitor id odio id semper aenean ut at. Non est cras risus sed. Integer ornare lorem blandit tortor, hendrerit tortor quam lacus',
        ],
      },
      {
        image: demandbase,
        link: 'https://www.g2.com/products/demandbase-abm-abx-cloud/interactive_demo',
        text: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ullamcorper habitant hendrerit ut bibendum augue. Eget aliquet vel in purus. Sem netus sed est et est neque. Risus ac, sed aliquet vestibulum',
          'A nec, leo, sed dictum orci adipiscing mauris vestibulum in. Ornare mauris quisque nunc quam. Sed egestas ante aenean tristique non integer nisl est. Nec habitasse in a, bibendum vitae, enim ipsum. Urna sagittis aenean et, malesuada. Duis faucibus in orci nulla.',
          'Senectus massa porttitor id odio id semper aenean ut at. Non est cras risus sed. Integer ornare lorem blandit tortor, hendrerit tortor quam lacus',
        ],
      }, {
        text: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ullamcorper habitant hendrerit ut bibendum augue. Eget aliquet vel in purus. Sem netus sed est et est neque. Risus ac, sed aliquet vestibulum',
          'A nec, leo, sed dictum orci adipiscing mauris vestibulum in. Ornare mauris quisque nunc quam. Sed egestas ante aenean tristique non integer nisl est. Nec habitasse in a, bibendum vitae, enim ipsum. Urna sagittis aenean et, malesuada. Duis faucibus in orci nulla.',
          'Senectus massa porttitor id odio id semper aenean ut at. Non est cras risus sed. Integer ornare lorem blandit tortor, hendrerit tortor quam lacus',
        ],
      }],
  },
  [SERVICES_NAVIGATION.CONSULTING]: {
    serviceTitle: 'Product Consulting',
    icons: [ReduxIcon, VueIcon, VueXIcon, TypeScriptIcon, ReactIcon],
    projectsTitle: 'At vero eos et accusam et justo duo dolores rebum stet clita kasd gubergren.',
    examples: [
      {
        image: nexon,
        link: 'https://www.nexon.com/main/en',
        text: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ullamcorper habitant hendrerit ut bibendum augue. Eget aliquet vel in purus. Sem netus sed est et est neque. Risus ac, sed aliquet vestibulum',
          'A nec, leo, sed dictum orci adipiscing mauris vestibulum in. Ornare mauris quisque nunc quam. Sed egestas ante aenean tristique non integer nisl est. Nec habitasse in a, bibendum vitae, enim ipsum. Urna sagittis aenean et, malesuada. Duis faucibus in orci nulla.',
          'Senectus massa porttitor id odio id semper aenean ut at. Non est cras risus sed. Integer ornare lorem blandit tortor, hendrerit tortor quam lacus',
        ],
      },
      {
        image: demandbase,
        link: 'https://www.g2.com/products/demandbase-abm-abx-cloud/interactive_demo',
        text: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ullamcorper habitant hendrerit ut bibendum augue. Eget aliquet vel in purus. Sem netus sed est et est neque. Risus ac, sed aliquet vestibulum',
          'A nec, leo, sed dictum orci adipiscing mauris vestibulum in. Ornare mauris quisque nunc quam. Sed egestas ante aenean tristique non integer nisl est. Nec habitasse in a, bibendum vitae, enim ipsum. Urna sagittis aenean et, malesuada. Duis faucibus in orci nulla.',
          'Senectus massa porttitor id odio id semper aenean ut at. Non est cras risus sed. Integer ornare lorem blandit tortor, hendrerit tortor quam lacus',
        ],
      }, {
        text: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ullamcorper habitant hendrerit ut bibendum augue. Eget aliquet vel in purus. Sem netus sed est et est neque. Risus ac, sed aliquet vestibulum',
          'A nec, leo, sed dictum orci adipiscing mauris vestibulum in. Ornare mauris quisque nunc quam. Sed egestas ante aenean tristique non integer nisl est. Nec habitasse in a, bibendum vitae, enim ipsum. Urna sagittis aenean et, malesuada. Duis faucibus in orci nulla.',
          'Senectus massa porttitor id odio id semper aenean ut at. Non est cras risus sed. Integer ornare lorem blandit tortor, hendrerit tortor quam lacus',
        ],
      }],
  },
}