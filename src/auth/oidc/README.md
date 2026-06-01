OIDC / OAuth2 SSO Integration
================================

This folder contains a lightweight client scaffold for OIDC / OAuth2 SSO flows.

Implementation notes
- Use a production-ready library for OIDC (e.g., `oidc-client-ts`, `@auth0/auth0-spa-js`, or `openid-client` on server).
- Store tokens securely (HTTP-only cookies or secure storage). Avoid localStorage for refresh tokens.
- Implement PKCE for SPA flows.

Files
- `oidcClient.ts` — minimal client wrapper used by the app. Replace with full library integration for production.
