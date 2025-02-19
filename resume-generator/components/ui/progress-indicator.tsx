"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressIndicatorProps {
  value: number
  label?: string
  color?: "success" | "warning" | "error" | "info"
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  className?: string
}

export function ProgressIndicator({ 
  value, 
  label, 
  color = "info",
  size = "md",
  showValue = true,
  className 
}: ProgressIndicatorProps) {
  const getColorClass = () => {
    switch (color) {
      case "success": return "bg-green-500"
      case "warning": return "bg-yellow-500"
      case "error": return "bg-red-500"
      default: return "bg-blue-500"
    }
  }

  const getSizeClass = () => {
    switch (size) {
      case "sm": return "h-1.5"
      case "lg": return "h-3"
      default: return "h-2"
    }
  }

  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showValue && <span className="text-sm font-medium text-gray-500">{Math.round(value)}%</span>}
        </div>
      )}
      <div className={cn("w-full bg-gray-200 rounded-full overflow-hidden", getSizeClass())}>
        <div
          className={cn("transition-all duration-300", getColorClass(), getSizeClass())}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}