"use client"

import type { ResumeData } from "@/lib/types"
import { PersonalInfoSection } from './sections/personal-info-section'
import { ColorThemeSection } from './sections/color-theme-section'
import { WorkExperienceSection } from './sections/work-experience-section'
import { EducationSection } from './sections/education-section'
import { SkillsSection } from './sections/skills-section'
import { CustomFieldsSection } from './sections/custom-fields-section'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { ProgressIndicator } from "./ui/progress-indicator"
import { motion } from "framer-motion"
import { calculateResumeCompleteness } from "@/lib/resume-scoring"

interface SectionWrapperProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  completionScore: number
  showScore?: boolean
}

function SectionWrapper({ 
  title, 
  children, 
  defaultOpen = false,
  completionScore,
  showScore = true
}: SectionWrapperProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "success"
    if (score >= 50) return "warning"
    return "error"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Collapsible defaultOpen={defaultOpen} className="border rounded-lg">
        <CollapsibleTrigger className="px-4 py-3 w-full text-left bg-gray-50 hover:bg-gray-100 rounded-t-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold">{title}</span>
            {showScore && (
              <span className="text-sm font-medium text-gray-500 ml-5">
                {Math.round(completionScore)}%
              </span>
            )}
          </div>
          {showScore && (
            <ProgressIndicator 
              value={completionScore} 
              size="sm" 
              color={getScoreColor(completionScore)}
              showValue={false}
            />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 pt-2">
          {children}
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  )
}

export function ResumeForm({ data, onChange }: { 
  data: ResumeData
  onChange: (data: ResumeData) => void 
}) {
  const scores = calculateResumeCompleteness(data)

  return (
    <div className="space-y-4 p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Overall Resume Completeness</h2>
        <ProgressIndicator 
          value={scores.overall} 
          color={scores.overall >= 80 ? "success" : scores.overall >= 50 ? "warning" : "error"}
          size="lg"
          label="Total Progress"
        />
      </div>

      <SectionWrapper 
        title="Personal Information" 
        defaultOpen={true}
        completionScore={scores.sections.personalInfo}
      >
        <PersonalInfoSection 
          data={data} 
          onChange={onChange} 
          objectiveScore={scores.descriptions.objective}
        />
      </SectionWrapper>

      <SectionWrapper 
        title="Work Experience" 
        completionScore={scores.sections.workExperience}
      >
        <WorkExperienceSection 
          data={data} 
          onChange={onChange} 
          descriptionScores={scores.descriptions.workExperience}
        />
      </SectionWrapper>

      <SectionWrapper 
        title="Education" 
        completionScore={scores.sections.education}
      >
        <EducationSection data={data} onChange={onChange} />
      </SectionWrapper>

      <SectionWrapper 
        title="Skills" 
        completionScore={scores.sections.skills}
      >
        <SkillsSection data={data} onChange={onChange} />
      </SectionWrapper>

      <SectionWrapper 
        title="Theme" 
        completionScore={100}
        showScore={false}
      >
        <ColorThemeSection data={data} onChange={onChange} />
      </SectionWrapper>

      <SectionWrapper 
        title="Custom Fields" 
        completionScore={100}
        showScore={false}
      >
        <CustomFieldsSection data={data} onChange={onChange} />
      </SectionWrapper>
    </div>
  )
}

