'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useResumeStore } from '@/store/resumeStore'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'

interface FileUploadProps {
  onUploadComplete: (data: any) => void
}

export function FileUpload({ onUploadComplete }: FileUploadProps) {
  // Add check for client-side execution
  if (typeof window === 'undefined') {
    return null; // Return null during server-side rendering
  }

  const router = useRouter()
  const setParsedResume = useResumeStore(state => state.setParsedResume)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setSelectedFile(file);
    console.log('📂 File selected:', {
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024).toFixed(2)}KB`
    });

    setUploading(true)
    setError(null)
    setSuccess(false)

    try {
      // Extract text from file client-side
      console.log('📄 Extracting text from file...');
        const text = await file.text();
      // Send text to API
      console.log('📤 Sending text to API for parsing...');
      const response = await fetch('/api/upload-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: "cleanedText" }),
      });

      if (!response.ok) {
        console.error('❌ Upload failed:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error details:', errorText);
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json()
      console.log('📥 Received API response:', {
        success: result.success,
        dataFields: Object.keys(result.data || {}),
      });

      setSuccess(true)
      
      // Transform the parsed data
      console.log('🔄 Transforming resume data to application format');
      const resumeData = {
        personalInfo: {
          name: result.data.personal_info.name || '',
          email: result.data.personal_info.email || '',
          phone: result.data.personal_info.phone || '',
          location: result.data.personal_info.location || '',
          website: result.data.personal_info.website || '',  // Added missing required field
          objective: '',
        },
        workExperience: result.data.work_experience.map((exp: any) => ({
          company: exp.company,
          position: exp.title,
          startDate: exp.duration.split('-')[0],
          endDate: exp.duration.split('-')[1],
          responsibilities: exp.responsibilities,
        })),
        education: result.data.education.map((edu: any) => ({
          institution: edu.institution,
          degree: edu.degree,
          graduationYear: edu.year,
        })),
        skills: result.data.skills.technical_skills.concat(result.data.skills.soft_skills),
        customFields: [],
        colorTheme: {
          primary: "#2563EB",
          secondary: "#FF00B8",
          text: "#333",
          background: "#fff"
        }
      };

      console.log('✅ Resume data transformed:', {
        personalInfo: Object.keys(resumeData.personalInfo),
        experienceCount: resumeData.workExperience.length,
        educationCount: resumeData.education.length,
        skillsCount: resumeData.skills.length
      });

      // Store and redirect
      setParsedResume(resumeData)
      console.log('💾 Stored resume data in store');
      
      console.log('🔄 Redirecting to resume builder...');
      setTimeout(() => {
        router.push('/resume-builder')
      }, 1000)

      onUploadComplete(result)
    } catch (err) {
      console.error('❌ Error processing file:', err);
      setError('Failed to process resume')
    } finally {
      setUploading(false)
    }
  }, [router, setParsedResume, onUploadComplete])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1
  })

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          {...getRootProps()}
          className={`
            p-8 border-2 border-dashed rounded-xl cursor-pointer
            transition-all duration-200 ease-in-out
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
            ${error ? 'border-red-500 bg-red-50' : ''}
            ${success ? 'border-green-500 bg-green-50' : ''}
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4">
            <AnimatePresence mode="wait">
              {!success && !error && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="p-4 rounded-full bg-blue-100"
                >
                  {uploading ? (
                    <FileText className="h-8 w-8 text-blue-600 animate-pulse" />
                  ) : (
                    <Upload className="h-8 w-8 text-blue-600" />
                  )}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="p-4 rounded-full bg-green-100"
                >
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="p-4 rounded-full bg-red-100"
                >
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">
                {uploading ? 'Processing...' : 'Upload Your Resume'}
              </h3>
              <p className="text-sm text-gray-500">
                Drop your resume here or click to browse
              </p>
              <p className="text-xs text-gray-400">
                Supports PDF, DOC, DOCX, and TXT files
              </p>
            </div>
          </div>
        </div>
      </motion.div>

   
    </div>
  )
}
