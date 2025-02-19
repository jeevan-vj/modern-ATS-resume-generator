import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Loader2, Wand2 } from 'lucide-react'

interface ProjectAchievementsEnhancerProps {
  currentAchievements: string
  projectName: string
  projectRole: string
  techStack: string[]
  onSelect: (enhancedAchievements: string) => void
}

export function ProjectAchievementsEnhancer({
  currentAchievements,
  projectName,
  projectRole,
  techStack,
  onSelect
}: ProjectAchievementsEnhancerProps) {
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const enhanceAchievements = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/enhance-project-achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentAchievements,
          projectName,
          projectRole,
          techStack,
        }),
      })
      const data = await response.json()
      setSuggestions(data.suggestions)
    } catch (error) {
      console.error('Error enhancing project achievements:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-2">
      <Button
        variant="outline"
        size="sm"
        onClick={enhanceAchievements}
        disabled={loading}
        className="w-full"
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Wand2 className="mr-2 h-4 w-4" />
        )}
        Enhance Achievements with AI
      </Button>
      
      {suggestions.length > 0 && (
        <div className="mt-2 space-y-2 rounded-md border p-2">
          <p className="text-sm font-medium text-gray-700">AI Suggestions:</p>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-md p-2 text-sm group transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div 
                className="prose prose-sm max-w-none dark:prose-invert prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-li:group-hover:text-gray-900 dark:prose-li:group-hover:text-gray-100"
                dangerouslySetInnerHTML={{ __html: suggestion }}
                onClick={() => {
                  onSelect(suggestion)
                  setSuggestions([]) // Clear suggestions after selection
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}