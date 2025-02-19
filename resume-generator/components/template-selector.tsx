'use client'

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { templates, Template } from "@/lib/templates"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { Button } from "./ui/button"

interface TemplateSelectorProps {
  selectedTemplate: Template
  onSelectTemplate: (template: Template) => void
}

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftScroll(scrollLeft > 0)
    setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10)
    setScrollProgress(scrollLeft / (scrollWidth - clientWidth))
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      handleScroll()
      return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const scrollAmount = direction === 'left' ? -400 : 400
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Choose Your Template</h2>
      <RadioGroup value={selectedTemplate.id} onValueChange={(value) => onSelectTemplate(templates.find(t => t.id === value)!)}>
        <div className="relative bg-gray-50/50 -mx-6 px-6 py-8">
          <div className="relative max-w-4xl mx-auto">
            {showLeftScroll && (
              <Button
                variant="outline"
                size="icon"
                className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-lg border-gray-200 hover:bg-white"
                onClick={() => scroll('left')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-none gap-6 scroll-smooth"
            >
              {templates.map((template) => (
                <motion.div 
                  key={template.id} 
                  className={`flex-none w-72 ${
                    selectedTemplate.id === template.id 
                      ? 'ring-2 ring-blue-500 bg-white' 
                      : 'hover:bg-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectTemplate(template)}
                >
                  <div className="group relative flex flex-col p-6 rounded-xl border border-gray-200 cursor-pointer transition-all duration-200 hover:shadow-lg bg-white">
                    <RadioGroupItem value={template.id} id={template.id} className="hidden" />
                    <div className="aspect-[3/4] w-full bg-gray-100 rounded-lg mb-4 overflow-hidden">
                      {/* Template preview image would go here */}
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Preview
                      </div>
                    </div>
                    <Label htmlFor={template.id} className="block">
                      <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                      <p className="text-sm text-gray-600">Perfect for {template.id === 'modern' ? 'creative roles' : 
                        template.id === 'professional' ? 'corporate positions' :
                        template.id === 'minimalist' ? 'clean simplicity' :
                        template.id === 'executive' ? 'senior positions' :
                        template.id === 'compact' ? 'dense information' :
                        'timeline view'}</p>
                    </Label>
                    <div className={`absolute inset-0 rounded-xl transition-opacity ${
                      selectedTemplate.id === template.id ? 'bg-blue-500/10' : 'bg-transparent'
                    }`} />
                  </div>
                </motion.div>
              ))}
            </div>

            {showRightScroll && (
              <Button
                variant="outline"
                size="icon"
                className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-lg border-gray-200 hover:bg-white"
                onClick={() => scroll('right')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}

            {/* Scroll progress indicator */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
              {Array.from({ length: templates.length }).map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === Math.floor(scrollProgress * templates.length)
                      ? 'bg-blue-500 w-3'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}

