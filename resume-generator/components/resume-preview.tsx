"use client"

import { useRef } from 'react'
import { Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import type { ResumeData } from "@/lib/types"
import { Template, templates } from "@/lib/templates"
import jsPDF from 'jspdf'
import set from 'lodash/set'

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
      <div className="flex-1 overflow-auto bg-white p-12 shadow-sm">
        <div ref={resumeRef} className="mx-auto max-w-3xl">
          {template.render(data, handleUpdate)}
        </div>
      </div>
      <div className="flex items-center justify-between border-t bg-white p-4">
        <div className="flex items-center gap-2">
          <Switch id="autoscale" />
          <label htmlFor="autoscale" className="text-sm">
            Autoscale
          </label>
        </div>
        <Button onClick={downloadResume}>
          <Download className="mr-2 h-4 w-4" />
          Download Resume
        </Button>
      </div>
    </div>
  )
}

