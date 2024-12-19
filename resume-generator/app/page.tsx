'use client'

import { Header } from "@/components/header"
import { ResumePreview } from "@/components/resume-preview"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, CheckCircle, Sparkles, Star } from "lucide-react"
import { ResumeData } from "@/lib/types"
import { templates } from "@/lib/templates"

// Sample resume data
const sampleData: ResumeData = {
  personalInfo: {
    name: "John Doe",
    email: "john@example.com",
    phone: "",
    website: "",
    location: "",
    objective: "Sample Resume"
  },
  workExperience: [],
  education: [],
  skills: [],
  customFields: [],
  colorTheme: {
    primary: "#2563EB",
    secondary: "#FF00B8",
    text: "#333",
    background: "#fff"
  }
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const features = [
  { title: "ATS Friendly", description: "Optimized for Applicant Tracking Systems", icon: CheckCircle },
  { title: "Modern Templates", description: "Professional and customizable designs", icon: Sparkles },
  { title: "Easy to Use", description: "Intuitive drag-and-drop interface", icon: Star },
]

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      <main className="relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        {/* Hero Section */}
        <section className="container pt-20 pb-16">
          <motion.div 
            className="max-w-4xl mx-auto text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight"
              {...fadeInUp}
            >
              Build Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Professional Resume
              </span>
              {" "}in Minutes
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              {...fadeInUp}
            >
              Create ATS-friendly resumes with our modern, professional templates. 
              Stand out from the crowd and land your dream job.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              {...fadeInUp}
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg group" asChild>
                <Link href="/resume-builder">
                  Create Resume
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Link href="/parser" className="text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-2">
                Test ATS Score
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="p-6 bg-white rounded-lg shadow-md text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Resume Preview Section */}
        <section className="container py-16">
          <div className="flex justify-center">
            <ResumePreview 
              data={sampleData} 
              template={templates[0]} 
              onChange={(data) => console.log('Resume updated:', data)} 
            />
          </div>
        </section>
      </main>
    </div>
  )
}

