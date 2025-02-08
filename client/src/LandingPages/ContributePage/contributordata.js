const coreContributors = [
  // when adding new in contributors add in by last name alphabetical order
  // fomatting for each contributor is as follows (delete portfolio if they do not have one):
  // {name: first last
  //   image: ***New Contributors will need an image saved in images/core-contributors in a  500px x 500 px png and naming convention should be First-Last.png**,
  //   bio: in html with <p> elements
  //   linkedin: full url
  //   github: full url
  //   portfolio: delete if not provided
  //   }
  {
    name: 'Seanna Arnold',
    role: 'Front-End Developer',
    image: '/images/core-contributors/Seanna-Arnold.png',
    bio: '<p>Seanna is a software engineer driven by a passion for creative problem-solving and user-centric innovation. With a multicultural upbringing spanning Africa and Asia, she is able to build natural rapport with others from various regions and backgrounds and is eager to contribute her technical skills and creativity to help drive business needs forward. Her specialty lies in UI development, specifically React and CSS, with a strong focus on accessibility and UX principles.</p>',
    linkedin: 'https://www.linkedin.com/in/seanna-arnold/',
    github: 'https://github.com/Seanna-Arnold',
    portfolio: 'https://seanna-arnold.com/'
  },
  {
    name: 'JP Escobari',
    role: 'Developer',
    image: '/images/core-contributors/JP-Escobari.png',
    bio: '<p>JP is a bilingual full-stack software developer with a background in Cybersecurity and Computer Networks Engineering. He&apos;s got a deep passion for React, CSS, and crafting responsive, user-friendly designs, although really, he&apos;s always been the type to dive into anything that&apos;s new and cool in tech - from building custom PCs to exploring the latest in gaming. His background naturally brings a lot of attention to detail and a unique perspective to his development work. JP&apos;s continuous curiosity and enthusiasm for tech make him a versatile developer who&apos;s excited to keep growing in the ever-evolving world of software.</p>',
    linkedin: 'https://www.linkedin.com/in/juanpabloescobari/',
    github: 'https://github.com/JPEscobari'
  },
  {
    name: 'Alex Grimes',
    role: 'Developer',
    image: '/images/core-contributors/Alex-Grimes.png',
    bio: '<p> Alex is a software developer with experience in React, TypeScript, Next.js, and Python. Alex spent two years in Japan as an English teaching assistant, where she worked with local teachers to create engaging learning activities. Along the way, she gained intermediate proficiency in Japanese and passed the N3 JLPT exam.</p><p>As an IT Junior Software Engineer, Alex managed a Python project that analyzed website performance metrics using API results, optimized data retrieval with stored procedures, and leveraged Power BI for insightful visualizations. Her experience includes migrating services to third-party APIs with Flask and writing a comprehensive suite of parameterized unit tests to ensure high code quality. In a previous role in accounting, she used Power Automate to shift from a paper-based approval system to an online one, speeding up approvals and making processes more efficient.</p>',
    linkedin: 'https://www.linkedin.com/in/alex-grimes-dev/',
    github: 'https://github.com/agrimes23',
    portfolio: 'https://alex-grimes-software-engineer.vercel.app/'
  },
  {
    name: 'Jason Houn',
    role: 'Developer',
    image: '/images/core-contributors/Jason-Houn.png',
    bio: '<p>Jason is a software developer driven by a passion for music and language. With over 6 years in the music industry and a strong background in language learning, Jason strives to blend his experiences with his programming skills to contribute to impactful projects!</p>',
    linkedin: 'https://www.linkedin.com/in/jason-houn/',
    github: 'https://github.com/jsnhn'
  },
  {
    name: 'Sara Korman',
    role: 'UX/UI Designer',
    image: '/images/core-contributors/Sara-Korman.png',
    bio: '<p>Sara is a UX/UI designer passionate about crafting intuitive and engaging digital experiences. With a keen eye for user needs, Sara designs seamless interfaces that enhance accessibility and usability. When not working on a project, you can find her exploring new design trends, playing with her dog, or watching a good sunset.</p>',
    linkedin: 'https://www.linkedin.com/in/sarakorman/',
    portfolio: 'https://www.sarakorman.com/'
  },
  {
    name: 'Parker Machemer',
    role: 'UX/UI Designer',
    image: '/images/core-contributors/Parker-Machemer.png',
    bio: '<p>Parker is a UI/UX designer for KnowNative. With backgrounds in tech, art, language learning, and translation, he is excited to contribute in various ways while improving his design skills.</p>',
    linkedin: 'https://www.linkedin.com/in/parker-machemer/',
    portfolio: 'https://www.kupobox.com/'
  },
  {
    name: 'Austin Rzansa',
    role: 'Developer',
    image: '/images/core-contributors/Austin-Rzansa.png',
    bio: '<p>Austin is a passionate software engineer and language learner with 5 years of experience working on enterprise applications. He has filled many hats, from QA to production support as well as database developer. More recently, he has pivoted into cloud architecture and web development. His love for languages has led him to reach an intermediate level in Chinese.</p>',
    linkedin: 'https://www.linkedin.com/in/austin-rzansa/',
    github: 'https://github.com/arzansa'
  },
  {
    name: 'Paul Santos',
    role: 'Developer',
    image: '/images/core-contributors/Paul-Santos.png',
    bio: "<p>Native to Los Angeles, California, Paul is a full-stack software engineer specializing in front-end development, particularly in building React.js and Next.js applications. His love for languages began in high school when he first started learning French, and he furthered his studies by pursuing a minor in French and Francophone Studies at UCLA. Through KnowNative, Paul is able to combine his passion for software development with his love for language and linguistics, and he is excited to continue contributing to the application. In addition to software engineering and languages, Paul's hobbies include Tahitian dance, yoga, hip hop dance, hiking, and escape rooms. Before transitioning to software engineering, Paul also worked as a home health physical therapist. With his unique blend of experiences, he aspires to break into the healthcare tech space in the future.</p>",
    linkedin: 'https://www.linkedin.com/in/paulsantos2107/',
    github: 'https://github.com/psantos2107'
  },
  {
    name: 'Zephyr Worthington',
    role: 'Back-End Developer',
    image: '/images/core-contributors/Zephyr-Worthington.png',
    bio: '<p>A theatre kid turned software engineer, Zephyr is a versatile full-stack developer with a passion for solving complex technical puzzles. When not coding, you can find them rock climbing, hanging out with their dog, trying a new cupcake recipe, or working on their latest crochet project.</p>',
    linkedin: 'https://www.linkedin.com/in/zephyrworthington',
    github: 'https://www.github.com/zephyr-c'
  },
  {
    name: 'Ellie Wright',
    role: 'Front-End Developer',
    image: '/images/core-contributors/Ellie-Wright.png',
    bio: '<p>Ellie Wright is a software developer with experience in various languages and libraries, including HTML/CSS, JavaScript, and React. She uses these skills to improve the structure, layout/styling, and components of the KnowNative frontend.</p><p>Graduating with a BA in Psychology in 2022, Ellie began her switch to the software field in 2023, completing her Software Development bootcamp in 2024. She is based in the Kansas City Metropolitan Area.</p>',
    linkedin: 'https://www.linkedin.com/in/ellewri/',
    github: 'https://github.com/ellewright'
  }
];

const pastCoreContributors = [
  {
    name: 'Mel Boyajian',
    role: 'Developer',
  },
  {
    name: 'Light Liu',
    role: 'UX/UI Designer'
  },
  {
    name: 'Sarma Akondi',
    role: 'Front End Developer'
  },
  {
    name: 'Nakita Strangeways',
    role: 'Developer'
  },
  {
    name: 'Kate McElhaney',
    role: 'Front End Developer'
  },
  {
    name: 'Renna Carver',
    role: 'Developer'
  }
];

export default { coreContributors, pastCoreContributors };
