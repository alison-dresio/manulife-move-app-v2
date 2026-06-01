Spec Kit Starter — manulife-move-app

What this starter includes:
- `specs/` — YAML spec templates for persona, onboarding, dashboard.

Quick start (assuming you have Spec Kit installed):

1. Install Spec Kit (if needed):

```bash
# Example (replace with your org's install):
npm install -g @spec-kit/cli
# or
pip install speckit
```

2. Initialize Spec Kit in this repo (optional):

```bash
cd "manulife-move-app"
spec-kit init --template minimal --out specs/
```

3. Validate specs:

```bash
spec-kit validate specs/
```

4. Generate artifacts (optional):

```bash
spec-kit generate ui --input specs/screens --out src/screens
```

Next steps I can do for you:
- Run `spec-kit init` and validation here (requires local CLI access).
- Scaffold React Native / web app folders and screen placeholders from these specs.
- Create component contracts (Design tokens, component props) from specs.

If you want me to scaffold the app code (React Native + TypeScript) now, say so and I'll proceed.
