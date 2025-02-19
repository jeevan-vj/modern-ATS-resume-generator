import type { ResumeData, WorkExperience, Project, Education } from "./types"

export function calculateSectionScore(data: any, requiredFields: string[]): number {
  if (!data) return 0
  const filledFields = requiredFields.filter(field => {
    const value = data[field]
    return value && (
      (typeof value === 'string' && value.trim() !== '') ||
      (Array.isArray(value) && value.length > 0) ||
      (typeof value === 'object' && Object.keys(value).length > 0)
    )
  })
  return (filledFields.length / requiredFields.length) * 100
}

export function calculateDescriptionQuality(text: string): number {
  if (!text) return 0
  
  const metrics = {
    length: 0,
    actionVerbs: 0,
    metrics: 0,
    technicalTerms: 0
  }

  // Basic length score (ideal length between 50-200 characters)
  const length = text.length
  metrics.length = Math.min(100, (length / 200) * 100)

  // Action verbs check
  const actionVerbsList = ['developed', 'implemented', 'led', 'managed', 'created', 'designed', 'improved', 'increased', 'reduced', 'achieved']
  metrics.actionVerbs = Math.min(100, (actionVerbsList.filter(verb => text.toLowerCase().includes(verb)).length / 3) * 100)

  // Metrics/numbers check
  const hasMetrics = /\d+%|\d+ percent|\$\d+|\d+ times/i.test(text)
  metrics.metrics = hasMetrics ? 100 : 0

  // Technical terms check
  const technicalTerms = ['api', 'database', 'framework', 'algorithm', 'architecture', 'cloud', 'deployment', 'infrastructure']
  metrics.technicalTerms = Math.min(100, (technicalTerms.filter(term => text.toLowerCase().includes(term)).length / 2) * 100)

  // Calculate average score
  return Object.values(metrics).reduce((a, b) => a + b, 0) / Object.keys(metrics).length
}

export function calculateResumeCompleteness(data: ResumeData): {
  overall: number,
  sections: {
    personalInfo: number,
    workExperience: number,
    education: number,
    skills: number,
    projects: number
  },
  descriptions: {
    objective: number,
    workExperience: { id: string, score: number }[]
  }
} {
  // Personal Info completeness
  const personalInfoScore = calculateSectionScore(data.personalInfo, [
    'name', 'email', 'phone', 'location', 'objective'
  ])

  // Work Experience completeness
  const workExperienceScores = data.workExperience.map(exp => ({
    base: calculateSectionScore(exp, ['company', 'jobTitle', 'date', 'description']),
    description: calculateDescriptionQuality(exp.description)
  }))
  const workExperienceScore = workExperienceScores.length 
    ? workExperienceScores.reduce((acc, curr) => acc + (curr.base + curr.description) / 2, 0) / workExperienceScores.length
    : 0

  // Education completeness
  const educationScores = data.education.map(edu => 
    calculateSectionScore(edu, ['school', 'degree', 'date'])
  )
  const educationScore = educationScores.length 
    ? educationScores.reduce((acc, curr) => acc + curr, 0) / educationScores.length
    : 0

  // Skills completeness
  const skillsScore = data.skills.length > 0 ? 100 : 0

  // Projects completeness
  const projectScores = data.workExperience.flatMap(exp => 
    exp.projects.map(proj => calculateSectionScore(proj, ['name', 'description', 'techStack']))
  )
  const projectsScore = projectScores.length 
    ? projectScores.reduce((acc, curr) => acc + curr, 0) / projectScores.length
    : 0

  // Description quality scores
  const descriptionScores = {
    objective: calculateDescriptionQuality(data.personalInfo.objective),
    workExperience: data.workExperience.map(exp => ({
      id: exp.id,
      score: calculateDescriptionQuality(exp.description)
    }))
  }

  // Calculate overall score
  const overall = [
    personalInfoScore * 0.25,
    workExperienceScore * 0.35,
    educationScore * 0.20,
    skillsScore * 0.15,
    projectsScore * 0.05
  ].reduce((a, b) => a + b, 0)

  return {
    overall,
    sections: {
      personalInfo: personalInfoScore,
      workExperience: workExperienceScore,
      education: educationScore,
      skills: skillsScore,
      projects: projectsScore
    },
    descriptions: descriptionScores
  }
}