import React from 'react'
import { MinimalistTemplate } from './templates/MinimalistTemplate'
import { ProfessionalTemplate } from './templates/ProfessionalTemplate'
import { ModernTemplate } from './templates/ModernTemplate'
import { ExecutiveTemplate } from './templates/ExecutiveTemplate'
import { CompactTemplate } from './templates/CompactTemplate'

const templates = [
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean and simple design focusing on content',
    component: MinimalistTemplate,
    preview: '/templates/minimalist.png'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Traditional layout with modern touches',
    component: ProfessionalTemplate,
    preview: '/templates/professional.png'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with bold elements',
    component: ModernTemplate,
    preview: '/templates/modern.png'
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Sophisticated layout for senior professionals',
    component: ExecutiveTemplate,
    preview: '/templates/executive.png'
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Space-efficient design for detailed experience',
    component: CompactTemplate,
    preview: '/templates/compact.png'
  }
]

interface TemplateSelectionProps {
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
}

export const TemplateSelection: React.FC<TemplateSelectionProps> = ({
  selectedTemplate,
  onSelect
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-2 sm:p-4">
      {templates.map((template) => (
        <button
          key={template.id}
          className={`
            block w-full text-left border rounded-lg p-3 sm:p-4 transition-all
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            active:scale-[0.98] touch-manipulation
            ${selectedTemplate === template.id 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }
          `}
          onClick={() => onSelect(template.id)}
        >
          <div className="aspect-video bg-gray-100 rounded mb-2 sm:mb-3 overflow-hidden">
            {template.preview && (
              <img
                src={template.preview}
                alt={`${template.name} template preview`}
                className="w-full h-full object-cover rounded transform transition-transform hover:scale-105"
                loading="lazy"
              />
            )}
          </div>
          <h3 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">{template.name}</h3>
          <p className="text-xs sm:text-sm text-gray-500">{template.description}</p>
        </button>
      ))}
    </div>
  )
}
