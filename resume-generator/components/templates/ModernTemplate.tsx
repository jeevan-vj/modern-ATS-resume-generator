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
        <div className="space-y-8">
          {data.workExperience.map((exp) => (
            <div key={exp.id} className="border-l-2 border-gray-200 pl-4">
              <div className="mb-4">
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
                {exp.companyDetails && (
                  <div className="mt-1 text-sm text-gray-500">
                    {exp.companyDetails.type} Company • {exp.companyDetails.size} • {exp.companyDetails.industry}
                  </div>
                )}
              </div>

              <div className="mt-2 text-sm text-gray-600 prose prose-sm max-w-none">
                <HTMLContent html={exp.description} />
              </div>

              {exp.projects && exp.projects.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Projects</h4>
                  <div className="space-y-4">
                    {exp.projects.map((project) => (
                      <div key={project.id} className="bg-gray-50 rounded-md p-3">
                        <div className="flex justify-between items-start">
                          <h5 className="font-medium text-gray-800">{project.name}</h5>
                          <span className="text-xs text-gray-500">{project.duration}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-1">
                            {project.techStack.map((tech, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                          {project.achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                          ))}
                        </ul>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline mt-2 inline-block"
                          >
                            View Project →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {exp.techStack && exp.techStack.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Technologies Used</h4>
                  <div className="space-y-2">
                    {exp.techStack.map((stack, index) => (
                      <div key={index}>
                        <h5 className="text-xs font-medium text-gray-600">{stack.category}</h5>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {stack.technologies.map((tech, techIndex) => (
                            <div
                              key={techIndex}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100"
                              title={`${tech.yearsOfExperience} years experience`}
                            >
                              <span className="font-medium">{tech.name}</span>
                              <span className="ml-1 text-gray-500">•</span>
                              <span className="ml-1 text-gray-500">{tech.proficiency}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {exp.teamSize && (
                <div className="mt-4 text-sm text-gray-600">
                  <strong>Team Size:</strong> {exp.teamSize}
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
