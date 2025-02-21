import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Loader2, Wand2 } from 'lucide-react'
import { WorkExperience } from '@/lib/types'

interface WorkExperienceEnhancerProps {
  currentDescription: string
  jobTitle: string
  company: string
  onSelect: (enhancedDescription: string) => void
}

export function WorkExperienceEnhancer({
  currentDescription,
  jobTitle,
  company,
  onSelect
}: WorkExperienceEnhancerProps) {
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const enhanceDescription = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/enhance-work-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentDescription,
          jobTitle,
          company,
        }),
      })
      const data = await response.json()
      setSuggestions(data.suggestions)
    } catch (error) {
      console.error('Error enhancing description:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-2">
      <Button
        variant="outline"
        size="sm"
        onClick={enhanceDescription}
        disabled={loading}
        className="w-full"
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Wand2 className="mr-2 h-4 w-4" />
        )}
        Enhance Description with AI
      </Button>
      
      {suggestions.length > 0 && (
        <div className="mt-2 space-y-2 rounded-md border p-2">
          <p className="text-sm font-medium text-gray-700">AI Suggestions:</p>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-md p-2 text-sm hover:bg-gray-100"
              onClick={() => onSelect(suggestion?.replace(/^\d+\.\s*/, ''))}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
