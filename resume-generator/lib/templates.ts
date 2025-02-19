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
  previewImage: string  // Add this new field
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
    description: "Clean and contemporary design perfect for creative roles and digital professionals",
    previewImage: '/images/templates/modern-preview.png'
  },
  {
    id: "minimalist",
    name: "Minimalist",
    render: createTemplateWrapper(MinimalistTemplate),
    description: "Simple and elegant layout focusing on essential information",
    previewImage: '/images/templates/minimalist-preview.png'
  },
  {
    id: "professional",
    name: "Professional",
    render: createTemplateWrapper(ProfessionalTemplate),
    description: "Traditional format ideal for corporate positions and conservative industries",
    previewImage: '/images/templates/professional-preview.png'
  },
  {
    id: "timeline",
    name: "Timeline",
    render: createTemplateWrapper(TimelineTemplate),
    description: "Visual career progression with an easy-to-follow timeline format",
    previewImage: '/images/templates/timeline-preview.png'
  },
  {
    id: "compact",
    name: "Compact",
    render: createTemplateWrapper(CompactTemplate),
    description: "Space-efficient design for extensive experience and dense information",
    previewImage: '/images/templates/compact-preview.png'
  },
  {
    id: "executive",
    name: "Executive",
    render: createTemplateWrapper(ExecutiveTemplate),
    description: "Sophisticated layout emphasizing leadership and achievements",
    previewImage: '/images/templates/executive-preview.png'
  },
  {
    id: "chronological",
    name: "Chronological",
    render: createTemplateWrapper(ChronologicalTemplate),
    description: "ATS-optimized format highlighting career progression and work history",
    previewImage: '/images/templates/chronological-preview.png'
  },
  {
    id: "skills-based",
    name: "Skills-Based",
    render: createTemplateWrapper(SkillsBasedTemplate),
    description: "Technical expertise-focused layout perfect for specialists and career transitions",
    previewImage: '/images/templates/skills-based-preview.png'
  },
]

