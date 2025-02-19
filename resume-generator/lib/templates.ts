import React from 'react'
import { ResumeData } from "./types"
import { ModernTemplate } from "@/components/templates/ModernTemplate"
import { MinimalistTemplate } from "@/components/templates/MinimalistTemplate"
import { ProfessionalTemplate } from "@/components/templates/ProfessionalTemplate"
import { TimelineTemplate } from "@/components/templates/TimelineTemplate"

export interface Template {
  id: string
  name: string
  render: (data: ResumeData, onUpdate: (field: string, value: string) => void) => React.JSX.Element
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
  },
  {
    id: "minimalist",
    name: "Minimalist",
    render: createTemplateWrapper(MinimalistTemplate),
  },
  {
    id: "professional",
    name: "Professional",
    render: createTemplateWrapper(ProfessionalTemplate),
  },
  {
    id: "timeline",
    name: "Timeline",
    render: createTemplateWrapper(TimelineTemplate),
  },
]

