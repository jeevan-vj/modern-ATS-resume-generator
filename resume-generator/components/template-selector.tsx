'use client'

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { templates, Template } from "@/lib/templates"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { Button } from "./ui/button"
import Image from "next/image"

interface TemplateSelectorProps {
  selectedTemplate: Template
  onSelectTemplate: (template: Template) => void
}

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
    const scrollAmount = direction === 'left' ? -300 : 300
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Choose Your Template</h2>
      <RadioGroup 
        value={selectedTemplate.id} 
        onValueChange={(value) => onSelectTemplate(templates.find(t => t.id === value)!)}
        className="w-full"
      >
        <div className="relative bg-gray-50/50 -mx-2 sm:-mx-6 px-2 sm:px-6 py-4 sm:py-8">
          <div className="relative max-w-4xl mx-auto">
            {!isMobile && showLeftScroll && (
              <Button
                variant="outline"
                size="icon"
                className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-lg border-gray-200 hover:bg-white hidden sm:flex"
                onClick={() => scroll('left')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hidden gap-3 sm:gap-6 scroll-smooth snap-x snap-mandatory touch-pan-x"
            >
              {templates.map((template) => (
                <motion.div 
                  key={template.id} 
                  className={`flex-none w-[280px] sm:w-72 snap-start ${
                    selectedTemplate.id === template.id 
                      ? 'ring-2 ring-blue-500 bg-white' 
                      : 'hover:bg-white'
                  }`}
                  whileHover={!isMobile ? { scale: 1.02 } : undefined}
                  whileTap={!isMobile ? { scale: 0.98 } : undefined}
                  onClick={() => onSelectTemplate(template)}
                >
                  <div className="group relative flex flex-col p-4 sm:p-6 rounded-xl border border-gray-200 cursor-pointer transition-all duration-200 hover:shadow-lg bg-white touch-manipulation">
                    <RadioGroupItem value={template.id} id={template.id} className="sr-only" />
                    <div className="aspect-[3/4] w-full bg-gray-100 rounded-lg mb-3 sm:mb-4 overflow-hidden">
                      <Image
                        src={template.previewImage}
                        alt={`${template.name} template preview`}
                        width={400}
                        height={533}
                        className="w-full h-full object-cover"
                        priority={template.id === 'modern' || template.id === 'professional'}
                      />
                    </div>
                    <Label htmlFor={template.id} className="block">
                      <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{template.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{
                        template.id === 'modern' ? 'Creative and contemporary design for digital professionals' :
                        template.id === 'professional' ? 'Traditional format for corporate positions' :
                        template.id === 'minimalist' ? 'Clean and focused on essential information' :
                        template.id === 'executive' ? 'Elegant design for senior leadership roles' :
                        template.id === 'compact' ? 'Space-efficient for extensive experience' :
                        template.id === 'timeline' ? 'Visual progression of your career journey' :
                        template.id === 'chronological' ? 'ATS-friendly format emphasizing work history' :
                        template.id === 'skills-based' ? 'Highlight technical expertise and achievements' :
                        'Template preview'
                      }</p>
                    </Label>
                    <div className={`absolute inset-0 rounded-xl transition-opacity ${
                      selectedTemplate.id === template.id ? 'bg-blue-500/10' : 'bg-transparent'
                    }`} />
                  </div>
                </motion.div>
              ))}
            </div>

            {!isMobile && showRightScroll && (
              <Button
                variant="outline"
                size="icon"
                className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-lg border-gray-200 hover:bg-white hidden sm:flex"
                onClick={() => scroll('right')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}

            {/* Mobile-friendly scroll indicator */}
            <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
              {Array.from({ length: templates.length }).map((_, index) => (
                <div
                  key={index}
                  className={`w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                    index === Math.floor(scrollProgress * templates.length)
                      ? 'bg-blue-500 w-2 sm:w-3'
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

