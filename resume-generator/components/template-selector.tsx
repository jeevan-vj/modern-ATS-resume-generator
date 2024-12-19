import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { templates, Template } from "@/lib/templates"

interface TemplateSelectorProps {
  selectedTemplate: Template
  onSelectTemplate: (template: Template) => void
}

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Choose a Template</h2>
      <RadioGroup value={selectedTemplate.id} onValueChange={(value) => onSelectTemplate(templates.find(t => t.id === value)!)}>
        {templates.map((template) => (
          <div key={template.id} className="flex items-center space-x-2">
            <RadioGroupItem value={template.id} id={template.id} />
            <Label htmlFor={template.id}>{template.name}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

