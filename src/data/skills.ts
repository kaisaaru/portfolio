import {
  FaJs,
  FaReact,
  FaPhp,
  FaLaravel,
  FaDatabase,
  FaGitAlt,
  FaGithub,
  FaLinux,
} from "react-icons/fa";
import { FaVuejs } from "react-icons/fa6";
import {
  SiNextdotjs,
  SiTypescript,
  SiPostgresql,
  SiSupabase,
  SiTailwindcss,
  SiPython,
  SiDocker,
  SiPostman,
} from "react-icons/si";
import { IconType } from "react-icons";

export interface SkillItem {
  name: string;
  category: "backend" | "frontend" | "devops";
  icon: IconType;
  color: string;
  status: "ACTIVE" | "PRIMARY" | "READY";
  spec: string;
}

export const skillCategories = [
  { id: "backend", title: "Backend & Databases", command: "service status --backend" },
  { id: "frontend", title: "Frontend Systems", command: "npm list --frontend" },
  { id: "devops", title: "DevOps, Tooling & Environment", command: "docker ps && systemctl" },
] as const;

export const skills: SkillItem[] = [
  // Backend & Databases
  { name: "PHP", category: "backend", icon: FaPhp, color: "#777BB4", status: "PRIMARY", spec: "v8.2+ · Core Language" },
  { name: "Laravel", category: "backend", icon: FaLaravel, color: "#FF2D20", status: "PRIMARY", spec: "MVC & REST APIs" },
  { name: "JavaScript", category: "backend", icon: FaJs, color: "#F7DF1E", status: "ACTIVE", spec: "Node.js · Async Runtime" },
  { name: "PostgreSQL", category: "backend", icon: SiPostgresql, color: "#4169E1", status: "READY", spec: "Relational DB · Indexing" },
  { name: "Supabase", category: "backend", icon: SiSupabase, color: "#3ECF8E", status: "ACTIVE", spec: "Auth · Realtime DB" },
  { name: "MySQL", category: "backend", icon: FaDatabase, color: "#4479A1", status: "READY", spec: "Queries & Transactions" },

  // Frontend Systems
  { name: "TypeScript", category: "frontend", icon: SiTypescript, color: "#3178C6", status: "PRIMARY", spec: "Type Safety · Interfaces" },
  { name: "Next.js", category: "frontend", icon: SiNextdotjs, color: "#FFFFFF", status: "PRIMARY", spec: "App Router · SSR · RSC" },
  { name: "React", category: "frontend", icon: FaReact, color: "#61DAFB", status: "ACTIVE", spec: "Hooks · Components" },
  { name: "Vue.js", category: "frontend", icon: FaVuejs, color: "#4FC08D", status: "READY", spec: "Composition API" },
  { name: "Tailwind CSS", category: "frontend", icon: SiTailwindcss, color: "#38BDF8", status: "PRIMARY", spec: "Utility First · Dark Mode" },

  // DevOps & Tooling
  { name: "Python", category: "devops", icon: SiPython, color: "#3776AB", status: "ACTIVE", spec: "Scripting & AI Models" },
  { name: "Git", category: "devops", icon: FaGitAlt, color: "#F05032", status: "PRIMARY", spec: "VCS · Branching Workflow" },
  { name: "GitHub", category: "devops", icon: FaGithub, color: "#E2E8F0", status: "PRIMARY", spec: "CI/CD · Repositories" },
  { name: "Docker", category: "devops", icon: SiDocker, color: "#2496ED", status: "READY", spec: "Containers · Dev Env" },
  { name: "Postman", category: "devops", icon: SiPostman, color: "#FF6C37", status: "ACTIVE", spec: "API Testing & Docs" },
  { name: "Linux", category: "devops", icon: FaLinux, color: "#FCC624", status: "PRIMARY", spec: "Bash · System Administration" },
];
