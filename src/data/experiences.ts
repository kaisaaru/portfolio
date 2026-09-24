export interface ExperienceItem {
  title: string;
  org: string;
  period: string;
  type: "freelance" | "internship" | "organization" | "fulltime";
  statusBadge: string;
  description: string;
  contributions: string[];
  tags: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  statusBadge: string;
  description: string;
  focus: string[];
  skills: string[];
}

export const workExperiences: ExperienceItem[] = [
  {
    title: "Backend Developer Intern",
    org: "ASE Laboratory (Advanced Software Engineering)",
    period: "Aug 2026 — Present",
    type: "internship",
    statusBadge: "LAB_INTERNSHIP // ACTIVE",
    description:
      "Selected as a Backend Developer Intern at Advanced Software Engineering (ASE) Laboratory, collaborating within a cross-functional development team (System Analyst, Frontend Flutter, UI/UX, and QA) to engineer the backend services for 'TolonginDong' — an on-demand peer-to-peer task fulfillment and helper marketplace mobile application.",
    contributions: [
      "Architected and engineered modular RESTful APIs using Laravel and PostgreSQL (hosted on Supabase) to support multi-category task dispatching (Food & Delivery, Daily Errands, Personal Assistance, and Academic Support).",
      "Engineered the core request-to-deal negotiation engine: client task broadcasting, dynamic helper bidding & counter-offers, deal settlement, and milestone status tracking.",
      "Integrated Cloudflare R2 object storage for high-performance, S3-compatible media management (task attachments, order item photos, and task completion verification).",
      "Collaborated closely with System Analysts on database normalization/ERD design on Supabase and established clean API contracts for the Mobile Frontend (Flutter) engineering team.",
      "Implemented secure API authentication, role-based workflows (Client vs. Helper permissions), transaction state machines, and input validation compliant with QA test specifications.",
    ],
    tags: ["Laravel", "PostgreSQL", "Supabase", "Cloudflare R2", "RESTful API"],
  },
  {
    title: "Full Stack Developer (Freelance)",
    org: "SUNURTECH",
    period: "Feb 2026 — Apr 2026",
    type: "freelance",
    statusBadge: "FREELANCE // COMPLETED",
    description:
      "Engineered a web-based Project Management platform (Manproy) to streamline project planning, financial tracking, and operational workflows.",
    contributions: [
      "Designed and developed modules for task management and project tracking.",
      "Implemented financial and operational modules including Budget Planning (RAB) and Unit Price Analysis (AHS).",
      "Built workflow features for material requests, purchase orders, goods receiving, and fund requests.",
      "Developed tools to help teams monitor project progress, manage resources, and improve coordination across project activities.",
    ],
    tags: ["Laravel", "MySQL", "JavaScript", "Tailwind CSS"],
  },
  {
    title: "Member — Web Development Program",
    org: "Google Developer Groups on Campus (GDGoC) Telkom University",
    period: "Jan 2025 — Apr 2025",
    type: "organization",
    statusBadge: "COMMUNITY // COMPLETED",
    description:
      "Collaborated in a team environment following a Product Design Requirement (PRD) to build a Travel Dashboard management platform.",
    contributions: [
      "Participated in the Web Development program and collaborated with team members to deliver core web features.",
      "Developed responsive admin dashboard interfaces, search, pagination, and CRUD workflows.",
      "Implemented authentication flow (Email/Password & Google sign-in) and route protection with Firebase.",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
  },
  {
    title: "Web Developer Intern (Back-End)",
    org: "Kantor Jasa Akuntan KJA Kasir CA BKP",
    period: "Oct 2023 — Mar 2024",
    type: "internship",
    statusBadge: "INTERNSHIP // COMPLETED",
    description:
      "Served as a Back-End Developer developing a web-based financial reporting and accounting management system.",
    contributions: [
      "Developed backend modules for managing purchase orders, goods receipts, purchase invoices, and sales transactions.",
      "Implemented financial reporting features including general ledger history, balance sheets, and profit & loss statements.",
      "Built inventory and financial reconciliation features such as stock opname and cash reconciliation.",
      "Collaborated with the development team to support system development and data management.",
    ],
    tags: ["Laravel", "MySQL", "JavaScript", "Bootstrap"],
  },
];

export const educations: EducationItem[] = [
  {
    degree: "Undergraduate in Software Engineering (S.Kom Candidate)",
    institution: "Telkom University",
    period: "Sep 2024 — Present",
    statusBadge: "DEGREE CANDIDATE // ACTIVE",
    description:
      "Pursuing a Bachelor's degree in Software Engineering with a focus on web development, database systems, software architecture, and algorithms. Actively building production-ready projects and sharpening engineering practices.",
    focus: [
      "Software Architecture & Design Patterns",
      "Database Systems & Query Optimization",
      "Full-Stack Web Application Development",
      "Data Structures & Algorithmic Problem Solving",
    ],
    skills: ["Software Engineering", "Web Development", "Algorithms", "Database Systems"],
  },
  {
    degree: "Vocational High School Diploma in Software Engineering (RPL)",
    institution: "SMKN 13 Bandung",
    period: "Jul 2021 — May 2024",
    statusBadge: "VOCATIONAL // GRADUATED",
    description:
      "Built a solid foundation in programming fundamentals, object-oriented programming, and web development while delivering multiple web-based projects as part of the vocational curriculum.",
    focus: [
      "Core Web Development (HTML, CSS, PHP, JavaScript)",
      "Relational Database Design & MySQL Administration",
      "Modular Software Architecture & Coding Standards",
      "Industry Internship Preparation & Best Practices",
    ],
    skills: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
  },
];

export const experiences = workExperiences;
