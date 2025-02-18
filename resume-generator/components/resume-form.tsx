"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, GripVertical, Eye, ArrowUp, ArrowDown, X, Upload } from 'lucide-react'
import type { ResumeData, WorkExperience, Education, ColorTheme, CustomField, Project } from "@/lib/types"
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
        { id: crypto.randomUUID(), company: "", jobTitle: "", date: "", description: "", projects: [] }
      ]
    })
  }

  const updateWorkExperience = (index: number, workExp: Partial<WorkExperience>) => {
    const newWorkExperience = [...data.workExperience]
    newWorkExperience[index] = { ...newWorkExperience[index], ...workExp }
    onChange({ ...data, workExperience: newWorkExperience })
  }

  const addProject = (workExpIndex: number) => {
    const newWorkExperience = [...data.workExperience]
    newWorkExperience[workExpIndex].projects.push({
      id: crypto.randomUUID(),
      name: "",
      description: "",
      techStack: [],
      role: "",
      achievements: "",
      duration: ""
    })
    onChange({ ...data, workExperience: newWorkExperience })
  }

  const updateProject = (workExpIndex: number, projectIndex: number, project: Partial<Project>) => {
    const newWorkExperience = [...data.workExperience]
    newWorkExperience[workExpIndex].projects[projectIndex] = { ...newWorkExperience[workExpIndex].projects[projectIndex], ...project }
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
        <div className="space-y-4">
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={data.personalInfo.name}
              onChange={(e) =>
                onChange({
                  ...data,
                  personalInfo: { ...data.personalInfo, name: e.target.value }
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="objective" className="block text-sm font-medium text-gray-700 mb-1">
              Professional Summary
            </label>
            <div className="relative">
              <Textarea
                id="objective"
                placeholder="Write a brief professional summary..."
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
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                value={data.personalInfo.email}
                onChange={(e) =>
                  onChange({
                    ...data,
                    personalInfo: { ...data.personalInfo, email: e.target.value }
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Input
                id="phone"
                placeholder="+1 (555) 000-0000"
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
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Portfolio Website
              </label>
              <Input
                id="website"
                placeholder="https://yourportfolio.com"
                type="url"
                value={data.personalInfo.website}
                onChange={(e) =>
                  onChange({
                    ...data,
                    personalInfo: { ...data.personalInfo, website: e.target.value }
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <Input
                id="location"
                placeholder="City, Country"
                value={data.personalInfo.location}
                onChange={(e) =>
                  onChange({
                    ...data,
                    personalInfo: { ...data.personalInfo, location: e.target.value }
                  })
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
              aria-label="Upload profile image"
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
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 mb-1">
              Primary Color
            </label>
            <input
              id="primaryColor"
              type="color"
              value={data.colorTheme.primary}
              onChange={(e) => updateColorTheme('primary', e.target.value)}
              className="mt-1 block w-full h-10 p-1 rounded-md border border-gray-300"
            />
          </div>
          <div className="form-group">
            <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700 mb-1">
              Secondary Color
            </label>
            <input
              id="secondaryColor"
              type="color"
              value={data.colorTheme.secondary}
              onChange={(e) => updateColorTheme('secondary', e.target.value)}
              className="mt-1 block w-full h-10 p-1 rounded-md border border-gray-300"
            />
          </div>
          <div className="form-group">
            <label htmlFor="textColor" className="block text-sm font-medium text-gray-700 mb-1">
              Text Color
            </label>
            <input
              id="textColor"
              type="color"
              value={data.colorTheme.text}
              onChange={(e) => updateColorTheme('text', e.target.value)}
              className="mt-1 block w-full h-10 p-1 rounded-md border border-gray-300"
            />
          </div>
          <div className="form-group">
            <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700 mb-1">
              Background Color
            </label>
            <input
              id="backgroundColor"
              type="color"
              value={data.colorTheme.background}
              onChange={(e) => updateColorTheme('background', e.target.value)}
              className="mt-1 block w-full h-10 p-1 rounded-md border border-gray-300"
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
          <div key={exp.id} className="space-y-4 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4" />
              <div className="w-full">
                <label htmlFor={`company-${exp.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <Input
                  id={`company-${exp.id}`}
                  placeholder="Enter company name"
                  value={exp.company}
                  onChange={(e) => updateWorkExperience(index, { company: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor={`jobTitle-${exp.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <Input
                  id={`jobTitle-${exp.id}`}
                  placeholder="Enter job title"
                  value={exp.jobTitle}
                  onChange={(e) => updateWorkExperience(index, { jobTitle: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`date-${exp.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Employment Period
                </label>
                <Input
                  id={`date-${exp.id}`}
                  placeholder="e.g., Jan 2020 - Present"
                  value={exp.date}
                  onChange={(e) => updateWorkExperience(index, { date: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor={`description-${exp.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <RichTextEditor
                id={`description-${exp.id}`}
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
            <div className="space-y-2">
              <h3 className="text-md font-semibold">Projects</h3>
              {exp.projects.map((project, projectIndex) => (
                <div key={project.id} className="space-y-2 rounded-lg border p-4">
                  <Input
                    placeholder="Project Name"
                    value={project.name}
                    onChange={(e) => updateProject(index, projectIndex, { name: e.target.value })}
                  />
                  <RichTextEditor
                    content={project.description}
                    onChange={(content) => updateProject(index, projectIndex, { description: content })}
                  />
                  <Input
                    placeholder="Tech Stack (comma separated)"
                    value={project.techStack.join(", ")}
                    onChange={(e) => updateProject(index, projectIndex, { techStack: e.target.value.split(", ") })}
                  />
                  <Input
                    placeholder="Role"
                    value={project.role}
                    onChange={(e) => updateProject(index, projectIndex, { role: e.target.value })}
                  />
                  <RichTextEditor
                    content={project.achievements}
                    onChange={(content) => updateProject(index, projectIndex, { achievements: content })}
                  />
                  <Input
                    placeholder="Duration"
                    value={project.duration}
                    onChange={(e) => updateProject(index, projectIndex, { duration: e.target.value })}
                  />
                </div>
              ))}
              <Button variant="outline" onClick={() => addProject(index)} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </div>
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

