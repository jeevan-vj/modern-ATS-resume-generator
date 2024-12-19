"use client"

import { useState } from "react"
import { ResumeForm } from "@/components/resume-form"
import { ResumePreview } from "@/components/resume-preview"
import { TemplateSelector } from "@/components/template-selector"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ResumeData } from "@/lib/types"
import { templates, Template } from "@/lib/templates"
import { sampleResumes } from "@/lib/sample-resumes"

const initialData: ResumeData = {
  personalInfo: {
    name: "",
    objective: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    profileImage: "",
  },
  workExperience: [],
  education: [],
  skills: [],
  colorTheme: {
    primary: "#3b82f6",
    secondary: "#10b981",
    text: "#1f2937",
    background: "#ffffff",
  },
  customFields: [],
}

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData)
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(templates[0])

  const handleSampleSelect = (index: string) => {
    setResumeData({
      ...sampleResumes[parseInt(index)],
      colorTheme: initialData.colorTheme,
      customFields: [],
    })
  }

  const handleResumeChange = (newData: ResumeData) => {
    setResumeData(newData)
  }

  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-2">
      <div className="overflow-auto border-r">
        <div className="p-4 space-y-4">
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />
          <div>
            <h2 className="text-lg font-semibold mb-2">Sample Resumes</h2>
            <Select onValueChange={handleSampleSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select a sample resume" />
              </SelectTrigger>
              <SelectContent>
                {sampleResumes.map((resume, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {resume.personalInfo.name} - {resume.workExperience[0].jobTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => setResumeData(initialData)} variant="outline">
            Clear Resume
          </Button>
        </div>
        <ResumeForm data={resumeData} onChange={handleResumeChange} />
      </div>
      <div className="hidden md:block">
        <ResumePreview data={resumeData} template={selectedTemplate} onChange={handleResumeChange} />
      </div>
    </div>
  )
}

