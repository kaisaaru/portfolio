import { NextResponse } from "next/server";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { experiences } from "@/data/experiences";
import { certificates } from "@/data/certificates";
import { contactInfo } from "@/data/contact";

function buildSystemPrompt(): string {
  const skillsList = skills.map((s) => s.name).join(", ");

  const projectsList = projects
    .map(
      (p) =>
        `- ${p.title}: ${p.description} (Tech: ${p.tech.join(", ")}). Fitur: ${p.features.join("; ")}`
    )
    .join("\n");

  const experienceList = experiences
    .map(
      (e) =>
        `- ${e.title} di ${e.org} (${e.period}): ${e.description}${
          e.contributions
            ? " Kontribusi: " + e.contributions.join("; ")
            : ""
        }`
    )
    .join("\n");

  const certList = certificates
    .map((c) => `- ${c.title} (${c.issuer}, ${c.date})`)
    .join("\n");

  const contactList = contactInfo
    .map((c) => `- ${c.label}: ${c.value} (${c.href})`)
    .join("\n");

  return `
Kamu adalah AI assistant dari Kaisar Rayfa Al Baihaqqi (biasa dipanggil Kai / Kaisaaru), seorang Software Engineering Student dan WebApp Developer.

TENTANG KAI:
- Nama lengkap: Kaisar Rayfa Al Baihaqqi (dipanggil Kai)
- Mahasiswa Software Engineering di Telkom University
- Passionate membangun web application yang solve real-world problems
- Menikmati seluruh proses development, dari planning architecture sampai writing clean code
- Status: Open to opportunities

SKILLS & TECH STACK:
${skillsList}

PROJECT YANG PERNAH DIBUAT:
${projectsList}

PENGALAMAN:
${experienceList}

SERTIFIKAT & PENCAPAIAN:
${certList}

KONTAK:
${contactList}

ATURAN MENJAWAB:
- Jawab dalam bahasa Indonesia, santai tapi profesional
- Jawab singkat dan jelas (maksimal 2-3 kalimat per poin)
- Gunakan data di atas untuk menjawab pertanyaan tentang Kai
- Jika ditanya tentang skill, sebutkan skill yang relevan dari daftar di atas
- Jika ditanya tentang project, jelaskan berdasarkan data project di atas
- Jika ditanya tentang pengalaman, jawab berdasarkan data pengalaman di atas
- Jika ditanya hal di luar konteks portfolio, arahkan kembali ke portfolio Kai
- Gunakan emoji sesekali untuk kesan ramah 😊
  `.trim();
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Pesan tidak valid" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key belum dikonfigurasi" },
        { status: 500 }
      );
    }

    const systemPrompt = buildSystemPrompt();

    // Detect if it's an OpenRouter key
    const isOpenRouter = apiKey.startsWith("sk-or-");
    const apiUrl = isOpenRouter
      ? "https://openrouter.ai/api/v1/chat/completions"
      : "https://api.openai.com/v1/chat/completions";

    const headers: Record<string, string> = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    if (isOpenRouter) {
      headers["HTTP-Referer"] = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      headers["X-Title"] = "Kai Portfolio AI";
    }

    const res = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: isOpenRouter ? "openai/gpt-4o-mini" : "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("AI API Error:", data);
      return NextResponse.json(
        { error: data.error?.message || "Gagal mendapatkan respons dari AI" },
        { status: res.status }
      );
    }

    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      return NextResponse.json(
        { error: "Respons AI kosong" },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}