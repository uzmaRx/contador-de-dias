# PRD — Contador de Dias (Brazilian Date & Business-Day Web App with AI Assistant)

**Owner:** Uzma Amin (pharmacist, beginner developer, iSkills SEBT Next)
**Document type:** Product Requirements Document for an AI coding agent (Cursor / Codex)
**Version:** 1.0 — 22 Oct 2026
**Status:** Ready to build, phase by phase

---

## 0. Instructions for the AI coding agent (read first)

You are building this project for a **beginner**. Follow these rules for the whole project:

1. **Work in phases** (see Section 15). Finish one phase, show the result, and **stop and wait for the owner's "OK"** before starting the next phase.
2. **Before writing code in each phase**, explain in 5–10 simple sentences what you will build and which files you will create or change.
3. **Explain every command** you want to run in simple words before running it. Never run destructive commands (deleting folders, force-pushing, resetting Git history) without asking.
4. **Never invent data.** Holidays, laws and facts must come from Section 7 of this PRD or from official Brazilian sources. If something is unclear, ask.
5. **Never let the AI model do date maths.** All date calculations are done by the deterministic date engine (Section 8). The AI only *understands* the request (Section 9).
6. **Write all user-facing text in Brazilian Portuguese (pt-BR).** Write code, comments and file names in English.
7. **Icons: SVG only.** No PNG/JPG icons, no icon fonts. See Section 11.3.
8. **Keep it simple.** No React, no login, no database, no payments in Version 1. Prefer fewer files and fewer dependencies.
9. **Test the date engine** with the test cases in Section 14 before building any page that uses it.
10. **Never put secret API keys in front-end code** or in Git. See Section 9.6.
11. After each phase, give the owner a **short checklist to test the result in the browser** herself.

---

## 1. Product summary

**Contador de Dias** is a free, fast, mobile-friendly web app in Brazilian Portuguese that answers everyday date questions:

- How many days are there between two dates?
- How many **dias úteis** (business days) are there between two dates, excluding weekends and Brazilian national holidays?
- What date is it 30 days / 30 business days after a given date?
- How many days are left until a date?
- What are the Brazilian holidays and business days in a given month or year?

Its special feature is an **AI date assistant**: the user types a question in normal language (*"Que dia cai 45 dias úteis depois de 22/10/2026?"*), the AI understands it, the app's own calculator computes the exact answer, and the app shows the result **with the full working**, so the user can trust it.

The project serves three purposes at once:

| Purpose | What it demonstrates |
|---|---|
| **SEO case study** | Keyword research → one landing page per search intent → technical SEO → indexing → traffic |
| **Vibe-coding portfolio** | A real, working web app built with AI coding agents (Cursor/Codex), versioned on GitHub, deployed online |
| **AI agent project** | An LLM that interprets natural language and calls deterministic tools (function calling), then a multi-step planner |

---

## 2. Goals and success metrics

### 2.1 Goals
1. Ship a correct, fast, trustworthy Brazilian date and business-day calculator.
2. Rank on Google Brazil for long-tail date keywords (see Section 10.2).
3. Add an AI assistant that turns plain-language questions into exact calculations.
4. Become an installable app (PWA) that works offline for the calculators.
5. Later, earn from Google AdSense and possibly a small Pro plan.

### 2.2 Success metrics

| Metric | Target |
|---|---|
| Date engine correctness | 100% of test cases in Section 14 pass |
| Lighthouse (mobile) | Performance ≥ 90, Accessibility ≥ 95, SEO = 100, Best Practices ≥ 95 |
| Core Web Vitals | LCP < 2.5 s, CLS < 0.1, INP < 200 ms |
| Indexing | All V1 pages indexed in Google Search Console within 6 weeks of launch |
| AI assistant | ≥ 90% of the 20 example questions in Section 9.5 produce the correct structured request |
| Traffic (realistic) | First organic clicks within 2–3 months; growth after that |

---

## 3. Target users and use cases

**Primary audience:** Brazilian adults on mobile phones (pt-BR), searching Google for quick date answers.

| User | Example need |
|---|---|
| Office worker / HR | "Quantos dias úteis tem novembro de 2027?" (payroll, vacations) |
| Freelancer / small business | "Prazo de 15 dias úteis a partir de hoje — quando vence?" |
| Student | "Quantos dias faltam para o ENEM / para as férias?" |
| Anyone with an event | "Quantos dias faltam para o meu casamento?" |
| Project planner | "Divida um projeto de 60 dias úteis em 4 etapas" (AI planner, later phase) |

**Not for:** official legal or court deadlines (prazos processuais). Court calendars have their own rules (court recess, local suspensions). The app must say so clearly (Section 12).

---

## 4. Competitor review and how we stand out

Brazilian date calculators already exist and some are strong. We must be **better and different**, not a copy.

| Competitor | What they do well | Gap we can use |
|---|---|---|
| valorfinal.com.br (dias úteis, entre datas, contagem regressiva) | National + state holidays, deadline mode, options for Carnaval/Corpus Christi, calculation breakdown, FAQ, legal sources, embeddable widget, AdSense | No natural-language assistant; no multi-step planner |
| omnicalculator.com/pt (dias úteis, contador de dias) | Huge brand authority, clean UI | Generic, not Brazil-first; less depth on Brazilian holidays |
| numerando.com.br (contador dias úteis) | Simple tool | Thin content |
| clubedospoupadores.com (dias úteis, somar dias) | Finance audience | Tool is one part of a bigger site |

**Our differentiation (in priority order):**
1. **AI assistant in Portuguese** that answers plain-language date questions with exact, explained results.
2. **Monthly and yearly business-day pages** with real tables (holidays listed by name and date), which are genuinely useful and hard to fake.
3. **Speed and clarity on mobile** (no clutter, result first, working shown).
4. **Transparency:** every result shows how it was counted, which holidays were excluded, and the legal source.
5. **Later:** AI project planner with milestones and calendar export.

---

## 5. Scope

### 5.1 In scope for Version 1 (MVP)
- Date engine (pure JavaScript/TypeScript module) with Brazilian national holidays.
- 5 calculators (Section 6).
- 1 holidays page per year (2026, 2027) and business-day pages per month for 2027 (programmatic, Section 10.4).
- AI date assistant (Phase 4) using one serverless function.
- SEO foundations (Section 10).
- Legal and trust pages (Section 12).
- Deployed online with a free URL; custom domain added when ready.

### 5.2 Later phases (not V1)
- PWA install and offline mode (Phase 5).
- State holidays (27 states) as an option (Phase 6).
- AI project planner with milestones + CSV/ICS export (Phase 7).
- Embeddable widget for other websites.
- Pro plan: saved calculations, reminders, shared schedules (only if traffic proves demand).
- English version (Day Counter) for higher ad rates.
- Native mobile app (only after the web app has users).

### 5.3 Out of scope (do NOT build)
- User accounts, login, database, payments.
- Native Android/iOS code.
- Municipal holidays (too many and change by decree; allow manual "extra holidays" instead, Phase 6).
- Court/legal deadline calculator.
- Multiple countries.
- More than one AI agent.

---

## 6. Features (V1 calculators)

All calculators share these rules:
- Dates are entered with the browser's date picker, and displayed in Brazilian format **DD/MM/AAAA**.
- Default start date = **today** (in the user's local time zone).
- The result appears in a large result card, followed by a **"Como calculamos"** (how we counted) box showing the working.
- A **"Copiar resultado"** (copy result) button.
- Each calculator has a **shareable URL** with the inputs in the query string, for example `?inicio=2027-10-08&fim=2027-11-30`, so a user can share or bookmark a result.
- Invalid input shows a friendly pt-BR message, never a crash.
- Supported year range: **1900–2100**. Outside this range, show a message.

### 6.1 Contador de dias (days between two dates)
- **Inputs:** start date, end date, checkbox "Incluir o dia final" (include the end day; default off).
- **Outputs:** total days; the same in weeks + days; approximate months; count of weekend days in the range.
- **Edge cases:** end before start → swap automatically and say so; same date → 0 days (or 1 if "include end day" is on).

### 6.2 Calculadora de dias úteis (business days between two dates)
- **Inputs:** start date, end date; options:
  - "Contar o dia inicial" (count the start day; default **off**)
  - "Considerar sábado como dia útil" (Saturday as a business day; default off)
  - "Excluir pontos facultativos (Carnaval, Quarta-feira de Cinzas até 14h, Corpus Christi)" (default **off**; see Section 7.2)
- **Outputs:** number of business days; list of holidays excluded (name + date + weekday); number of holidays that fell on a weekend (not subtracted twice); weekend days excluded.

### 6.3 Somar ou subtrair dias (add or subtract calendar days)
- **Inputs:** start date, number, choice "somar/subtrair".
- **Output:** resulting date with weekday name (for example "segunda-feira, 25/10/2027").

### 6.4 Somar dias úteis / Calcular prazo (add business days — deadline)
- **Inputs:** start date, number of business days, "somar/subtrair", plus the same options as 6.2.
- **Counting rule (explicit and shown on screen):** counting starts on the **next business day after the start date** (the start date itself is not counted), unless "Contar o dia inicial" is checked.
- **Output:** final date with weekday, plus the list of skipped holidays and weekends.
- **Warning note:** "Para prazos judiciais, consulte o calendário do tribunal." (For court deadlines, check the court calendar.)

### 6.5 Quantos dias faltam (countdown)
- **Inputs:** target date, optional event name.
- **Outputs:** days remaining (and business days remaining); if the date is in the past, "Isso foi há X dias".
- A live display "faltam X dias" that updates if the page stays open past midnight.
- Quick-pick buttons for popular events (Natal, Ano Novo, Carnaval of the next year), calculated from the holiday engine.

---

## 7. Holiday data (Brazil — national level)

### 7.1 National holidays (feriados nacionais)

| Holiday | Rule |
|---|---|
| Confraternização Universal | 1 January |
| Paixão de Cristo (Sexta-feira Santa) | Easter Sunday − 2 days |
| Tiradentes | 21 April |
| Dia do Trabalho | 1 May |
| Independência do Brasil | 7 September |
| Nossa Senhora Aparecida | 12 October |
| Finados | 2 November |
| Proclamação da República | 15 November |
| Dia Nacional de Zumbi e da Consciência Negra | 20 November — **national holiday from 2024 onwards only** (Lei nº 14.759/2023). Before 2024, do not include it as national. |
| Natal | 25 December |

### 7.2 Optional points (pontos facultativos) — OFF by default
These are **not** national holidays by law, but many companies and banks close. The user can choose to exclude them.

| Day | Rule |
|---|---|
| Carnaval (segunda-feira) | Easter − 48 days |
| Carnaval (terça-feira) | Easter − 47 days |
| Quarta-feira de Cinzas (until 14h) | Easter − 46 days. Keep it as a business day because it is only a half-day optional point; show it as an informational note in results. |
| Corpus Christi | Easter + 60 days |

The "exclude optional points" option excludes only Carnaval Monday, Carnaval Tuesday and Corpus Christi as full non-business days. Ash Wednesday never reduces the business-day count.

Note for the content: the Brazilian financial market calendar (ANBIMA) **does** treat Carnaval Monday/Tuesday and Corpus Christi as bank holidays. Explain this difference on the holiday pages.

### 7.3 Easter calculation
Use the **Anonymous Gregorian algorithm (Meeus/Jones/Butcher)**. Verified values:

| Year | Easter Sunday | Carnaval (Tuesday) | Corpus Christi |
|---|---|---|---|
| 2026 | 05/04/2026 | 17/02/2026 | 04/06/2026 |
| 2027 | 28/03/2027 | 09/02/2027 | 27/05/2027 |
| 2028 | 16/04/2028 | 29/02/2028 (leap day!) | 15/06/2028 |

### 7.4 Data structure
- Keep holiday **rules** in one file (`src/lib/holidays.js` or `.ts`), each with: `id`, `name` (pt-BR), `type` (`national` | `optional`), `rule` (fixed date or Easter offset), `validFrom`/`validTo` years, and `source` (law or official page).
- Generate the holiday list for any year from these rules; do not hard-code yearly lists.
- Phase 6 adds state holidays in a separate file with the same structure, each with its legal source.

---

## 8. Date engine (the most important code)

### 8.1 Rules
- Treat dates as **calendar dates without time**. Never use `new Date("2027-10-08")` directly for arithmetic (it is parsed as UTC and can shift a day in some time zones).
- Represent a date internally as `{year, month, day}` and convert to a **day number** (days since a fixed epoch, computed with UTC maths, e.g. `Date.UTC(y, m-1, d) / 86400000`) for arithmetic. Convert back only for display.
- "Today" = the user's local calendar date.
- Weekday from the day number, with 0 = domingo … 6 = sábado.
- Leap years: Gregorian rules (divisible by 4, except centuries not divisible by 400).
- All functions are **pure** (same input → same output, no side effects) and live in `src/lib/` so both pages and the AI function can import them.

### 8.2 Functions (public API)
```
daysBetween(start, end, { includeEnd })                         -> number
normalizeRange(start, end)                                      -> { start, end, swapped }
businessDaysBetween(start, end, { countStart, saturdayIsBusiness, excludeOptional }) -> { count, holidays[], weekendDays }
addDays(start, n)                                               -> date
addBusinessDays(start, n, { countStart, saturdayIsBusiness, excludeOptional }) -> { date, skippedHolidays[], informationalHolidays[], skippedWeekendDays }
daysUntil(target, today)                                        -> number   (negative if past)
holidaysForYear(year, { includeOptional })                      -> holiday[]
businessDaysInMonth(year, month, options)                       -> { count, holidays[] }
formatDateBR(date)                                              -> "segunda-feira, 25/10/2027"
```

`normalizeRange` validates both dates, returns them in chronological order, and sets `swapped` to `true` when the original end date came before the original start date. This lets a future page show the required notice while keeping `daysBetween()` numeric and reusable.

### 8.3 Conventions (must be shown on the pages)
- **Days between:** end − start (end day not counted) unless "include end day".
- **Business days between:** counts business days **after** the start date up to and **including** the end date, unless "count start day" is on. State this rule on the page.
- **Add business days:** start date not counted; first counted day is the next business day.
- A holiday on a weekend is excluded only once.

---

## 9. AI date assistant (Phase 4)

### 9.1 What it does
A text box on the home page (and a dedicated page `/assistente`): *"Pergunte em português, por exemplo: Que dia cai 45 dias úteis depois de 22/10/2026?"*

### 9.2 Architecture (tool calling — this is the "agentic" part)
1. The browser sends the user's question to **our own serverless function** (`/api/assistant`). Never call the AI provider directly from the browser.
2. The function sends the question to the LLM with a strict system prompt and a **list of tools** (function definitions) that mirror Section 8.2.
3. The LLM returns **which tool to call and with which arguments** (structured JSON). It does NOT return the answer.
4. The function **validates** the arguments (dates are real, numbers within limits), then runs the **deterministic date engine** to compute the answer.
5. The function returns to the browser: the interpreted request ("Entendi: somar 45 dias úteis a partir de 22/10/2026, sem pontos facultativos"), the result, and the working.
6. The page shows the interpretation **first**, with an "Editar" link that opens the matching calculator pre-filled, so the user can check or adjust.

### 9.3 Behaviour rules
- Relative dates ("hoje", "amanhã", "próxima segunda") are resolved using the **user's local date, sent from the browser**.
- If the question is ambiguous (e.g. "dias" could mean calendar or business days), ask **one** short clarifying question.
- If the question is not about dates, reply politely that the assistant only answers date questions.
- Never give legal advice. For court deadlines, show the warning from Section 6.4.
- Answers in pt-BR, short, friendly.

### 9.4 Provider
- Use one LLM provider with function/tool calling (e.g. OpenAI or Google Gemini). Pick a **small, low-cost model**.
- Keep the provider behind one small adapter file (`functions/api/lib/llm.js`) so it can be swapped.
- The owner will decide the provider and supply the API key. **Ask the owner before choosing.**

### 9.5 Test questions (must be interpreted correctly)
1. Quantos dias faltam para o Natal?
2. Quantos dias úteis tem novembro de 2027?
3. Que dia cai 45 dias úteis depois de 22/10/2026?
4. Quantos dias entre 01/01/2027 e 31/12/2027?
5. Tenho um prazo de 30 dias úteis começando na próxima segunda. Quando termina?
6. Somar 90 dias a partir de hoje.
7. Quantos dias úteis entre 08/02/2027 e 12/02/2027 sem contar o Carnaval?
8. Quantos dias úteis entre 08/02/2027 e 12/02/2027 contando o Carnaval como feriado?
9. Que dia da semana foi 07/09/2022?
10. Daqui a 100 dias, que dia será?
11. Quanto tempo falta para o Carnaval de 2027?
12. Quais são os feriados de 2027?
13. 15 dias úteis antes de 20/12/2027.
14. Sábado conta como dia útil? (answer: explain the option)
15. Quantos dias tem fevereiro de 2028?
16. Quantas semanas faltam para 15/06/2027?
17. Qual a data 60 dias depois de 29/02/2028?
18. Dias úteis entre hoje e o fim do ano.
19. Me conte uma piada. (must politely refuse: only date questions)
20. Prazo processual de 15 dias no TJSP. (must add the court-deadline warning)

### 9.6 Security and cost control
- The API key is stored only as an **environment variable / secret** on the hosting platform. Never in the code, never in Git, never in the browser.
- Add `.env` and similar files to `.gitignore` from the very first commit.
- Limits: max **300 characters** per question; low `max_tokens`; **rate limit** per visitor (e.g. 10 questions per hour, using a simple counter); a daily global cap so costs cannot run away.
- Do not store or log questions with personal data. If logging for improvement, log only anonymised, truncated text, and say so in the Privacy Policy.
- If the AI service fails or the cap is reached, show: "O assistente está indisponível agora. Use as calculadoras abaixo." and link the calculators.

### 9.7 Phase 7 — AI planner (multi-step agent, later)
User: *"Planeje meu projeto de 60 dias úteis começando em 02/11/2026, sem fins de semana e feriados, dividido em 4 etapas."*
The agent runs several tool calls in sequence: resolve start date → add business days → split into milestones → list holidays inside the period → build a schedule table → offer **CSV** and **.ics (calendar)** download. Each step is shown to the user.

---

## 10. SEO requirements

### 10.1 Language and market
- `<html lang="pt-BR">`, Brazilian Portuguese spelling (dias **úteis**, not "días"), Brazilian date format.
- Target country: **Brazil**.
- Text should be reviewed by a native Brazilian Portuguese speaker before launch (owner to arrange, or at least check with a second AI).

### 10.2 Keyword map (V1)
**The owner must validate volume, KD and CPC with her SEO tools (Ahrefs/Semrush, Brazil database) before final approval.** Replace or reorder pages based on the data.

| URL | Primary keyword (pt-BR) | Search intent |
|---|---|---|
| `/` | contador de dias | Days between dates (main tool + AI assistant) |
| `/calculadora-dias-uteis/` | calculadora de dias úteis | Business days between dates |
| `/dias-entre-datas/` | dias entre datas | Days between dates (variant) |
| `/somar-dias-a-data/` | somar dias a uma data | Add/subtract days |
| `/calcular-prazo-dias-uteis/` | calcular prazo em dias úteis | Add business days (deadline) |
| `/quantos-dias-faltam/` | quantos dias faltam | Countdown |
| `/feriados-2027/` | feriados 2027 | Holiday list for the year |
| `/dias-uteis-2027/` | dias úteis 2027 | Business days per month, full year table |
| `/dias-uteis-novembro-2027/` (×12 months) | dias úteis novembro 2027 | One month in detail |
| `/assistente/` | calculadora de datas online (supporting) | AI assistant |

Rule: **one primary keyword per page**; no two pages target the same keyword.

**Keyword data collected by the owner (22 Oct 2026, Keywords Everywhere, global, not Brazil-only):**

| Keyword | Volume / month | CPC |
|---|---|---|
| contador de dias | 301,000 | $0.01 (competition 0.00) |
| contador de dias hábiles (Spanish) | 22,200 | — |
| calculadora de tempo | 14,800 | — |
| contador de dias úteis (Portuguese) | 9,900 | $0.01 |
| contador de horas … | 2,900 | $0.31 |
| contador horas | 2,400 | $0.24 |

What this means:
- The main keyword has **very high volume but almost zero CPC**, so ad income per visitor will be low. Earnings must come from **volume**, from **higher-CPC related tools** (e.g. "contador de horas" / hour calculators, a possible later tool), and later from Pro features.
- The search results are **mixed Spanish and Portuguese** ("contador de dias" is used in both languages). This project targets **Brazil (pt-BR)** because one country means one holiday calendar. A Spanish version (per country, e.g. Mexico) is a possible later expansion.
- A **9-month-old Brazilian site (contagemdedias.com.br, DR 34)** ranks on page 1, which shows that a new, well-built site can rank.
- The owner should re-check volumes with the **Brazil** database in Ahrefs/Semrush before finalising the page list.

### 10.3 On-page template (every page)
- Unique `<title>` (≤ 60 characters, keyword first) and `<meta name="description">` (≤ 155 characters, with a benefit).
- One `<h1>` containing the primary keyword.
- The **tool first** (above the fold on mobile), then content.
- Content below the tool, **400–900 words**, genuinely helpful and unique to that page:
  - How to use (3 steps)
  - 2–3 worked examples with real dates
  - Rules explained (e.g. how business days are counted, ponto facultativo vs feriado)
  - FAQ (4–6 questions people actually ask)
  - Sources (laws and official pages)
- Internal links to 3–5 related tools in a "Ferramentas relacionadas" block.
- Breadcrumbs (Início › Página).
- `<link rel="canonical">` on every page (absolute URL).
- Open Graph and Twitter meta tags with an SVG-generated social image exported as PNG (social networks do not show SVG).
- Visible "Atualizado em: DD/MM/AAAA" date.

### 10.4 Programmatic pages (holiday and monthly pages)
- Generated at **build time** from the date engine (no manual typing of dates).
- Each monthly page must contain **real, unique data**: a calendar grid, business-day count, the holidays in that month with weekday, comparison with the previous/next month, and a short note. Never generate near-empty "template" pages; Google treats those as low quality (scaled content).
- Start with **2027 only** (12 months + year page + holidays page). Add 2028 in late 2027.

### 10.5 Technical SEO
- Pages must be **pre-rendered static HTML** (content visible without JavaScript). The calculators can enhance with JavaScript, but the text, headings and links must be in the HTML.
- `sitemap.xml` (auto-generated, all pages) and `robots.txt` pointing to it.
- Clean URLs, lowercase, hyphens, trailing slash, no accents in URLs.
- 404 page in pt-BR with links to the tools.
- Structured data (JSON-LD): `WebApplication` (or `SoftwareApplication`) on tool pages, `BreadcrumbList` on all pages, `Organization`/`WebSite` on home. FAQ markup may be added but Google no longer shows FAQ rich results for most sites, so do not rely on it.
- Performance: no heavy frameworks on the client, self-hosted or system fonts, inline critical CSS where simple, lazy-load anything below the fold.
- Submit to **Google Search Console** after launch (owner will verify the domain).

### 10.6 Content trust (E-E-A-T)
- "Sobre" page: who made it and why (pharmacist building useful tools, careful with accuracy).
- Every holiday rule linked to its legal source.
- A visible "Como calculamos" methodology section or page.

---

## 11. Design and UI

### 11.1 Principles
- **Mobile-first**, clean, fast, calm. Result is the hero of the page.
- Large tap targets (≥ 44 px), large result numbers, clear labels.
- No pop-ups, no auto-playing anything. Ads (later) must never cover or push the tool (reserve space to avoid layout shift).

### 11.2 Visual style
- Define colours as CSS variables (design tokens) in one file. Suggested palette: deep blue primary, teal accent, white/very light grey background, dark text; red only for warnings.
- **Light and dark mode** using `prefers-color-scheme`.
- Font: system font stack (no downloads) for speed.
- Rounded cards, subtle borders, generous spacing.

### 11.3 Icons — SVG only (owner's requirement)
- Use **inline SVG icons** in the HTML (not `<img src="icon.png">`, not icon fonts).
- Recommended set: **Lucide icons** (open-source, ISC licence), copied as inline SVG for only the icons we use (calendar, calendar-check, clock, hourglass, plus, minus, copy, share, sparkles for AI, info, alert-triangle, chevron, external-link). Keep the licence notice in the repository.
- Icons use `stroke="currentColor"` (so they follow text colour and dark mode), `width`/`height` set, and `aria-hidden="true"` when decorative. Meaningful icon-only buttons need an `aria-label` in pt-BR.
- Put reusable icons in one place (e.g. `src/components/Icon.astro` or `src/icons/*.svg`).
- **Logo:** a simple original SVG (calendar outline with a checkmark or a counter), created by us — no copying of other brands.
- **Favicon:** SVG favicon (`favicon.svg`) plus a fallback `favicon.ico`.
- **PWA exception:** the app manifest needs **PNG icons (192×192 and 512×512, plus a maskable one)** for Android installation. Generate these PNGs **from our SVG logo** at build time or once with a script. This is the only place PNG is allowed.

### 11.4 Accessibility
- WCAG 2.1 AA: colour contrast ≥ 4.5:1, every input has a `<label>`, keyboard navigable, visible focus, error messages announced (`aria-live`), dates readable by screen readers.

---

## 12. Legal, trust and compliance pages
- **Sobre** (About), **Contato** (Contact, simple email link or form without storing data), **Política de Privacidade** (Privacy Policy, LGPD — Brazil's data protection law), **Termos de Uso** (Terms), **Como calculamos** (methodology).
- Disclaimer on every tool page (short): *"Resultados informativos. Para prazos legais e judiciais, confirme com o calendário oficial do órgão ou tribunal."*
- When AdSense or analytics with cookies are added: a cookie consent banner, and the Privacy Policy updated to list Google AdSense and the AI provider.

---

## 13. Technical architecture

### 13.1 Stack (beginner-friendly, JavaScript ecosystem as taught in class)
| Part | Choice | Why |
|---|---|---|
| Site generator | **Astro** (static output) | Pre-rendered HTML for SEO, sends almost no JavaScript, easy to make many pages from one template |
| Language | JavaScript (TypeScript optional) | Matches the course focus |
| Styling | Plain CSS with variables | Simple, fast, no extra tools |
| Interactivity | Small vanilla JS scripts per calculator | No React needed |
| Date engine | Own pure module in `src/lib/` | Full control, testable |
| Tests | **Vitest** | Simple test runner for the date engine |
| AI endpoint | **Cloudflare Pages Functions** (`/functions/api/assistant.js`) | Free tier allows commercial use; same place as the site |
| Hosting | **Cloudflare Pages**, connected to the GitHub repository | Free, fast in Brazil, automatic deploy on every push |
| Version control | Git + GitHub (public or private repo, owner decides) | Course requirement |
| Analytics | Google Search Console (+ Cloudflare Web Analytics, cookie-free) | Free, privacy-friendly |

Requirements on the owner's laptop: **Node.js LTS** (the agent should check if it is installed and, if not, explain and help install it), Git (already installed), a code editor (Cursor).

Fallback if Astro is too difficult: plain HTML/CSS/JS pages plus a small Node script that generates the monthly pages. Ask the owner before switching.

Note on GitHub Pages: it cannot run the AI function. Use Cloudflare Pages for this project.

### 13.2 Suggested folder structure
```
contador-de-dias/
├── PRD.md                      (this file)
├── README.md
├── LICENSE-ICONS.md            (Lucide licence notice)
├── package.json
├── astro.config.mjs
├── .gitignore                  (node_modules, dist, .env, .dev.vars)
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── robots.txt
│   ├── manifest.webmanifest     (Phase 5)
│   └── icons/                   (PNG app icons generated from SVG, Phase 5)
├── src/
│   ├── lib/
│   │   ├── dates.js             (date engine)
│   │   ├── holidays.js          (holiday rules)
│   │   └── format.js            (pt-BR formatting)
│   ├── components/
│   │   ├── Icon.astro
│   │   ├── ToolCard.astro
│   │   ├── ResultCard.astro
│   │   ├── HowWeCounted.astro
│   │   ├── RelatedTools.astro
│   │   ├── Breadcrumbs.astro
│   │   └── AdSlot.astro         (empty placeholder until AdSense)
│   ├── layouts/
│   │   └── BaseLayout.astro     (head, SEO tags, header, footer)
│   ├── scripts/                 (small browser scripts per calculator)
│   └── pages/                   (one file per URL; dynamic route for months)
├── functions/
│   └── api/
│       ├── assistant.js         (AI endpoint, Phase 4)
│       └── lib/llm.js
└── tests/
    └── dates.test.js
```

---

## 14. Test cases (date engine — all must pass)

National holidays only, Saturday not a business day, start day not counted, unless stated.

| # | Test | Expected |
|---|---|---|
| 1 | Easter 2026 / 2027 / 2028 | 05/04/2026, 28/03/2027, 16/04/2028 |
| 2 | Carnaval Tuesday 2028 | 29/02/2028 (leap day) |
| 3 | Days between 01/01/2027 and 31/12/2027 (end not included) | 364 |
| 4 | Days between 28/02/2028 and 01/03/2028 | 2 (leap year) |
| 5 | Days between 28/02/2027 and 01/03/2027 | 1 |
| 6 | Business days in November 2027 (whole month, 01 and 30 included) | 20 (holidays 02/11 Tue and 15/11 Mon excluded; 20/11 falls on Saturday) |
| 7 | Business days in February 2027 (whole month) | 20; **18** if pontos facultativos excluded (Carnaval 08 and 09/02) |
| 8 | Business days in 2027 (whole year) | 254; **251** with pontos facultativos excluded (Carnaval ×2 + Corpus Christi) |
| 9 | Add 10 business days to Fri 08/10/2027 | Mon 25/10/2027 (12/10 holiday skipped) |
| 10 | Add 5 business days to Mon 20/12/2027 | Mon 27/12/2027 (25/12 is Saturday) |
| 11 | Holidays 2027 (national) | 01/01, 26/03, 21/04, 01/05, 07/09, 12/10, 02/11, 15/11, 20/11, 25/12 |
| 12 | 20/11/2023 | NOT a national holiday (law valid from 2024) |
| 13 | Invalid date 31/02/2027 | Rejected with a friendly message |
| 14 | End date before start date | Swapped automatically with a notice |

Cross-check source for 2027 dates: ANBIMA national holiday calendar 2027 (which also lists Carnaval and Corpus Christi as market holidays — see 7.2).

---

## 15. Build phases (stop after each one)

| Phase | Deliverable | Done when |
|---|---|---|
| **0. Setup** | Check Node.js; create Astro project in this folder; `.gitignore`; first commit; connect to a new GitHub repository | Site runs locally (`npm run dev`) and shows a placeholder home page |
| **1. Date engine** | `src/lib/` modules + Vitest tests from Section 14 | All tests pass; owner sees the test report |
| **2. Calculators** | Base layout, SVG icons, 5 calculator pages with working tools, "Como calculamos", copy/share | Owner tests each tool on phone and laptop |
| **3. SEO pages + deploy** | Content for each page, holidays 2027 page, dias úteis 2027 + 12 monthly pages, legal pages, sitemap, robots, structured data; deploy to Cloudflare Pages | Live URL works; Lighthouse targets met; owner adds site to Search Console |
| **4. AI assistant** | `/api/assistant` function with tool calling, rate limits, UI on home + `/assistente` | 18 of 20 test questions correct; refusals work; key not visible anywhere in the browser or GitHub |
| **5. PWA** | Manifest, PNG icons from SVG, service worker caching calculator pages for offline | "Install app" works on Android Chrome; calculators work offline |
| **6. State holidays + extra holidays** | State selector with sourced data; "add my own holiday" option (saved in the browser only) | Verified against official state sources |
| **7. AI planner** | Multi-step planning agent + CSV/ICS export | Planner example in 9.7 works end to end |
| **8. Monetisation** | Custom domain, AdSense application, consent banner, ad slots activated | AdSense approved |

---

## 16. Monetisation plan
- **Ads (Google AdSense):** requires the owner's **own domain** (a free `*.pages.dev` address cannot be used). Note: a `.com.br` domain requires a Brazilian **CPF or CNPJ** (tax ID); without one, use a `.com` domain. Reserve fixed-height ad slots now (`AdSlot` component renders nothing until activated) so adding ads later causes no layout shift.
- **Later Pro plan (only with proven demand):** saved calculations, reminders, recurring deadlines, AI planner exports, team calendars, ad-free.
- **Embeddable widget:** free widget other sites can embed, with a link back (also helps SEO).

---

## 17. Risks and how we handle them

| Risk | Mitigation |
|---|---|
| Google shows its own answer for simple date questions | Focus on business days, Brazilian holidays and monthly pages, where Google's answer is weak |
| Strong competitors (valorfinal, Omni) | Differentiate with the AI assistant, monthly data pages, speed and transparency |
| Wrong holiday or date result | Rule-based engine, sourced data, automated tests, working shown to users |
| AI gives wrong answers | AI only interprets; maths is deterministic; interpretation shown and editable |
| AI cost spikes | Small model, token limits, per-user and daily caps |
| API key leak | Secrets only on the server; `.gitignore`; never in front-end |
| Thin programmatic pages | Each page has real computed data and unique text; start small (2027 only) |
| Portuguese quality | Native-speaker review before launch |
| Beginner overwhelm | Strict phases, explanations, owner approval between phases |

---

## 18. Open decisions for the owner
1. **Final name and domain** (e.g. a `.com` with "contador de dias" or a short brand).
2. **AI provider** and budget (OpenAI or Gemini; monthly spending cap).
3. **GitHub repository:** public (portfolio) or private.
4. **Keyword validation:** confirm Section 10.2 with Ahrefs/Semrush data for Brazil.
5. **Who reviews the Portuguese text.**

---

## 19. Sources
- ANBIMA — Feriados nacionais 2027: https://www.anbima.com.br/feriados/fer_nacionais/2027.asp
- Contábeis — Dia da Consciência Negra becomes a national holiday (2024): https://www.contabeis.com.br/noticias/65267/brasil-ganha-mais-um-feriado-nacional-ja-no-2o-semestre-de-2024/
- Competitor reference — Valor Final, Calculadora de Dias Úteis: https://valorfinal.com.br/calculadora-dias-uteis
- Competitor reference — Omni Calculator (pt): https://www.omnicalculator.com/pt/dia-a-dia/calculadora-dias-uteis
- .br domain requirement (CPF/CNPJ): https://www.godaddy.com/en/help/about-br-domains-6020
- Cloudflare Pages Functions pricing: https://developers.cloudflare.com/pages/functions/pricing/
- Free hosting tiers comparison (checked Sept 2026): https://flaviocopes.com/hosting-free-tiers.md
