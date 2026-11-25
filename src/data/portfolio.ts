export type ProjectCategory = 'Web Development' | 'App Development' | 'Cloud Projects';

export interface ProjectItem {
  id: string;
  name: string;
  category: ProjectCategory;
  status: 'Completed';
  shortDescription: string;
  problemStatement: string;
  technologies: Array<{ label: string; role?: string }>;
  keyFeatures: string[];
  screenshot: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: 'code' | 'globe' | 'cloud' | 'smartphone' | 'database' | 'wrench' | 'shield';
  items: string[];
  emptyNote?: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  focusAreas: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  periodOrYear: string;
  status: string;
  highlights: string[];
}

export const PERSONAL_INFO = {
  brandName: 'Rutuja.dev',
  fullName: 'Kendre Rutuja Navnath',
  shortGreeting: "Hello, I'm",
  identity: 'Aspiring Software Developer',
  college: 'D Y Patil University, Pune',
  tagline:
    'Passionate about building innovative software solutions, exploring cloud technologies and discovering the world of cybersecurity.',
  typingRoles: [
    'Aspiring Software Developer',
    'Cloud Computing Enthusiast',
    'Cybersecurity Learner',
    'Technology Explorer',
  ],
  profileImage: '/images/profile.jpg',
  profileFallbackImage: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_1.06.13_PM_1d99673f.jpeg',
  email: 'kendrerutuja9@gmail.com',
  githubUrl: 'https://github.com/Rutu202508',
  githubHandle: 'Rutu202508',
  linkedinUrl: 'https://www.linkedin.com/in/rutuja-kendre-267106371',
  linkedinLabel: 'rutuja-kendre-267106371',
  resumeUrl: '',
  careerInterests: ['Software Development', 'Cloud Computing', 'Cybersecurity'],
  aboutParagraphs: [
    "Hello! I'm Kendre Rutuja Navnath, an aspiring Software Developer and a Computer Engineering student at D Y Patil University, Pune.",
    'I have a background in Computer Engineering and a strong interest in developing innovative software applications.',
    'I enjoy programming, exploring modern technologies and building practical projects that solve real-world problems.',
    'My primary career goal is to become a Software Developer. Alongside software development, I am interested in Cloud Computing.',
    'I believe in continuous learning, creativity, problem-solving and improving my technical knowledge through practical experience.',
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming-languages',
    title: 'Programming Languages',
    iconName: 'code',
    items: ['C++', 'Python', 'Java'],
  },
  {
    id: 'web-development',
    title: 'Web Development',
    iconName: 'globe',
    items: ['HTML', 'CSS'],
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing',
    iconName: 'cloud',
    items: ['Cloud Computing Fundamentals'],
  },
  {
    id: 'app-development',
    title: 'App Development',
    iconName: 'smartphone',
    items: [],
    emptyNote: 'Applied in academic mobile builds; confirmed standalone skills will be added here.',
  },
  {
    id: 'database',
    title: 'Database',
    iconName: 'database',
    items: [],
    emptyNote: 'Currently strengthening database foundations; verified skills will be listed soon.',
  },
  {
    id: 'development-tools',
    title: 'Development Tools',
    iconName: 'wrench',
    items: [],
    emptyNote: 'Toolkit list ready to be updated as workflow proficiency grows.',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    iconName: 'shield',
    items: [],
    emptyNote: 'Actively exploring security concepts; verified skills will be added here.',
  },
];

export const CURRENTLY_EXPLORING = [
  {
    title: 'Software Engineering Practices',
    detail: 'Writing cleaner modular code, object-oriented design in Java & C++, and problem solving.',
  },
  {
    title: 'Cloud Computing Concepts',
    detail: 'Understanding cloud service models, deployment concepts, and scalable application architecture.',
  },
  {
    title: 'Cybersecurity Fundamentals',
    detail: 'Learning how modern applications stay secure, from authentication flows to safe data handling.',
  },
  {
    title: 'Full-Stack Web Foundations',
    detail: 'Advancing beyond HTML and CSS toward interactive, responsive web applications.',
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    number: '01.',
    title: 'Basic Website Development',
    description:
      'Building clean, structured, and responsive web pages using semantic HTML and modern CSS layout techniques.',
    focusAreas: ['Semantic HTML', 'Responsive CSS', 'Accessible Layouts'],
  },
  {
    number: '02.',
    title: 'Frontend Development',
    description:
      'Crafting clear, user-friendly interfaces with thoughtful visual hierarchy, navigation, and multi-device compatibility.',
    focusAreas: ['UI Structure', 'Cross-Screen Layouts', 'Clean Typography'],
  },
  {
    number: '03.',
    title: 'Programming & Problem Solving',
    description:
      'Solving logical and algorithmic challenges using C++, Python, and Java with an emphasis on readability and fundamentals.',
    focusAreas: ['C++', 'Python', 'Java'],
  },
  {
    number: '04.',
    title: 'Software Application Development',
    description:
      'Designing and assembling practical software applications through academic and personal project builds.',
    focusAreas: ['Application Logic', 'User Flows', 'Modular Design'],
  },
  {
    number: '05.',
    title: 'Technical Project Development',
    description:
      'Taking real-world problem statements from concept to working student prototypes through research and iteration.',
    focusAreas: ['Problem Analysis', 'Prototyping', 'Documentation'],
  },
];

export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: 'organicbazar',
    name: 'OrganicBazar',
    category: 'App Development',
    status: 'Completed',
    shortDescription:
      'OrganicBazar is a digital marketplace that connects farmers directly with customers, allowing farmers to sell organic products and customers to purchase fresh fruits, vegetables, seeds, and seasonal products.',
    problemStatement:
      'Farmers often face difficulties in selling their agricultural products directly to customers due to a lack of digital platforms. OrganicBazar aims to provide an online marketplace that reduces middlemen, improves product accessibility, and supports farmers in selling their products easily.',
    technologies: [
      { label: 'Flutter', role: 'Frontend' },
      { label: 'Firebase', role: 'Backend' },
      { label: 'Firebase Authentication', role: 'Authentication' },
      { label: 'Firebase Storage', role: 'Storage' },
      { label: 'Android Studio', role: 'Development Tool' },
    ],
    keyFeatures: [
      'Develop a user-friendly mobile application.',
      'Implement farmer and customer login.',
      'Add and manage organic products.',
      'Develop product search and category features.',
      'Implement cart and wishlist functionality.',
      'Enable online ordering and order management.',
    ],
    screenshot: '/src/assets/images/project_organic_bazar_1795598926119.jpg',
  },
  {
    id: 'local-service-finder',
    name: 'Local Service Finder',
    category: 'App Development',
    status: 'Completed',
    shortDescription:
      "A mobile application that helps users easily find and contact local service providers such as tutors, plumbers, electricians, painters, and maids. Users can log in and view service providers' names, contact numbers, and locations.",
    problemStatement:
      'Finding reliable local service providers is often difficult and time-consuming. People may struggle to find contact details and location information of nearby service providers. This application aims to provide a centralized platform where users can easily search for local services and contact the required service providers.',
    technologies: [
      { label: 'Android Studio', role: 'Application development' },
      { label: 'Java', role: 'Programming language' },
      { label: 'Firebase Authentication', role: 'User login & authentication' },
      { label: 'Firebase Realtime Database', role: 'Service provider data' },
      { label: 'XML', role: 'User interface design' },
    ],
    keyFeatures: [
      'User Login and Authentication.',
      'Different Service Categories.',
      'Service Provider Details.',
      'Contact Number and Location Information.',
      'Easy Access to Local Services.',
    ],
    screenshot: '/src/assets/images/project_local_service_finder_1795598927911.jpg',
  },
  {
    id: 'noteshub',
    name: 'NotesHub Study Portal',
    category: 'Web Development',
    status: 'Completed',
    shortDescription:
      'NotesHub Study Portal is a centralized web-based educational platform designed to simplify access to academic resources. It enables students to explore subject-wise study notes, search for learning materials, and access organized educational content through a user-friendly interface.',
    problemStatement:
      'To develop a centralized and user-friendly web platform that streamlines access to organized, subject-wise academic resources and study materials.',
    technologies: [
      { label: 'Java' },
      { label: 'HTML' },
      { label: 'CSS' },
    ],
    keyFeatures: [
      'Subject-wise Notes',
      'Quick Search',
      'Easy Navigation',
      'Organized Resources',
      'Responsive Design',
    ],
    screenshot: '/src/assets/images/project_noteshub_1795598927024.jpg',
  },
];

export const PROJECT_FILTERS: Array<'All Projects' | ProjectCategory> = [
  'All Projects',
  'Web Development',
  'App Development',
  'Cloud Projects',
];

export const CERTIFICATES_LIST: CertificateItem[] = [
  {
    id: 'aws-internship',
    title: 'AWS Internship',
    category: 'Internship Certification',
    description: 'Completed internship program focused on foundational cloud computing concepts.',
    imageUrl: '',
  },
  {
    id: 'linkedin-learning',
    title: 'LinkedIn Learning',
    category: 'Professional Learning',
    description: 'Completed structured online coursework through LinkedIn Learning.',
    imageUrl: '',
  },
];

export const EDUCATION_TIMELINE: EducationItem[] = [
  {
    id: 'btech-cse',
    degree: 'B.Tech – Computer Science Engineering',
    institution: 'D Y Patil University, Pune',
    periodOrYear: 'Second Year',
    status: 'Current Education',
    highlights: [
      'Pursuing undergraduate studies in Computer Science Engineering.',
      'Building foundations in programming, software development, cloud computing, and cybersecurity.',
    ],
  },
  {
    id: 'diploma-ce',
    degree: 'Diploma in Computer Engineering',
    institution: 'Computer Engineering Program',
    periodOrYear: 'Completed',
    status: 'Previous Education',
    highlights: [
      'Established core academic fundamentals in computer engineering and software development.',
      'Applied practical learning through structured academic software and mobile projects.',
    ],
  },
];
