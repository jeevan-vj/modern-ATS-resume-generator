'use client';

import { ResumeData } from "@/lib/types"
import { generateStandaloneHTML } from "./exportTemplate"
import { MinimalistTemplate } from "@/components/templates/MinimalistTemplate"
import { createElement } from 'react'

const createStaticTemplate = async (data: ResumeData): Promise<string> => {
  return new Promise((resolve) => {
    const template = document.createElement('div')
    
    const element = createElement(MinimalistTemplate, { ...data })
    const root = document.createElement('div')
    template.appendChild(root)
    
    const { createRoot } = require('react-dom/client')
    const clientRoot = createRoot(root)
    clientRoot.render(element)
    
    setTimeout(() => {
      template.querySelectorAll('[contenteditable="true"]').forEach(el => {
        el.removeAttribute('contenteditable')
      })
      
      const content = template.innerHTML
      if (!content) {
        console.error('Template content is empty')
      }
      resolve(content || '')
    }, 500)
  })
}

export const exportResumeAsHTML = async (data: ResumeData) => {
  try {
    const staticContent = await createStaticTemplate(data)
    
    const fullHTML = generateStandaloneHTML(staticContent, data.personalInfo.name)
    
    const blob = new Blob([fullHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${data.personalInfo.name.toLowerCase().replace(/\s+/g, '-')}-resume.html`
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error exporting resume:', error)
    alert('Failed to export resume. Please try again.')
  }
}
