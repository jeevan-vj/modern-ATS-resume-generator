import React from 'react';
import { ResumeData, WorkExperience, Education, CustomField } from '@/lib/types';

export function ChronologicalTemplate(data: ResumeData) {
  return (
    <div className="max-w-[21cm] mx-auto p-6 font-sans text-gray-800">
      {/* Header Section */}
      <header className="mb-6 border-b-2 border-gray-300 pb-4">
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.name}</h1>
        <div className="flex flex-wrap gap-4 text-sm">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
          {data.personalInfo.linkedin && (
            <span>LinkedIn: {data.personalInfo.linkedin}</span>
          )}
          {data.personalInfo.website && (
            <span>Website: {data.personalInfo.website}</span>
          )}
        </div>
      </header>

      {/* Professional Summary - ATS Keyword Rich */}
      {data.personalInfo.objective && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Professional Summary</h2>
          <p className="text-sm leading-6">{data.personalInfo.objective}</p>
        </section>
      )}

      {/* Work Experience - Chronological Order */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Professional Experience</h2>
        {data.workExperience?.map((job: WorkExperience, index: number) => (
          <div key={job.id} className="mb-5">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{job.jobTitle}</h3>
                <div className="text-gray-600">{job.company}</div>
              </div>
              <div className="text-sm text-gray-500">
                {job.date}
              </div>
            </div>
            <div className="text-sm space-y-2">
              <div dangerouslySetInnerHTML={{ __html: job.description }} />
              {job.achievements && (
                <div className="mt-2">
                  <strong>Key Achievements:</strong>
                  <div dangerouslySetInnerHTML={{ __html: job.achievements }} />
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Skills Section - ATS Optimized */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Technical Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills?.map((skill, index) => (
            <span key={index} className="bg-gray-100 px-3 py-1 rounded-md text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Education</h2>
        {data.education?.map((edu: Education) => (
          <div key={edu.id} className="mb-3">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{edu.degree}</div>
                <div className="text-gray-600">{edu.school}</div>
              </div>
              <div className="text-sm text-gray-500">
                {edu.date}
              </div>
            </div>
            {edu.achievements && (
              <p className="text-sm text-gray-700 mt-1">{edu.achievements}</p>
            )}
          </div>
        ))}
      </section>

      {/* Custom Fields */}
      {data.customFields?.map((field: CustomField) => (
        <section key={field.id} className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">{field.title}</h2>
          <div className="text-sm text-gray-700">{field.content}</div>
        </section>
      ))}
    </div>
  );
}