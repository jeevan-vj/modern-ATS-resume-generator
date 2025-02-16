import { ResumeData } from "./types"

export const sampleResumes: ResumeData[] = [
  {
    personalInfo: {
      name: "Alex Johnson",
      objective: "Senior Software Engineer with 8+ years of experience specializing in cloud architecture, distributed systems, and full-stack development. Proven track record of leading high-performance engineering teams and delivering scalable solutions using modern technologies.",
      email: "alex.johnson@email.com",
      phone: "(555) 123-4567",
      website: "github.com/alexjohnson",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/alexjohnson"
    },
    workExperience: [
      {
        id: "1",
        company: "Tech Innovations Inc.",
        jobTitle: "Senior Software Engineer",
        date: "2018 - Present",
        description: "• Architected and implemented microservices-based architecture reducing system latency by 40%\n• Led a team of 6 engineers in developing cloud-native applications using AWS, Kubernetes, and Docker\n• Implemented automated CI/CD pipelines reducing deployment time by 60%\n• Mentored 8 junior developers in best practices and modern development methodologies"
      },
      {
        id: "2",
        company: "StartUp Solutions",
        jobTitle: "Full Stack Developer",
        date: "2015 - 2018",
        description: "• Developed RESTful APIs serving 1M+ daily requests using Node.js and Express\n• Built responsive web applications using React, Redux, and TypeScript\n• Optimized PostgreSQL database queries improving application performance by 35%\n• Implemented automated testing achieving 90% code coverage"
      }
    ],
    education: [
      {
        id: "1",
        school: "University of California, Berkeley",
        degree: "B.S. in Computer Science",
        date: "2011 - 2015",
        gpa: "3.8",
        achievements: "Data Structures Teaching Assistant, ACM Programming Team"
      }
    ],
    skills: [
      "Languages: JavaScript, TypeScript, Python, Java, SQL",
      "Frontend: React, Redux, Vue.js, HTML5, CSS3, Webpack",
      "Backend: Node.js, Express, Django, Spring Boot",
      "Cloud: AWS (EC2, S3, Lambda), Docker, Kubernetes",
      "Databases: PostgreSQL, MongoDB, Redis",
      "Tools: Git, Jenkins, Jest, CircleCI"
    ],
    certifications: [
      "AWS Certified Solutions Architect",
      "Google Cloud Professional Developer"
    ],
    customFields: [
      {
        id: "1",
        title: "Projects",
        content: "• Open-source Kubernetes operator for automated database scaling (2.5k+ GitHub stars)\n• Real-time data visualization dashboard using D3.js and WebSocket"
      }
    ],
    colorTheme: {
      primary: "#2563EB",
      secondary: "#0EA5E9",
      text: "#1F2937",
      background: "#FFFFFF"
    }
  },
  {
    personalInfo: {
      name: "Emily Chen",
      objective: "Dedicated marketing professional with a passion for digital strategy and brand development.",
      email: "emily.chen@email.com",
      phone: "(555) 987-6543",
      website: "www.emilychen.com",
      location: "New York, NY"
    },
    workExperience: [
      {
        id: "1",
        company: "Global Brands Co.",
        jobTitle: "Digital Marketing Manager",
        date: "2019 - Present",
        description: "Develop and execute digital marketing strategies, resulting in 30% increase in online engagement and 25% growth in sales."
      },
      {
        id: "2",
        company: "Creative Agency XYZ",
        jobTitle: "Marketing Specialist",
        date: "2016 - 2019",
        description: "Managed social media accounts for multiple clients, created content calendars, and analyzed campaign performance."
      }
    ],
    education: [
      {
        id: "1",
        school: "New York University",
        degree: "M.S. in Marketing",
        date: "2014 - 2016",
        gpa: "3.9"
      },
      {
        id: "2",
        school: "University of Pennsylvania",
        degree: "B.A. in Communications",
        date: "2010 - 2014",
        gpa: "3.7"
      }
    ],
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Data Analysis", "Adobe Creative Suite"],
    customFields: [],
    colorTheme: {
      primary: "#2563EB",
      secondary: "#FF00B8",
      text: "#333333",
      background: "#FFFFFF"
    }
  },
  {
    personalInfo: {
      name: "Sarah Martinez",
      objective: "Full Stack Software Engineer with 5+ years of experience in building scalable web applications and mobile-first solutions. Passionate about clean code, performance optimization, and creating exceptional user experiences.",
      email: "sarah.martinez@email.com",
      phone: "(555) 234-5678",
      website: "github.com/smartinez",
      location: "Austin, TX",
      linkedin: "linkedin.com/in/sarahmartinez"
    },
    workExperience: [
      {
        id: "1",
        company: "Digital Solutions Corp",
        jobTitle: "Full Stack Engineer",
        date: "2020 - Present",
        description: "• Developed and maintained microservices handling 500k+ daily users using Node.js and Go\n• Implemented responsive UI components with React and Material-UI reducing load time by 45%\n• Created mobile-first design system used across 12 different projects\n• Led migration from monolith to microservices architecture"
      },
      {
        id: "2",
        company: "TechStart Inc",
        jobTitle: "Software Developer",
        date: "2018 - 2020",
        description: "• Built RESTful APIs using Express.js and MongoDB serving 200k+ daily requests\n• Implemented real-time features using WebSocket and Redux-Saga\n• Reduced application bundle size by 60% through code splitting and lazy loading\n• Collaborated with UX team to implement accessible components following WCAG guidelines"
      }
    ],
    education: [
      {
        id: "1",
        school: "Georgia Institute of Technology",
        degree: "M.S. in Computer Science",
        date: "2016 - 2018",
        gpa: "3.9",
        achievements: "Machine Learning Research Assistant"
      }
    ],
    skills: [
      "Languages: JavaScript, TypeScript, Go, Python",
      "Frontend: React, Next.js, Redux, Tailwind CSS",
      "Backend: Node.js, Express, GraphQL, REST",
      "Cloud: GCP, AWS, Docker, Kubernetes",
      "Databases: MongoDB, PostgreSQL, ElasticSearch",
      "Testing: Jest, Cypress, React Testing Library"
    ],
    certifications: [
      "MongoDB Certified Developer",
      "GCP Professional Cloud Developer"
    ],
    customFields: [
      {
        id: "1",
        title: "Open Source",
        content: "• Created React component library with 1.5k+ npm downloads\n• Contributor to Next.js and Material-UI"
      }
    ],
    colorTheme: {
      primary: "#0891B2",
      secondary: "#6366F1",
      text: "#1F2937",
      background: "#FFFFFF"
    }
  }
]

