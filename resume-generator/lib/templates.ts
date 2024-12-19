import React from 'react'
import { ResumeData } from "./types"
import { ModernTemplate } from "@/components/templates/ModernTemplate"
import { MinimalistTemplate } from "@/components/templates/MinimalistTemplate"
import { ProfessionalTemplate } from "@/components/templates/ProfessionalTemplate"
import { TimelineTemplate } from "@/components/templates/TimelineTemplate"

export interface Template {
  id: string
  name: string
  render: (data: ResumeData, onUpdate: (field: string, value: string) => void) => JSX.Element
}

export const templates: Template[] = [
  {
    id: "modern",
    name: "Modern",
    render: ModernTemplate,
  },
  {
    id: "minimalist",
    name: "Minimalist",
    render: MinimalistTemplate,
  },
  {
    id: "professional",
    name: "Professional",
    render: ProfessionalTemplate,
  },
  {
    id: "timeline",
    name: "Timeline",
    render: TimelineTemplate,
  },
]

