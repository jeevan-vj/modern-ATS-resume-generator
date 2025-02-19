import React from 'react'
import { ResumeData } from '@/lib/types'
import { MinimalistTemplate } from './templates/MinimalistTemplate'
import { ProfessionalTemplate } from './templates/ProfessionalTemplate'
import { ModernTemplate } from './templates/ModernTemplate'
import { ExecutiveTemplate } from './templates/ExecutiveTemplate'
import { CompactTemplate } from './templates/CompactTemplate'

interface ResumeBuilderProps {
  data: ResumeData;
  template: string;
  onUpdate: (field: string, value: string) => void;
}

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ data, template, onUpdate }) => {
  const renderTemplate = () => {
    const props = { ...data, onUpdate };
    
    switch (template) {
      case 'minimalist':
        return <MinimalistTemplate {...props} />
      case 'professional':
        return <ProfessionalTemplate {...props} />
      case 'modern':
        return <ModernTemplate {...props} />
      case 'executive':
        return <ExecutiveTemplate {...props} />
      case 'compact':
        return <CompactTemplate {...props} />
      default:
        return <MinimalistTemplate {...props} />
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {renderTemplate()}
    </div>
  )
}
