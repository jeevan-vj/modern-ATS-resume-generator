import React from 'react'
import { ResumeData } from "@/lib/types"
import { EditableField } from "@/components/editable-field"

const HTMLContent = ({ html }: { html: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export const TimelineTemplate = (data: ResumeData, onUpdate: (field: string, value: string) => void) => (
  <div className="space-y-6 font-sans" style={{ color: data.colorTheme.text, backgroundColor: data.colorTheme.background }}>
    <header className="flex items-center justify-between border-b-2 pb-4" style={{ borderColor: data.colorTheme.primary }}>
      <div>
        <EditableField
          value={data.personalInfo.name}
          onChange={(value) => onUpdate('personalInfo.name', value)}
          className="text-3xl font-bold"
          style={{ color: data.colorTheme.primary }}
        />
        <EditableField
          value={data.personalInfo.objective}
          onChange={(value) => onUpdate('personalInfo.objective', value)}
          multiline
          className="mt-2 text-sm"
        />
      </div>
      {data.personalInfo.profileImage && (
        <img 
          src={data.personalInfo.profileImage} 
          alt={data.personalInfo.name} 
          className="w-24 h-24 rounded-full object-cover"
        />
      )}
    </header>
    
    <div className="grid grid-cols-3 gap-4 text-sm">
      <div>
        <EditableField
          value={data.personalInfo.email}
          onChange={(value) => onUpdate('personalInfo.email', value)}
        />
        <EditableField
          value={data.personalInfo.phone}
          onChange={(value) => onUpdate('personalInfo.phone', value)}
        />
      </div>
      <div>
        <EditableField
          value={data.personalInfo.website}
          onChange={(value) => onUpdate('personalInfo.website', value)}
        />
        <EditableField
          value={data.personalInfo.location}
          onChange={(value) => onUpdate('personalInfo.location', value)}
        />
      </div>
    </div>

    {data.customFields.length > 0 && (
      <section>
        <h2 className="text-xl font-semibold mb-2" style={{ color: data.colorTheme.secondary }}>Additional Information</h2>
        <div className="grid grid-cols-2 gap-2">
          {data.customFields.map((field) => (
            <div key={field.id}>
              <EditableField
                value={field.label}
                onChange={(value) => onUpdate(`customFields.${field.id}.label`, value)}
                className="font-medium"
                style={{ color: data.colorTheme.primary }}
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
        <h2 className="text-xl font-semibold mb-4" style={{ color: data.colorTheme.secondary }}>Work Experience</h2>
        <div className="space-y-6">
          {data.workExperience.map((exp) => (
            <div key={exp.id} className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-gray-200">
              <div className="w-1/4 pr-4 text-right">
                <EditableField
                  value={exp.date}
                  onChange={(value) => onUpdate(`workExperience.${exp.id}.date`, value)}
                  className="font-semibold"
                />
              </div>
              <div className="w-3/4 border-l-2 pl-4 pb-6" style={{ borderColor: data.colorTheme.secondary }}>
                <EditableField
                  value={exp.jobTitle}
                  onChange={(value) => onUpdate(`workExperience.${exp.id}.jobTitle`, value)}
                  className="font-semibold"
                />
                <EditableField
                  value={exp.company}
                  onChange={(value) => onUpdate(`workExperience.${exp.id}.company`, value)}
                  className="text-sm"
                  style={{ color: data.colorTheme.primary }}
                />
                <div className="mt-2 text-sm text-gray-600 prose prose-sm max-w-none">
                  <HTMLContent html={exp.description} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )}

    {data.education.length > 0 && (
      <section>
        <h2 className="text-xl font-semibold mb-4" style={{ color: data.colorTheme.secondary }}>Education</h2>
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id} className="flex">
              <div className="w-1/4 pr-4 text-right">
                <EditableField
                  value={edu.date}
                  onChange={(value) => onUpdate(`education.${edu.id}.date`, value)}
                  className="font-semibold"
                />
              </div>
              <div className="w-3/4 border-l-2 pl-4" style={{ borderColor: data.colorTheme.secondary }}>
                <EditableField
                  value={edu.degree}
                  onChange={(value) => onUpdate(`education.${edu.id}.degree`, value)}
                  className="font-semibold"
                />
                <EditableField
                  value={edu.school}
                  onChange={(value) => onUpdate(`education.${edu.id}.school`, value)}
                  className="text-sm"
                  style={{ color: data.colorTheme.primary }}
                />
                {edu.gpa && (
                  <EditableField
                    value={`GPA: ${edu.gpa}`}
                    onChange={(value) => onUpdate(`education.${edu.id}.gpa`, value.replace('GPA: ', ''))}
                    className="text-sm"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    )}

    {data.skills.length > 0 && (
      <section>
        <h2 className="text-xl font-semibold mb-4" style={{ color: data.colorTheme.secondary }}>Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <span 
              key={index} 
              className="px-3 py-1 rounded-full text-sm" 
              style={{ backgroundColor: data.colorTheme.primary, color: data.colorTheme.background }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    )}
  </div>
)
