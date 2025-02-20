import React from 'react'
import { ResumeData } from "@/lib/types"
import { EditableField } from "@/components/editable-field"

interface ExecutiveTemplateProps extends ResumeData {
  onUpdate?: (field: string, value: string) => void;
}

const HTMLContent = ({ html }: { html: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ onUpdate = () => {}, ...data }) => (
  <div className="max-w-5xl mx-auto font-sans bg-white">
    {/* Header */}
    <header className="bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <EditableField
          value={data.personalInfo?.name || ''}
          onChange={(value) => onUpdate('personalInfo.name', value)}
          className="text-3xl font-bold mb-4"
        />
        <div className="flex flex-wrap gap-4 text-gray-300 text-sm">
          {data.personalInfo?.email && (
            <EditableField
              value={data.personalInfo.email}
              onChange={(value) => onUpdate('personalInfo.email', value)}
            />
          )}
          {data.personalInfo?.phone && (
            <EditableField
              value={data.personalInfo.phone}
              onChange={(value) => onUpdate('personalInfo.phone', value)}
            />
          )}
          {data.personalInfo?.location && (
            <EditableField
              value={data.personalInfo.location}
              onChange={(value) => onUpdate('personalInfo.location', value)}
            />
          )}
          {data.personalInfo?.website && (
            <EditableField
              value={data.personalInfo.website}
              onChange={(value) => onUpdate('personalInfo.website', value)}
              className="text-blue-300 hover:underline"
            />
          )}
        </div>
        {data.personalInfo?.objective && (
          <EditableField
            value={data.personalInfo.objective}
            onChange={(value) => onUpdate('personalInfo.objective', value)}
            multiline
            className="mt-4 text-gray-300 text-sm leading-relaxed"
          />
        )}
      </div>
    </header>

    <div className="p-8 grid grid-cols-3 gap-8">
      {/* Left Column */}
      <div className="col-span-2 space-y-6">
        {/* Experience Section */}
        {data.workExperience && data.workExperience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Professional Experience</h2>
            <div className="space-y-6">
              {data.workExperience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <div>
                      <EditableField
                        value={exp.company}
                        onChange={(value) => onUpdate(`workExperience.${exp.id}.company`, value)}
                        className="font-bold text-gray-800"
                      />
                      <EditableField
                        value={exp.jobTitle}
                        onChange={(value) => onUpdate(`workExperience.${exp.id}.jobTitle`, value)}
                        className="text-gray-600"
                      />
                    </div>
                    <EditableField
                      value={exp.date}
                      onChange={(value) => onUpdate(`workExperience.${exp.id}.date`, value)}
                      className="text-sm text-gray-500"
                    />
                  </div>
                  <div className="text-sm text-gray-600 prose prose-sm max-w-none">
                    <HTMLContent html={exp.description} />
                  </div>

                  {exp.projects && exp.projects.length > 0 && (
                    <div className="mt-3 space-y-3">
                      {exp.projects?.map((project) => (
                        <div key={project.id} className="bg-gray-50 p-3 rounded">
                          <div className="flex justify-between items-center">
                            <h5 className="font-medium text-gray-700">{project?.name}</h5>
                            <span className="text-xs text-gray-500">{project?.duration}</span>
                          </div>
                          {project?.description && (
                            <div className="mt-1 text-sm text-gray-600">
                              <HTMLContent html={project.description} />
                            </div>
                          )}
                          {project?.techStack && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {project.techStack.map((tech, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-0.5 bg-white rounded text-xs text-gray-600"
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
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Core Competencies</h2>
            <div className="space-y-2">
              {data.skills.map((skill, index) => (
                <EditableField
                  key={index}
                  value={skill}
                  onChange={(value) => onUpdate(`skills.${index}`, value)}
                  className="block w-full px-3 py-2 bg-gray-50 rounded text-sm text-gray-700"
                />
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="bg-gray-50 p-3 rounded">
                  <EditableField
                    value={edu.school}
                    onChange={(value) => onUpdate(`education.${edu.id}.school`, value)}
                    className="font-medium text-gray-800"
                  />
                  <EditableField
                    value={edu.degree}
                    onChange={(value) => onUpdate(`education.${edu.id}.degree`, value)}
                    className="text-sm text-gray-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <EditableField
                      value={edu.date}
                      onChange={(value) => onUpdate(`education.${edu.id}.date`, value)}
                    />
                    {edu.gpa && (
                      <EditableField
                        value={`GPA: ${edu.gpa}`}
                        onChange={(value) => onUpdate(`education.${edu.id}.gpa`, value.replace('GPA: ', ''))}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications Section */}
        {data.certifications && data.certifications.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Certifications</h2>
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
    </div>
  </div>
)
