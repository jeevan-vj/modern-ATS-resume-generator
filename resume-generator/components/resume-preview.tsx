"use client"

import { useRef } from 'react'
import { Download, FileText, FileCode } from 'lucide-react' // Add FileCode import
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import type { ResumeData } from "@/lib/types"
import { Template, templates } from "@/lib/templates"
import jsPDF from 'jspdf'
import set from 'lodash/set'
import { exportResumeAsHTML } from "@/utils/exportResume"

export function ResumePreview({ data, template, onChange }: { data: ResumeData; template: Template; onChange: (data: ResumeData) => void }) {
  const resumeRef = useRef<HTMLDivElement>(null)

  const downloadResume = () => {
    if (!resumeRef.current || !data) return

    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfElement = resumeRef.current
    
    pdf.html(pdfElement, {
      callback: function (pdf) {
        pdf.save(`${data.personalInfo.name.replace(/\s+/g, '_')}_resume.pdf`)
      },
      x: 10,
      y: 10,
      width: 190,
      windowWidth: 650
    })
  }

  const handleUpdate = (field: string, value: string) => {
    const newData = { ...data }
    set(newData, field, value)
    onChange(newData)
  }

  if (!data) {
    return <div className="flex h-full items-center justify-center">No resume data available</div>
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-end border-b bg-white p-4 gap-2">
        <Button 
          variant="outline" 
          onClick={() => exportResumeAsHTML(data)}
        >
          <FileCode className="mr-2 h-4 w-4" />
          Download HTML
        </Button>
        <Button onClick={downloadResume}>
          <FileText className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
      <div className="flex-1 overflow-auto bg-white p-12 shadow-sm">
        <div ref={resumeRef} className="mx-auto max-w-3xl">
          {template.render(data, handleUpdate)}
          {/* {data.workExperience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <h3 className="text-lg font-semibold">{exp.company}</h3>
              <p>{exp.jobTitle} ({exp.date})</p>
              <div dangerouslySetInnerHTML={{ __html: exp.description }} />
              <div dangerouslySetInnerHTML={{ __html: exp.achievements }} />
              {exp.projects && exp.projects.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-md font-semibold">Projects</h4>
                  {exp.projects.map((project) => (
                    <div key={project.id} className="ml-4">
                      <h5 className="text-sm font-semibold">{project.name}</h5>
                      <div dangerouslySetInnerHTML={{ __html: project.description }} />
                      <p><strong>Tech Stack:</strong> {project.techStack.join(", ")}</p>
                      <p><strong>Role:</strong> {project.role}</p>
                      <p><strong>Achievements:</strong></p>
                      <div dangerouslySetInnerHTML={{ __html: project.achievements }} />
                      <p><strong>Duration:</strong> {project.duration}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))} */}
        </div>
      </div>
      <div className="flex items-center border-t bg-white p-4">
        <div className="flex items-center gap-2">
          <Switch id="autoscale" />
          <label htmlFor="autoscale" className="text-sm">
            Autoscale
          </label>
        </div>
      </div>
    </div>
  )
}

