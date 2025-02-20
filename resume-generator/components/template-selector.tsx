'use client'

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
  const [showRightScroll, setShowRightScroll] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMounted(true)
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
    if (isMounted) {
      const scrollContainer = scrollContainerRef.current
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isMounted])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const scrollAmount = direction === 'left' ? -300 : 300
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  if (!isMounted) {
    return (
      <div className="w-full max-w-full overflow-hidden">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 px-2">Choose Your Template</h2>
        <div className="animate-pulse bg-gray-100 h-[400px] rounded-lg" />
      </div>
    )
  }

  return (
    <div className="w-full max-w-full overflow-hidden">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 px-2">Choose Your Template</h2>
      <div className="relative bg-gray-50/50 px-2 sm:px-6 py-4 sm:py-8">
        <div className="relative max-w-[100vw] mx-auto">
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
            className="flex overflow-x-auto scrollbar-hidden gap-3 sm:gap-6 scroll-smooth snap-x snap-mandatory touch-pan-x pb-6"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {templates.map((template) => (
              <motion.div 
                key={template.id} 
                className="flex-none w-[260px] sm:w-72 snap-start"
                whileHover={!isMobile ? { scale: 1.02 } : undefined}
                whileTap={!isMobile ? { scale: 0.98 } : undefined}
              >
                <button
                  type="button"
                  onClick={() => onSelectTemplate(template)}
                  className={`w-full group relative flex flex-col p-3 sm:p-4 rounded-xl border transition-all duration-200 bg-white touch-manipulation ${
                    selectedTemplate.id === template.id 
                      ? 'ring-2 ring-blue-500 border-transparent' 
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <div className="aspect-[3/4] w-full bg-gray-50 rounded-lg mb-3 sm:mb-4 overflow-hidden">
                    <Image
                      src={template.previewImage}
                      alt={`${template.name} template preview`}
                      width={400}
                      height={533}
                      className="w-full h-full object-cover"
                      priority={template.id === selectedTemplate.id}
                    />
                  </div>
                  <Label className="block">
                    <h3 className="text-sm sm:text-base font-semibold mb-0.5 sm:mb-1">{template.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{template.description}</p>
                  </Label>
                </button>
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

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
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
    </div>
  )
}

