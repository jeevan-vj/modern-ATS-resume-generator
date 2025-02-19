import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Wand2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ObjectiveEnhancerProps {
  currentObjective: string
  workExperience: any[]
  education: any[]
  onSelect: (objective: string) => void
}

export function ObjectiveEnhancer({ 
  currentObjective, 
  workExperience, 
  education, 
  onSelect 
}: ObjectiveEnhancerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [error, setError] = useState('')

  const enhanceObjective = async () => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/enhance-objective', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ objective: currentObjective, workExperience, education }),
      })
      
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      
      setSuggestions(data.suggestions)
    } catch (err) {
      setError('Failed to generate suggestions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setIsOpen(true)
          enhanceObjective()
        }}
        className="absolute right-2 top-2"
      >
        <Wand2 className="h-8 w-8 text-gold font-bold animate-pulse" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>AI Enhanced Objectives</DialogTitle>
          </DialogHeader>
          
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-4">{error}</div>
          ) : (
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    onSelect(suggestion)
                    setIsOpen(false)
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
