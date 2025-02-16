import React from 'react'
import { ResumeData } from "@/lib/types"
import { EditableField } from "@/components/editable-field"

// Add this utility component for HTML rendering
const HTMLContent = ({ html }: { html: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export const MinimalistTemplate = (data: ResumeData, onUpdate: (field: string, value: string) => void) => (
  <div className="space-y-6 font-sans">
    <header className="text-center">
      <EditableField
        value={data.personalInfo.name}
        onChange={(value) => onUpdate('personalInfo.name', value)}
        className="text-3xl font-bold text-gray-800"
      />
      <div className="mt-2 flex justify-center flex-wrap gap-4 text-sm text-gray-600">
        {data.personalInfo.email && (
          <EditableField
            value={data.personalInfo.email}
            onChange={(value) => onUpdate('personalInfo.email', value)}
          />
        )}
        {data.personalInfo.phone && (
          <EditableField
            value={data.personalInfo.phone}
            onChange={(value) => onUpdate('personalInfo.phone', value)}
          />
        )}
        {data.personalInfo.website && (
          <EditableField
            value={data.personalInfo.website}
            onChange={(value) => onUpdate('personalInfo.website', value)}
          />
        )}
        {data.personalInfo.location && (
          <EditableField
            value={data.personalInfo.location}
            onChange={(value) => onUpdate('personalInfo.location', value)}
          />
        )}
      </div>
      <EditableField
        value={data.personalInfo.objective}
        onChange={(value) => onUpdate('personalInfo.objective', value)}
        multiline
        className="mt-4 text-sm text-gray-600"
      />
    </header>

    {data.customFields.length > 0 && (
      <section>
        <h2 className="mb-2 text-lg font-semibold text-gray-700 uppercase tracking-wider">Additional Information</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {data.customFields.map((field) => (
            <div key={field.id}>
              <EditableField
                value={field.label}
                onChange={(value) => onUpdate(`customFields.${field.id}.label`, value)}
                className="font-medium"
              />
              :&nbsp;
              <EditableField
                value={field.value}
                onChange={(value) => onUpdate(`customFields.${field.id}.value`, value)}
              />
            </div>
          ))}
        </div>
      </section>
    )}

    {data.workExperience.length > 0 && (
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-700 uppercase tracking-wider">Experience</h2>
        <div className="space-y-6">
          {data.workExperience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-center">
                <EditableField
                  value={exp.jobTitle}
                  onChange={(value) => onUpdate(`workExperience.${exp.id}.jobTitle`, value)}
                  className="font-semibold text-gray-800"
                />
                <EditableField
                  value={exp.date}
                  onChange={(value) => onUpdate(`workExperience.${exp.id}.date`, value)}
                  className="text-sm text-gray-600"
                />
              </div>
              <EditableField
                value={exp.company}
                onChange={(value) => onUpdate(`workExperience.${exp.id}.company`, value)}
                className="text-sm text-gray-700"
              />
              {/* Replace the EditableField with HTMLContent for description */}
              <div className="mt-2 text-sm text-gray-600 prose prose-sm max-w-none">
                <HTMLContent html={exp.description} />
              </div>
            </div>
          ))}
        </div>
      </section>
    )}

    {data.education.length > 0 && (
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-700 uppercase tracking-wider">Education</h2>
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-center">
                <EditableField
                  value={edu.school}
                  onChange={(value) => onUpdate(`education.${edu.id}.school`, value)}
                  className="font-semibold text-gray-800"
                />
                <EditableField
                  value={edu.date}
                  onChange={(value) => onUpdate(`education.${edu.id}.date`, value)}
                  className="text-sm text-gray-600"
                />
              </div>
              <EditableField
                value={edu.degree}
                onChange={(value) => onUpdate(`education.${edu.id}.degree`, value)}
                className="text-sm text-gray-700"
              />
              {edu.gpa && (
                <EditableField
                  value={`GPA: ${edu.gpa}`}
                  onChange={(value) => onUpdate(`education.${edu.id}.gpa`, value.replace('GPA: ', ''))}
                  className="text-sm text-gray-600"
                />
              )}
            </div>
          ))}
        </div>
      </section>
    )}
  </div>
)
