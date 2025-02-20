import React from 'react'
import { ResumeData } from "@/lib/types"
import { EditableField } from "@/components/editable-field"

interface CompactTemplateProps extends ResumeData {
  onUpdate?: (field: string, value: string) => void;
}

const HTMLContent = ({ html }: { html: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export const CompactTemplate: React.FC<CompactTemplateProps> = ({ onUpdate = () => {}, ...data }) => (
  <div className="max-w-4xl mx-auto font-sans p-8 space-y-6">
    {/* Header Section */}
    <header className="border-b pb-4">
      <EditableField
        value={data.personalInfo?.name || ''}
        onChange={(value) => onUpdate('personalInfo.name', value)}
        className="text-2xl font-bold text-gray-800"
      />
      <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-600">
        {data.personalInfo?.email && (
          <EditableField
            value={data.personalInfo.email}
            onChange={(value) => onUpdate('personalInfo.email', value)}
          />
        )}
        {data.personalInfo?.phone && (
          <span className="text-gray-400">|</span>
        )}
        {data.personalInfo?.phone && (
          <EditableField
            value={data.personalInfo.phone}
            onChange={(value) => onUpdate('personalInfo.phone', value)}
          />
        )}
        {data.personalInfo?.location && (
          <span className="text-gray-400">|</span>
        )}
        {data.personalInfo?.location && (
          <EditableField
            value={data.personalInfo.location}
            onChange={(value) => onUpdate('personalInfo.location', value)}
          />
        )}
        {data.personalInfo?.website && (
          <span className="text-gray-400">|</span>
        )}
        {data.personalInfo?.website && (
          <EditableField
            value={data.personalInfo.website}
            onChange={(value) => onUpdate('personalInfo.website', value)}
            className="text-blue-600 hover:underline"
          />
        )}
      </div>
    </header>

    {/* Professional Summary */}
    {data.personalInfo?.objective && (
      <section className="py-2">
        <EditableField
          value={data.personalInfo.objective}
          onChange={(value) => onUpdate('personalInfo.objective', value)}
          multiline
          className="text-sm text-gray-600 leading-relaxed"
        />
      </section>
    )}

    {/* Experience Section */}
    {data.workExperience && data.workExperience.length > 0 && (
      <section className="py-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Professional Experience</h2>
        <div className="space-y-4">
          {data.workExperience.map((exp) => (
            <div key={exp.id} className="border-l-2 border-gray-100 pl-4">
              <div className="flex justify-between items-baseline">
                <EditableField
                  value={exp.company}
                  onChange={(value) => onUpdate(`workExperience.${exp.id}.company`, value)}
                  className="font-medium text-gray-800"
                />
                <EditableField
                  value={exp.date}
                  onChange={(value) => onUpdate(`workExperience.${exp.id}.date`, value)}
                  className="text-sm text-gray-500"
                />
              </div>
              <EditableField
                value={exp.jobTitle}
                onChange={(value) => onUpdate(`workExperience.${exp.id}.jobTitle`, value)}
                className="text-sm font-medium text-gray-700 mt-1"
              />
              <div className="mt-2 text-sm text-gray-600">
                <HTMLContent html={exp.description} />
              </div>
              
              {exp.projects && exp.projects.length > 0 && (
                <div className="mt-2 space-y-2">
                  {exp.projects?.map((project) => (
                    <div key={project.id} className="text-sm">
                      <div className="font-medium text-gray-700">{project.name}</div>
                      {project.description && (
                        <div className="text-gray-600 mt-1">
                          <HTMLContent html={project.description} />
                        </div>
                      )}
                      {project.techStack && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {project.techStack.map((tech, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Skills Section */}
    {data.skills && data.skills.length > 0 && (
      <section className="py-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Technical Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <EditableField
              key={index}
              value={skill}
              onChange={(value) => onUpdate(`skills.${index}`, value)}
              className="bg-gray-50 px-3 py-1 rounded text-sm text-gray-700"
            />
          ))}
        </div>
      </section>
    )}

    {/* Education Section */}
    {data.education.length > 0 && (
      <section className="py-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Education</h2>
        <div className="space-y-3">
          {data.education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline">
                <EditableField
                  value={edu.school}
                  onChange={(value) => onUpdate(`education.${edu.id}.school`, value)}
                  className="font-medium text-gray-800"
                />
                <EditableField
                  value={edu.date}
                  onChange={(value) => onUpdate(`education.${edu.id}.date`, value)}
                  className="text-sm text-gray-500"
                />
              </div>
              <EditableField
                value={edu.degree}
                onChange={(value) => onUpdate(`education.${edu.id}.degree`, value)}
                className="text-sm text-gray-700"
              />
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Certifications Section */}
    {data.certifications && data.certifications.length > 0 && (
      <section className="py-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Certifications</h2>
        <div className="space-y-2">
          {data.certifications.map((cert, index) => (
            <EditableField
              key={index}
              value={cert}
              onChange={(value) => onUpdate(`certifications.${index}`, value)}
              className="text-sm text-gray-700"
            />
          ))}
        </div>
      </section>
    )}
  </div>
)
