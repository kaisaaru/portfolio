export interface ProjectItem {
  title: string;
  repo: string;
  branch: string;
  commitHash: string;
  isPrivate?: boolean;
  images?: { src: string; alt: string }[];
  description: string;
  features: string[];
  tech: string[];
  github: string;
  demo?: string;
}

export const projects: ProjectItem[] = [
  {
    title: "Kotori: Japanese Light Novel & EPUB Reader",
    repo: "kaisaaru/kotori",
    branch: "main",
    commitHash: "f54vn92",
    images: [
      { src: "/projects/kotori/kotori1.jpeg", alt: "Kotori Japanese Reader Library" },
      { src: "/projects/kotori/kotori2.jpeg", alt: "Kotori EPUB Reader Interface" },
      { src: "/projects/kotori/kotori3.jpeg", alt: "Kotori Built-in Dictionary & Yomitan AST" },
      { src: "/projects/kotori/kotori4.jpeg", alt: "Kotori Kanji & Vocabulary Lookup" },
      { src: "/projects/kotori/kotori5.jpeg", alt: "Kotori Settings & Vertical Text Mode" },
    ],
    description:
      "An authentic Japanese Light Novel & EPUB reading platform built with Next.js and React 19. Features built-in Yomitan dictionary lookup, vertical Japanese text (縦書き), TTS audio pronunciation, and 100% privacy using IndexedDB local storage.",
    features: [
      "EPUB novel file upload & parsing with vertical text (縦書き) support",
      "Built-in Yomitan AST Japanese dictionary & instant kanji/vocabulary lookup",
      "Text-to-Speech (TTS) audio pronunciation for Japanese sentences",
      "100% Client-side privacy powered by IndexedDB local storage",
      "Bilingual interface localization (Bahasa Indonesia & English)",
      "Customizable reader themes (Dark, Light, Sepia) and typography scaling",
    ],
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "IndexedDB", "Yomitan"],
    github: "https://github.com/kaisaaru/kotori",
    demo: "https://readkotori.vercel.app/",
  },
  {
    title: "Project Management System (Manproy)",
    repo: "kaisaaru/manproy-core",
    branch: "main",
    commitHash: "8f2a1b9",
    isPrivate: true,
    images: [
      { src: "/projects/manproy/ss1.png", alt: "Purchase Order Management" },
      { src: "/projects/manproy/ss2.png", alt: "Purchase Order Document" },
      { src: "/projects/manproy/ss3.png", alt: "Purchase Order Document" },
    ],
    description:
      "A web-based project management platform developed for SUNURTECH to support project planning, financial tracking, and operational workflows.",
    features: [
      "Task and project progress management",
      "Budget Planning (RAB) and Unit Price Analysis (AHS)",
      "Material request and purchase order management",
      "Goods receiving and inventory tracking",
      "Fund request management",
      "Resource monitoring and workflow coordination",
    ],
    tech: ["Laravel", "MySQL", "Vue", "PHP"],
    github: "https://github.com/kaisaaru",
    demo: "#",
  },
  {
    title: "Travel Dashboard — GDGoC Telkom Bandung",
    repo: "kaisaaru/gdgoc-travel-dashboard",
    branch: "feat/auth-v2",
    commitHash: "e4c901a",
    isPrivate: true,
    description:
      "A web-based travel management dashboard developed as part of the GDGoC Web Development program. Built collaboratively in a team environment following a Product Design Requirement (PRD).",
    features: [
      "Email/password authentication & Google sign-in",
      "Admin dashboard with responsive sidebar navigation",
      "CRUD management for destinations, packages, users & bookings",
      "Booking quota validation",
      "Search and pagination",
      "Route protection based on authentication",
      "Mobile & desktop responsive design",
      "Light/Dark mode",
    ],
    tech: ["React", "Firebase", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/kaisaaru",
    demo: "#",
  },
  {
    title: "Financial Report Management System",
    repo: "kaisaaru/kja-kasir-finance",
    branch: "production",
    commitHash: "3d5f82c",
    isPrivate: true,
    images: [
      { src: "/projects/kjakasir/ss1.png", alt: "Purchase Order Management" },
      { src: "/projects/kjakasir/ss2.png", alt: "Purchase Order Document" },
      { src: "/projects/kjakasir/ss3.png", alt: "Purchase Order Document" },
    ],
    description:
      "A web-based financial reporting system developed during my internship at KJA Kasir CA BKP to manage accounting operations and business transactions.",
    features: [
      "Management of purchase orders, goods receipts, and purchase invoices",
      "Sales management including sales orders, delivery notes, and sales invoices",
      "Financial reporting with general ledger history, balance sheets, and profit & loss statements",
      "Inventory stock opname and cash reconciliation",
      "Data management for purchases and sales reporting",
    ],
    tech: ["Laravel", "MySQL", "JavaScript", "Bootstrap"],
    github: "https://github.com/kaisaaru",
    demo: "#",
  },
];
