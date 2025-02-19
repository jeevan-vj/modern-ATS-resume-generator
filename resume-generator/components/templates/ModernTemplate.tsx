import React from 'react'
import { ResumeData } from "@/lib/types"
import { EditableField } from "@/components/editable-field"

interface ModernTemplateProps extends ResumeData {
  onUpdate?: (field: string, value: string) => void;
}

const HTMLContent = ({ html }: { html: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ onUpdate = () => {}, ...data }) => (
  <div className="space-y-6 font-sans">
    <header className="border-b border-gray-300 pb-4">
      <EditableField
        value={data.personalInfo?.name || ''}
        onChange={(value) => onUpdate('personalInfo.name', value)}
        className="text-3xl font-bold text-gray-800"
      />
      {data.personalInfo?.objective && (
        <EditableField
          value={data.personalInfo.objective}
          onChange={(value) => onUpdate('personalInfo.objective', value)}
          multiline
          className="mt-2 text-sm text-gray-600"
        />
      )}
      <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
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
        {data.personalInfo?.website && (
          <EditableField
            value={data.personalInfo.website}
            onChange={(value) => onUpdate('personalInfo.website', value)}
          />
        )}
        {data.personalInfo?.location && (
          <EditableField
            value={data.personalInfo.location}
            onChange={(value) => onUpdate('personalInfo.location', value)}
          />
        )}
      </div>
    </header>

    {data?.workExperience && data.workExperience.length > 0 && (
      <section>
        <h2 className="mb-4 text-xl font-semibold text-gray-700">Professional Experience</h2>
        <div className="space-y-8">
          {data.workExperience.map((exp) => (
            <div key={exp.id} className="border-l-2 border-gray-200 pl-4">
              <div className="mb-4">
                <EditableField
                  value={exp?.jobTitle || ''}
                  onChange={(value) => onUpdate(`workExperience.${exp.id}.jobTitle`, value)}
                  className="font-semibold text-gray-800"
                />
                <EditableField
                  value={`${exp?.company || ''} | ${exp?.date || ''}`}
                  onChange={(value) => {
                    const [company, date] = value.split('|')
                    onUpdate(`workExperience.${exp.id}.company`, company.trim())
                    onUpdate(`workExperience.${exp.id}.date`, date.trim())
                  }}
                  className="text-sm text-gray-600"
                />
              </div>

              {exp?.description && (
                <div className="mt-2 text-sm text-gray-600 prose prose-sm max-w-none">
                  <HTMLContent html={exp.description} />
                </div>
              )}

              {exp?.projects && exp.projects.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Key Projects</h4>
                  <div className="space-y-3">
                    {exp.projects.map((project) => (
                      <div key={project.id} className="border-l border-gray-200 pl-3">
                        <div className="flex justify-between items-start">
                          <h5 className="font-medium text-gray-700">{project?.name || ''}</h5>
                          <span className="text-xs text-gray-500">{project?.duration || ''}</span>
                        </div>
                        {project?.description && (
                          <div className="text-sm text-gray-600 mt-1">
                            <HTMLContent html={project.description} />
                          </div>
                        )}
                        {project?.techStack && project.techStack.length > 0 && (
                          <div className="mt-2">
                            <div className="flex flex-wrap gap-1">
                              {project.techStack.map((tech, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {project?.achievements && (
                          <div className="mt-2 text-sm text-gray-600 prose prose-sm max-w-none">
                            <HTMLContent html={project.achievements} />
                          </div>
                        )}
                        {project?.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-600 hover:underline mt-2 inline-block"
                          >
                            View Project →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {exp?.techStack && exp.techStack.length > 0 && (
                <div className="mt-2 text-sm text-gray-600 prose prose-sm max-w-none">
                  <HTMLContent html={exp.techStack.join(', ')} />
                </div>
              )}
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

    {data.skills && data.skills.length > 0 && (
      <section>
        <h2 className="mb-4 text-xl font-semibold text-gray-700">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <EditableField
              key={index}
              value={skill}
              onChange={(value) => onUpdate(`skills.${index}`, value)}
              className="text-sm text-gray-600"
            />
          ))}
        </div>
      </section>
    )}

    {data.certifications && data.certifications.length > 0 && (
      <section>
        <h2 className="mb-4 text-xl font-semibold text-gray-700">Certifications</h2>
        <div className="flex flex-wrap gap-2">
          {data.certifications.map((cert, index) => (
            <EditableField
              key={index}
              value={cert}
              onChange={(value) => onUpdate(`certifications.${index}`, value)}
              className="text-sm text-gray-600"
            />
          ))}
        </div>
      </section>
    )}

    {data.customFields && data.customFields.length > 0 && (
      <section>
        <h2 className="mb-4 text-xl font-semibold text-gray-700">Additional Information</h2>
        <div className="space-y-4">
          {data.customFields.map((field) => (
            <div key={field.id} className="border-l-2 border-gray-100 pl-4">
              <h3 className="font-medium text-gray-700 mb-2">{field.title}</h3>
              <div className="text-sm text-gray-600 prose prose-sm max-w-none">
                <HTMLContent html={field.content.replace(/\n/g, '<br />')} />
              </div>
            </div>
          ))}
        </div>
      </section>
    )}
  </div>
)
