import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import type { ResumeData } from "@/lib/types"

interface SkillsSectionProps {
  data: ResumeData
  onChange: (data: ResumeData) => void
}

export function SkillsSection({ data, onChange }: SkillsSectionProps) {
  const [newSkill, setNewSkill] = useState("")

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

  return (
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
  )
}