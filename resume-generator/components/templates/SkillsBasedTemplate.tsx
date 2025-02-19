import React from 'react';
import { ResumeData, WorkExperience, Education, CustomField, TechStack } from '@/lib/types';

export function SkillsBasedTemplate(data: ResumeData) {
  // Group skills by tech stack categories with null checks
  const groupedTechStacks = data.workExperience.reduce((acc: { [key: string]: string[] }, exp) => {
    if (!exp.techStack || !Array.isArray(exp.techStack)) return acc;
    
    exp.techStack.forEach(stack => {
      if (!stack || !stack.category || !Array.isArray(stack.technologies)) return;
      
      if (!acc[stack.category]) acc[stack.category] = [];
      stack.technologies.forEach(tech => {
        if (!tech || !tech.name) return;
        if (!acc[stack.category].includes(tech.name)) {
          acc[stack.category].push(tech.name);
        }
      });
    });
    return acc;
  }, {});

  // If no tech stacks found, use regular skills array as fallback
  const hasGroupedSkills = Object.keys(groupedTechStacks).length > 0;

  return (
    <div className="max-w-[21cm] mx-auto p-6 font-sans text-gray-800">
      {/* Header with Contact Info */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center mb-2">{data.personalInfo.name}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
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

      {/* Professional Summary - Keyword Rich */}
      {data.personalInfo.objective && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-700 border-b-2 border-gray-200 pb-1">
            Professional Summary
          </h2>
          <p className="text-sm leading-6">{data.personalInfo.objective}</p>
        </section>
      )}

      {/* Technical Expertise - Primary Focus */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b-2 border-gray-200 pb-1">
          Technical Expertise
        </h2>
        {hasGroupedSkills ? (
          // Display grouped tech stacks if available
          Object.entries(groupedTechStacks).map(([category, skills]) => (
            <div key={category} className="mb-4">
              <h3 className="font-semibold text-gray-600 mb-2">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className="bg-gray-100 px-3 py-1 rounded-md text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          // Fallback to regular skills display
          <div className="flex flex-wrap gap-2">
            {data.skills?.map((skill, index) => (
              <span key={index} className="bg-gray-100 px-3 py-1 rounded-md text-sm">
                {skill}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Notable Projects & Achievements */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b-2 border-gray-200 pb-1">
          Notable Projects & Achievements
        </h2>
        <div className="grid gap-4">
          {data.workExperience.filter(job => job.projects && job.projects.length > 0).map((job) => 
            job.projects?.map((project) => (
              project && (
                <div key={project.id} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">{project.name}</h3>
                  <p className="text-sm text-gray-700">{project.description}</p>
                  {project.achievements && (
                    <div className="mt-2">
                      <div dangerouslySetInnerHTML={{ __html: project.achievements }} />
                    </div>
                  )}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-white rounded text-gray-600">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            ))
          )}
        </div>
      </section>

      {/* Professional Experience */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b-2 border-gray-200 pb-1">
          Professional Experience
        </h2>
        {data.workExperience?.map((job: WorkExperience) => (
          <div key={job.id} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{job.jobTitle}</h3>
                <div className="text-gray-600">{job.company}</div>
              </div>
              <div className="text-sm text-gray-500 whitespace-nowrap">
                {job.date}
              </div>
            </div>
            <div className="text-sm mt-2">
              <div dangerouslySetInnerHTML={{ __html: job.description }} />
              {job.achievements && (
                <div className="mt-2">
                  <div dangerouslySetInnerHTML={{ __html: job.achievements }} />
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700 border-b-2 border-gray-200 pb-1">
          Education
        </h2>
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
          <h2 className="text-xl font-semibold mb-3 text-gray-700 border-b-2 border-gray-200 pb-1">
            {field.title}
          </h2>
          <div className="text-sm text-gray-700">{field.content}</div>
        </section>
      ))}

      {/* Certifications - if available */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700 border-b-2 border-gray-200 pb-1">
            Certifications
          </h2>
          <ul className="list-disc ml-4 text-sm space-y-1">
            {data.certifications.map((cert, index) => (
              <li key={index} className="text-gray-700">{cert}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}