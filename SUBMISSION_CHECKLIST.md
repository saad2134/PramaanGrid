# 📋 Hackathon Submission Checklist — PramaanGrid (प्रमाण-�-्रिड)
## AI First Product Builder Hackathon 2026

**Deadline: October 10, 2026 · 8:00 PM IST**
**Platform: college.dev**

---

## ✅ Required Deliverables

### 1. Videos
- [ ] **Project Demo Video** (~3 min)
  - Shows the product working end-to-end
  - Follow the [demo script](./IMPLEMENTATION_PLAN.md#demo-script) exactly
  - Record with OBS, 1080p minimum
  - Include phone screen mirror (WhatsApp) + dashboard side by side
  
- [ ] **System Design Walkthrough Video** (~3-5 min)
  - Explain architecture diagram
  - Walk through AI pipeline (Gemini 3.5 Flash → FLUX.1 Fill)
  - Show async queue architecture (Inngest)
  - Explain Proof-of-Clearance verification logic
  - Show PostGIS spatial queries
  - Mention DEMO_MODE safety net

### 2. Public GitHub Repository
- [ ] Source code (clean, well-organized)
- [ ] No credentials, secrets, or private personal data
- [ ] MIT License
- [ ] Comprehensive README.md with:
  - [ ] Project name + tagline + one-sentence pitch
  - [ ] Architecture diagram (Mermaid or image)
  - [ ] Screenshots of dashboard + WhatsApp flow
  - [ ] Tech stack table
  - [ ] Setup instructions (local dev)
  - [ ] Environment variables template (`.env.example`)
  - [ ] Deployment guide (Vercel)

---

## 📁 Project Structure (Expected)

```
nagar-drishti/
├── .env.example                 # Environment variables template
├── README.md                    # Project documentation
├── LICENSE                      # MIT License
├── IMPLEMENTATION_PLAN.md       # This plan
├── SUBMISSION_CHECKLIST.md      # This file
├── package.json
├── next.config.ts
├── tailwind.config.ts           # (or CSS-first @theme in v4)
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Landing / redirect
│   │   ├── dashboard/
│   │   │   ├── page.tsx         # Municipal dashboard
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Report detail view
│   │   └── api/
│   │       ├── webhook/
│   │       │   └── whatsapp/
│   │       │       └── route.ts # Twilio webhook handler
│   │       ├── reports/
│   │       │   └── route.ts     # CRUD reports
│   │       └── verify-clearance/
│   │           └── route.ts     # Proof-of-Clearance
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client
│   │   ├── gemini.ts            # Gemini 3.5 Flash integration
│   │   ├── replicate.ts         # FLUX.1 Fill integration
│   │   ├── twilio.ts            # WhatsApp messaging
│   │   ├── exif.ts              # GPS/EXIF extraction
│   │   ├── haversine.ts         # Distance calculation
│   │   └── demo-mode.ts         # DEMO_MODE fallback logic
│   ├── components/
│   │   ├── Map.tsx              # Mapbox/Leaflet map
│   │   ├── ReportCard.tsx       # Report list item
│   │   ├── ProofVerifier.tsx    # Before/After comparison
│   │   ├── StatusBadge.tsx      # VERIFIED/FRAUD badges
│   │   └── StatsBar.tsx         # Dashboard statistics
│   └── inngest/
│       ├── client.ts            # Inngest client config
│       └── functions/
│           ├── process-report.ts     # Main AI pipeline
│           └── check-escalation.ts   # 72h RTI check
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql    # PostGIS tables
└── public/
    ├── demo/                    # Pre-generated demo assets
    │   ├── before-1.jpg
    │   ├── after-1.jpg
    │   └── clean-vision-1.jpg
    └── logo.svg
```

---

## 🏷️ Submission Metadata

- **Project Name**: PramaanGrid (प्रमाण-�-्रिड)
- **Tagline**: "See the potential. Verify the truth."
- **Tracks**:
  - Track 02: Street & Neighbourhood Action
  - Track 04: Drain & Infrastructure Maintenance
  - Track 01: Civic Education & Behaviour Change
- **Division**: College
- **Team Size**: Solo

---

## 📅 Pre-Submission Timeline

| Date | Task | Status |
|------|------|--------|
| Oct 3 | Day 1: Foundation (Next.js 16 + Supabase + Twilio) | ⬜ |
| Oct 4 | Day 2: AI Pipeline (Gemini 3.5 Flash + FLUX.1 Fill) | ⬜ |
| Oct 5 | Day 3: Full WhatsApp Flow | ⬜ |
| Oct 6 | Day 4: Municipal Dashboard | ⬜ |
| Oct 7 | Day 5: Proof-of-Clearance Engine | ⬜ |
| Oct 8 | Day 6: Polish & Integration | ⬜ |
| Oct 9 | Day 7: Testing + Demo Prep + System Design Video | ⬜ |
| Oct 10 | Day 8: Record Demo + Submit by 6 PM IST (2h buffer) | ⬜ |

---

## 🔐 Environment Variables Needed

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Gemini
GEMINI_API_KEY=

# Replicate
REPLICATE_API_TOKEN=

# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_NUMBER=

# Inngest
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=

# App
DEMO_MODE=false
NEXT_PUBLIC_APP_URL=
```

---

## 🎯 Last-Minute Checklist (Oct 10, before 6 PM)

- [ ] All env vars set in Vercel production
- [ ] Vercel deployment is live and working
- [ ] Demo video uploaded (YouTube/Drive, public link)
- [ ] System design video uploaded (YouTube/Drive, public link)
- [ ] GitHub repo is public
- [ ] README has screenshots + setup guide
- [ ] `.env.example` has all keys listed (no actual values)
- [ ] No secrets in git history (`git log --all -p | grep -i "key\|secret\|token"`)
- [ ] Submitted on college.dev
- [ ] Celebrated 🎉
