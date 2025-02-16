export interface ResumeData {
  personalInfo: {
    name: string
    objective: string
    email: string
    phone: string
    website: string
    location: string
    profileImage?: string
  }
  workExperience: WorkExperience[]
  education: Education[]
  skills: string[]
  colorTheme: ColorTheme
  customFields: CustomField[]
}

export interface WorkExperience {
  id: string
  company: string
  jobTitle: string
  date: string
  description: string // This will now contain HTML content
  projects: Project[]
  techStack: TechStack[]
  teamSize: string
  responsibilities: string[]
  companyDetails: CompanyDetails
  achievements: string[]
  reportingTo?: string  // e.g., "CTO", "Engineering Manager"
  keywords: string[]  // For ATS optimization
}

export interface Education {
  id: string
  school: string
  degree: string
  date: string
  gpa: string
}

export interface ColorTheme {
  primary: string
  secondary: string
  text: string
  background: string
}

export interface CustomField {
  id: string
  label: string
  value: string
}

interface Project {
  id: string
  name: string
  description: string
  techStack: string[]
  role: string
  achievements: string[]
  url?: string // GitHub/Live demo links
  duration: string
}

interface TechStack {
  category: string  // e.g., "Frontend", "Backend", "DevOps"
  technologies: {
    name: string
    proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert"
    yearsOfExperience: number
  }[]
}

interface CompanyDetails {
  industry: string
  size: string  // e.g., "Startup (1-50)", "Medium (51-500)", "Large (500+)"
  type: string  // e.g., "Product", "Service", "Consulting"
}

