import React from 'react'
import { ResumeData } from "@/lib/types"
import { EditableField } from "@/components/editable-field"

const HTMLContent = ({ html }: { html: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export const ModernTemplate = (data: ResumeData, onUpdate: (field: string, value: string) => void) => (
  <div className="space-y-6 font-sans">
    <header className="border-b border-gray-300 pb-4">
      <EditableField
        value={data.personalInfo.name}
        onChange={(value) => onUpdate('personalInfo.name', value)}
        className="text-3xl font-bold text-gray-800"
      />
      <EditableField
        value={data.personalInfo.objective}
        onChange={(value) => onUpdate('personalInfo.objective', value)}
        multiline
        className="mt-2 text-sm text-gray-600"
      />
      <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
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
    </header>

    {data.customFields.length > 0 && (
      <section>
        <h2 className="mb-2 text-lg font-semibold text-gray-700">Additional Information</h2>
        <div className="grid grid-cols-2 gap-2">
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
        <h2 className="mb-4 text-xl font-semibold text-gray-700">Professional Experience</h2>
        <div className="space-y-6">
          {data.workExperience.map((exp) => (
            <div key={exp.id} className="border-l-2 border-gray-200 pl-4">
              <EditableField
                value={exp.jobTitle}
                onChange={(value) => onUpdate(`workExperience.${exp.id}.jobTitle`, value)}
                className="font-semibold text-gray-800"
              />
              <EditableField
                value={`${exp.company} | ${exp.date}`}
                onChange={(value) => {
                  const [company, date] = value.split('|')
                  onUpdate(`workExperience.${exp.id}.company`, company.trim())
                  onUpdate(`workExperience.${exp.id}.date`, date.trim())
                }}
                className="text-sm text-gray-600"
              />
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
        <h2 className="mb-4 text-xl font-semibold text-gray-700">Education</h2>
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id} className="border-l-2 border-gray-200 pl-4">
              <EditableField
                value={edu.degree}
                onChange={(value) => onUpdate(`education.${edu.id}.degree`, value)}
                className="font-semibold text-gray-800"
              />
              <EditableField
                value={`${edu.school} | ${edu.date}`}
                onChange={(value) => {
                  const [school, date] = value.split('|')
                  onUpdate(`education.${edu.id}.school`, school.trim())
                  onUpdate(`education.${edu.id}.date`, date.trim())
                }}
                className="text-sm text-gray-600"
              />
              {edu.gpa && (
                <EditableField
                  value={`GPA: ${edu.gpa}`}
                  onChange={(value) => onUpdate(`education.${edu.id}.gpa`, value.replace('GPA: ', ''))}
                  className="text-sm text-gray-700"
                />
              )}
            </div>
          ))}
        </div>
      </section>
    )}
  </div>
)
