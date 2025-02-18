"use client"

import type { ResumeData } from "@/lib/types"
import { PersonalInfoSection } from './sections/personal-info-section'
import { ColorThemeSection } from './sections/color-theme-section'
import { WorkExperienceSection } from './sections/work-experience-section'
import { EducationSection } from './sections/education-section'
import { SkillsSection } from './sections/skills-section'
import { CustomFieldsSection } from './sections/custom-fields-section'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { motion } from "framer-motion"

interface SectionWrapperProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function SectionWrapper({ title, children, defaultOpen = false }: SectionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Collapsible defaultOpen={defaultOpen} className="border rounded-lg">
        <CollapsibleTrigger className="px-4 py-3 text-lg font-semibold w-full text-left bg-gray-50 hover:bg-gray-100 rounded-t-lg">
          {title}
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
  return (
    <div className="space-y-4 p-4">
      <SectionWrapper title="Personal Information" defaultOpen={true}>
        <PersonalInfoSection data={data} onChange={onChange} />
      </SectionWrapper>

      <SectionWrapper title="Work Experience">
        <WorkExperienceSection data={data} onChange={onChange} />
      </SectionWrapper>

      <SectionWrapper title="Education">
        <EducationSection data={data} onChange={onChange} />
      </SectionWrapper>

      <SectionWrapper title="Skills">
        <SkillsSection data={data} onChange={onChange} />
      </SectionWrapper>

      <SectionWrapper title="Theme">
        <ColorThemeSection data={data} onChange={onChange} />
      </SectionWrapper>

      <SectionWrapper title="Custom Fields">
        <CustomFieldsSection data={data} onChange={onChange} />
      </SectionWrapper>
    </div>
  )
}

