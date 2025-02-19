// @ts-nocheck
import { ResumeData } from "./types"

export const systemEngineerSample: ResumeData = {
  personalInfo: {
    name: "Michael Zhang",
    objective: "Results-driven System Engineer with 7+ years of experience in designing, implementing, and maintaining enterprise-level infrastructure and cloud solutions. Proven expertise in automation, DevOps practices, and system reliability engineering. Skilled in cloud platforms, infrastructure as code, and modern monitoring solutions.",
    email: "michael.zhang@email.com",
    phone: "(555) 789-0123",
    website: "github.com/mzhang-syseng",
    location: "Seattle, WA",
    linkedin: "linkedin.com/in/michaelzhang-syseng"
  },
  workExperience: [
    {
      id: "1",
      company: "Cloud Systems Enterprise",
      jobTitle: "Senior Systems Engineer",
      date: "2020 - Present",
      description: `<ul>
        <li>Architected and maintained hybrid cloud infrastructure supporting <strong>300+ microservices</strong> across AWS and on-premise data centers</li>
        <li>Reduced infrastructure costs by <strong>35%</strong> through optimization and automated resource scaling</li>
        <li>Implemented infrastructure as code using Terraform, reducing deployment time by <strong>70%</strong></li>
        <li>Led migration of legacy systems to containerized environments using Kubernetes</li>
        <li>Designed and implemented disaster recovery solutions achieving <strong>99.99%</strong> uptime</li>
      </ul>`,
      achievements: `<ul>
        <li>Implemented zero-downtime deployment strategy</li>
        <li>Reduced mean time to recovery (MTTR) by 60%</li>
        <li>Designed scalable monitoring solution using Prometheus and Grafana</li>
      </ul>`,
      projects: [
        {
          id: "p1",
          name: "Infrastructure Modernization",
          description: "Led complete infrastructure modernization initiative",
          techStack: ["AWS", "Terraform", "Kubernetes", "Docker", "Ansible"],
          role: "Lead Engineer",
          achievements: `<ul>
            <li>Migrated 200+ services to Kubernetes</li>
            <li>Implemented GitOps workflow with ArgoCD</li>
            <li>Reduced deployment failures by 80%</li>
          </ul>`,
          duration: "18 months"
        }
      ]
    },
    {
      id: "2",
      company: "TechOps Solutions",
      jobTitle: "Systems Engineer",
      date: "2017 - 2020",
      description: `<ul>
        <li>Managed and optimized Linux/Unix systems serving <strong>1M+ daily users</strong></li>
        <li>Implemented configuration management using Ansible and Chef</li>
        <li>Developed monitoring solutions using Nagios and ELK stack</li>
        <li>Automated routine tasks reducing manual operations by <strong>65%</strong></li>
      </ul>`
    },
    {
      id: "3",
      company: "DataCenter Corp",
      jobTitle: "Junior Systems Administrator",
      date: "2015 - 2017",
      description: "• Maintained and troubleshot Linux servers and network infrastructure\n• Implemented backup and recovery procedures\n• Assisted in datacenter migration projects\n• Managed user access and security policies"
    }
  ],
  education: [
    {
      id: "1",
      school: "University of Washington",
      degree: "B.S. in Computer Science",
      date: "2011 - 2015",
      gpa: "3.7",
      achievements: "Focus on distributed systems and network security"
    }
  ],
  skills: [
    "Cloud Platforms: AWS, GCP, Azure",
    "Container Orchestration: Kubernetes, Docker, OpenShift",
    "Infrastructure as Code: Terraform, CloudFormation, Ansible",
    "Monitoring: Prometheus, Grafana, ELK Stack, Datadog",
    "Operating Systems: Linux (RHEL, Ubuntu), Unix",
    "Networking: TCP/IP, DNS, Load Balancing, Security",
    "Scripting: Python, Bash, PowerShell",
    "Version Control: Git, GitHub, GitLab"
  ],
  certifications: [
    "AWS Certified Solutions Architect - Professional",
    "Certified Kubernetes Administrator (CKA)",
    "Red Hat Certified Engineer (RHCE)",
    "HashiCorp Certified Terraform Associate"
  ],
  customFields: [
    {
      id: "1",
      title: "Notable Projects",
      content: "• Developed custom Kubernetes operators for automated database management\n• Created infrastructure monitoring dashboard used by 50+ engineers\n• Implemented multi-region disaster recovery solution"
    }
  ],
  colorTheme: {
    primary: "#0F766E",
    secondary: "#0EA5E9",
    text: "#1F2937",
    background: "#FFFFFF"
  }
}