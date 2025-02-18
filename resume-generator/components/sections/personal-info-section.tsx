"use client"

import { useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from 'lucide-react'
import type { ResumeData } from "@/lib/types"
import { ObjectiveEnhancer } from '../ObjectiveEnhancer'

interface PersonalInfoSectionProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export function PersonalInfoSection({ data, onChange }: PersonalInfoSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  return (
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
  )
}