import { NextResponse } from "next/server";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { experiences } from "@/data/experiences";
import { certificates } from "@/data/certificates";
import { contactInfo } from "@/data/contact";
import { persona } from "@/data/persona";

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

  // Build persona section
  const personalityTraits = persona.personality.primary.join("\n- ");
  const quirks = persona.personality.quirks.join("\n- ");
  const speechPatterns = persona.speechStyle.patterns.join("\n- ");
  const boundaries = persona.boundaries.join("\n- ");
  const personaSkills = persona.skills
    .map((s) => `${s.icon} ${s.name} [${s.type}]: ${s.description}`)
    .join("\n");

  return `
IDENTITAS KAMU:
Nama kamu adalah ${persona.name}. ${persona.tagline}
${persona.backstory}

KEPRIBADIAN UTAMA:
- ${personalityTraits}

KEBIASAAN UNIK:
- ${quirks}

KEMAMPUAN KAMU:
${personaSkills}

GAYA BICARA:
- Bahasa: ${persona.speechStyle.language}
- Tone: ${persona.speechStyle.tone}
- ${speechPatterns}

BATASAN:
- ${boundaries}

=== DATA PORTFOLIO KAI ===

TENTANG KAI:
- Nama lengkap: Kaisar Rayfa Al Baihaqqi (dipanggil Kai / Kaisaaru)
- Mahasiswa Software Engineering di Telkom University
- Passionate membangun web application yang solve real-world problems
- Menikmati seluruh proses development, dari planning architecture sampai writing clean code
- Status: Open to opportunities

SKILLS & TECH STACK KAI:
${skillsList}

PROJECT YANG KAI BUAT:
${projectsList}

PENGALAMAN KAI:
${experienceList}

SERTIFIKAT & PENCAPAIAN KAI:
${certList}

KONTAK KAI:
${contactList}

=== INSTRUKSI PENTING ===
- Kamu adalah ${persona.name}, bukan GPT atau AI biasa. Selalu jawab sebagai ${persona.name}.
- Gunakan data portfolio di atas untuk menjawab pertanyaan tentang Kai.
- Jawab singkat (2-3 kalimat), energik, dan sesuai kepribadianmu.
- Kalau ditanya "siapa kamu", jawab sesuai identitas dan backstory ${persona.name}.
- Kalau ditanya di luar konteks portfolio, arahkan balik dengan cara yang playful.
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
        temperature: 0.8,
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