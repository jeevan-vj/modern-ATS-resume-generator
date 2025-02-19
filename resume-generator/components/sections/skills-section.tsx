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
      <h2 className="text-base sm:text-lg font-semibold">Skills</h2>
      <div className="space-y-4">
        <div className="min-h-[50px] p-2 border rounded-lg bg-gray-50">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {data.skills.map((skill, index) => (
              <div 
                key={index} 
                className="flex items-center bg-white border rounded-full px-2 sm:px-3 py-1 text-sm touch-manipulation"
              >
                <span className="max-w-[150px] truncate">{skill}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-1 h-5 w-5 p-0 hover:bg-gray-100 active:bg-gray-200"
                  onClick={() => removeSkill(index)}
                  aria-label={`Remove ${skill}`}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <label htmlFor="newSkill" className="block text-sm font-medium text-gray-700 mb-1">
              Add New Skill
            </label>
            <Input
              id="newSkill"
              placeholder="Enter a skill and press Enter or Add"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addSkill()
                }
              }}
              className="w-full"
            />
          </div>
          <Button 
            onClick={addSkill}
            className="sm:self-end w-full sm:w-auto mt-4 sm:mt-0"
          >
            Add Skill
          </Button>
        </div>
      </div>
    </section>
  )
}