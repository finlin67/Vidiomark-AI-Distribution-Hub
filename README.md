# Vidiomark AI Distribution Hub - Hero Tile

A high-performance, single-file 'Hero Tile' dashboard built with React, Tailwind CSS, Framer Motion, and Google's Gemini AI.

## Key Features
- **Adaptive 600x600 Container**: Responsive square layout optimized for dashboard integration.
- **AI Campaign Suite**: Leverages `gemini-3-flash-preview` to analyze video scripts and predict engagement scale, CTR, and distribution strategies.
- **Custom Precision Video Player**: In-app video scrubbing, volume control, playback speed switching, and fullscreen support.
- **Live Real-Time Analytics**: Minimalist engagement metrics and retention curves visualized with Recharts.
- **Glassmorphic Aesthetic**: Premium dark-mode UI with floating social signals and dynamic lighting effects.

## Animation & State
- **Floating Nodes**: Social platform icons use periodic Y-axis oscillations via Framer Motion.
- **Predictive Intelligence Overlay**: Uses `AnimatePresence` for smooth transition of the AI analysis modal.
- **Integrated Video Scrubbing**: Responsive time-tracking state synchronizing raw video elements with custom Tailwind range inputs.

## Setup
- Requires `process.env.API_KEY` for AI features.
- Dependencies: `framer-motion`, `lucide-react`, `recharts`, `@google/genai`.