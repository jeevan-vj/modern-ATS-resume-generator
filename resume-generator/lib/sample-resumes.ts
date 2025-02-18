import { ResumeData } from "./types"

export const sampleResumes: ResumeData[] = [
  {
    personalInfo: {
      name: "David Chen",
      objective: "Lead Software Engineer with 10+ years of experience specializing in cloud-native architectures and technical leadership. Proven track record of mentoring engineering teams, driving technical excellence, and delivering scalable solutions using .NET, AWS, and modern development practices. Passionate about fostering inclusive team cultures and driving engineering best practices.",
      email: "david.chen@email.com",
      phone: "(555) 123-4567",
      website: "github.com/davidchen-tech",
      location: "Melbourne, Australia",
      linkedin: "linkedin.com/in/davidchen-tech"
    },
    workExperience: [
      {
        id: "1",
        company: "FinTech Solutions Ltd.",
        jobTitle: "Technical Lead / Senior Software Engineer",
        date: "2020 - Present",
        description: `<ul>
          <li>Led a cross-functional team of 8 engineers in developing and maintaining microservices architecture handling <strong>2M+ daily transactions</strong></li>
          <li>Architected and implemented migration from monolith to microservices using .NET Core, reducing deployment time by <strong>70%</strong></li>
          <li>Established CI/CD pipelines using GitHub Actions and AWS, achieving <strong>99.9% deployment success rate</strong></li>
          <li>Mentored 12+ junior and mid-level developers through technical guidance and code reviews</li>
          <li>Implemented comprehensive monitoring and observability using DataDog and OpenTelemetry</li>
          <li>Drove adoption of container orchestration using Kubernetes, improving system reliability by <strong>40%</strong></li>
        </ul>`,
        projects: [
          {
            id: "p1",
            name: "Payment Gateway Migration",
            description: "Led the migration of legacy payment system to modern microservices architecture",
            techStack: ["C#", ".NET 6", "Azure Service Bus", "Redis", "PostgreSQL", "Docker", "Kubernetes"],
            role: "Tech Lead",
            achievements: `<ul>
              <li>Reduced payment processing latency by 65%</li>
              <li>Improved system scalability to handle 3x transaction volume</li>
              <li>Implemented real-time payment status tracking</li>
            </ul>`,
            duration: "8 months"
          },
          {
            id: "p2",
            name: "Developer Platform",
            description: "Built internal developer platform for standardizing microservices development",
            techStack: ["TypeScript", "React", "Node.js", "GraphQL", "Docker", "AWS ECS"],
            role: "Architecture Lead",
            achievements: `<ul>
              <li>Reduced new service bootstrapping time from 2 weeks to 2 days</li>
              <li>Implemented automated compliance checks</li>
              <li>Created comprehensive documentation and tutorials</li>
            </ul>`,
            duration: "6 months",
            url: "github.com/fintech/dev-platform"
          }
        ],
        techStack: [
          {
            category: "Backend",
            technologies: [
              {
                name: "C# / .NET Core",
                proficiency: "Expert",
                yearsOfExperience: 8
              },
              {
                name: "Node.js",
                proficiency: "Advanced",
                yearsOfExperience: 5
              }
            ]
          },
          {
            category: "Cloud & DevOps",
            technologies: [
              {
                name: "AWS",
                proficiency: "Expert",
                yearsOfExperience: 6
              },
              {
                name: "Kubernetes",
                proficiency: "Advanced",
                yearsOfExperience: 4
              }
            ]
          }
        ],
        teamSize: "8 engineers (2 senior, 4 mid-level, 2 junior)",
        responsibilities: [
          "Technical architecture and design decisions",
          "Code review and mentoring",
          "Sprint planning and estimation",
          "Stakeholder communication",
          "Performance optimization"
        ],
        companyDetails: {
          industry: "FinTech",
          size: "Medium (200-500)",
          type: "Product"
        },
        achievements: `<ul>
          <li>Promoted to Tech Lead within 1 year</li>
          <li>Reduced production incidents by 70%</li>
          <li>Implemented company-wide coding standards</li>
        </ul>`,
        reportingTo: "VP of Engineering",
        keywords: [
          "microservices",
          "cloud architecture",
          "team leadership",
          "agile",
          "devops",
          "financial systems"
        ]
      },
      {
        id: "2",
        company: "Cloud Systems Inc.",
        jobTitle: "Senior Software Engineer",
        date: "2017 - 2020",
        description: `<ul>
          <li>Developed and maintained microservices using <strong>C# .NET Core</strong> and AWS services (Lambda, ECS, DynamoDB)</li>
          <li>Led migration to TypeScript and React for front-end applications, improving code quality by <strong>45%</strong></li>
          <li>Implemented automated testing strategy achieving <strong>90% code coverage</strong> across services</li>
          <li>Mentored team of 5 developers in AWS best practices and cloud-native development</li>
          <li>Established engineering excellence guidelines and documentation practices</li>
        </ul>`
      },
      {
        id: "3",
        company: "Digital Solutions Corp",
        jobTitle: "Full Stack Developer",
        date: "2014 - 2017",
        description: "• Built and maintained scalable web applications using .NET Framework and Angular\n• Implemented continuous integration practices reducing build times by 50%\n• Collaborated with product teams to deliver features impacting 100K+ users\n• Conducted technical interviews and onboarding for new team members"
      }
    ],
    education: [
      {
        id: "1",
        school: "University of Melbourne",
        degree: "M.S. in Software Engineering",
        date: "2012 - 2014",
        gpa: "3.9",
        achievements: "Research focus on Distributed Systems and Cloud Computing"
      }
    ],
    skills: [
      "Languages & Frameworks: C#, .NET Core, TypeScript, React",
      "Cloud & Infrastructure: AWS (Certified Solutions Architect), Docker, Kubernetes",
      "DevOps: CI/CD, GitHub Actions, Azure DevOps, Terraform",
      "Monitoring: DataDog, OpenTelemetry, ELK Stack",
      "Architecture: Microservices, Event-Driven Design, Domain-Driven Design",
      "Leadership: Team Mentoring, Technical Planning, Agile Methodologies"
    ],
    certifications: [
      "AWS Certified Solutions Architect - Professional",
      "Microsoft Certified: Azure Solutions Architect",
      "Certified Kubernetes Administrator (CKA)"
    ],
    customFields: [
      {
        id: "1",
        title: "Technical Leadership",
        content: "• Led architectural decisions for cloud-native applications serving millions of users\n• Established engineering excellence programs and mentorship initiatives\n• Active contributor to technical blog and engineering community"
      },
      {
        id: "2",
        title: "Community Involvement",
        content: "• Regular speaker at .NET and Cloud Computing meetups\n• Mentor in Women in Tech program\n• Open source contributor to various .NET and React projects"
      }
    ],
    colorTheme: {
      primary: "#0891B2",
      secondary: "#6366F1",
      text: "#1F2937",
      background: "#FFFFFF"
    }
  },
  {
    personalInfo: {
      name: "Alex Johnson",
      objective: "Senior Software Engineer with 8+ years of experience specializing in cloud architecture, distributed systems, and full-stack development. Proven track record of leading high-performance engineering teams and delivering scalable solutions using modern technologies.",
      email: "alex.johnson@email.com",
      phone: "(555) 123-4567",
      website: "github.com/alexjohnson",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/alexjohnson"
    },
    workExperience: [
      {
        id: "1",
        company: "Tech Innovations Inc.",
        jobTitle: "Senior Software Engineer",
        date: "2018 - Present",
        description: `<ul>
          <li>Architected and implemented microservices-based architecture reducing system latency by <strong>40%</strong></li>
          <li>Led a team of 6 engineers in developing cloud-native applications using <strong>AWS, Kubernetes, and Docker</strong></li>
          <li>Implemented automated CI/CD pipelines reducing deployment time by <strong>60%</strong></li>
          <li>Mentored 8 junior developers in best practices and modern development methodologies</li>
        </ul>`,
        achievements: `<ul>
          <li>Received Outstanding Technical Leadership award</li>
          <li>Improved system performance by 40% through architecture optimization</li>
          <li>Successfully mentored 3 junior developers to senior positions</li>
        </ul>`,
        projects: [
          {
            id: "p1",
            name: "Cloud Migration Initiative",
            description: "Led the migration of on-premise applications to AWS cloud",
            techStack: ["AWS", "Terraform", "Docker", "Kubernetes"],
            role: "Technical Lead",
            achievements: `<ul>
              <li>Reduced infrastructure costs by 45%</li>
              <li>Improved system availability to 99.99%</li>
              <li>Implemented automated disaster recovery</li>
            </ul>`,
            duration: "12 months"
          }
        ]
      },
      {
        id: "2",
        company: "StartUp Solutions",
        jobTitle: "Full Stack Developer",
        date: "2015 - 2018",
        description: `<ul>
          <li>Developed RESTful APIs serving <strong>1M+ daily requests</strong> using Node.js and Express</li>
          <li>Built responsive web applications using <strong>React, Redux, and TypeScript</strong></li>
          <li>Optimized PostgreSQL database queries improving application performance by <strong>35%</strong></li>
          <li>Implemented automated testing achieving <strong>90% code coverage</strong></li>
        </ul>`,
        achievements: `<ul>
          <li>Led successful migration from MongoDB to PostgreSQL</li>
          <li>Reduced API response time by 35%</li>
          <li>Implemented comprehensive test automation strategy</li>
        </ul>`,
        projects: [
          {
            id: "p1",
            name: "E-commerce Platform",
            description: "Built scalable e-commerce platform handling millions in transactions",
            techStack: ["Node.js", "React", "PostgreSQL", "Redis"],
            role: "Full Stack Developer",
            achievements: `<ul>
              <li>Implemented real-time inventory management</li>
              <li>Reduced checkout time by 40%</li>
              <li>Built analytics dashboard for sales tracking</li>
            </ul>`,
            duration: "18 months"
          }
        ]
      }
    ],
    education: [
      {
        id: "1",
        school: "University of California, Berkeley",
        degree: "B.S. in Computer Science",
        date: "2011 - 5",
        gpa: "3.8",
        achievements: "Data Structures Teaching Assistant, ACM Programming Team"
      }
    ],
    skills: [
      "Languages: JavaScript, TypeScript, Python, Java, SQL",
      "Frontend: React, Redux, Vue.js, HTML5, CSS3, Webpack",
      "Backend: Node.js, Express, Django, Spring Boot",
      "Cloud: AWS (EC2, S3, Lambda), Docker, Kubernetes",
      "Databases: PostgreSQL, MongoDB, Redis",
      "Tools: Git, Jenkins, Jest, CircleCI"
    ],
    certifications: [
      "AWS Certified Solutions Architect",
      "Google Cloud Professional Developer"
    ],
    customFields: [
      {
        id: "1",
        title: "Projects",
        content: "• Open-source Kubernetes operator for automated database scaling (2.5k+ GitHub stars)\n• Real-time data visualization dashboard using D3.js and WebSocket"
      }
    ],
    colorTheme: {
      primary: "#2563EB",
      secondary: "#0EA5E9",
      text: "#1F2937",
      background: "#FFFFFF"
    }
  },
  {
    personalInfo: {
      name: "Emily Chen",
      objective: "Dedicated marketing professional with a passion for digital strategy and brand development.",
      email: "emily.chen@email.com",
      phone: "(555) 987-6543",
      website: "www.emilychen.com",
      location: "New York, NY"
    },
    workExperience: [
      {
        id: "1",
        company: "Global Brands Co.",
        jobTitle: "Digital Marketing Manager",
        date: "2019 - Present",
        description: `<ul>
          <li>Developed and executed digital marketing strategies across multiple channels</li>
          <li>Increased online engagement by <strong>30%</strong> through targeted campaigns</li>
          <li>Achieved <strong>25% growth</strong> in sales through digital initiatives</li>
        </ul>`,
        achievements: `<ul>
          <li>Led successful rebranding campaign resulting in 40% increased brand recognition</li>
          <li>Achieved highest ROI in department history</li>
          <li>Implemented data-driven marketing strategy</li>
        </ul>`,
        projects: [
          {
            id: "p1",
            name: "Brand Relaunch Campaign",
            description: "Led complete digital rebranding initiative",
            techStack: ["Adobe Creative Suite", "Google Analytics", "Social Media Tools"],
            role: "Project Lead",
            achievements: `<ul>
              <li>Increased brand awareness by 40%</li>
              <li>Generated 2M+ social media impressions</li>
              <li>Achieved 150% ROI on campaign spend</li>
            </ul>`,
            duration: "6 months"
          }
        ]
      },
      {
        id: "2",
        company: "Creative Agency XYZ",
        jobTitle: "Marketing Specialist",
        date: "2016 - 2019",
        description: "Managed social media accounts for multiple clients, created content calendars, and analyzed campaign performance."
      }
    ],
    education: [
      {
        id: "1",
        school: "New York University",
        degree: "M.S. in Marketing",
        date: "2014 - 2016",
        gpa: "3.9"
      },
      {
        id: "2",
        school: "University of Pennsylvania",
        degree: "B.A. in Communications",
        date: "2010 - 2014",
        gpa: "3.7"
      }
    ],
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Data Analysis", "Adobe Creative Suite"],
    customFields: [],
    colorTheme: {
      primary: "#2563EB",
      secondary: "#FF00B8",
      text: "#333333",
      background: "#FFFFFF"
    }
  },
  {
    personalInfo: {
      name: "Sarah Martinez",
      objective: "Full Stack Software Engineer with 5+ years of experience in building scalable web applications and mobile-first solutions. Passionate about clean code, performance optimization, and creating exceptional user experiences.",
      email: "sarah.martinez@email.com",
      phone: "(555) 234-5678",
      website: "github.com/smartinez",
      location: "Austin, TX",
      linkedin: "linkedin.com/in/sarahmartinez"
    },
    workExperience: [
      {
        id: "1",
        company: "Digital Solutions Corp",
        jobTitle: "Full Stack Engineer",
        date: "2020 - Present",
        description: `<ul>
          <li>Developed and maintained microservices handling 500k+ daily users using Node.js and Go</li>
          <li>Implemented responsive UI components with React and Material-UI reducing load time by 45%</li>
          <li>Created mobile-first design system used across 12 different projects</li>
          <li>Led migration from monolith to microservices architecture</li>
        </ul>`,
        achievements: `<ul>
          <li>Received Best Developer Award 2022</li>
          <li>Reduced application load time by 45%</li>
          <li>Successfully led team of 5 in microservices migration</li>
        </ul>`,
        projects: [
          {
            id: "p1",
            name: "Design System Implementation",
            description: "Created comprehensive design system for enterprise applications",
            techStack: ["React", "TypeScript", "Storybook", "Material-UI"],
            role: "Technical Lead",
            achievements: `<ul>
              <li>Reduced component development time by 60%</li>
              <li>Implemented accessibility standards across all components</li>
              <li>Created comprehensive documentation and usage guidelines</li>
            </ul>`,
            duration: "10 months"
          }
        ]
      },
      {
        id: "2",
        company: "TechStart Inc",
        jobTitle: "Software Developer",
        date: "2018 - 2020",
        description: "• Built RESTful APIs using Express.js and MongoDB serving 200k+ daily requests\n• Implemented real-time features using WebSocket and Redux-Saga\n• Reduced application bundle size by 60% through code splitting and lazy loading\n• Collaborated with UX team to implement accessible components following WCAG guidelines"
      }
    ],
    education: [
      {
        id: "1",
        school: "Georgia Institute of Technology",
        degree: "M.S. in Computer Science",
        date: "2016 - 2018",
        gpa: "3.9",
        achievements: "Machine Learning Research Assistant"
      }
    ],
    skills: [
      "Languages: JavaScript, TypeScript, Go, Python",
      "Frontend: React, Next.js, Redux, Tailwind CSS",
      "Backend: Node.js, Express, GraphQL, REST",
      "Cloud: GCP, AWS, Docker, Kubernetes",
      "Databases: MongoDB, PostgreSQL, ElasticSearch",
      "Testing: Jest, Cypress, React Testing Library"
    ],
    certifications: [
      "MongoDB Certified Developer",
      "GCP Professional Cloud Developer"
    ],
    customFields: [
      {
        id: "1",
        label: "Open Source Contributions",
        value: "React Library & Framework Contributions",
        title: "Open Source",
        content: "• Created React component library with 1.5k+ npm downloads\n• Contributor to Next.js and Material-UI"
      }
    ],
    colorTheme: {
      primary: "#0891B2",
      secondary: "#6366F1",
      text: "#1F2937",
      background: "#FFFFFF"
    }
  },
  {
    "personalInfo": {
      "name": "Jeevan Wijerathna",
      "objective": "AWS, Azure, and Sitecore Certified Developer with over 10 years of experience in software development. Skilled in .NET technologies, cloud-native architectures, and backend development. Passionate about delivering scalable, maintainable solutions while adhering to best practices like Domain-Driven Design, Clean Code, and Test-Driven Development.",
      "email": "Jeevan90wijerathna@gmail.com",
      "phone": "+64 22 67 33 146",
      "website": "Iamjeevan.com",
      "location": "Auckland, New Zealand",
      "linkedin": "www.linkedin.com/in/jeevanwijerathna"
    },
    "workExperience": [
      {
        "id": "1",
        "company": "Datacom, New Zealand",
        "jobTitle": "Technical Lead",
        "date": "2023 - Present",
        "description": `<ul><li>Designed and reviewed new features with architects and team members for critical business applications.</li><li>Implemented scalable backend solutions using .NET, C#, and Azure technologies.</li><li>Enhanced application performance and optimized Azure costs by identifying and addressing bottlenecks.</li><li>Led backlog grooming, prioritization, and technical discussions with business users to deliver robust solutions.</li><li>Modernized legacy applications by transitioning to cloud-native, decoupled architectures.</li></ul>`,
        "achievements": `<ul>
          <li>Successfully led the modernization of 3 legacy applications</li>
          <li>Reduced Azure infrastructure costs by 30%</li>
          <li>Implemented robust CI/CD practices across teams</li>
        </ul>`,
        "projects": [
          {
            "id": "p1",
            "name": "Fonterra Inventory Management System",
            "description": "Trace It is an inventory management system for Fonterra, New Zealand's largest dairy company",
            "techStack": ["Oracle Apex", "PL/SQL"],
            "role": "Technical Lead",
            "achievements": `<ul>
              <li>Implemented a new feature to track samples inventory</li>
              <li>Introduced software engineering best practices</li>
              <li>Reduced deployment risks through automated testing</li>
            </ul>`,
            "duration": "Ongoing"
          },
          {
            "id": "p2",
            "name": "PGDB Application Portal",
            "description": "Developed a portal for managing licenses and certifications for NZ practitioners",
            "techStack": [".NET", "C#", "WEB-API", "Identity Server", "React", "Redux", "Azure"],
            "role": "Technical Lead",
            "achievements": `<ul>
              <li>Implemented proactive application monitoring</li>
              <li>Delivered scalable architectural solutions</li>
              <li>Achieved 99.9% system availability</li>
            </ul>`,
            "duration": "Ongoing"
          },
          {
            "id": "p2",
            "name": "Southern Cross Applications",
            "description": "Supported and modernized various business-critical applications.",
            "techStack": [".NET", "C#", "WEB-API", "React", "Redux", "Azure", "Angular", "Sitecore"],
            "role": "Technical Lead",
            "achievements": `<ul>
              <li>Ensured business continuity by resolving P1/P2 issues promptly.</li>
              <li>Migrated legacy applications to microservices architecture.</li>
            </ul>`,
            "duration": "Ongoing"
          },
          {
            "id": "p1",
            "name": "Dairy NZ",
            "description": "Migrate in-app authentication to Azure Entra ID and Azure B2C.",
            "techStack": ["Java", "Azure", "SQL Server", "Azure DevOps"],
            "role": "Architect and Developer",
            "achievements": `<ul>
              <li>Designed and architected user migration to Azure Entra ID and Azure B2C.</li>
              <li>Built CI/CD pipeline for legacy Java applications in Azure DevOps.</li>
            </ul>`
          },
          {
            "id": "p2",
            "name": "Ballance Agriculture",
            "description": "Support various line-of-business applications in Ballance Agriculture.",
            "techStack": [".NET", "Azure", "React", "Angular", "SQL Server"],
            "role": "Architect and Developer",
            "achievements": `<ul>
              <li>Designed and architected new application features.</li>
              <li>Migrated Bamboo pipeline to Bitbucket pipelines.</li>
            </ul>`
          },
          {
            "id": "p3",
            "name": "CSN",
            "description": "Support CSN legacy (VB.NET and C#) applications, ensuring business continuity and optimizing databases.",
            "techStack": [".NET", "C#", "WEB-API", "Identity Server", "React", "Redux", "Azure", "Angular", "Worker-Services", "Powershell", "Sitecore", "Azure Pipelines", "GitHub Actions"],
            "role": "Developer and Support Engineer",
            "achievements": `<ul>
              <li>Designed and reviewed new features with architects and team.</li>
              <li>Ensured business continuity by supporting urgent user requests.</li>
            </ul>`
          }
        ]
      },
      {
        "id": "2",
        "company": "Kinesso, Malaysia",
        "jobTitle": "Senior Software Engineer",
        "date": "2020 - 2022",
        "description": `<ul><li>Designed and implemented modernized legacy applications using microservices architecture.</li><li>Developed GRPC services for inter-process communication and optimized database performance.</li><li>Automated deployments using Jenkins and introduced DevOps practices for database development.</li><li>Integrated various data sources like Snowflake, Redshift, and Athena for analytics tools.</li><li>Monitored application performance using DataDog and implemented CI/CD pipelines.</li></ul>`,
        "achievements": `<ul>
          <li>Reduced deployment time by 70% through automation</li>
          <li>Improved data processing efficiency by 45%</li>
          <li>Successfully migrated 5 legacy applications</li>
        </ul>`,
        "projects": [
          {
            "id": "p3",
            "name": "Magnifiq",
            "description": "Developed a business intelligence analytics tool with custom ETL capabilities",
            "techStack": [".NET", "GRPC", "SQL Server", "AWS", "Docker", "Jenkins", "Snowflake"],
            "role": "Senior Software Engineer",
            "achievements": `<ul>
              <li>Streamlined database development with Flyway</li>
              <li>Reduced manual deployment effort by 80%</li>
              <li>Improved data processing speed by 45%</li>
            </ul>`,
            "duration": "2 years"
          },
          {
            "id": "p4",
            "name": "Apollo ETL Platform",
            "description": "Built an ETL orchestration platform using Dagster and developed a dashboard UI.",
            "techStack": [".NET", "Web-API", "Dagster", "Python", "AWS", "Angular"],
            "role": "Senior Software Engineer",
            "achievements": `<ul>
              <li>Migrated legacy ETL processes to a modern platform.</li>
              <li>Improved ETL performance and scalability.</li>
            </ul>`,
            "duration": "1 year"
          }
        ]
      },
      {
        "id": "3",
        "company": "Sitecore, Malaysia",
        "jobTitle": "Software Engineer",
        "date": "2017 - 2022",
        "description": `<ul><li>Developed Sitecore platform modules to enhance CMS functionality with Azure Storage and CDN support.</li><li>Implemented backend services using WEB-API and C#, and developed front-end applications using Angular.</li><li>Set up CI pipelines and automated deployments using PowerShell and TeamCity.</li><li>Participated in R&D, sprint planning, and cross-functional team collaboration.</li></ul>`,
        "projects": [
          {
            "id": "p5",
            "name": "Sitecore Azure Marketplace",
            "description": "Enabled users to deploy Sitecore in Azure through a marketplace solution.",
            "techStack": ["Azure", "WEB-API", "Angular", "C#", "PowerShell"],
            "role": "Software Engineer",
            "achievements": `<ul>
              <li>Developed end-to-end tests using BDD with SpecFlow</li>
              <li>Streamlined deployment processes with CI automation</li>
            </ul>`,
            "duration": "2 years"
          },
          {
            "id": "p6",
            "name": "Sitecore Azure Toolkit",
            "description": "Developed tools for deploying Sitecore in Azure environments.",
            "techStack": ["Azure", "PowerShell", "TeamCity"],
            "role": "Software Engineer",
            "achievements": `<ul>
              <li>Implemented unit tests using Pester</li>
              <li>Collaborated with architects to design scalable solutions</li>
            </ul>`,
            "duration": "1 year"
          }
        ]
      },
      {
    "id": "1",
    "company": "CMS Pvt Ltd, Colombo, Sri Lanka",
    "jobTitle": "Software Engineer",
    "date": "2015 - 2017",
    "description": "<ul><li>Developed and maintained scalable e-commerce solutions for European markets.</li><li>Modernized legacy systems and implemented responsive front-end designs.</li><li>Optimized database performance and implemented caching mechanisms.</li></ul>",
    "projects": [
      {
        "id": "p1",
        "name": "Redcorp E-Commerce Store",
        "description": "B2B E-Commerce store in Europe.",
        "techStack": ["ASP.NET MVC", "SQL Server", "Knockout.js", "HTML5", "SCSS", "Solr"],
        "role": "Software Engineer",
        "achievements": `<ul>
          <li>Designed the E-Commerce website.</li>
          <li>Migrated old ASP.NET Web Form website to ASP.NET MVC5.</li>
          <li>Implemented service layer using WEB-API.</li>
          <li>Designed and implemented SQL Server database.</li>
          <li>Updated data sync feature from different content databases to the main E-Commerce database.</li>
          <li>Implemented caching mechanism and search functionality using Solr.</li>
          <li>Developed a responsive front-end using Bootstrap and Knockout.js.</li>
        </ul>`,
        "duration": "2 years"
      }
    ]
  },
  {
    "id": "2",
    "company": "Bileeta Pvt Ltd, Sri Lanka",
    "jobTitle": "Software Engineer",
    "date": "February 2013 - December 2014",
    "description": "<ul><li>Contributed to the development of an award-winning cloud ERP solution.</li><li>Designed and implemented backend services and real-time features.</li><li>Optimized database performance and implemented stored procedures.</li></ul>",
    "projects": [
      {
        "id": "p2",
        "name": "Entution ERP",
        "description": "Award-winning journey-based cloud ERP solution.",
        "techStack": ["SQL Server", "ASP.NET", "JavaScript", "jQuery", "HTML", "WEB-API", "SignalR", "Highcharts", "JSON", "SQL CLR"],
        "role": "Software Engineer",
        "achievements": `<ul>
          <li>Designed the backend architecture.</li>
          <li>Implemented backend services using WEB-API.</li>
          <li>Developed and optimized database and stored procedures.</li>
          <li>Implemented real-time push notifications using SignalR.</li>
        </ul>`,
        "duration": "1 year 10 months"
      }
    ]
  }
    ],
    "education": [
      {
        "id": "1",
        "school": "National School of Business Management, Sri Lanka",
        "degree": "Bachelor of Science in Management Information Systems",
        "date": "2014",
        "achievements": "Graduated with a focus on software development and database design."
      }
    ],
    "skills": [
      "Languages & Frameworks: C#, .NET Core, ASP.NET, React, Angular, JavaScript",
      "Cloud & Infrastructure: Azure, AWS, Docker, Kubernetes",
      "DevOps: Azure DevOps, GitHub Actions, Jenkins, TeamCity",
      "Testing: XUnit, SpecFlow, Pester",
      "Architecture: Microservices, Domain-Driven Design, Clean Code",
      "Other: PowerShell, SQL Server, Sitecore"
    ],
    "certifications": [
      "AWS Certified Solution Architect Associate",
      "AWS Certified Developer",
      "Azure Certified Developer",
      "Sitecore 9 Certified Developer",
      "SAFe 4.0 Practitioner"
    ],
    "customFields": [
      {
        "id": "3",
        "title": "Personal Projects",
        "content": `• Resume Pro (resumepro.iamjeevan.com)
- Built an ATS-friendly resume generator using Next.js, React, and Tailwind CSS
- Implemented modern UI with real-time preview and multiple templates
- Tech stack: TypeScript, Next.js, React, Tailwind CSS

• Vanish Notes (vanishnotes.iamjeevan.com)
- Developed a self-destructive note sharing application
- Implemented end-to-end encryption and auto-deletion features
- Tech stack: Next.js, Node.js, MongoDB, Crypto.js

• NZ Salary Calculator (nzsalarycalculator.iamjeevan.com)
- Created a comprehensive salary calculator for New Zealand employees
- Includes tax calculations, KiwiSaver, and other deductions
- Tech stack: React, TypeScript, Tailwind CSS

• Flash Card Fest (flash-card-fest.netlify.app)
- Designed an AI-powered study flash card generator
- Integrated with OpenAI API for automated content generation
- Tech stack: React, OpenAI API, Node.js, Express`
      }
    ],
    "colorTheme": {
      "primary": "#1E40AF",
      "secondary": "#2563EB",
      "text": "#1F2937",
      "background": "#FFFFFF"
    }
  }
]

