"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, GripVertical, Eye, ArrowUp, ArrowDown, X } from 'lucide-react'
import type { ResumeData, Education, CustomField } from "@/lib/types"
import { PersonalInfoSection } from './sections/personal-info-section'
import { ColorThemeSection } from './sections/color-theme-section'
import { WorkExperienceSection } from './sections/work-experience-section'

export function ResumeForm({ data, onChange }: { 
  data: ResumeData
  onChange: (data: ResumeData) => void 
}) {
  const [newSkill, setNewSkill] = useState("")
  const [newCustomField, setNewCustomField] = useState({ label: "", value: "" })

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

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      onChange({
        ...data,
        skills: [...data.skills, newSkill.trim()]
      })
      setNewSkill("")
    }
  }

  const removeSkill = (index: number) => {
    const newSkills = [...data.skills]
    newSkills.splice(index, 1)
    onChange({ ...data, skills: newSkills })
  }

  const addCustomField = () => {
    if (newCustomField.label.trim() !== "" && newCustomField.value.trim() !== "") {
      onChange({
        ...data,
        customFields: [
          ...data.customFields,
          {
            id: crypto.randomUUID(),
            ...newCustomField,
            title: newCustomField.label,
            content: newCustomField.value
          }
        ]
      })
      setNewCustomField({ label: "", value: "" })
    }
  }

  const updateCustomField = (id: string, field: Partial<CustomField>) => {
    const newCustomFields = data.customFields.map(cf => 
      cf.id === id ? { ...cf, ...field } : cf
    )
    onChange({ ...data, customFields: newCustomFields })
  }

  const removeCustomField = (id: string) => {
    const newCustomFields = data.customFields.filter(cf => cf.id !== id)
    onChange({ ...data, customFields: newCustomFields })
  }

  return (
    <div className="space-y-8 p-4">
      <PersonalInfoSection data={data} onChange={onChange} />
      <ColorThemeSection data={data} onChange={onChange} />
      <WorkExperienceSection data={data} onChange={onChange} />

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

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Skills</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                <span>{skill}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-5 w-5 p-0"
                  onClick={() => removeSkill(index)}
                  aria-label={`Remove ${skill}`}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label htmlFor="newSkill" className="block text-sm font-medium text-gray-700 mb-1">
                Add New Skill
              </label>
              <Input
                id="newSkill"
                placeholder="Enter a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addSkill()
                  }
                }}
              />
            </div>
            <Button 
              onClick={addSkill}
              className="self-end"
            >
              Add
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Custom Fields</h2>
        {data.customFields.map((field) => (
          <div key={field.id} className="grid grid-cols-[1fr,1fr,auto] gap-4 items-end">
            <div className="form-group">
              <label htmlFor={`label-${field.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Field Label
              </label>
              <Input
                id={`label-${field.id}`}
                placeholder="Enter label"
                value={field.label}
                onChange={(e) => updateCustomField(field.id, { label: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`value-${field.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Field Value
              </label>
              <Input
                id={`value-${field.id}`}
                placeholder="Enter value"
                value={field.value}
                onChange={(e) => updateCustomField(field.id, { value: e.target.value })}
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeCustomField(field.id)}
              aria-label={`Remove ${field.label} field`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <Input
            placeholder="New Field Label"
            value={newCustomField.label}
            onChange={(e) => setNewCustomField({ ...newCustomField, label: e.target.value })}
            className="flex-1"
          />
          <Input
            placeholder="New Field Value"
            value={newCustomField.value}
            onChange={(e) => setNewCustomField({ ...newCustomField, value: e.target.value })}
            className="flex-1"
          />
          <Button onClick={addCustomField}>Add</Button>
        </div>
      </section>
    </div>
  )
}

