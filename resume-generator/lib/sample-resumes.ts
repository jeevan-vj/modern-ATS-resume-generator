import { ResumeData } from "./types"

export const sampleResumes: ResumeData[] = [
  {
    personalInfo: {
      name: "Alex Johnson",
      objective: "Experienced software engineer seeking to leverage my skills in full-stack development to contribute to innovative projects.",
      email: "alex.johnson@email.com",
      phone: "(555) 123-4567",
      website: "www.alexjohnson.dev",
      location: "San Francisco, CA"
    },
    workExperience: [
      {
        id: "1",
        company: "Tech Innovations Inc.",
        jobTitle: "Senior Software Engineer",
        date: "2018 - Present",
        description: "Lead development of cloud-based applications, mentored junior developers, and implemented CI/CD pipelines."
      },
      {
        id: "2",
        company: "StartUp Solutions",
        jobTitle: "Full Stack Developer",
        date: "2015 - 2018",
        description: "Developed and maintained multiple web applications using React, Node.js, and PostgreSQL."
      }
    ],
    education: [
      {
        id: "1",
        school: "University of California, Berkeley",
        degree: "B.S. in Computer Science",
        date: "2011 - 2015",
        gpa: "3.8"
      }
    ],
    skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"]
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
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Data Analysis", "Adobe Creative Suite"]
  }
]

