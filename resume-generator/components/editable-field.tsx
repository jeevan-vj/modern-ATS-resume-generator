"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface EditableFieldProps {
  value: string
  onChange: (value: string) => void
  multiline?: boolean
  className?: string,
  style?: React.CSSProperties
}

export function EditableField({ value, onChange, multiline = false, className = '' }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(value)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    // Reset edited value when the external value changes
    setEditedValue(value)
  }, [value])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleDoubleClick = () => {
    setIsEditing(true)
    setEditedValue(value) // Reset to current value when editing starts
  }

  const handleBlur = () => {
    setIsEditing(false)
    onChange(editedValue)
  }

  const handleCancel = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false)
      setEditedValue(value) // Reset to original value on cancel
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    handleCancel(e)
    if (e.key === 'Enter' && !multiline) {
      setIsEditing(false)
      onChange(editedValue)
    }
  }

  if (isEditing) {
    const InputComponent = multiline ? Textarea : Input
    return (
      <InputComponent
        ref={inputRef as any}
        value={editedValue}
        onChange={(e) => setEditedValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={className}
      />
    )
  }

  return (
    <div 
      onDoubleClick={handleDoubleClick}
      className={`cursor-text ${className}`}
    >
      {value}
    </div>
  )
}

