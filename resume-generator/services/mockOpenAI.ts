export async function mockParseResume(content: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Return mock parsed data
  return JSON.stringify({
    personal_info: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY"
    },
    work_experience: [
      {
        company: "Tech Corp",
        title: "Senior Developer",
        duration: "2020-2023",
        responsibilities: [
          "Led development of core platform features",
          "Managed team of 5 developers",
          "Improved system performance by 40%"
        ]
      },
      {
        company: "Software Inc",
        title: "Software Engineer",
        duration: "2018-2020",
        responsibilities: [
          "Developed full-stack applications",
          "Implemented CI/CD pipeline",
          "Reduced bug count by 60%"
        ]
      }
    ],
    education: [
      {
        institution: "University of Technology",
        degree: "Bachelor of Computer Science",
        year: "2018"
      }
    ],
    skills: {
      technical_skills: [
        "JavaScript",
        "React",
        "Node.js",
        "Python",
        "AWS"
      ],
      soft_skills: [
        "Leadership",
        "Communication",
        "Problem Solving"
      ]
    }
  });
}
