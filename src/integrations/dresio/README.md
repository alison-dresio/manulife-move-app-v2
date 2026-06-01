DRESIO SDK Integration (Placeholder)
===================================

This directory contains a placeholder integration for the DRESIO pose-detection SDK used for in-home gameplay.

What to implement
- Add the official DRESIO SDK package (follow vendor docs) or include their client bundle.
- Initialize the SDK with API keys / device config during app startup.
- Provide an adapter exposing: `initDresio()`, `startPoseStream()`, `stopPoseStream()`, `onPose(callback)`.

Notes
- This README is a scaffold only. Do not commit real API keys to the repo.
