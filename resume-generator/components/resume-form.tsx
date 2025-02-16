"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, GripVertical, Eye, ArrowUp, ArrowDown, X, Upload } from 'lucide-react'
import type { ResumeData, WorkExperience, Education, ColorTheme, CustomField } from "@/lib/types"
import { ObjectiveEnhancer } from './ObjectiveEnhancer'
import { RichTextEditor } from './RichTextEditor'
import { WorkExperienceEnhancer } from './WorkExperienceEnhancer'

export function ResumeForm({ data, onChange }: { 
  data: ResumeData
  onChange: (data: ResumeData) => void 
}) {
  const [newSkill, setNewSkill] = useState("")
  const [newCustomField, setNewCustomField] = useState({ label: "", value: "" })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addWorkExperience = () => {
    onChange({
      ...data,
      workExperience: [
        ...data.workExperience,
        { id: crypto.randomUUID(), company: "", jobTitle: "", date: "", description: "" }
      ]
    })
  }

  const updateWorkExperience = (index: number, workExp: Partial<WorkExperience>) => {
    const newWorkExperience = [...data.workExperience]
    newWorkExperience[index] = { ...newWorkExperience[index], ...workExp }
    onChange({ ...data, workExperience: newWorkExperience })
  }

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onChange({
          ...data,
          personalInfo: { ...data.personalInfo, profileImage: reader.result as string }
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const updateColorTheme = (key: keyof ColorTheme, value: string) => {
    onChange({
      ...data,
      colorTheme: { ...data.colorTheme, [key]: value }
    })
  }

  const addCustomField = () => {
    if (newCustomField.label.trim() !== "" && newCustomField.value.trim() !== "") {
      onChange({
        ...data,
        customFields: [
          ...data.customFields,
          { id: crypto.randomUUID(), ...newCustomField }
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
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Personal Information</h2>
        <div className="space-y-2">
          <Input
            placeholder="Name"
            value={data.personalInfo.name}
            onChange={(e) =>
              onChange({
                ...data,
                personalInfo: { ...data.personalInfo, name: e.target.value }
              })
            }
          />
          <div className="relative">
            <Textarea
              placeholder="Objective"
              value={data.personalInfo.objective}
              onChange={(e) =>
                onChange({
                  ...data,
                  personalInfo: { ...data.personalInfo, objective: e.target.value }
                })
              }
            />
            <ObjectiveEnhancer
              currentObjective={data.personalInfo.objective}
              workExperience={data.workExperience}
              education={data.education}
              onSelect={(objective) =>
                onChange({
                  ...data,
                  personalInfo: { ...data.personalInfo, objective }
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Email"
              type="email"
              value={data.personalInfo.email}
              onChange={(e) =>
                onChange({
                  ...data,
                  personalInfo: { ...data.personalInfo, email: e.target.value }
                })
              }
            />
            <Input
              placeholder="Phone"
              type="tel"
              value={data.personalInfo.phone}
              onChange={(e) =>
                onChange({
                  ...data,
                  personalInfo: { ...data.personalInfo, phone: e.target.value }
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Website"
              type="url"
              value={data.personalInfo.website}
              onChange={(e) =>
                onChange({
                  ...data,
                  personalInfo: { ...data.personalInfo, website: e.target.value }
                })
              }
            />
            <Input
              placeholder="Location"
              value={data.personalInfo.location}
              onChange={(e) =>
                onChange({
                  ...data,
                  personalInfo: { ...data.personalInfo, location: e.target.value }
                })
              }
            />
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Profile Image
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Color Theme</h2>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Primary Color</label>
            <input
              type="color"
              value={data.colorTheme.primary}
              onChange={(e) => updateColorTheme('primary', e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Secondary Color</label>
            <input
              type="color"
              value={data.colorTheme.secondary}
              onChange={(e) => updateColorTheme('secondary', e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Text Color</label>
            <input
              type="color"
              value={data.colorTheme.text}
              onChange={(e) => updateColorTheme('text', e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Background Color</label>
            <input
              type="color"
              value={data.colorTheme.background}
              onChange={(e) => updateColorTheme('background', e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Work Experience</h2>
          <div className="flex items-center gap-2">
            <ArrowUp className="h-4 w-4" />
            <ArrowDown className="h-4 w-4" />
            <Eye className="h-4 w-4" />
          </div>
        </div>
        {data.workExperience.map((exp, index) => (
          <div key={exp.id} className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4" />
              <Input
                placeholder="Company"
                value={exp.company}
                onChange={(e) => updateWorkExperience(index, { company: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Job Title"
                value={exp.jobTitle}
                onChange={(e) => updateWorkExperience(index, { jobTitle: e.target.value })}
              />
              <Input
                placeholder="Date"
                value={exp.date}
                onChange={(e) => updateWorkExperience(index, { date: e.target.value })}
              />
            </div>
            <RichTextEditor
              content={exp.description}
              onChange={(content) => updateWorkExperience(index, { description: content })}
            />
            <WorkExperienceEnhancer
              currentDescription={exp.description}
              jobTitle={exp.jobTitle}
              company={exp.company}
              onSelect={(enhancedDescription) =>
                updateWorkExperience(index, { description: enhancedDescription })
              }
            />
          </div>
        ))}
        <Button variant="outline" onClick={addWorkExperience} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Job
        </Button>
      </section>

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
          <div key={edu.id} className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4" />
              <Input
                placeholder="School"
                value={edu.school}
                onChange={(e) => updateEducation(index, { school: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Degree & Major"
                value={edu.degree}
                onChange={(e) => updateEducation(index, { degree: e.target.value })}
              />
              <Input
                placeholder="Date"
                value={edu.date}
                onChange={(e) => updateEducation(index, { date: e.target.value })}
              />
            </div>
            <Input
              placeholder="GPA"
              value={edu.gpa}
              onChange={(e) => updateEducation(index, { gpa: e.target.value })}
            />
          </div>
        ))}
        <Button variant="outline" onClick={addEducation} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <span>{skill}</span>
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 h-5 w-5 p-0"
                onClick={() => removeSkill(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Add a skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addSkill()
              }
            }}
          />
          <Button onClick={addSkill}>Add</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Custom Fields</h2>
        {data.customFields.map((field) => (
          <div key={field.id} className="flex items-center gap-2">
            <Input
              placeholder="Label"
              value={field.label}
              onChange={(e) => updateCustomField(field.id, { label: e.target.value })}
              className="flex-1"
            />
            <Input
              placeholder="Value"
              value={field.value}
              onChange={(e) => updateCustomField(field.id, { value: e.target.value })}
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeCustomField(field.id)}
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

