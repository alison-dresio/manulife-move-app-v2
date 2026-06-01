# Development — manulife-move-app

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

This project uses Vite + React + TypeScript + Tailwind CSS.

Files of interest:
- specs/: spec YAML files for Persona, Onboarding, Dashboard
- src/screens/Home.tsx: Home placeholder
- src/screens/GameDashboard.tsx: Game Dashboard placeholder

Integration scaffolding:
- `src/integrations/dresio/` — placeholder for DRESIO pose-detection SDK
- `src/auth/oidc/` — OIDC/OAuth2 SSO client scaffold (PKCE + token helpers)
- `src/api/` — clients for Reward Points and User Data APIs

Mock server (local dev)
- Run the mock server which emulates the Reward Points and User Data APIs (Hong Kong/ap-east-1 residency headers):

```bash
npm run mock:server
```

The Vite dev server proxies `/api` requests to the mock server on port `4000`. Start the mock server before using the app features that fetch `/api/*`.
