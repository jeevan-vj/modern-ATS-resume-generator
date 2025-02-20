"use client"

import { useState, useEffect } from "react"
import { useResumeStore } from '@/store/resumeStore'
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
  const [showPreview, setShowPreview] = useState(false)
  const parsedResume = useResumeStore(state => state.parsedResume)
  const clearParsedResume = useResumeStore(state => state.clearParsedResume)

  useEffect(() => {
    if (parsedResume) {
      setResumeData(parsedResume)
      clearParsedResume()
    }
  }, [parsedResume, clearParsedResume])

  const handleSampleSelect = (index: string) => {
    setResumeData({
      ...sampleResumes[parseInt(index)],
      colorTheme: initialData.colorTheme
    })
  }

  const handleResumeChange = (newData: ResumeData) => {
    setResumeData(newData)
  }

  return (
    <div className="min-h-screen max-w-[100vw] overflow-x-hidden">
      <div className="sticky top-0 z-10 bg-background border-b md:hidden px-4 py-2">
        <Button 
          onClick={() => setShowPreview(!showPreview)} 
          className="w-full"
          variant="outline"
        >
          {showPreview ? "Show Editor" : "Show Preview"}
        </Button>
      </div>

      <div className="grid h-[calc(100vh-3rem)] md:h-screen grid-cols-1 md:grid-cols-2">
        <div className={`overflow-y-auto overflow-x-hidden border-r ${showPreview ? 'hidden md:block' : 'block'}`}>
          <div className="p-4 space-y-4 max-w-full">
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelectTemplate={setSelectedTemplate}
            />
            <div className="flex flex-col sm:flex-row gap-2 justify-between">
              <div className="w-full sm:w-auto min-w-[200px]">
                <h2 className="text-lg font-semibold mb-2">Sample Resumes</h2>
                <Select onValueChange={handleSampleSelect}>
                  <SelectTrigger className="w-full sm:w-[250px]">
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
              <Button onClick={() => setResumeData(initialData)} variant="outline" className="whitespace-nowrap">
                Clear Resume
              </Button>
            </div>
            <ResumeForm data={resumeData} onChange={handleResumeChange} />
          </div>
        </div>
        <div className={`${showPreview ? 'block' : 'hidden md:block'} overflow-auto`}>
          <ResumePreview data={resumeData} template={selectedTemplate} onChange={handleResumeChange} />
        </div>
      </div>
    </div>
  )
}

