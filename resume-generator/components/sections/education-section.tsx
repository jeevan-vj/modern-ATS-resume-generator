"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, Eye, GripVertical, Plus } from 'lucide-react'
import type { ResumeData, Education } from "@/lib/types"

interface EducationSectionProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export function EducationSection({ data, onChange }: EducationSectionProps) {
  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        { id: crypto.randomUUID(), school: "", degree: "", date: "", gpa: "" }
      ]
    })
  }

  const updateEducation = (index: number, edu: Partial<Education>) => {
    const newEducation = [...data.education]
    newEducation[index] = { ...newEducation[index], ...edu }
    onChange({ ...data, education: newEducation })
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Education</h2>
        <div className="flex items-center gap-2">
          <ArrowUp className="h-4 w-4" />
          <ArrowDown className="h-4 w-4" />
          <Eye className="h-4 w-4" />
        </div>
      </div>
      {data.education.map((edu, index) => (
        <div key={edu.id} className="space-y-4 rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <GripVertical className="h-4 w-4" />
            <div className="w-full">
              <label htmlFor={`school-${edu.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                School/University
              </label>
              <Input
                id={`school-${edu.id}`}
                placeholder="Enter school name"
                value={edu.school}
                onChange={(e) => updateEducation(index, { school: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor={`degree-${edu.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Degree & Major
              </label>
              <Input
                id={`degree-${edu.id}`}
                placeholder="e.g., Bachelor of Science in Computer Science"
                value={edu.degree}
                onChange={(e) => updateEducation(index, { degree: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`eduDate-${edu.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Graduation Date
              </label>
              <Input
                id={`eduDate-${edu.id}`}
                placeholder="e.g., May 2023"
                value={edu.date}
                onChange={(e) => updateEducation(index, { date: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor={`gpa-${edu.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              GPA (Optional)
            </label>
            <Input
              id={`gpa-${edu.id}`}
              placeholder="e.g., 3.8/4.0"
              value={edu.gpa}
              onChange={(e) => updateEducation(index, { gpa: e.target.value })}
            />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addEducation} className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Education
      </Button>
    </section>
  )
}