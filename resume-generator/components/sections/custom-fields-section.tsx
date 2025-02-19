import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import { RichTextEditor } from "@/components/RichTextEditor"
import type { ResumeData, CustomField } from "@/lib/types"

interface CustomFieldsSectionProps {
  data: ResumeData
  onChange: (data: ResumeData) => void
}

export function CustomFieldsSection({ data, onChange }: CustomFieldsSectionProps) {
  const [newCustomField, setNewCustomField] = useState({ title: "" })

  const addCustomField = () => {
    if (newCustomField.title.trim() !== "") {
      onChange({
        ...data,
        customFields: [
          ...data.customFields,
          {
            id: crypto.randomUUID(),
            title: newCustomField.title,
            content: "",
            label: newCustomField.title,
            value: ""
          }
        ]
      })
      setNewCustomField({ title: "" })
    }
  }

  const updateCustomField = (id: string, field: Partial<CustomField>) => {
    const newCustomFields = data.customFields.map(cf => {
      if (cf.id === id) {
        // Sync title/content with label/value when either pair is updated
        const newField = { ...cf, ...field }
        if (field.title) newField.label = field.title
        if (field.content) newField.value = field.content
        if (field.label) newField.title = field.label
        if (field.value) newField.content = field.value
        return newField
      }
      return cf
    })
    onChange({ ...data, customFields: newCustomFields })
  }

  const removeCustomField = (id: string) => {
    const newCustomFields = data.customFields.filter(cf => cf.id !== id)
    onChange({ ...data, customFields: newCustomFields })
  }

  return (
    <section className="space-y-4 mt-8 border-t pt-8">
      <h2 className="text-lg font-semibold text-gray-800">Additional Information</h2>
      <p className="text-sm text-gray-600 mb-4">Add any other relevant information or custom sections to your resume.</p>
      
      {data.customFields.map((field) => (
        <div key={field.id} className="group relative space-y-2 bg-gray-50 rounded-md p-4 transition-all">
          <div className="flex items-center gap-4">
            <Input
              id={`title-${field.id}`}
              placeholder="Section Title"
              value={field.title}
              onChange={(e) => updateCustomField(field.id, { title: e.target.value })}
              className="font-medium bg-transparent border-0 px-0 focus-visible:ring-0"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeCustomField(field.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={`Remove ${field.title} section`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="pl-0">
            <RichTextEditor
              content={field.content}
              onChange={(content) => updateCustomField(field.id, { content })}
            />
          </div>
        </div>
      ))}
      
      <div className="flex items-center gap-2 mt-4">
        <Input
          placeholder="New Section Title"
          value={newCustomField.title}
          onChange={(e) => setNewCustomField({ ...newCustomField, title: e.target.value })}
          className="flex-1"
        />
        <Button onClick={addCustomField} variant="outline" size="sm">
          Add Section
        </Button>
      </div>
    </section>
  )
}