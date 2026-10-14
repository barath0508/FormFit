# FormFit

**Privacy-First Client-Side Exam & Government Portal Photo, Signature, and Document Compliance Engine**

FormFit (`formfit.in`) is an open-source, privacy-first image and document formatting utility engineered for Indian competitive examinations (UPSC, SSC, IBPS, SBI, RRB, NTA JEE/NEET/CUET, GATE) and civic portals (PAN Card via NSDL/UTIITSL, Aadhaar, Passport Seva).

## Key Features

- **100% Client-Side Processing**: Zero media uploads. All image operations run in browser memory via HTML5 Canvas. Works completely in Airplane Mode.
- **Exact KB Window Compressor**: Deterministic binary search over JPEG quality with automatic JFIF Comment (`0xFFFE`) byte-padding floor to guarantee strict compliance with `10–20 KB` and `20–50 KB` portal rules.
- **True Binary 200/300 DPI Header Injection**: Injects verified JFIF APP0 density metadata so files pass strict government backend validation.
- **Name & Date of Photo (DOP) Plaque**: Regulatory bottom slate generation with auto-fitting typography for SSC, UPSC, and State PSCs.
- **Smart Signature Paper Whitener**: Adaptive luminance thresholding converts shadowed notebook backgrounds into clean `#FFFFFF` while preserving blue or black ink strokes.
- **Pre-Loaded Official Registry**: Verified 2026 specifications for 24+ Indian exams and identity documents.

## Tech Stack

- **Framework**: Next.js 15 (App Router, SSG static pre-rendering)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS & CSS Custom Properties
- **PDF Engine**: `pdf-lib` (dynamically loaded)
- **Testing**: Vitest (100% unit & integration test coverage)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run unit tests
npm test

# Build static production bundle
npm run build
```
