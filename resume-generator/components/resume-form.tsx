"use client"

import type { ResumeData } from "@/lib/types"
import { PersonalInfoSection } from './sections/personal-info-section'
import { ColorThemeSection } from './sections/color-theme-section'
import { WorkExperienceSection } from './sections/work-experience-section'
import { EducationSection } from './sections/education-section'
import { SkillsSection } from './sections/skills-section'
import { CustomFieldsSection } from './sections/custom-fields-section'

export function ResumeForm({ data, onChange }: { 
  data: ResumeData
  onChange: (data: ResumeData) => void 
}) {
  return (
    <div className="space-y-8 p-4">
      <PersonalInfoSection data={data} onChange={onChange} />
      <ColorThemeSection data={data} onChange={onChange} />
      <WorkExperienceSection data={data} onChange={onChange} />
      <EducationSection data={data} onChange={onChange} />
      <SkillsSection data={data} onChange={onChange} />
      <CustomFieldsSection data={data} onChange={onChange} />
    </div>
  )
}

