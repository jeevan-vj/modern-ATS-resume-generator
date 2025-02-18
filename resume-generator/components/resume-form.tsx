"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, GripVertical, Eye, ArrowUp, ArrowDown, X } from 'lucide-react'
import type { ResumeData, WorkExperience, Education, ColorTheme, CustomField, Project } from "@/lib/types"
import { RichTextEditor } from './RichTextEditor'
import { WorkExperienceEnhancer } from './WorkExperienceEnhancer'
import { PersonalInfoSection } from './sections/personal-info-section'

export function ResumeForm({ data, onChange }: { 
  data: ResumeData
  onChange: (data: ResumeData) => void 
}) {
  const [newSkill, setNewSkill] = useState("")
  const [newCustomField, setNewCustomField] = useState({ label: "", value: "" })

  const addWorkExperience = () => {
    onChange({
      ...data,
      workExperience: [
        ...data.workExperience,
        {
          id: crypto.randomUUID(),
          company: "",
          jobTitle: "",
          date: "",
          description: "",
          projects: [],
          techStack: [],
          teamSize: "",
          responsibilities: [],
          companyDetails: {
            industry: "",
            size: "",
            type: ""
          },
          achievements: "",
          keywords: []
        }
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

  const removeProject = (workExpIndex: number, projectIndex: number) => {
    const newWorkExperience = [...data.workExperience]
    newWorkExperience[workExpIndex].projects.splice(projectIndex, 1)
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
                  <div className="flex justify-between items-center">
                    <Input
                      placeholder="Project Name"
                      value={project.name}
                      onChange={(e) => updateProject(index, projectIndex, { name: e.target.value })}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProject(index, projectIndex)}
                      className="ml-2"
                      aria-label={`Delete ${project.name || 'project'}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
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

