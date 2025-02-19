import React from 'react'
import { ResumeData } from "./types"
import { ModernTemplate } from "@/components/templates/ModernTemplate"
import { MinimalistTemplate } from "@/components/templates/MinimalistTemplate"
import { ProfessionalTemplate } from "@/components/templates/ProfessionalTemplate"
import { TimelineTemplate } from "@/components/templates/TimelineTemplate"
import { CompactTemplate } from "@/components/templates/CompactTemplate"
import { ExecutiveTemplate } from "@/components/templates/ExecutiveTemplate"
import { ChronologicalTemplate } from "@/components/templates/ChronologicalTemplate"
import { SkillsBasedTemplate } from "@/components/templates/SkillsBasedTemplate"

export interface Template {
  id: string
  name: string
  render: (data: ResumeData, onUpdate: (field: string, value: string) => void) => React.JSX.Element
  description: string
}

const createTemplateWrapper = (
  TemplateComponent: React.ComponentType<any>
) => {
  return (data: ResumeData, onUpdate: (field: string, value: string) => void) => {
    return React.createElement(TemplateComponent, { ...data, onUpdate })
  }
}

export const templates: Template[] = [
  {
    id: "modern",
    name: "Modern",
    render: createTemplateWrapper(ModernTemplate),
    description: "Clean and contemporary design perfect for creative roles and digital professionals"
  },
  {
    id: "minimalist",
    name: "Minimalist",
    render: createTemplateWrapper(MinimalistTemplate),
    description: "Simple and elegant layout focusing on essential information"
  },
  {
    id: "professional",
    name: "Professional",
    render: createTemplateWrapper(ProfessionalTemplate),
    description: "Traditional format ideal for corporate positions and conservative industries"
  },
  {
    id: "timeline",
    name: "Timeline",
    render: createTemplateWrapper(TimelineTemplate),
    description: "Visual career progression with an easy-to-follow timeline format"
  },
  {
    id: "compact",
    name: "Compact",
    render: createTemplateWrapper(CompactTemplate),
    description: "Space-efficient design for extensive experience and dense information"
  },
  {
    id: "executive",
    name: "Executive",
    render: createTemplateWrapper(ExecutiveTemplate),
    description: "Sophisticated layout emphasizing leadership and achievements"
  },
  {
    id: "chronological",
    name: "Chronological",
    render: createTemplateWrapper(ChronologicalTemplate),
    description: "ATS-optimized format highlighting career progression and work history"
  },
  {
    id: "skills-based",
    name: "Skills-Based",
    render: createTemplateWrapper(SkillsBasedTemplate),
    description: "Technical expertise-focused layout perfect for specialists and career transitions"
  },
]

