"use client"

import { useRef, useState, useEffect } from 'react'
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
  const [scale, setScale] = useState(1)
  const [autoScale, setAutoScale] = useState(true)

  // Add auto-scaling effect
  useEffect(() => {
    if (!autoScale || !resumeRef.current) return
    
    const updateScale = () => {
      const containerWidth = resumeRef.current?.parentElement?.clientWidth || 0
      const contentWidth = 794 // A4 width in pixels
      if (containerWidth < contentWidth) {
        setScale(containerWidth / contentWidth)
      } else {
        setScale(1)
      }
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [autoScale])

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
      <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between border-b bg-white p-2 sm:p-4 gap-2">
        <div className="flex items-center gap-2 order-2 sm:order-1">
          <div className="flex items-center gap-2">
            <Switch 
              id="autoscale" 
              checked={autoScale}
              onCheckedChange={setAutoScale}
            />
            <label htmlFor="autoscale" className="text-sm whitespace-nowrap">
              Auto-fit
            </label>
          </div>
          {!autoScale && (
            <select 
              value={scale} 
              onChange={(e) => setScale(Number(e.target.value))}
              className="text-sm border rounded p-1"
            >
              {[0.5, 0.75, 1, 1.25, 1.5].map((value) => (
                <option key={value} value={value}>
                  {Math.round(value * 100)}%
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2">
          <Button 
            variant="outline" 
            onClick={() => exportResumeAsHTML(data)}
            className="flex-1 sm:flex-none"
          >
            <FileCode className="mr-2 h-4 w-4" />
            <span className="sm:inline">Download HTML</span>
          </Button>
          <Button 
            onClick={downloadResume}
            className="flex-1 sm:flex-none"
          >
            <FileText className="mr-2 h-4 w-4" />
            <span className="sm:inline">Download PDF</span>
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto bg-gray-100 p-4 sm:p-8">
        <div 
          className="mx-auto bg-white shadow-lg transition-transform duration-200"
          style={{
            width: '210mm',
            maxWidth: '100%',
            transform: `scale(${scale})`,
            transformOrigin: 'top center'
          }}
        >
          <div ref={resumeRef} className="p-8 sm:p-12">
            {template.render(data, handleUpdate)}
          </div>
        </div>
      </div>
    </div>
  )
}

