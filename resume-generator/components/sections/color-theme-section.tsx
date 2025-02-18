"use client"

import type { ResumeData, ColorTheme } from "@/lib/types"

interface ColorThemeSectionProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export function ColorThemeSection({ data, onChange }: ColorThemeSectionProps) {
  const updateColorTheme = (key: keyof ColorTheme, value: string) => {
    onChange({
      ...data,
      colorTheme: { ...data.colorTheme, [key]: value }
    })
  }

  return (
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
  )
}