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
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full perspective-1000"
    >
      <Collapsible defaultOpen={defaultOpen} className="border border-gray-200 rounded-lg w-full shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
        <CollapsibleTrigger className="group px-4 py-3 w-full text-left bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 rounded-t-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-opacity-50">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 group-hover:to-gray-800 transition-colors duration-200">{title}</span>
              <motion.svg 
                className="w-4 h-4 text-gray-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ rotate: defaultOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </div>
            {showScore && (
              <motion.span 
                className={`text-sm font-medium ${
                  completionScore >= 80 ? 'text-green-600' : 
                  completionScore >= 50 ? 'text-yellow-600' : 
                  'text-red-600'
                }`}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {Math.round(completionScore)}%
              </motion.span>
            )}
          </div>
          {showScore && (
            <div className="mt-2 relative">
              <ProgressIndicator 
                value={completionScore} 
                size="sm" 
                color={getScoreColor(completionScore)}
                showValue={false}
                className="bg-gray-100 overflow-hidden"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                style={{
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s infinite'
                }}
              />
            </div>
          )}
          <div className="absolute inset-0 transition-opacity duration-300 pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-50/5 via-purple-50/5 to-pink-50/5" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="p-2 sm:p-4 bg-white relative overflow-hidden"
          >
            <div className="relative z-10">
              {children}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/5" />
          </motion.div>
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
    <div className="space-y-4 p-2 sm:p-4">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold mb-2">Overall Resume Completeness</h2>
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

