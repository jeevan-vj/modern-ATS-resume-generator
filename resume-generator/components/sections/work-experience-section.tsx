"use client"

import { useState } from 'react'
import { WorkExperienceEnhancer } from '@/components/WorkExperienceEnhancer'
import { RichTextEditor } from '@/components/RichTextEditor'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, GripVertical, Eye, ArrowUp, ArrowDown, X, Info } from 'lucide-react'
import type { ResumeData, WorkExperience, Project } from "@/lib/types"
import { ProgressIndicator } from "../ui/progress-indicator"
import { ProjectDescriptionEnhancer } from '../ProjectDescriptionEnhancer'
import { ProjectAchievementsEnhancer } from '../ProjectAchievementsEnhancer'

interface WorkExperienceSectionProps {
  data: ResumeData
  onChange: (data: ResumeData) => void
  descriptionScores?: { id: string; score: number }[]
}

export function WorkExperienceSection({ 
  data, 
  onChange,
  descriptionScores = []
}: WorkExperienceSectionProps) {
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
    if (workExp.description !== undefined) {
      setRichTextContent(workExp.description)
    }
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
    newWorkExperience[workExpIndex].projects[projectIndex] = { 
      ...newWorkExperience[workExpIndex].projects[projectIndex], 
      ...project 
    }
    onChange({ ...data, workExperience: newWorkExperience })
  }

  const removeProject = (workExpIndex: number, projectIndex: number) => {
    const newWorkExperience = [...data.workExperience]
    newWorkExperience[workExpIndex].projects.splice(projectIndex, 1)
    onChange({ ...data, workExperience: newWorkExperience })
  }

  const getScoreForDescription = (id: string) => {
    return descriptionScores.find(score => score.id === id)?.score || 0
  }

  const getQualityColor = (score: number) => {
    if (score >= 80) return "success"
    if (score >= 50) return "warning"
    return "error"
  }

  return (
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
            <div className="flex justify-between items-center mb-1">
              <label htmlFor={`description-${exp.id}`} className="block text-sm font-medium text-gray-700">
                Job Description
              </label>
              <div className="flex items-center gap-2">
                <span title="Quality score based on action verbs, metrics, and technical terms">
                  <Info className="h-4 w-4 text-gray-400" />
                </span>
                <ProgressIndicator
                  value={getScoreForDescription(exp.id)}
                  size="sm"
                  className="w-24"
                  color={getQualityColor(getScoreForDescription(exp.id))}
                  showValue={true}
                />
              </div>
            </div>
            
            <RichTextEditor
              content={ exp.description?.replace(/^\d+\.\s*/, '')}
              onChange={(content) => updateWorkExperience(index, { description: content })}
            />
            <WorkExperienceEnhancer
              currentDescription={exp.description}
              jobTitle={exp.jobTitle}
              company={exp.company}
              onSelect={(enhancedDescription) => {
                updateWorkExperience(index, { description: enhancedDescription })
              }}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-md font-semibold">Projects</h3>
            {exp.projects?.map((project, projectIndex) => (
              <div key={project.id} className="space-y-2 rounded-lg border p-4">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <label htmlFor={`project-name-${project.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Project Name
                    </label>
                    <Input
                      id={`project-name-${project.id}`}
                      placeholder="Project Name"
                      value={project.name}
                      onChange={(e) => updateProject(index, projectIndex, { name: e.target.value })}
                    />
                  </div>
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
                <div className="space-y-1">
                  <label htmlFor={`project-description-${project.id}`} className="block text-sm font-medium text-gray-700">
                    Project Description
                  </label>
            
                  <RichTextEditor
                    content={project.description}
                    onChange={(content) => updateProject(index, projectIndex, { description: content })}
                  />
                  <ProjectDescriptionEnhancer
                    currentDescription={project.description}
                    projectName={project.name}
                    techStack={project.techStack}
                    onSelect={(enhancedDescription: string) =>
                      updateProject(index, projectIndex, { description: enhancedDescription })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor={`project-tech-${project.id}`} className="block text-sm font-medium text-gray-700">
                    Tech Stack
                  </label>
                  <Input
                    id={`project-tech-${project.id}`}
                    placeholder="Tech Stack (comma separated)"
                    value={project.techStack.join(", ")}
                    onChange={(e) => updateProject(index, projectIndex, { techStack: e.target.value.split(", ") })}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor={`project-role-${project.id}`} className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <Input
                    id={`project-role-${project.id}`}
                    placeholder="Role"
                    value={project.role}
                    onChange={(e) => updateProject(index, projectIndex, { role: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor={`project-achievements-${project.id}`} className="block text-sm font-medium text-gray-700">
                    Achievements
                  </label>
                  <RichTextEditor
                    content={project.achievements}
                    onChange={(content) => updateProject(index, projectIndex, { achievements: content })}
                  />
                  <ProjectAchievementsEnhancer
                    currentAchievements={project.achievements}
                    projectName={project.name}
                    projectRole={project.role}
                    techStack={project.techStack}
                    onSelect={(enhancedAchievements: string) =>
                      updateProject(index, projectIndex, { achievements: enhancedAchievements })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor={`project-duration-${project.id}`} className="block text-sm font-medium text-gray-700">
                    Duration
                  </label>
                  <Input
                    id={`project-duration-${project.id}`}
                    placeholder="Duration"
                    value={project.duration}
                    onChange={(e) => updateProject(index, projectIndex, { duration: e.target.value })}
                  />
                </div>
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
  )
}