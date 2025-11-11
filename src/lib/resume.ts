// ============================================================================
// RESUME DATA - Complete Profile Information
// ============================================================================

// Personal Information
export const personalInfo = {
  fullName: "Ankit Yadav",
  firstName: "Ankit",
  lastName: "Yadav",
  title: "Full Stack Developer",
  headline: "Passionate Full Stack Developer crafting elegant solutions",
  bio: "Experienced full stack developer proficient in web development, software engineering, and building scalable applications. Passionate about creating seamless user experiences and robust backend systems.",
  location: {
    city: "Rajasthan",
    country: "India",
  },
  age: 21,
  website: "https://bearerop.live",
  avatar: "/images/avatar.jpg", // Update with your avatar path
  resumeUrl: "https://dub.sh/resume189",
} as const;

// Contact Information
export const contactInfo = {
  email: "work.ankit189@gmail.com",
  phone: "+91-8302524658", // Add your phone number
  linkedin: "https://www.linkedin.com/in/yadavankit189/",
  github: "https://github.com/BearerOP",
  twitter: "https://x.com/ankit_twt",
  twitterHandle: "@ankit_twt",
} as const;

// Social Links
export const socialLinks = [
  {
    platform: "Twitter",
    url: "https://x.com/ankit_twt",
    username: "@ankit_twt",
    icon: "twitter",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/yadavankit189/",
    username: "yadavankit189",
    icon: "linkedin",
  },
  {
    platform: "GitHub",
    url: "https://github.com/BearerOP",
    username: "BearerOP",
    icon: "github",
  },
  {
    platform: "Email",
    url: "mailto:work.ankit189@gmail.com",
    username: "work.ankit189@gmail.com",
    icon: "mail",
  },
] as const;

// Education
export const education = [
  {
    id: "edu-1",
    institution: "Laxmi Devi Institute of Engineering and Technology",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science Engineering",
    location: "Alwar, Rajasthan",
    startDate: "2021",
    endDate: "2025",
    gpa: "8.31",
    cgpa: "8.31 CGPA",
    logo: "/images/logos/liet-logo.jpeg",
    achievements: [
      "Maintained 8.31 CGPA throughout the program",
      "Coursework: Networking, Python, C/C++, JavaScript, DSA, OOPs",
    ],
    description: "Focused on software engineering, data structures, object-oriented programming, and web development.",
  },
  {
    id: "edu-2",
    institution: "Vijay Laxmi Memorial Sr. Sec. School",
    degree: "12th Standard",
    field: "PCM (Physics, Chemistry, Mathematics)",
    location: "Alwar, Rajasthan",
    startDate: "2020",
    endDate: "2021",
    gpa: "79.00",
    percentage: "79.00%",
    logo: "/images/logos/vlm-logo.png",
    achievements: [
      "Completed Senior Secondary with 79% in PCM stream",
    ],
    description: "Senior Secondary education with focus on Science and Mathematics.",
  },
] as const;

// Work Experience
export const workExperience = [
  {
    id: "jan-suraaj",
    company: "Jan Suraaj Consultants Pvt. Ltd.",
    position: "Full Stack Developer",
    location: "Patna, Bihar",
    startDate: "September 2025",
    endDate: "Present",
    current: true,
    logo: "/images/logos/jspt-logo.png",
    description: "Developing comprehensive electoral software solutions supporting Bihar Assembly Elections 2025 campaign operations.",
    responsibilities: [
      "Built production-grade Electronic Voting Machine interfaces supporting 74.2M voters across 243 constituencies, featuring authentic Indian EVM styling, LED indicators, and real-time audio feedback for Bihar Assembly Elections 2025",
      "Automated constituency analysis using Google Apps Script, processing electoral data from 90,712+ polling stations across 120 constituencies, delivering real-time dashboards and analytics for 13M+ registered voters",
      "Developed opinion poll visualization platforms and prediction tables for 200,000+ party members, matching industry-standard formats with full customization for rapid campaign deployment",
      "Created interactive political dashboards with real-time electoral data management and voter sentiment analysis, supporting field operations across all 243 seats and 38 districts statewide",
    ],
    technologies: ["Next.js","Framer Motion","TypeScript","Tailwind CSS", "React", "Google Apps Script", "JavaScript", "Data Visualization", "Dashboard Development", "Electoral Systems"],
  },
  {
    id: "surepath-labs",
    company: "Surepath Labs Pvt. Ltd.",
    position: "Software Developer Trainee",
    location: "New Delhi, Delhi",
    startDate: "May 2025",
    endDate: "September 2025",
    current: false,
    logo: "/images/logos/spl-logo.png",
    description: "Designed and developed internal applications using the Clappia no-code platform to streamline operations.",
    responsibilities: [
      "Designed and developed internal attendance applications and digital forms using the Clappia no-code platform to streamline employee time tracking and reporting",
      "Automated daily task checklists for individual staff based on their roles using Clappia, improving operational efficiency and accountability",
    ],
    technologies: ["Clappia", "No-Code Development", "Workflow Automation"],
  },
] as const;

// Skills organized by category
export const skills = {
  coursework: [
    { name: "Networking", level: "Advanced", years: 3 },
    { name: "Python", level: "Advanced", years: 3 },
    { name: "C/C++", level: "Advanced", years: 4 },
    { name: "JavaScript", level: "Advanced", years: 3 },
    { name: "DSA (Data Structures & Algorithms)", level: "Advanced", years: 3 },
    { name: "OOPs (Object-Oriented Programming)", level: "Advanced", years: 3 },
  ],
  frontend: [
    { name: "Next.js", level: "Advanced", years: 2 },
    { name: "React", level: "Advanced", years: 3 },
    { name: "TypeScript", level: "Advanced", years: 2 },
    { name: "HTML5", level: "Expert", years: 4 },
    { name: "CSS3", level: "Advanced", years: 4 },
    { name: "Tailwind CSS", level: "Advanced", years: 2 },
    { name: "Shadcn UI", level: "Advanced", years: 1 },
  ],
  backend: [
    { name: "Node.js", level: "Advanced", years: 3 },
    { name: "Express.js", level: "Advanced", years: 3 },
    { name: "REST APIs", level: "Advanced", years: 3 },
  ],
  database: [
    { name: "MongoDB", level: "Advanced", years: 3 },
    { name: "PostgreSQL", level: "Advanced", years: 2 },
    { name: "Prisma", level: "Advanced", years: 2 },
  ],
  tools: [
    { name: "Git", level: "Advanced", years: 3 },
    { name: "Postman", level: "Advanced", years: 3 },
    { name: "Linux", level: "Intermediate", years: 2 },
    { name: "Selenium", level: "Intermediate", years: 1 },
  ],
  other: [
    { name: "Web3", level: "Intermediate", years: 1 },
    { name: "Blockchain", level: "Beginner", years: 1 },
    { name: "Problem Solving", level: "Advanced", years: 4 },
    { name: "No-Code Development (Clappia)", level: "Intermediate", years: 1 },
  ],
} as const;

// All skills as a flat array (for metadata/SEO)
export const allSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "Prisma",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Shadcn UI",
  "Git",
  "Postman",
  "Linux",
  "Selenium",
  "REST APIs",
  "Python",
  "C/C++",
  "DSA",
  "OOPs",
  "Networking",
  "Web Development",
  "Software Engineering",
  "Full Stack Development",
  "Web3",
  "Blockchain",
] as const;

// Projects
export const projects = [
  {
    id: "project-1",
    title: "Vraksh",
    category: "Link-in-bio web",
    description: "A comprehensive link-in-bio web application that allows users to create personalized landing pages with multiple links.",
    longDescription: "Vraksh is a modern link-in-bio platform that enables users to consolidate all their important links in one place. Built with Next.js and featuring a clean, responsive design.",
    image: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2F632shots_so.png?alt=media&token=a79bac5e-b1aa-45e3-b989-85edceacaed4",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MongoDB"],
    githubUrl: "https://github.com/BearerOP/vraksh-project",
    liveUrl: "https://vraksh.bearerop.live/",
    featured: true,
    status: "completed",
    startDate: "2024-01",
    endDate: "2024-03",
    highlights: [
      "Built custom link management system",
      "Implemented analytics dashboard",
      "Responsive design with dark mode support",
    ],
  },
  {
    id: "project-2",
    title: "GyanSagar",
    category: "Learning Management System",
    description: "A full-featured Learning Management System (LMS) for online education.",
    longDescription: "GyanSagar is a comprehensive LMS platform that enables educators to create, manage, and deliver online courses. Features include course creation, student enrollment, progress tracking, and assessments.",
    image: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2Fgyansagar.jpg?alt=media&token=d939d4e6-76eb-413e-828a-e3d789172c24",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    githubUrl: "https://github.com/BearerOP/gyansagar-client.git",
    liveUrl: "https://gyansagar.bearerop.live/",
    featured: true,
    status: "completed",
    startDate: "2023-08",
    endDate: "2023-12",
    highlights: [
      "Course creation and management system",
      "User authentication and role-based access",
      "Progress tracking and certificates",
    ],
  },
  {
    id: "project-3",
    title: "MagicUI Template",
    category: "Startup Website Clone",
    description: "A pixel-perfect clone of MagicUI startup landing page template.",
    longDescription: "Recreated the MagicUI startup template with modern animations and responsive design. Features smooth scrolling, animated components, and optimized performance.",
    image: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2Fstartup-template.jpg?alt=media&token=e20f0c2d-71d7-4736-8369-220d1b3c149d",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/BearerOP/startup-landing-page-nextjs",
    liveUrl: "https://startup-template.bearerop.live/",
    featured: false,
    status: "completed",
    startDate: "2024-02",
    endDate: "2024-02",
    highlights: [
      "Pixel-perfect design implementation",
      "Smooth animations with Framer Motion",
      "Fully responsive across all devices",
    ],
  },
  {
    id: "project-4",
    title: "Avadhi",
    category: "API Monitoring Dashboard",
    description: "Real-time API monitoring and analytics dashboard.",
    longDescription: "Avadhi is an API monitoring tool that tracks uptime, response times, and errors. Features real-time alerts, historical data visualization, and detailed analytics.",
    image: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2Favadhi.jpg?alt=media&token=27115960-b6fa-41d4-af7d-c54f693c767a",
    technologies: ["React", "Node.js", "MongoDB", "WebSockets", "Chart.js"],
    githubUrl: "https://github.com/BearerOP/API-Monitoring-Frontend",
    liveUrl: "https://avadhi.bearerop.live/",
    featured: true,
    status: "completed",
    startDate: "2023-10",
    endDate: "2023-12",
    highlights: [
      "Real-time monitoring with WebSockets",
      "Visual analytics with charts and graphs",
      "Alert system for downtime notifications",
    ],
  },
  {
    id: "project-5",
    title: "Swasthya",
    category: "Health & Fitness Monitoring System",
    description: "Backend API for health and fitness tracking application.",
    longDescription: "Swasthya provides a robust backend system for tracking health metrics, workout plans, and nutrition. Built with scalability and security in mind.",
    image: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2Fswasthya.jpg?alt=media&token=0d5e5117-c79d-4e43-b7e9-1cf0443c7d55",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "REST APIs"],
    githubUrl: "https://github.com/BearerOP/Swasthya-backend",
    liveUrl: "",
    featured: false,
    status: "completed",
    startDate: "2023-06",
    endDate: "2023-08",
    highlights: [
      "RESTful API with comprehensive endpoints",
      "Secure authentication system",
      "Data validation and error handling",
    ],
  },
  {
    id: "project-6",
    title: "FoodPlanet",
    category: "Food Order & Delivery App",
    description: "Backend system for food ordering and delivery platform.",
    longDescription: "FoodPlanet backend handles restaurant management, order processing, delivery tracking, and payment integration for a food delivery platform.",
    image: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2FfoodPlanet.jpg?alt=media&token=cabaf9f7-e520-478c-ad2d-4ec34f061ee2",
    technologies: ["Node.js", "Express", "MongoDB", "Stripe", "Socket.io"],
    githubUrl: "https://github.com/BearerOP/food-delivery-app",
    liveUrl: "https://www.youtube.com/watch?v=oRNMadW335g",
    featured: true,
    status: "completed",
    startDate: "2023-04",
    endDate: "2023-06",
    highlights: [
      "Real-time order tracking",
      "Payment gateway integration",
      "Restaurant and menu management",
    ],
  },
  {
    id: "project-7",
    title: "Dhanam",
    category: "Web3 Wallet",
    description: "Decentralized cryptocurrency wallet built with Web3 technologies.",
    longDescription: "Dhanam is a secure Web3 wallet that allows users to manage their cryptocurrency assets. Features include multi-chain support, transaction history, and secure key management.",
    image: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2FScreenshot%202024-08-29%20at%2009.10.10.png?alt=media&token=7df4bc7e-1bea-4b1b-a9d6-809a574f1b87",
    technologies: ["React", "Web3.js", "Ethereum", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/bearerOP/dhanam",
    liveUrl: "https://dhanam.bearerop.live/",
    featured: true,
    status: "completed",
    startDate: "2024-03",
    endDate: "2024-05",
    highlights: [
      "Multi-chain cryptocurrency support",
      "Secure key management system",
      "Transaction history and analytics",
    ],
  },
  // {
  //   id: "project-8",
  //   title: "Slug",
  //   category: "URL Shortener",
  //   description: "Fast and reliable URL shortening service with analytics.",
  //   longDescription: "Slug is a URL shortener that provides custom short links with detailed analytics. Features include click tracking, geographic data, and QR code generation.",
  //   image: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2Fslug.jpg?alt=media&token=adb0c27d-2a2d-4795-8127-5d0c13cd615e",
  //   technologies: ["React", "Node.js", "MongoDB", "Express", "QR Code"],
  //   githubUrl: "https://github.com/bearerOP/TheSlugProject",
  //   liveUrl: "https://theslug.netlify.app",
  //   featured: false,
  //   status: "completed",
  //   startDate: "2023-02",
  //   endDate: "2023-03",
  //   highlights: [
  //     "Custom short URL generation",
  //     "Click analytics and tracking",
  //     "QR code generation for links",
  //   ],
  // },
  {
    id: "project-9",
    title: "OTP Generation Package",
    category: "NPM Package",
    description: "NPM package for generating secure OTPs with customizable options.",
    longDescription: "A lightweight and secure OTP generation package published on NPM. Supports various configurations including length, expiry, and character sets.",
    image: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2FScreenshot%202024-08-29%20at%2009.10.23.png?alt=media&token=7b55cdc6-9df5-482f-9a2c-92da4949ae69",
    technologies: ["TypeScript", "Node.js", "NPM"],
    githubUrl: "https://github.com/BearerOP/otp-generation-package",
    liveUrl: "https://www.npmjs.com/package/otp-generation",
    featured: false,
    status: "completed",
    startDate: "2023-01",
    endDate: "2023-01",
    highlights: [
      "Published on NPM registry",
      "Fully typed with TypeScript",
      "Customizable OTP generation",
    ],
  },
] as const;

// Get featured projects only
export const featuredProjects = projects.filter(project => project.featured);

// Certifications
export const certifications = [
  {
    id: "cert-1",
    name: "Software Engineer Intern Certificate",
    issuer: "HackerRank",
    issueDate: "2024",
    expiryDate: null,
    credentialId: null,
    url: "https://www.hackerrank.com/certificates",
    description: "Certificate for completing Software Engineer Intern assessment",
  },
  {
    id: "cert-2",
    name: "REST API (Intermediate)",
    issuer: "HackerRank",
    issueDate: "2024",
    expiryDate: null,
    credentialId: null,
    url: "https://www.hackerrank.com/certificates",
    description: "Certificate for REST API intermediate level assessment",
  },
] as const;

// Hackathons & Achievements
export const achievements = [
  {
    id: "achievement-1",
    title: "Krieyeta 3.0 - Top 5 Finalist",
    description: "Top 5 finalist in project management and health tech innovation at Krieyeta 3.0 hackathon",
    date: "2024",
    icon: "trophy",
    category: "Hackathon",
    url: "https://krieyeta.com", // Update with actual URL
  },
  {
    id: "achievement-2",
    title: "Indo-Malaysian GDSC Hack",
    description: "Contributed innovative solutions for sustainable development goals at Indo-Malaysian GDSC Hackathon",
    date: "2024",
    icon: "code",
    category: "Hackathon",
    url: "https://gdsc.community.dev/", // Update with actual URL
  },
  {
    id: "achievement-3",
    title: "Published NPM Package",
    description: "Published 'otp-generation' package on NPM with 1000+ downloads",
    date: "2023",
    icon: "package",
    category: "Development",
  },
  {
    id: "achievement-4",
    title: "Built 15+ Full Stack Projects",
    description: "Developed and deployed multiple full-stack applications across various domains including LMS, Web3, API Monitoring, and more",
    date: "2021-2025",
    icon: "rocket",
    category: "Development",
  },
] as const;

// Languages
export const languages = [
  { name: "English", proficiency: "Professional Working Proficiency" },
  { name: "Hindi", proficiency: "Native or Bilingual Proficiency" },
] as const;

// Interests/Hobbies
export const interests = [
  "Web Development",
  "Open Source",
  "Blockchain Technology",
  "UI/UX Design",
  "Tech Blogging",
  "Problem Solving",
] as const;

// Testimonials (Optional - for future use)
export const testimonials = [
  {
    id: "testimonial-1",
    name: "Client Name",
    position: "CEO, Company Name",
    company: "Company Name",
    content: "Ankit delivered an exceptional product. His attention to detail and technical expertise made our project a success.",
    avatar: "/images/testimonials/client1.jpg",
    rating: 5,
  },
  // Add more testimonials as needed
] as const;

// Statistics (for homepage/about)
export const stats = {
  yearsOfExperience: 1,
  projectsCompleted: 15,
  happyClients: 10,
  technologiesMastered: 20,
  githubRepos: 50,
  npmDownloads: 1000,
} as const;

// SEO/Metadata
export const seoData = {
  title: "Ankit Yadav - Full Stack Developer Portfolio",
  description: "Discover the diverse skills and projects of Ankit Yadav, an experienced full stack developer proficient in web development, software engineering, and more.",
  keywords: allSkills,
  ogImage: "/images/og-twitter.png",
  twitterCard: "summary_large_image",
} as const;

// ============================================================================
// TYPE EXPORTS (for TypeScript type safety)
// ============================================================================

export type PersonalInfo = typeof personalInfo;
export type ContactInfo = typeof contactInfo;
export type SocialLink = typeof socialLinks[number];
export type Education = typeof education[number];
export type WorkExperience = typeof workExperience[number];
export type Skill = typeof skills.frontend[number];
export type Project = typeof projects[number];
export type Certification = typeof certifications[number];
export type Achievement = typeof achievements[number];
export type Language = typeof languages[number];
export type Testimonial = typeof testimonials[number];