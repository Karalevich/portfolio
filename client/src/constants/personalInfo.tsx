import {
  BackendIcon,
  ConsultingIcon,
  EcommerceIcon,
  FacebookIcon,
  FrontedIcon,
  GameIcon,
  LandingIcon,
  LeetcodeIcon,
  LinkedinIcon,
  LocationIcon,
  MailIcon,
  MobileIcon,
  ReactIcon,
  ReduxIcon,
  TwitterIcon,
  TypeScriptIcon,
  VkIcon,
  VueIcon,
  VueXIcon,
} from '../components/Custom/Icons'
import GitHubIcon from '@mui/icons-material/GitHub'
import React from 'react'
import { PortfolioT, PORTFOLIO_TOPIC, ServiceT } from './types'
import { PriceItemProps } from '../components/Home/Price/types'
import david from '../assets/img/David.png'
import ulad from '../assets/img/ulad.avif'
import vova from '../assets/img/vova.avif'
import me from '../assets/img/Me.webp'
import { RecommendationProps } from 'src/components/Home/Recommendations/types'
import blog from '../assets/img/blog.avif'
import easyGame from '../assets/img/portfolio/easy-game.avif'
import friendlyDog from '../assets/img/portfolio/frendly-dog.avif'
import spaceAdventure from '../assets/img/portfolio/spaceadventure.avif'
import foodhub from '../assets/img/portfolio/foodhub.avif'
import mogo from '../assets/img/portfolio/mogo.avif'
import flashback from '../assets/img/portfolio/flashback.avif'
import shoeSore from '../assets/img/portfolio/shoe.avif'
import capSore from '../assets/img/portfolio/cap-store.avif'
import startup from '../assets/img/portfolio/startup.avif'
import demandbase from '../assets/img/services/demandbase.avif'
import nexon from '../assets/img/services/nexon.avif'
import nexongc from '../assets/img/services/nexongc.avif'
import armory from '../assets/img/services/armory.avif'
import profile from '../assets/img/services/profile.avif'
import profileModal from '../assets/img/services/profile-modal.avif'
import clans from '../assets/img/services/clans.avif'
import dockyard from '../assets/img/services/dockyard.avif'
import ignition from '../assets/img/services/ignition.avif'
import maplestory from '../assets/img/services/maplestory.avif'
import { ContactCardProps } from '../components/Home/Contact/types'
import { PostProps } from '../components/Home/Blog/types'
import { ServicePageT } from '../components/Home/Services/ServicePage/types'

export const SHARE = {
  Linkedin: [<LinkedinIcon />, 'https://www.linkedin.com/in/a112k/'],
  Vkontakte: [<VkIcon />, 'https://vk.com/id134399064'],
  Facebook: [<FacebookIcon />, 'https://www.facebook.com/profile.php?id=100087547390611'],
  Twitter: [<TwitterIcon />, 'https://twitter.com/Korol1Andrei'],
}

export const ICONS = {
  Linkedin: [<LinkedinIcon />, 'https://www.linkedin.com/in/a112k/'],
  Github: [<GitHubIcon />, 'https://github.com/AndreyKorolevich'],
  Vkontakte: [<VkIcon />, 'https://vk.com/id134399064'],
  Facebook: [<FacebookIcon />, 'https://www.facebook.com/profile.php?id=100087547390611'],
  Twitter: [<TwitterIcon />, 'https://twitter.com/Korol1Andrei'],
  Leetcode: [<LeetcodeIcon />, 'https://leetcode.com/korolevich1994/'],
}

export const INFO = {
  Age: 28,
  Address: 'Los Angeles, CA',
  Status: 'Available',
  Authorization: 'Green Card',
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
    skillName: 'WebSocket',
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
    skillName: 'Babel, ESLint, Webpack',
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
    description:
      'Including the use of all the best practices and the most modern tools such as JS, TS, React, Vue.',
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
    description:
      'Creation of moderate-complexity servers to support the client part using NodeJS, MongoDB, Python.',
    navigatePath: SERVICES_NAVIGATION.BACKEND,
  },
  'Web Game': {
    icon: GameIcon,
    preview: 'Design browser games.',
    description:
      'And production of game architecture and create fascinating characters for entertaining clients.',
    navigatePath: SERVICES_NAVIGATION.WEBGAME,
  },
  'Landing Page': {
    icon: LandingIcon,
    preview: 'Creation layouts of any complexity.',
    description:
      'Including standalone pages for both B2B and B2C to collect user info, drive sales and more.',
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
    duties: [
      {
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
      },
    ],
  },
  {
    title: 'Gold',
    description: 'Most businesses that want Frontend services',
    price: 55,
    isPopular: true,
    duties: [
      {
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
      },
    ],
  },
  {
    title: 'Diamond',
    description: 'Most businesses that want Fullstack services',
    price: 75,
    isPopular: false,
    duties: [
      {
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
      },
    ],
  },
]

export const linkedInRecommendations = 'https://www.linkedin.com/in/a112k/details/recommendations/'

export const RECOMMENDATIONS: Array<RecommendationProps> = [
  {
    author: 'David Tanaka',
    occupation: 'Program Manager',
    title: 'Responsible work!',
    description:
      'Andrew spearheaded many projects including urgent Kartrider account login fixes requested ' +
      'by stakeholders, optimized userflows, internal tool updates, etc. Andrew is one of the most pleasant ' +
      'and positive co-workers that I have worked with, and I thoroughly enjoyed our time working on completing ' +
      'projects together! There were moments where our project scope increased or stakeholders led us to make an ' +
      "unforeseen pivot, but none of that interfered with Andrew's ability to adapt quickly to the situation. " +
      'No matter what was thrown his way, he always found a way to get the work done! If he noticed anything ' +
      'concerning, Andrew made sure that I was aware of it immediately so I could properly address the situation ' +
      'and mitigate any potential delays. It was a pleasure working with an excellent talent like Andrew, and ' +
      'I would highly recommend working with him! Best of luck on your future endeavors, Andrew, and keep in touch!',
    image: david,
  },
  {
    author: 'Uladzimir Pryshchep',
    occupation: 'Tem Leader',
    title: 'Great work!',
    description: `I have fond memories of working with Andrei, a time filled with victories. He made rapid progress, resolved intricate issues, and always showed an unwavering desire to enhance everything he worked on. We even put in late nights together to finish an important task, and I'm grateful for those moments. We both gained invaluable experience during those times.
Andrei is a rare gem who can be entrusted with tasks of any complexity. I have no doubt that I will continue to witness Andrei's exceptional talents being applied to create outstanding products`,
    image: vova,
  },
  {
    author: 'Uladzislau Ustsinovich',
    occupation: 'Frontend Developer at LeverX',
    title: 'Amazing work!',
    description: `I am writing to express my strong recommendation for Andrei as a front-end developer with expertise in React stack. It has been an absolute pleasure working with him for almost a year, and I have been consistently impressed with his dedication, technical skills, and collaborative approach.

Throughout our time together, Andrei consistently demonstrated a deep understanding of the Front-End and Web techs. His ability to design and implement complex user interfaces and state management solutions has been invaluable to our team's success. His contributions to our projects have been integral to ensuring that our software meets the high standards of quality and performance that we strive for.

In addition to his technical skills, I have always been impressed by his positive attitude and willingness to collaborate with others. Andrei consistently showed a strong work ethic and a commitment to teamwork, and input during team meetings and code reviews has been insightful and helpful.

Overall, I highly recommend Andrei as a front-end developer with expertise in Front-End. Andrei has been an invaluable member of our team, and I am confident that he will continue to excel in his future endeavors.

Best wishes,

Vladislav `,
    image: ulad,
  },
  {
    author: 'David Tanaka',
    occupation: 'Program Manager',
    title: 'Excellent work!',
    description:
      'Andrew spearheaded many projects including urgent Kartrider account login fixes requested ' +
      'by stakeholders, optimized userflows, internal tool updates, etc. Andrew is one of the most pleasant ' +
      'and positive co-workers that I have worked with, and I thoroughly enjoyed our time working on completing ' +
      'projects together! There were moments where our project scope increased or stakeholders led us to make an ' +
      "unforeseen pivot, but none of that interfered with Andrew's ability to adapt quickly to the situation. " +
      'No matter what was thrown his way, he always found a way to get the work done! If he noticed anything ' +
      'concerning, Andrew made sure that I was aware of it immediately so I could properly address the situation ' +
      'and mitigate any potential delays. It was a pleasure working with an excellent talent like Andrew, and ' +
      'I would highly recommend working with him! Best of luck on your future endeavors, Andrew, and keep in touch!',
    image: david,
  },
  {
    author: 'Uladzimir Pryshchep',
    occupation: 'Tem Leader',
    title: 'Awesome work!',
    description: `I have fond memories of working with Andrei, a time filled with victories. He made rapid progress, resolved intricate issues, and always showed an unwavering desire to enhance everything he worked on. We even put in late nights together to finish an important task, and I'm grateful for those moments. We both gained invaluable experience during those times.
Andrei is a rare gem who can be entrusted with tasks of any complexity. I have no doubt that I will continue to witness Andrei's exceptional talents being applied to create outstanding products`,
    image: vova,
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
    The group operates across more than 16 offices and development studios globally.`,
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
    in the field of climate monitoring.`,
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

export const PORTFOLIO: PortfolioT = {
  tabs: [...Object.values(PORTFOLIO_TOPIC)],
  projects: [
    {
      name: 'shoe store',
      img: shoeSore,
      linkDemo: 'https://dashing-cactus-8548d9.netlify.app/',
      linkRepo: 'https://github.com/AndreyKorolevich/shoe-store',
      topic: PORTFOLIO_TOPIC.FRONTEND,
    },
    {
      name: 'cap store',
      img: capSore,
      linkDemo: 'https://cap-store.netlify.app/',
      linkRepo: 'https://github.com/AndreyKorolevich/cap-store',
      topic: PORTFOLIO_TOPIC.FRONTEND,
    },
    { name: 'placeholder', img: easyGame, linkDemo: '', linkRepo: '', topic: PORTFOLIO_TOPIC.FRONTEND },
    {
      name: 'flashback',
      img: flashback,
      linkDemo: 'https://flashb.netlify.app',
      linkRepo: 'https://github.com/AndreyKorolevich/Flashback-MERN-',
      topic: PORTFOLIO_TOPIC.FULL_STACK,
    },
    {
      name: 'placeholder',
      img: easyGame,
      linkDemo: '',
      linkRepo: '',
      topic: PORTFOLIO_TOPIC.FULL_STACK,
    },
    {
      name: 'placeholder',
      img: easyGame,
      linkDemo: '',
      linkRepo: '',
      topic: PORTFOLIO_TOPIC.FULL_STACK,
    },
    {
      name: 'placeholder',
      img: startup,
      linkDemo: 'https://andreykorolevich.github.io/startup-layout/',
      linkRepo: 'https://github.com/AndreyKorolevich/startup-layout',
      topic: PORTFOLIO_TOPIC.LANDING,
    },
    {
      name: 'placeholder',
      img: mogo,
      linkDemo: 'https://andreykorolevich.github.io/mogo-loyaout/',
      linkRepo: 'https://github.com/AndreyKorolevich/mogo-loyaout/tree/gh-pages',
      topic: PORTFOLIO_TOPIC.LANDING,
    },
    {
      name: 'placeholder',
      img: foodhub,
      linkDemo: 'https://andreykorolevich.github.io/food-layout',
      linkRepo: 'https://github.com/AndreyKorolevich/food-layout',
      topic: PORTFOLIO_TOPIC.LANDING,
    },
    {
      name: 'space adventures',
      img: spaceAdventure,
      linkDemo: 'https://spacedventures.netlify.app',
      linkRepo: 'https://github.com/AndreyKorolevich/space-adventure',
      topic: PORTFOLIO_TOPIC.GAMES,
    },
    {
      name: 'friendly dog',
      img: friendlyDog,
      linkDemo: 'https://friendly-dog.netlify.app',
      linkRepo: 'https://github.com/AndreyKorolevich/friendly-dog',
      topic: PORTFOLIO_TOPIC.GAMES,
    },
    {
      name: 'easy peasy game',
      img: easyGame,
      linkDemo: 'https://easy-peasy-game.netlify.app',
      linkRepo: 'https://github.com/AndreyKorolevich/canvas-game',
      topic: PORTFOLIO_TOPIC.GAMES,
    },
  ],
}

export const POSTS: Array<PostProps> = [
  {
    title: 'How to create animated svg',
    description:
      'As we all know that the best practice for icons it uses svg formats, but what if we also want to add some small animation, it can be trike to find a good approach for this.',
    img: blog,
    author: {
      name: 'Andrei Karalevich',
      img: me,
    },
    date: '04-30-2023',
    comments: [
      {
        author: {
          name: 'Andrei Karalevich',
          img: me,
        },
        text: 'Interesting!',
      },
    ],
    id: '1',
  },
  {
    title: 'How to creat animated svg',
    description:
      'As we all know that the best practice for icons it uses svg formats, but what if we also want to add some small animation, it can be trike to find a good approach for this.',
    img: blog,
    author: {
      name: 'Andrei Karalevich',
      img: me,
    },
    date: '04-30-2023',
    comments: [
      {
        author: {
          name: 'Andrei Karalevich',
          img: me,
        },
        text: 'Interesting!',
      },
    ],
    id: '2',
  },
  {
    title: 'How to creae animated svg',
    description:
      'As we all know that the best practice for icons it uses svg formats, but what if we also want to add some small animation, it can be trike to find a good approach for this.',
    img: blog,
    author: {
      name: 'Andrei Karalevich',
      img: me,
    },
    date: '04-30-2023',
    comments: [
      {
        author: {
          name: 'Andrei Karalevich',
          img: me,
        },
        text: 'Interesting!',
      },
    ],
    id: '3',
  },
  {
    title: 'How to ceate animated svg',
    description:
      'As we all know that the best practice for icons it uses svg formats, but what if we also want to add some small animation, it can be trike to find a good approach for this.',
    img: blog,
    author: {
      name: 'Andrei Karalevich',
      img: me,
    },
    date: '04-30-2023',
    comments: [
      {
        author: {
          name: 'Andrei Karalevich',
          img: me,
        },
        text: 'Interesting!',
      },
    ],
    id: '4',
  },
  {
    title: 'How t create animated svg',
    description:
      'As we all know that the best practice for icons it uses svg formats, but what if we also want to add some small animation, it can be trike to find a good approach for this.',
    img: blog,
    author: {
      name: 'Andrei Karalevich',
      img: me,
    },
    date: '04-30-2023',
    comments: [
      {
        author: {
          name: 'Andrei Karalevich',
          img: me,
        },
        text: 'Interesting!',
      },
    ],
    id: '5',
  },
  {
    title: 'How o create animated svg',
    description:
      'As we all know that the best practice for icons it uses svg formats, but what if we also want to add some small animation, it can be trike to find a good approach for this.',
    img: blog,
    author: {
      name: 'Andrei Karalevich',
      img: me,
    },
    date: '04-30-2023',
    comments: [
      {
        author: {
          name: 'Andrei Karalevich',
          img: me,
        },
        text: 'Interesting!',
      },
    ],
    id: '6',
  },
  {
    title: 'Ho to create animated svg',
    description:
      'As we all know that the best practice for icons it uses svg formats, but what if we also want to add some small animation, it can be trike to find a good approach for this.',
    img: blog,
    author: {
      name: 'Andrei Karalevich',
      img: me,
    },
    date: '04-30-2023',
    comments: [
      {
        author: {
          name: 'Andrei Karalevich',
          img: me,
        },
        text: 'Interesting!',
      },
    ],
    id: '7',
  },
  {
    title: 'How to create animated sg',
    description:
      'As we all know that the best practice for icons it uses svg formats, but what if we also want to add some small animation, it can be trike to find a good approach for this.',
    img: blog,
    author: {
      name: 'Andrei Karalevich',
      img: me,
    },
    date: '04-30-2023',
    comments: [
      {
        author: {
          name: 'Andrei Karalevich',
          img: me,
        },
        text: 'Interesting!',
      },
    ],
    id: '8',
  },
  {
    title: 'How to create anmated svg',
    description:
      'As we all know that the best practice for icons it uses svg formats, but what if we also want to add some small animation, it can be trike to find a good approach for this.',
    img: blog,
    author: {
      name: 'Andrei Karalevich',
      img: me,
    },
    date: '04-30-2023',
    comments: [
      {
        author: {
          name: 'Andrei Karalevich',
          img: me,
        },
        text: 'Interesting!',
      },
    ],
    id: '9',
  },
  {
    title: 'How to create animaed svg',
    description:
      'As we all know that the best practice for icons it uses svg formats, but what if we also want to add some small animation, it can be trike to find a good approach for this.',
    img: blog,
    author: {
      name: 'Andrei Karalevich',
      img: me,
    },
    date: '04-30-2023',
    comments: [
      {
        author: {
          name: 'Andrei Karalevich',
          img: me,
        },
        text: 'Interesting!',
      },
    ],
    id: '10',
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

export const SERVICE_PAGES: { [property: string]: ServicePageT } = {
  [SERVICES_NAVIGATION.FRONTEND]: {
    serviceTitle: 'Frontend Development',
    icons: [VueIcon, ReduxIcon, VueXIcon, TypeScriptIcon, ReactIcon],
    examples: [
      {
        image: nexon,
        link: 'https://www.nexon.com/main/en',
        text: [
          'Nexon.com is the official and main website of Nexon, where users can find information about the company, its games, and its services, as well as access support and community resources.',
          `Among other things, I was responsible for the login/registration page and the user account page.
            The project is built on a stack of Vue, VueX technologies. And supports a large number of different variations of 
            authorization methods, Web, Steam, Xbox, PSP, Nexon Game Launcher and also varies depending on the region and age of 
            the player.`,
          `I made a particularly significant contribution to the development and refinement of the user login process, working closely with a team of designers and backend engineers, 
          I was able to develop an interface that greatly facilitated and accelerated the process of creating an account.`,
        ],
      },
      {
        image: demandbase,
        link: 'https://www.g2.com/products/demandbase-abm-abx-cloud/interactive_demo',
        text: [
          `Demandbase.com is private (you can check demo) account-based marketing (ABM) platform for B2B companies. The platform allows businesses to identify and target the accounts that are most
           likely to become customers, personalize their marketing messages, and measure the impact of their marketing efforts.`,
          `The project is built on the stack of React, Redux, React-Router, React-Thunk, React-Saga technologies. And it includes a huge number of interconnected pages, settings and a web component, which makes this project extremely complex.`,
          `The project had problems with extensibility. I suggested eliminating the bottleneck of the application. Replacing 
          Redux-Thunk with Redux-Saga to eliminate difficulties in maintaining asynchronous request from client to server. 
          And also gradually introduce a more reliable useHooks syntax as an alternative to the outdated version of React15, 
          and get rid of compatibility problems with modern libraries. Also I developed a new way to create customer preference tracking tags, which increased our customers' revenue.`,
        ],
      },
      {
        text: [
          `The main idea of frontend development is to create the user-facing part of a website or application, which is
           what users see and interact with. Frontend development involves creating the visual and interactive components 
           of a website or application, such as the layout, design, colors, typography, buttons, forms, animations, and other elements.`,
          `Frontend developers use web technologies such as HTML, CSS, and JavaScript to create these user-facing components. 
          They also use frontend frameworks and libraries such as React, Angular, and Vue.js to simplify the development 
          process and create more complex user interfaces`,
          `The goal of frontend development is to create a user experience that is intuitive, engaging, and easy to use. 
          This requires a deep understanding of user behavior and design principles, as well as technical expertise 
          in web development technologies.`,
        ],
      },
    ],
  },
  [SERVICES_NAVIGATION.ECOMMERCE]: {
    serviceTitle: 'E-Commerce Development',
    icons: [ReactIcon, ReduxIcon, VueIcon, VueXIcon, TypeScriptIcon],
    examples: [
      {
        image: armory,
        link: 'https://armory.worldofwarships.com/en',
        text: [
          `Armory.worldofwarships.com is the official website for the Armory feature in the popular online game 
          World of Warships. The Armory is an in-game store where players can use their in-game currency or real money 
          to purchase various items such as premium ships, containers, and special upgrades.`,
          `On the website, players can browse through the available items in the Armory and learn more about their 
          features and benefits. They can also purchase items directly from the website and then log in to the game to claim them.`,
          `The application is written in ReactJS using modern approaches and best practices. I was engaged in maintaining and 
          updating the logic and visual characteristics of components in Storybook, some of the components that you will 
          find in the application were developed from scratch: tooltips, selectors, dropdowns.`,
        ],
      },
      {
        image: nexongc,
        link: 'https://www.nexongamecard.com',
        text: [
          `The Nexon Game Card is a digital prepaid card that can be used to make purchases online in various gaming, music, and
           other entertainment platforms. The Nexon Game Card website website also offers a range of tools and 
           features to manage your Nexon Game Card account, such as checking your balance, redeeming codes, and viewing your 
           transaction history.`,
          `When you purchase a Nexon Game Card card, you receive a unique code that can be redeemed on the website or directly 
          on a participating retailer's website. The value of the card can then be used to purchase virtual items or 
          in-game currency for various online games such as MapleStory, World of Tanks, and Warframe, or to buy digital 
          music or movies from participating providers like iTunes or Google Play.`,
          `I completely rebranded the company's affiliate website "Nexon Game Card" which increased gift card sales and
           generated additional annual revenue.`,
        ],
      },
      {
        text: [
          `E-commerce development is the process of creating an online platform that enables 
            businesses to sell their products or services over the internet. This can involve developing a custom 
            e-commerce website, integrating online payment systems, setting up shipping and delivery mechanisms, 
            and implementing marketing and analytics tools to help businesses manage their online sales.`,
          `E-commerce development requires a range of technical skills, including web development, database management, 
          and online payment processing, as well as an understanding of business operations and consumer behavior. 
          As such, many businesses opt to work with e-commerce development companies or professionals to ensure that 
          their online platform is optimized for sales and meets the needs of their customers.`,
          `Overall, e-commerce has revolutionized the way that businesses operate and has opened up new opportunities 
          for both businesses and consumers to engage in online transactions, and e-commerce development is a crucial 
          part of building successful online businesses in today's digital landscape.`,
        ],
      },
    ],
  },
  [SERVICES_NAVIGATION.BACKEND]: {
    serviceTitle: 'Backend Development',
    icons: [ReactIcon, ReduxIcon, VueIcon, VueXIcon, TypeScriptIcon],
    examples: [
      {
        image: profile,
        link: 'https://profile.worldofwarships.eu/statistics/595813816/pve',
        text: [
          `Profile.worldofwarships.eu is a website that provides information and statistics about players and their 
              performance in the online multiplayer game World of Warships. The website is affiliated with Wargaming, 
              the company that developed and published World of Warships.`,
          `Players can access their own profile by logging in with their World of Warships account credentials. Once 
          logged in, they can view detailed statistics about their gameplay, such as their win rate, average damage 
          per battle, and the types of ships they use most frequently.`,
          `In general, I was responsible for the frontend part of this app to ensure a seamless user experience, 
          I would have implemented features such as pagination, filtering, and sorting to make it easy for users to 
          find the information they are looking for. I would have also made sure that the website is mobile-responsive 
          and works well on a variety of devices and screen sizes. But I also made a significant contribution to the 
          development of the backend part of this application. One of the main feature of which I am proud is the 
          profile privacy settings, you can read a little more below.`,
        ],
      },
      {
        image: profileModal,
        link: 'https://profile.worldofwarships.eu/statistics/595813816/pve',
        text: [
          `Profile privacy settings in profile.worldofwarships.eu allow players to control who can view their 
              statistics and other information on the website.`,
          `Players can choose to make their profile either public, private, or visible to only their friends. If a 
          player sets their profile to public, anyone can view their profile and statistics. If a player sets their 
          profile to private, no one can view their profile or statistics except for the player themselves. 
          If a player sets their profile to visible to friends only, only players who have a unique link can view your 
          profile and statistics.`,
          `To create the profile settings feature on the Backend part I would have created the API endpoints using Python 
          and FastAPI frameworks. To ensure the security and privacy of user data, I would have used authentication 
          and authorization mechanisms using JSON Web Tokens and role-based access control.`,
          `I would also have used error handling and validation to ensure that the API endpoints are robust and
           can handle a variety of inputs and scenarios. This would include validating user input, handling errors 
           gracefully, and returning meaningful error messages to the client.`,
          `Overall, creating the profile settings feature using Python and FastAPI would have been a challenging but 
          rewarding project that required a strong understanding of backend development, data modeling, API design, 
          and security best practices. And even the fact that I've never worked with python before didn't stop me from doing my job quickly and 
          efficiently. I like to try new technologies and approaches in my work. You can see even more examples of 
          working with the backend using MERN stack in my personal projects on the portfolio tab.`,
        ],
      },
      {
        text: [
          `Backend development is a crucial part of building any web application, as it provides the foundation for the entire system. 
        Without a robust and well-designed backend, the frontend and user experience would not be possible.`,
          `Backend development refers to the server-side programming that powers the functionality and logic of a web application.
           It includes everything that happens behind the scenes, such as data storage, processing, and retrieval, 
           user authentication and authorization, and the handling of requests and responses between the client-side
            and the server-side.`,
        ],
      },
    ],
  },
  [SERVICES_NAVIGATION.WEBGAME]: {
    serviceTitle: 'Web Game',
    icons: [ReactIcon, ReduxIcon, VueIcon, VueXIcon, TypeScriptIcon],
    examples: [
      {
        image: clans,
        link: 'https://clans.worldofwarships.eu/clan-profile/500192219?source=search',
        text: [
          `Clans.worldofwarships.eu is a website that allows World of Warships players to create, manage, and join clans. World of 
            Warships is a popular online multiplayer game that simulates naval combat, and clans are groups of players who band 
            together to compete against other clans and participate in clan-based activities`,
          `This is not a classic web game as we are usually used to seeing. This is more of a web platform that helps to 
          play the computer game World of Warships, but at the same time, this site is made very interactive. The website 
          provides a range of tools and features to help clan leaders and members organize their activities and 
          communicate with each other.`,
          `Some of the key features of clans include:`,
          `1.Clan management tools: Clan leaders can manage their clan's roster, set recruitment requirements, and customize 
          their clan's profile and emblem. 
          2.Clan battles: Clans can participate in clan battles, which are competitive matches between clans that offer rewards and rankings.
          3.Events: The website provides information about upcoming events and activities, including tournaments and special missions. 
          4.Communication tools: Clans can use the website's messaging system and forums to communicate with each other, 
          plan events, and discuss strategy. 
          5.Leaderboards: The website provides rankings for clans based on their performance in various activities, 
          such as clan battles.`,
          `I  implemented TypeScript into the project and also implemented a new functional approach using hooks instead
           of class components. So I did huge work and also isolated duplicated code into individual components, 
           writing types, and interfaces.  Also dozens of different improvements and updates. So the final result very 
           satisfied us even more than we expected. The load time decreased significantly and what is important, the 
           speed of implementing new features and the frequency of appearance of new bugs decrease as well.`,
        ],
      },
      {
        image: dockyard,
        link: 'https://dockyard.worldofwarships.com',
        text: [
          `PLEASE NOTE that this is a seasonal event that runs several times a year and may not be available at the moment. 
          If you are interested in this project, you can find more information in my LinkedIn profile.`,
          `The Dockyard is a application that provides players of the popular online multiplayer game 
        World of Warships with access to the game's dockyard feature. The dockyard is a special seasonable feature that allows 
        players to build and customize their own ships, with each dockyard event featuring a different ship for players 
        to construct.`,
          `And what is most exciting, they can do it both in a web browser and in the desktop game itself. To achieve this 
          goal, the CEF browser engine built into the game is used.`,
          `I was responsible for developing the player interface, which allowed players to control the stages of building 
          a ship using the next, previous, stop, play buttons. The player can re-view the animation of the construction 
          of the ship as many times as he wishes. All this was done using React, Redux stack.`,
        ],
      },
      {
        text: [
          `Web game development is the process of creating games that can be played through web browsers. These games 
          can range from simple puzzle games to complex multiplayer games that involve real-time interaction between 
          players from all over the world.`,
          `Web game development requires a good understanding of programming languages such as JavaScript, HTML, and CSS.
          One of the main advantages of web game development is the ease of distribution, as games can be easily accessed 
          by players without the need for downloads or installations. Web games can also be played on a variety of devices, 
          including desktops, laptops, smartphones, and tablets.`,
          `However, web game development also comes with its own set of challenges, including browser compatibility 
          issues, security concerns, and performance optimization. Developers must ensure that their games are 
          compatible with a wide range of browsers and devices, and that they are secure from potential attacks.`,
          `Overall, web game development offers a unique and exciting opportunity for developers to create engaging and 
          accessible games that can be enjoyed by players all around the world.`,
        ],
      },
    ],
  },
  [SERVICES_NAVIGATION.LANDING]: {
    serviceTitle: 'Landing page',
    icons: [ReactIcon, ReduxIcon, VueIcon, VueXIcon, TypeScriptIcon],
    examples: [
      {
        image: ignition,
        link: 'https://maplestory.nexon.net/micro-site/ignition',
        text: [
          `MapleStory is a popular massively multiplayer online role-playing game (MMORPG) developed by Nexon. 
          The website appears to be a micro-site within the official MapleStory website, dedicated to promoting a 
          specific update or event known as "Ignition."`,
          `The Ignition is a major update to the game that introduces new content, features, and improvements to 
          gameplay. The update includes new areas to explore, new quests to complete, new bosses to battle, and new 
          equipment to acquire. The update also introduces improvements to the user interface, game performance, and 
          overall player experience.`,
          `I created this microsite from scratch using Vue and SCSS. There is no complicated logic, routing or a large 
          number of asynchronous requests. But there is a responsive layout and interesting CSS solutions. Such as 
          animated background or iridescent border animation.`,
          `The micro-site offers various resources for 
          players, such as screenshots, and a link to download the game client. There is also a section 
          dedicated to the game's community, where players can connect with each other, share their experiences, and get
           help with gameplay.`,
        ],
      },
      {
        image: maplestory,
        link: 'https://maplestory.nexon.net/landing',
        text: [
          `The landing page provides visitors with an overview of the game, including its features, gameplay, and 
         community. It showcases the game's vibrant and colorful graphics, as well as its rich storyline and diverse characters.`,
          `In addition to the game overview, the landing page also provides links to various resources for players, 
            such as news and events, game updates, community forums, and social media channels. Players can also download 
            the game client directly from the landing page.`,
          `The landing page also features a section for newcomers, providing information on how to get started with 
            the game, including creating a character, selecting a class, and exploring the game world. There are also 
            links to various resources for beginners, such as tutorials, guides, and FAQs.`,
          `Overall, this website serves as an informative and user-friendly gateway 
          to the world of MapleStory, providing players with all the information they need to start playing, stay 
          up-to-date on the latest game developments, and connect with the game's community. And I was responsible for 
          supporting and updating content on website.`,
        ],
      },
      {
        text: [
          `Landing page development involves creating a web page that is specifically designed to convert visitors 
          into customers or leads. A landing page typically has a clear and focused objective, such as promoting a 
          product, generating leads, or encouraging visitors to sign up for a service.`,
          `The development process typically involves several key steps, including: Planning - The first step in 
          landing page development is to define the goals and objectives of the page, as well as the target audience. 
          Design - The next step is to create a design that is visually appealing, easy to navigate, and consistent 
          with the brand's overall aesthetic.vContent creation - Once the design is in place, the next step is to 
          create the content for the landing page.  Testing and optimization - Once the landing page is live, it's 
          important to test and optimize it to ensure it's achieving the desired results.`,
          `Overall, landing page development is a crucial part of any digital marketing strategy, as it can help 
          businesses to increase their conversion rates, generate more leads, and ultimately grow their bottom line.`,
        ],
      },
    ],
  },
  [SERVICES_NAVIGATION.CONSULTING]: {
    serviceTitle: 'Product Consulting',
    icons: [ReduxIcon, VueIcon, VueXIcon, TypeScriptIcon, ReactIcon],
    examples: [
      {
        text: [
          `Product consulting in software development is a process of providing guidance and expertise to businesses or 
          individuals who are developing a software product. A product consultant helps the client to define, plan, and 
          execute their product strategy and ensure that the product meets the needs of the target audience.`,
          `Product consulting starts with understanding the client's business objectives and goals. The consultant works
           closely with the client to identify the target market, customer needs, and product features. This information 
           is used to develop a product strategy that will guide the development process.`,
          `During the development process, the product consultant provides guidance on various aspects of product 
          development, such as user experience design, technical architecture, development methodology, quality 
          assurance, and product launch.`,
          `The product consultant also ensures that the product is aligned with industry standards and best practices. 
          This includes ensuring that the product is scalable, secure, and optimized for performance. The consultant 
          may also provide guidance on pricing, licensing, and monetization strategies.`,
          `Product consulting is an ongoing process, and the consultant works closely with the client throughout the 
          product lifecycle. The consultant may conduct market research and gather feedback from customers to 
          continuously improve the product.`,
          `Overall, product consulting is an essential aspect of software development as it ensures that the product 
          meets the needs of the target audience and achieves the client's business objectives.`,
        ],
      },
    ],
  },
}
