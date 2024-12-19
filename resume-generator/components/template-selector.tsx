import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { templates, Template } from "@/lib/templates"
import { motion } from "framer-motion"

interface TemplateSelectorProps {
  selectedTemplate: Template
  onSelectTemplate: (template: Template) => void
}

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Choose a Template</h2>
      <RadioGroup value={selectedTemplate.id} onValueChange={(value) => onSelectTemplate(templates.find(t => t.id === value)!)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <motion.div 
              key={template.id} 
              className={`p-4 border rounded-lg cursor-pointer ${selectedTemplate.id === template.id ? 'border-blue-500' : 'border-gray-300'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectTemplate(template)}
            >
              <RadioGroupItem value={template.id} id={template.id} className="hidden" />
              <Label htmlFor={template.id} className="block text-center">
                <div className="text-xl font-semibold">{template.name}</div>
              </Label>
            </motion.div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

