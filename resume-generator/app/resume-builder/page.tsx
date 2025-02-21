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
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [showSampleHint, setShowSampleHint] = useState(true)
  const [isSampleSectionFocused, setIsSampleSectionFocused] = useState(false)
  const parsedResume = useResumeStore(state => state.parsedResume)
  const clearParsedResume = useResumeStore(state => state.clearParsedResume)

  useEffect(() => {
    // Set initial template after component mounts
    if (!selectedTemplate) {
      setSelectedTemplate(templates[0])
    }
  }, [selectedTemplate])

  useEffect(() => {
    if (parsedResume) {
      setResumeData(parsedResume)
      clearParsedResume()
    }
  }, [parsedResume, clearParsedResume])

  const handleSampleSelect = (index: string) => {
    setShowSampleHint(false)
    setIsSampleSectionFocused(true)
    setResumeData({
      ...sampleResumes[parseInt(index)],
      colorTheme: initialData.colorTheme
    })
  }

  const handleResumeChange = (newData: ResumeData) => {
    setResumeData(newData)
  }

  if (!selectedTemplate) {
    return <div className="min-h-screen grid place-items-center">
      <div className="animate-pulse bg-gray-100 h-20 w-96 rounded-lg" />
    </div>
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
            <div 
              className={`${showSampleHint && !isSampleSectionFocused ? 'animate-single-bounce' : ''} transition-all duration-300`}
              onFocus={() => {
                setIsSampleSectionFocused(true)
                setShowSampleHint(false)
              }}
              onMouseEnter={() => {
                setIsSampleSectionFocused(true)
                setShowSampleHint(false)
              }}
            >
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <div className="w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-xl font-semibold text-blue-700">🚀 Quick Start with Sample Resumes</h2>
                      {showSampleHint && !isSampleSectionFocused && <span className="animate-pulse text-blue-500">✨ New</span>}
                    </div>
                    <p className="text-sm text-blue-600 mb-4">Get a head start with our professionally crafted sample resumes - just select and customize!</p>
                    <Select onValueChange={handleSampleSelect}>
                      <SelectTrigger className={`w-full ${showSampleHint && !isSampleSectionFocused ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}>
                        <SelectValue placeholder="📄 Choose a sample resume to get started" />
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
                  <Button 
                    onClick={() => setResumeData(initialData)} 
                    variant="outline" 
                    className="whitespace-nowrap h-10 mt-auto"
                  >
                    Clear Resume
                  </Button>
                </div>
              </div>
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

