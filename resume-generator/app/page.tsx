'use client'

import { Header } from "@/components/header"
import { ResumePreview } from "@/components/resume-preview"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowRight, CheckCircle, Sparkles, Star, FileText, Zap, Shield, Users, Award, Trophy, ChevronRight, ScrollText, Clock, Check, X } from "lucide-react"
import { ResumeData } from "@/lib/types"
import { templates } from "@/lib/templates"
import { useRef, useState, useEffect } from 'react'
import { useInView as useInViewIntersection } from 'react-intersection-observer'

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
  transition: { duration: 0.5, ease: "easeOut" }
}

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const features = [
  { 
    title: "AI-Powered Optimization", 
    description: "Smart suggestions to improve your resume content",
    icon: Zap,
    gradient: "from-violet-600 to-indigo-600"
  },
  { 
    title: "ATS-Friendly Templates", 
    description: "Engineered for maximum visibility in hiring systems",
    icon: Shield,
    gradient: "from-blue-600 to-cyan-600"
  },
  { 
    title: "Smart Formatting", 
    description: "Professional layouts that adapt to your content",
    icon: FileText,
    gradient: "from-cyan-600 to-teal-600"
  },
]

const stats = [
  {
    value: "10K+",
    label: "Resumes Created",
    icon: Users,
    gradient: "from-pink-600 to-rose-600"
  },
  {
    value: "98%",
    label: "Success Rate",
    icon: Trophy,
    gradient: "from-amber-600 to-orange-600"
  },
  {
    value: "24/7",
    label: "AI Assistance",
    icon: Award,
    gradient: "from-green-600 to-emerald-600"
  }
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "Google",
    image: "/images/testimonials/avatar1.jpg",
    text: "This tool helped me land my dream job! The AI suggestions were spot-on."
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "Microsoft",
    text: "The ATS optimization feature is a game-changer. Highly recommended!"
  },
  {
    name: "Emma Davis",
    role: "UX Designer",
    company: "Apple",
    text: "Beautiful templates and intuitive interface. Made resume creation a breeze!"
  }
]

const processSteps = [
  {
    title: "Choose Template",
    description: "Pick from our collection of ATS-optimized templates",
    icon: ScrollText,
    gradient: "from-pink-600 to-rose-600"
  },
  {
    title: "Add Content",
    description: "Fill in your details with AI-powered suggestions",
    icon: Sparkles,
    gradient: "from-violet-600 to-purple-600"
  },
  {
    title: "Generate & Download",
    description: "Get your perfect resume in minutes",
    icon: Clock,
    gradient: "from-blue-600 to-cyan-600"
  }
]

const comparisonFeatures = [
  {
    feature: "AI-Powered Content Suggestions",
    us: true,
    others: false
  },
  {
    feature: "ATS-Optimized Templates",
    us: true,
    others: false
  },
  {
    feature: "Real-time ATS Score",
    us: true,
    others: false
  },
  {
    feature: "Smart Formatting",
    us: true,
    others: true
  },
  {
    feature: "Multiple Export Formats",
    us: true,
    others: true
  }
]

interface AnimatedCounterProps {
  end: number;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInViewIntersection({ threshold: 0.3, triggerOnce: true })

  useEffect(() => {
    if (inView) {
      let startTime: number | null = null
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [inView, end, duration])

  return (
    <span ref={ref} className="font-bold text-4xl md:text-5xl bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
      {count}+
    </span>
  )
}

export default function Page() {
  const comparisonRef = useRef(null)
  const isComparisonInView = useInView(comparisonRef, { once: true, margin: "-100px" })

  const ctaRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="relative">
        {/* Enhanced gradient background with noise texture */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-80"
            style={{ 
              maskImage: 'radial-gradient(circle at center, black, transparent)',
              WebkitMaskImage: 'radial-gradient(circle at center, black, transparent)',
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noise)" opacity="0.4"/%3E%3C/svg%3E")'
            }}
          />
        </div>

        {/* Hero Section */}
        <section className="container pt-24 lg:pt-32 pb-16">
          <motion.div 
            className="max-w-5xl mx-auto text-center space-y-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div 
              className="inline-block mb-4 px-4 py-1.5 bg-gradient-to-r from-blue-600/10 to-violet-600/10 rounded-full"
              variants={fadeInUp}
            >
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                AI-Powered Resume Builder
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
              variants={fadeInUp}
            >
              Create an
              <span className="relative mx-2">
                <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600/20 to-violet-600/20 blur-lg"></span>
                <span className="relative bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  impressive
                </span>
              </span>
              resume instantly
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Stand out with an ATS-optimized resume. Our AI-powered platform helps you craft the perfect resume in minutes.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
              variants={fadeInUp}
            >
              <Button 
                size="lg" 
                className="relative group bg-gradient-to-r from-blue-600 to-violet-600 hover:opacity-90 text-lg px-8"
                asChild
              >
                <Link href="/resume-builder">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  <span className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 opacity-30 blur-lg group-hover:opacity-50 transition"></span>
                </Link>
              </Button>
              <Link 
                href="/parser" 
                className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Test ATS Score
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Section - Enhanced */}
        <section className="container py-16">
          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div 
              variants={fadeInUp}
              className="relative group bg-white rounded-2xl p-6 text-center"
              whileHover={{ y: -5 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative">
                <AnimatedCounter end={10000} />
                <p className="text-gray-600 mt-2">Resumes Created</p>
              </div>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="relative group bg-white rounded-2xl p-6 text-center"
              whileHover={{ y: -5 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative">
                <AnimatedCounter end={98} />
                <p className="text-gray-600 mt-2">Success Rate</p>
              </div>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="relative group bg-white rounded-2xl p-6 text-center"
              whileHover={{ y: -5 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative">
                <AnimatedCounter end={24} duration={1} />
                <p className="text-gray-600 mt-2">Hour Support</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container py-24">
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="relative group"
                variants={fadeInUp}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative p-8 bg-white rounded-2xl">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section className="container py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/0 via-gray-50 to-gray-50/0" />
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create your professional resume in three simple steps
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 relative"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Connection lines */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600/20 to-violet-600/20 -translate-y-1/2 hidden md:block" />
            
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative"
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${step.gradient} mb-6`}>
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden md:block">
                  {index < processSteps.length - 1 && (
                    <ChevronRight className="w-8 h-8 text-gray-400" />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Floating Features Grid */}
        <section className="container py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/0 via-gray-50 to-gray-50/0" />
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur opacity-30" />
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 mb-4`} />
                  <div className="h-4 w-2/3 bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-full bg-gray-100 rounded" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Comparison Section */}
        <section 
          ref={comparisonRef}
          className="container py-24 relative"
        >
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how we compare to traditional resume builders
            </p>
          </motion.div>

          <motion.div 
            className="max-w-3xl mx-auto"
            style={{
              opacity: isComparisonInView ? 1 : 0,
              transform: isComparisonInView ? "none" : "translateY(20px)",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-3 p-6 border-b">
                <div className="col-span-1 font-semibold">Features</div>
                <div className="text-center font-semibold text-blue-600">Our Platform</div>
                <div className="text-center font-semibold text-gray-600">Others</div>
              </div>
              {comparisonFeatures.map((item, index) => (
                <div 
                  key={index}
                  className="grid grid-cols-3 p-6 border-b last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="col-span-1">{item.feature}</div>
                  <div className="text-center">
                    {item.us ? (
                      <Check className="inline-block text-green-500 w-6 h-6" />
                    ) : (
                      <X className="inline-block text-red-500 w-6 h-6" />
                    )}
                  </div>
                  <div className="text-center">
                    {item.others ? (
                      <Check className="inline-block text-green-500 w-6 h-6" />
                    ) : (
                      <X className="inline-block text-red-500 w-6 h-6" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section className="container py-24 relative overflow-hidden">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied professionals who've built their perfect resume
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
                <div className="relative bg-white p-8 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600">{testimonial.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Template Showcase Section */}
        <section className="container py-24 relative">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-4xl font-bold mb-4">Professional Templates</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our collection of ATS-friendly templates
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {templates.slice(0, 4).map((template, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative group cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-500" />
                <div className="relative bg-white p-2 rounded-lg">
                  <img 
                    src={`/images/templates/${template.previewImage}`} 
                    alt={template.name} 
                    className="w-full h-auto rounded shadow-sm"
                  />
                  <div className="mt-2 text-center">
                    <h3 className="font-medium">{template.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            variants={fadeInUp}
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-violet-600"
              asChild
            >
              <Link href="/resume-builder">
                View All Templates
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </section>

        {/* Trust Badges Section */}
        <section className="container pb-24">
          <motion.div 
            className="text-center"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h3 className="text-2xl font-semibold mb-8">Trusted by professionals from</h3>
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
              {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map((company) => (
                <div key={company} className="text-xl font-bold text-gray-400">
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Final CTA Section */}
        <section 
          ref={ctaRef}
          className="container py-32 relative"
        >
          <motion.div 
            style={{ y, opacity }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur-lg opacity-50" />
              <div className="relative bg-white rounded-2xl p-12 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-violet-600/20 rounded-full -translate-x-16 -translate-y-16" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-600/20 to-blue-600/20 rounded-full translate-x-16 translate-y-16" />
                
                <div className="relative text-center space-y-8">
                  <h2 className="text-4xl md:text-5xl font-bold">
                    Ready to build your perfect resume?
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Join thousands of professionals who've already landed their dream jobs
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-blue-600 to-violet-600 text-lg px-8 hover:opacity-90"
                      asChild
                    >
                      <Link href="/resume-builder">
                        Get Started Free
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="text-lg px-8"
                      asChild
                    >
                      <Link href="/templates">
                        View Templates
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}

