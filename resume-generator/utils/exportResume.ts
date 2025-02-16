import { ResumeData } from "@/lib/types"
import { generateStandaloneHTML } from "./exportTemplate"
import ReactDOMServer from 'react-dom/server'
import { MinimalistTemplate } from "@/components/templates/MinimalistTemplate"

// Create a static version of the template by removing editable fields
const createStaticTemplate = (data: ResumeData) => {
  const template = document.createElement('div')
  template.innerHTML = ReactDOMServer.renderToString(MinimalistTemplate(data, () => {}))
  
  // Remove all contenteditable attributes
  template.querySelectorAll('[contenteditable="true"]').forEach(el => {
    el.removeAttribute('contenteditable')
  })

  return template.innerHTML
}

export const exportResumeAsHTML = (data: ResumeData) => {
  try {
    // Get static version of the template
    const staticContent = createStaticTemplate(data)
    
    // Generate full HTML document
    const fullHTML = generateStandaloneHTML(staticContent, data.personalInfo.name)
    
    // Create and download the file
    const blob = new Blob([fullHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${data.personalInfo.name.toLowerCase().replace(/\s+/g, '-')}-resume.html`
    
    // Trigger download
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Cleanup
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error exporting resume:', error)
    alert('Failed to export resume. Please try again.')
  }
}
