import React from 'react'
import { ResumeData } from "@/lib/types"
import { EditableField } from "@/components/editable-field"

const HTMLContent = ({ html }: { html: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export const TimelineTemplate = (data: ResumeData, onUpdate: (field: string, value: string) => void) => (
  <div className="space-y-6 font-sans" style={{ color: data.colorTheme?.text || '#1F2937', backgroundColor: data.colorTheme?.background || '#FFFFFF' }}>
    <header className="flex items-center justify-between border-b-2 pb-4" style={{ borderColor: data.colorTheme?.primary || '#4B5563' }}>
      <div>
        <EditableField
          value={data.personalInfo?.name || ''}
          onChange={(value) => onUpdate('personalInfo.name', value)}
          className="text-3xl font-bold"
          style={{ color: data.colorTheme?.primary || '#4B5563' }}
        />
        {data.personalInfo?.objective && (
          <EditableField
            value={data.personalInfo.objective}
            onChange={(value) => onUpdate('personalInfo.objective', value)}
            multiline
            className="mt-2 text-sm"
          />
        )}
      </div>
      {data.personalInfo?.profileImage && (
        <img 
          src={data.personalInfo.profileImage} 
          alt={data.personalInfo?.name || 'Profile'}
          className="w-24 h-24 rounded-full object-cover"
        />
      )}
    </header>
    
    <div className="grid grid-cols-3 gap-4 text-sm">
      <div>
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
      </div>
      <div>
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
    </div>

    {data?.workExperience && data.workExperience.length > 0 && (
      <section>
        <h2 className="text-xl font-semibold mb-4" style={{ color: data.colorTheme?.secondary || '#4B5563' }}>Work Experience</h2>
        <div className="space-y-6">
          {data.workExperience.map((exp) => (
            <div key={exp.id} className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-gray-200">
              <div className="w-1/4 pr-4 text-right">
                <EditableField
                  value={exp?.date || ''}
                  onChange={(value) => onUpdate(`workExperience.${exp.id}.date`, value)}
                  className="font-semibold"
                />
              </div>
              <div className="w-3/4 border-l-2 pl-4 pb-6" style={{ borderColor: data.colorTheme?.secondary || '#4B5563' }}>
                <EditableField
                  value={exp?.jobTitle || ''}
                  onChange={(value) => onUpdate(`workExperience.${exp.id}.jobTitle`, value)}
                  className="font-semibold"
                />
                <EditableField
                  value={exp?.company || ''}
                  onChange={(value) => onUpdate(`workExperience.${exp.id}.company`, value)}
                  className="text-sm"
                  style={{ color: data.colorTheme?.primary || '#1F2937' }}
                />
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
            </div>
          ))}
        </div>
      </section>
    )}

    {data.education && data.education.length > 0 && (
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

    {data.skills && data.skills.length > 0 && (
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

    {data.certifications && data.certifications.length > 0 && (
      <section>
        <h2 className="text-xl font-semibold mb-4" style={{ color: data.colorTheme.secondary }}>Certifications</h2>
        <div className="flex flex-wrap gap-2">
          {data.certifications.map((cert, index) => (
            <EditableField
              key={index}
              value={cert}
              onChange={(value) => onUpdate(`certifications.${index}`, value)}
              className="text-sm"
            />
          ))}
        </div>
      </section>
    )}

    {data.customFields && data.customFields.length > 0 && (
      <section>
        <h2 className="text-xl font-semibold mb-4" style={{ color: data.colorTheme?.secondary || '#4B5563' }}>Additional Information</h2>
        <div className="space-y-4">
          {data.customFields.map((field) => (
            <div key={field.id} className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px]" style={{ 
              borderLeftColor: data.colorTheme?.primary || '#4B5563'
            }}>
              <h3 className="font-medium mb-2" style={{ color: data.colorTheme?.primary || '#4B5563' }}>{field.title}</h3>
              <div className="text-sm prose prose-sm max-w-none">
                <HTMLContent html={field.content.replace(/\n/g, '<br />')} />
              </div>
            </div>
          ))}
        </div>
      </section>
    )}
  </div>
)
