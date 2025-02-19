'use client';

import { exportResumeAsHTML } from "@/utils/exportResume"
import { useResumeStore } from "@/store/resumeStore"

export default function ResumePage() {
  const { parsedResume } = useResumeStore()

  return (
    <div>
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={() => parsedResume && exportResumeAsHTML(parsedResume)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
          disabled={!parsedResume}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download HTML
        </button>
      </div>
      // ...existing code...
    </div>
  )
}
