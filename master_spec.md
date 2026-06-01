# Manulife Move: Gamified Experience System (Master Spec)

## PART 1: PRODUCT STRATEGY & BRAND GUIDELINES

### 1. Purpose & Goals
- **Core Purpose:** Increase app usage and stickiness among existing Manulife clients (high-tier life insurance users).
- **Drive daily engagement:** Encourage consistent app usage.
- **Long-term habit formation:** Build sustainable exercise routines.
- **Shareable achievements:** Social validation & growth.
- **Preventive health behavior:** Support long-term wellness.

### 2. Target Audience & Technical Rules
**PRIMARY: 40+ Age Group**
- *Traits:* Low activity level, Health-aware, Cautious approach.
- *UI/UX Rules:* Large touch targets, highly legible text, clear contrast. Slow, smooth animations.

**SECONDARY: 30-39 Age Group**
- *Traits:* Busy lifestyle, Inconsistent routine, Time-constrained.
- *UI/UX Rules:* Quick start options, clear progress bars showing time remaining.

### 3. Brand Philosophy: "Rhythm"
- **Visual Language:** Waveform / Pulse representation.
- **Metaphor:** Effort ↔ Recovery | Activity ↔ Rest.
- **Tone:** Calm, Minimal, Non-forcing ("Move at your own pace").
- **Styling Rules:** Use calming, pastel, or soft brand colors. No aggressive red error states, no panic-inducing countdown clocks. Use gentle pulsing animations for active states.

---

## PART 2: PERSONA ENGINE & PHASED ROLLOUT

### 1. Design Strategy
- **Progressive Disclosure:** Features unlock gradually as users advance.
- **Invisible Personalization:** AI-driven recommendations behind the scenes. Users are NEVER shown their persona labels.
- **Same Core, New Skin:** Familiar mechanics with fresh visuals to maintain engagement.

### 2. Research-Backed Persona Engine (Phase 1)
During onboarding, the app uses an 8-question instrument backed by validated research (GLTEQ, BREQ-3, MPAM-R). This engine silently classifies users to enable persona-relative difficulty from day one.

**The Onboarding Questionnaire:**
- **Q1 (Frequency):** How many days per week do you currently engage in physical activity? `[0 / 1–2 / 3–4 / 5+]`
- **Q2 (Intensity):** What best describes the intensity of your typical exercise? `[Light (walking, stretching) / Moderate (brisk walking, cycling) / Vigorous (running, HIIT)]`
- **Q3 (BREQ-3 Intrinsic):** I exercise because I enjoy the activity itself. `[1-Strongly Disagree → 5-Strongly Agree]`
- **Q4 (BREQ-3 Introjected):** I exercise because I would feel bad about myself if I didn’t. `[1-Strongly Disagree → 5-Strongly Agree]`
- **Q5 (BREQ-3 Identified):** I exercise because I value the benefits to my health. `[1-Strongly Disagree → 5-Strongly Agree]`
- **Q6 (MPAM-R):** What primarily motivates your physical activity? `[Fitness / Health / Appearance / Social / Fun / Competition]`
- **Q7 (Confidence):** How confident are you in your ability to maintain a regular exercise routine? `[Low / Medium / High]`
- **Q8 (Goal):** What is your main fitness goal right now? `[Start/restart exercising / Stay active / Improve performance / Recover from injury or condition]`

### 3. The 4 Hidden Personas (Result of the Engine)
Based on the answers to Q1-Q8, the algorithm categorizes the user into one of four buckets:
1. **Gentle Restarter:** Low activity, low confidence, restarting or beginning. Needs encouragement and gradual progression.
2. **Steady Mover:** Moderately active, routine-driven. Benefits from consistency and variety.
3. **Active Challenger:** Highly active, performance-oriented. Motivated by challenge and progression.
4. **Social Competitor:** Motivated by social interaction, comparison, and competition.

### 4. Scoring Logic & Overrides (AI Math Weights)
*For Q3, Q4, Q5: Low = 1-2, Medium = 3, High = 4-5.*
- **Q1 (Frequency):** 0 (Restarter +3) | 1–2 (Restarter +2, Steady +1) | 3–4 (Steady +2, Challenger +1) | 5+ (Challenger +3)
- **Q2 (Intensity):** Light (Restarter +2) | Moderate (Steady +2) | Vigorous (Challenger +3)
- **Q3 (Intrinsic):** Low (Restarter +1) | Medium (Steady +1) | High (Challenger +2)
- **Q4 (Introjected):** Low (Challenger +1) | Medium (Steady +1) | High (Restarter +2)
- **Q5 (Identified):** Medium (Restarter +1) | High (Steady +2) | Very High/5 (Challenger +1)
- **Q6 (Motivation):** Fitness (Steady +2) | Health (Restarter +2) | Appearance (Challenger +2) | Social (Social +3) | Fun (Steady +1, Social +1) | Competition (Social +3, Challenger +1)
- **Q7 (Confidence):** Low (Restarter +3) | Medium (Steady +2) | High (Challenger +2)
- **Q8 (Goal):** Start/restart (Restarter +3) | Stay active (Steady +2) | Improve (Challenger +3) | Recover (Restarter +2)

**Edge Cases & Rules:**
- **Social Override Rule:** IF Q6 = Social OR Competition, AND Social score >= 3 -> ASSIGN `Social Competitor`.
- **Low Activity Bias (Safety):** IF low activity (Q1/Q2 is 0/Light) BUT high confidence (Q7) -> Prioritize `Gentle Restarter`.
- **Tie Resolution Priority:** 1. Activity (Q1+Q2) -> 2. Goal (Q8) -> 3. Motivation (Q6).
- **UX Output Rule:** Do NOT expose labels. Translate to UI copy (e.g., *"Keep your steady rhythm going"*).

### 5. Phased Rollout Timeline
- **Phase 1: Habit Formation & Data Collection (Oct 2026)**
  - All users begin as beginners. Complete the 8-question onboarding.
  - Persona Engine establishes baseline difficulty.
  - Games unlocked: Foundation Flow, Daily Reset.
- **Phase 2: Content Expansion (Daily Plans)**
  - Shareable achievements, Reward & Trophy page unlocks.
  - Suggested daily plans based on behavior.
  - Games unlocked: Strength Builder, Balance & Control, Momentum Mode.
- **Phase 3: Content Expansion (Progress Tracking)**
  - Weekly leaderboards, friend challenges.
  - Games unlocked: Power Progression, Athletic Flow, Conditioning Quest.

---

## PART 3: GAME MECHANICS & STATE LOGIC

### 1. Currency: Stars & Energy
- **Total Possible Stars:** 200–210 max (150 Core from 50 levels + 50-60 Bonus).
- **Daily Star Limit:** Soft cap of 10-12 stars per day (encourages consistency).
- **Energy:** 1 Energy per Day (Refreshes at midnight).
- **Bonus Energy:** +1 (7-day streak), +2 (Weekly challenge), +2 (Saturday boost), +1 (Hard Gate clear).

### 2. Star Earning Math (Per Level)
- 50% accuracy = 1 Star (Pass) -> *No punishment rule: 1★ is minimum.*
- 70% accuracy = 2 Stars (Good)
- 85%+ accuracy = 3 Stars (Excellent) + 1 Bonus Energy.
- **Bonus Earners:** Weekly challenge (+5★), Variant completion (+8★), 7-day streak (+5★).

### 3. Progression Modes
- **Mode 1 (Preview Mode):** Preview upcoming challenges every 5 levels. No progression impact. Purpose: Reduce anxiety.
- **Mode 2 (Progression Mode):** Standard gameplay. Complete sequentially, pass gates, earn stars.

### 4. Gates & Level Progression (Levels 1-50)
- **Soft Gate (Every 5 Levels):** Must complete each previous level with ≥1★. Unlocks next 5 levels.
- **Hard Gate (Every 10 Levels):** Must have ≥25 stars from previous 10 levels. Reward: Badge + 1 Energy.
- **Archive Unlock:** Achieve 3★ on 3 different levels to unlock archive content (new visual theme, 5-8★ reward).

### 5. Milestone Unlocks
- Level 5: Preview next gate challenge
- Level 10: Variant unlock + badge
- Level 15: Weekly challenge unlock
- Level 20, 30, 40: Variant unlocks
- Level 50: Completion badge

### 6. Reward System Tiers
- **20★:** Starter Badge (Visual achievement)
- **50★:** Bronze Reward (Manulife promotion)
- **80★:** Silver Badge (Visual achievement)
- **120★:** Silver Reward (Manulife promotion)
- **150★:** Gold Badge (Level completion)
- **180★:** Gold Reward (Manulife promotion)
- **210★:** Platinum Reward (Manulife promotion)

---

## PART 4: USER JOURNEY & CORE LOOP

### 1. Journey Timeline
1. **Onboarding (Phase 1):** Take the 8-question survey, establish Persona and baseline difficulty.
2. **First Week (Phase 1):** Play Foundation Flow/Daily Reset. Use 1 Energy per day. Earn stars.
3. **Personalization (Phase 2):** Get "Suggested for you" games.
4. **Level Progression (Phase 2-3):** Progress 1-50, pass gates, earn badges.
5. **Social (Phase 3):** Join leaderboards, challenge friends.

### 2. Core Gameplay Loop (Daily)
1. Select Game (based on energy/persona).
2. Spend Energy (1 per session).
3. Complete Exercises (3-5 tracked by DRESIO SDK AI).
4. Measure Performance (real-time accuracy).
5. Earn Stars (1 to 3 based on accuracy).
6. Update Progress (Level up, update streak, check unlocks).

### 3. Success Metrics & Telemetry
- **Metrics to Track:** DAU (Daily Active Users), D7/D30 Retention, Streak, NPS.
- **Goals:** 
  - Phase 1: 70% complete first week.
  - Phase 2/3: 50% maintain 7-day streak.
  - Phase 4: 30% invite family members.