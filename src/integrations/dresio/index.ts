// DRESIO integration placeholder
// Replace with real SDK import and initialization per vendor docs.

export type Pose = any

export interface DresioConfig {
  apiKey?: string
  options?: Record<string, unknown>
}

let initialized = false

export function initDresio(config: DresioConfig) {
  // TODO: load and initialize the official DRESIO SDK here
  console.warn('initDresio called — this is a placeholder. Provide SDK initialization here.')
  initialized = true
}

export function startPoseStream() {
  if (!initialized) throw new Error('DRESIO not initialized')
  // TODO: start camera / pose stream
}

export function stopPoseStream() {
  if (!initialized) return
  // TODO: stop camera / pose stream
}

export function onPose(cb: (pose: Pose) => void) {
  if (!initialized) throw new Error('DRESIO not initialized')
  // TODO: call cb(pose) when new pose data arrives
}

export default { initDresio, startPoseStream, stopPoseStream, onPose }
