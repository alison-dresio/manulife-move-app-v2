// Minimal OIDC/OAuth2 client scaffold for SPA (placeholder).
// Replace with a full-featured OIDC library in production.

type TokenSet = {
  access_token?: string
  refresh_token?: string
  expires_in?: number
}

let tokenSet: TokenSet | null = null

export function initOidc(options: { issuer: string; clientId: string; redirectUri: string }) {
  // TODO: initialize OIDC client (PKCE, discovery, etc.)
  console.warn('initOidc placeholder called', options)
}

export async function login() {
  // TODO: trigger redirect to authorization endpoint or popup
  throw new Error('login() not implemented — integrate an OIDC library')
}

export async function handleRedirectCallback(url: string) {
  // TODO: exchange code for tokens and store them
  console.warn('handleRedirectCallback placeholder', url)
}

export function getAccessToken() {
  return tokenSet?.access_token ?? null
}

export function logout() {
  tokenSet = null
}

export default { initOidc, login, handleRedirectCallback, getAccessToken, logout }
