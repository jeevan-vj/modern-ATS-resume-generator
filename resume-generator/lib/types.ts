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

