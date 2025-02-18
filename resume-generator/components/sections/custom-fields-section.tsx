import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import type { ResumeData, CustomField } from "@/lib/types"

interface CustomFieldsSectionProps {
  data: ResumeData
  onChange: (data: ResumeData) => void
}

export function CustomFieldsSection({ data, onChange }: CustomFieldsSectionProps) {
  const [newCustomField, setNewCustomField] = useState({ label: "", value: "" })

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
  )
}