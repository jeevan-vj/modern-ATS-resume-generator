import { Header } from "@/components/header"
import { ResumePreview } from "@/components/resume-preview"
import { Steps } from "@/components/steps"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <section className="container grid items-center gap-8 pb-16 pt-24 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col items-start space-y-4">
            <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl">
              Create a professional{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                resume easily
              </span>
            </h1>
            <p className="text-lg text-gray-600">
              With this free, open-source, and powerful resume builder
            </p>
            <Button size="lg" asChild>
              <Link href="/resume-builder">Create Resume</Link>
            </Button>
            <p className="text-sm text-gray-500">No sign up required</p>
            <p className="text-sm text-gray-600">
              Already have a resume? Test its ATS readability with the{" "}
              <Link href="/parser" className="text-blue-600 hover:underline">
                resume parser
              </Link>
            </p>
          </div>
          <div className="flex justify-center">
            <ResumePreview />
          </div>
        </section>
        <Steps />
      </main>
    </div>
  )
}

