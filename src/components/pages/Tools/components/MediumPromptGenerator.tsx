// @ts-nocheck
import { useState } from "react";

// ─── NICHE CONFIG ─────────────────────────────────────────────────────────────
const NICHES = {
  motivation: {
    label: "Motivation & Mindset",
    icon: "🔥",
    accent: "#e8915a",
    accentBg: "#1e1208",
    accentBorder: "#3a2010",
    desc: "Discipline, consistency, mental resilience",
    tones: ["Raw & Honest", "Uncomfortable Truth", "Story-driven", "Opinionated"],
    topics: [
      "Why Motivation Is a Lie (And What Actually Works)",
      "The Real Reason You Can't Stay Consistent",
      "Why Most People Fail at Self-Discipline After 7 Days",
      "How to Build Discipline When You Have Zero Motivation",
      "The Toxic Habits Keeping You Average",
      "Why Most People Quit Self-Improvement Too Early",
      "The Psychology Behind Staying Consistent",
      "How to Reset Your Life in 30 Days",
      "Why Your Life Feels Stuck",
      "I Tried a Dopamine Detox — Here's What Happened",
    ],
    keywords: ["self-discipline", "consistency", "motivation", "dopamine detox", "habits", "self-improvement", "mental strength", "resilience"],
    readTime: "6–9 minutes",
    structure: `STRUCTURE
# H1 Title (keyword in title)
*Italic subtitle — 1 line, curiosity-driven*
---
Opening (no heading): 3–4 paragraphs. Hook → real-life struggle → emotional tension → your perspective. First paragraph must include the keyword naturally.
---
3–5 H2 sections — each must present a strong insight, argument, or uncomfortable truth. No generic self-help advice. Use H3 subheadings where needed. 2–4 paragraphs per H2, 2–5 sentences each. Pure prose only.
Final H2 = Conclusion — decisive, realistic, slightly opinionated.
*One italic CTA line at the end.*`,
    voiceRules: `VOICE
- Write like someone who actually struggled with this — not a coach or therapist
- First-person where natural
- Direct, honest, slightly uncomfortable
- Strong stance — not neutral
- Include friction, failure, embarrassment, bad habits, resistance
- At least one non-obvious or uncomfortable truth
- No bullet points, lists, tables, or bold inside paragraphs
- Never start two consecutive paragraphs with the same word
- Vary sentence length — mix short punchy and long flowing`,
    hardAvoid: `HARD AVOID
- "delve into" / "in today's world" / "it's important to note" / "let's explore"
- Motivational speaker tone
- Promises of transformation
- Making success look easy
- Perfectly balanced opinions
- Vague advice
- Robotic AI transitions`,
  },

  tech: {
    label: "Tech & AI",
    icon: "⚡",
    accent: "#5b9cf6",
    accentBg: "#0a0f1e",
    accentBorder: "#1a2540",
    desc: "AI tools, software, digital trends, tech opinions",
    tones: ["Analytical", "Opinionated", "Beginner-friendly", "Expert deep-dive"],
    topics: [
      "How AI Is Quietly Replacing Jobs No One Expected",
      "Why Most Developers Are Using AI Tools Wrong",
      "The Real Cost of Our Obsession With Productivity Apps",
      "I Used AI for 30 Days — Here's What It Can't Replace",
      "Why the No-Code Movement Is Both Overhyped and Underrated",
      "The Uncomfortable Truth About 'Learning to Code' in 2025",
      "How Big Tech Companies Are Shaping What You Think",
      "Why Most AI Startups Will Fail (And What Survives)",
      "The Tools That Actually Changed How I Work",
      "What Nobody Tells You About Working in Tech",
    ],
    keywords: ["artificial intelligence", "AI tools", "machine learning", "productivity", "software development", "tech industry", "automation", "ChatGPT", "future of work"],
    readTime: "5–8 minutes",
    structure: `STRUCTURE
# H1 Title (keyword in title, clear and specific)
*Italic subtitle — 1 line, intriguing or counterintuitive*
---
Opening (no heading): 3–4 paragraphs. Hook with a surprising fact or observation → real context → your take. First paragraph must include the keyword naturally.
---
3–5 H2 sections — each covers a distinct angle, argument, or insight. Use data, examples, or your own experience to support. H3 subheadings where needed. 2–4 paragraphs per H2, 2–5 sentences each. No lists or bullets — pure prose.
Final H2 = Conclusion — where does this go? What should the reader do or think now?
*One italic CTA at the end.*`,
    voiceRules: `VOICE
- Write like a sharp practitioner, not an academic or press release
- Cite real examples (tools, companies, events) — be specific
- Take a clear position — hedge carefully, never endlessly
- First-person where it adds authority or personal experience
- Accessible to smart non-technical readers — explain jargon briefly
- Analytical but not cold — this is still human writing
- No bullet points, lists, tables, or bold inside paragraphs
- Vary sentence length — mix punchy and detailed`,
    hardAvoid: `HARD AVOID
- "delve into" / "in today's world" / "it's important to note" / "let's explore"
- Press release language ("revolutionary", "game-changing", "cutting-edge")
- Hype without substance
- Vague predictions not backed by reasoning
- Robotic AI transitions
- Overly academic or jargon-heavy writing
- Dismissing concerns without real argument`,
  },

  finance: {
    label: "Money & Finance",
    icon: "💡",
    accent: "#4eca8b",
    accentBg: "#081a10",
    accentBorder: "#143d22",
    desc: "Personal finance, investing, money mindset",
    tones: ["Straight talk", "Counter-narrative", "Story-driven", "Data-backed"],
    topics: [
      "Why Saving Money Is Terrible Advice for Most People",
      "The Money Habits That Quietly Keep You Poor",
      "What Financial Advisors Don't Want You to Know",
      "I Tracked Every Rupee for 6 Months — Here's What I Found",
      "Why Most People Are Bad at Investing (And Don't Know It)",
      "The Real Reason You're Always Broke at Month-End",
      "How to Stop Living Paycheck to Paycheck",
      "The Uncomfortable Truth About 'Passive Income'",
      "Why Your Relationship With Money Is More Important Than Your Salary",
      "How I Paid Off Debt While Earning a Average Salary",
    ],
    keywords: ["personal finance", "investing", "money habits", "financial freedom", "budgeting", "passive income", "wealth building", "debt", "savings"],
    readTime: "6–8 minutes",
    structure: `STRUCTURE
# H1 Title (keyword in title, direct and specific)
*Italic subtitle — 1 line, challenges a common assumption*
---
Opening (no heading): 3–4 paragraphs. Hook with a relatable money struggle → emotional reality of it → your perspective or personal experience. First paragraph must include the keyword naturally.
---
3–5 H2 sections — each challenges a myth, reveals a pattern, or gives a specific actionable insight. Back claims with numbers or real examples. 2–4 paragraphs per H2, 2–5 sentences each. Pure prose only.
Final H2 = Conclusion — what should the reader walk away thinking or doing differently?
*One italic CTA at the end.*`,
    voiceRules: `VOICE
- Write like someone who made real financial mistakes and learned from them
- Be specific — amounts, timeframes, real situations
- Direct and honest — no sugarcoating
- First-person where it adds credibility
- Challenge conventional wisdom when you have reason to
- No bullet points, lists, tables, or bold inside paragraphs
- Vary sentence length`,
    hardAvoid: `HARD AVOID
- "delve into" / "in today's world" / "it's important to note" / "let's explore"
- Generic "spend less, save more" advice
- Financial jargon without explanation
- Promising wealth or financial freedom
- Vague advice without specifics
- Robotic AI transitions`,
  },
};

const OUTPUT_FORMAT = `OUTPUT FORMAT
Plain text only. Use exactly:
# for H1 title
## for H2 section headings
### for H3 subheadings
--- for horizontal dividers
*text* for italics
No markdown tables. No bullet points. No numbered lists. No bold inside paragraphs (**text**).
Ready to paste directly into Medium editor.`;

const MEDIUM_POLICY = `MEDIUM POLICY & AI CONTENT RULES (MUST FOLLOW)
- This article must be original — no copying, paraphrasing, or summarizing other articles
- All claims must be honest and based on real experience or well-known facts — no fabricated statistics
- No hate speech, harassment, discrimination, or harmful content of any kind
- No medical, legal, or financial advice presented as professional guidance — frame as personal experience or opinion
- No misleading or clickbait content that doesn't match the article body
- If AI-assisted, the content must still reflect genuine human perspective and experience — not generic AI output
- The article must add real value — not thin content written purely for SEO
- No plagiarism, no reproducing copyrighted material
- No spam, no manipulative engagement tactics in the CTA
- The writing must feel human — personal, specific, opinionated, and grounded in real experience`;

function buildPrompt(niche, topic, keyword, tone, targetAudience, extraContext) {
  const n = NICHES[niche];
  return `You are a top-tier human writer and content strategist who writes viral Medium articles. You write with a strong point of view, real personal experience, and sharp observations — never as a generic content mill.

═══════════════════════════════
ASSIGNMENT
═══════════════════════════════
Niche: ${n.label}
Topic: "${topic}"
Main Keyword: "${keyword}"
Tone: ${tone}
Target Audience: ${targetAudience || "General readers interested in " + n.label}
${extraContext ? `Extra Context / Angle: ${extraContext}` : ""}
Target Reading Time: ${n.readTime}

═══════════════════════════════
${n.structure}

═══════════════════════════════
${n.voiceRules}

═══════════════════════════════
SEO RULES
- Keyword "${keyword}" must appear: in the H1 title, in the first paragraph, and naturally in 2–3 H2 headings
- Write for humans first — SEO second
- Title must be specific, honest, and match what the article actually delivers
- No keyword stuffing

═══════════════════════════════
${n.hardAvoid}

═══════════════════════════════
${OUTPUT_FORMAT}

═══════════════════════════════
${MEDIUM_POLICY}

═══════════════════════════════
FINAL CHECK BEFORE WRITING
Before you begin, confirm:
✓ Does this feel written by a real person who lived this?
✓ Is there at least one uncomfortable or non-obvious truth?
✓ Is the opinion clear — not perfectly balanced?
✓ Would someone save or share this?
✓ Does it comply with Medium's content policies?
If any answer is no — rewrite before output.`;
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function MediumPromptGenerator() {
  const [niche, setNiche] = useState("motivation");
  const [topic, setTopic] = useState("");
  const [keyword, setKeyword] = useState("");
  const [tone, setTone] = useState("");
  const [audience, setAudience] = useState("");
  const [extraContext, setExtraContext] = useState("");
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});
  const [showTopics, setShowTopics] = useState(false);
  const [step, setStep] = useState(1);

  const n = NICHES[niche];

  const validate = () => {
    const e = {};
    if (!topic.trim()) e.topic = "Topic required hai";
    if (!keyword.trim()) e.keyword = "Keyword required hai";
    if (!tone) e.tone = "Tone select karo";
    return e;
  };

  const handleGenerate = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setPrompt(buildPrompt(niche, topic.trim(), keyword.trim(), tone, audience.trim(), extraContext.trim()));
    setCopied(false);
    setStep(2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleReset = () => {
    setTopic(""); setKeyword(""); setTone(""); setAudience(""); setExtraContext("");
    setPrompt(""); setCopied(false); setErrors({}); setStep(1); setShowTopics(false);
  };

  const switchNiche = (key) => {
    setNiche(key); setTopic(""); setKeyword(""); setTone("");
    setErrors({}); setShowTopics(false); setPrompt(""); setStep(1);
  };

  const inputStyle = (hasErr) => ({
    width: "100%",
    background: "#0a0a0a",
    border: `0.5px solid ${hasErr ? "#8b3a3a" : "#1e1e1e"}`,
    borderRadius: 10,
    padding: "11px 14px",
    fontSize: 13.5,
    color: "#ddd",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    outline: "none",
    transition: "border-color 0.2s",
  });

  const labelStyle = {
    display: "block",
    fontSize: 11,
    color: "#555",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: 7,
    fontFamily: "'DM Mono', monospace",
  };

  return (
    <div style={{
      fontFamily: "'DM Mono', 'Courier New', monospace",
      padding: "20px 0 40px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
        * { box-sizing: border-box; }
        input:focus, textarea:focus, select:focus { outline: none; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px);} to { opacity:1; transform:translateY(0);} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 30, maxWidth: 580 }}>
        <div style={{
          display: "inline-block", background: "#111", border: "0.5px solid #1e1e1e",
          borderRadius: 999, padding: "5px 16px", fontSize: 10,
          letterSpacing: "0.15em", color: "#666", textTransform: "uppercase", marginBottom: 15,
        }}>
          Multi-Niche · Medium-Compliant · AI-Powered
        </div>
        <h2 style={{
          fontSize: "26px", fontWeight: 400,
          color: "#e8e4de", lineHeight: 1.2, marginBottom: 8, letterSpacing: "-0.02em",
          fontFamily: "'DM Mono', monospace",
        }}>
          Article Prompt <span style={{ color: n.accent }}>Generator_</span>
        </h2>
        <p style={{ color: "#666", fontSize: 12.5, lineHeight: 1.5 }}>
          Create viral, policy-compliant prompts for Medium writers
        </p>
      </div>

      {/* Niche Selector */}
      <div style={{
        display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap", justifyContent: "center",
      }}>
        {Object.entries(NICHES).map(([key, val]) => (
          <button
            key={key}
            onClick={() => switchNiche(key)}
            style={{
              background: niche === key ? val.accentBg : "#0e0e0e",
              border: `0.5px solid ${niche === key ? val.accent : "#1e1e1e"}`,
              borderRadius: 10, padding: "10px 18px", cursor: "pointer",
              fontFamily: "'DM Mono', monospace",
              transition: "all 0.2s",
            }}
          >
            <div style={{ fontSize: 13, color: niche === key ? val.accent : "#555", fontWeight: 400 }}>
              {val.icon} {val.label}
            </div>
            <div style={{ fontSize: 10, color: "#444", marginTop: 3 }}>{val.desc}</div>
          </button>
        ))}
      </div>

      {/* Main Form Card */}
      <div style={{
        width: "100%",
        background: "#0e0e0e", border: "0.5px solid #1a1a1a",
        borderRadius: 18, overflow: "hidden",
        animation: "fadeUp 0.3s ease",
      }}>
        {/* Card header */}
        <div style={{
          padding: "16px 24px", borderBottom: "0.5px solid #141414",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%", background: n.accent,
            animation: "pulse 2s infinite",
          }} />
          <span style={{ fontSize: 11, color: "#666", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {n.label} — Configure
          </span>
        </div>

        <div style={{ padding: "24px" }}>

          {/* Topic */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", justifyBetween: "space-between", alignItems: "center", marginBottom: 7 }}>
              <label style={labelStyle}>Topic *</label>
              <button
                onClick={() => setShowTopics(v => !v)}
                style={{
                  background: "none", border: `0.5px solid ${showTopics ? n.accent : "#1e1e1e"}`,
                  borderRadius: 6, color: showTopics ? n.accent : "#555",
                  fontSize: 10, padding: "3px 10px", cursor: "pointer",
                  fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em",
                  textTransform: "uppercase", marginLeft: "auto",
                }}
              >
                {showTopics ? "✕ close" : "+ suggestions"}
              </button>
            </div>

            {showTopics && (
              <div style={{
                background: "#080808", border: "0.5px solid #141414", borderRadius: 10,
                padding: 8, marginBottom: 10, maxHeight: 200, overflowY: "auto",
              }}>
                {n.topics.map(t => (
                  <div
                    key={t}
                    onClick={() => { setTopic(t); setShowTopics(false); setErrors(e => ({ ...e, topic: "" })); }}
                    style={{
                      padding: "8px 12px", borderRadius: 7, fontSize: 12.5, color: "#888",
                      cursor: "pointer", lineHeight: 1.4, transition: "all 0.1s",
                      textAlign: "left",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#141414"; e.currentTarget.style.color = "#ccc"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#888"; }}
                  >
                    → {t}
                  </div>
                ))}
              </div>
            )}

            <textarea
              value={topic}
              onChange={e => { setTopic(e.target.value); setErrors(v => ({ ...v, topic: "" })); }}
              placeholder={`e.g. ${n.topics[0]}`}
              rows={2}
              style={{ ...inputStyle(errors.topic), resize: "vertical" }}
            />
            {errors.topic && <span style={{ fontSize: 11, color: "#c07070", marginTop: 4, display: "block" }}>{errors.topic}</span>}
          </div>

          {/* Keyword */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Main Keyword (SEO) *</label>
            <input
              value={keyword}
              onChange={e => { setKeyword(e.target.value); setErrors(v => ({ ...v, keyword: "" })); }}
              placeholder={`e.g. ${n.keywords[0]}`}
              style={inputStyle(errors.keyword)}
            />
            {errors.keyword && <span style={{ fontSize: 11, color: "#c07070", marginTop: 4, display: "block" }}>{errors.keyword}</span>}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
              {n.keywords.map(k => (
                <button
                  key={k}
                  onClick={() => { setKeyword(k); setErrors(v => ({ ...v, keyword: "" })); }}
                  style={{
                    background: keyword === k ? n.accentBg : "transparent",
                    border: `0.5px solid ${keyword === k ? n.accent : "#1e1e1e"}`,
                    borderRadius: 999, padding: "3px 10px", fontSize: 11,
                    color: keyword === k ? n.accent : "#555", cursor: "pointer",
                    fontFamily: "'DM Mono', monospace", transition: "all 0.15s",
                  }}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Tone / Style *</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {n.tones.map(t => (
                <button
                  key={t}
                  onClick={() => { setTone(t); setErrors(v => ({ ...v, tone: "" })); }}
                  style={{
                    background: tone === t ? n.accentBg : "#0a0a0a",
                    border: `0.5px solid ${tone === t ? n.accent : "#1e1e1e"}`,
                    borderRadius: 8, padding: "8px 14px", fontSize: 12,
                    color: tone === t ? n.accent : "#555", cursor: "pointer",
                    fontFamily: "'DM Mono', monospace", transition: "all 0.15s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            {errors.tone && <span style={{ fontSize: 11, color: "#c07070", marginTop: 4, display: "block" }}>{errors.tone}</span>}
          </div>

          {/* Optional fields */}
          <div style={{
            background: "#080808", border: "0.5px solid #141414",
            borderRadius: 10, padding: 16, marginBottom: 22,
          }}>
            <div style={{ fontSize: 10, color: "#444", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14, textAlign: "left" }}>
              Optional — Extra context
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={labelStyle}>Target audience</label>
              <input
                value={audience}
                onChange={e => setAudience(e.target.value)}
                placeholder={`e.g. 20-35 year olds struggling with ${niche === "tech" ? "AI overwhelm" : "staying consistent"}`}
                style={inputStyle(false)}
              />
            </div>
            <div>
              <label style={labelStyle}>Specific angle or personal experience</label>
              <textarea
                value={extraContext}
                onChange={e => setExtraContext(e.target.value)}
                placeholder="e.g. I quit social media for 30 days and lost followers but gained focus..."
                rows={2}
                style={{ ...inputStyle(false), resize: "vertical" }}
              />
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            style={{
              width: "100%", padding: 14, fontSize: 13,
              background: n.accent, color: "#080808",
              border: "none", borderRadius: 10, cursor: "pointer",
              fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em",
              textTransform: "uppercase", transition: "opacity 0.15s",
              fontWeight: "600",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Generate Prompt →
          </button>
        </div>
      </div>

      {/* Output */}
      {prompt && (
        <div style={{
          width: "100%", marginTop: 20,
          background: "#0e0e0e", border: `0.5px solid ${n.accentBorder}`,
          borderRadius: 18, overflow: "hidden",
          animation: "fadeUp 0.35s ease",
        }}>
          {/* Output header */}
          <div style={{
            padding: "14px 22px", borderBottom: "0.5px solid #141414",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4eca8b" }} />
              <span style={{ fontSize: 11, color: "#4eca8b", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Prompt Ready
              </span>
              <span style={{
                fontSize: 10, background: "#141414", border: "0.5px solid #1e1e1e",
                borderRadius: 999, padding: "2px 8px", color: "#666",
              }}>
                {prompt.split(" ").length} words
              </span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={handleReset}
                style={{
                  background: "none", border: "0.5px solid #1e1e1e", borderRadius: 7,
                  color: "#666", fontSize: 11, padding: "5px 12px", cursor: "pointer",
                  fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.05em",
                }}
              >
                Reset
              </button>
              <button
                onClick={handleCopy}
                style={{
                  background: copied ? "#081a10" : n.accentBg,
                  border: `0.5px solid ${copied ? "#4eca8b" : n.accent}`,
                  borderRadius: 7, color: copied ? "#4eca8b" : n.accent,
                  fontSize: 11, padding: "5px 14px", cursor: "pointer",
                  fontFamily: "'DM Mono', monospace", textTransform: "uppercase",
                  letterSpacing: "0.05em", transition: "all 0.2s",
                }}
              >
                {copied ? "✓ Copied!" : "Copy Prompt"}
              </button>
            </div>
          </div>

          <pre style={{
            padding: 22, fontSize: 12, color: "#888",
            lineHeight: 1.8, whiteSpace: "pre-wrap", wordBreak: "break-word",
            maxHeight: 440, overflowY: "auto", fontFamily: "'DM Mono', monospace",
            background: "#080808", margin: 0,
            textAlign: "left",
          }}>
            {prompt}
          </pre>

          <div style={{
            padding: "12px 22px", borderTop: "0.5px solid #141414",
            fontSize: 11, color: "#555", fontStyle: "italic",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span>Medium policy-compliant · {n.readTime} read</span>
            <span style={{ color: "#444" }}>Paste in Claude / ChatGPT / Gemini</span>
          </div>
        </div>
      )}
    </div>
  );
}
