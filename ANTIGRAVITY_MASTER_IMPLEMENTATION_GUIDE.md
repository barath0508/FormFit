# ANTIGRAVITY MASTER IMPLEMENTATION GUIDE
## FormFit India (`formfit.in`)
### Privacy-First Client-Side Exam & Government Portal Photo, Signature, and Document Compliance Engine

---

**Project Name:** FormFit India  
**Production Domain:** `formfit.in`  
**Product Category:** Privacy-First Client-Side Exam & Government Portal Photo, Signature, and Document Compliance Engine  
**Target Market:** India (UPSC, SSC, IBPS, SBI, RRB, NTA JEE/NEET/CUET, GATE, State PSCs, UIDAI Aadhaar, NSDL/UTIITSL PAN, Passport Seva)  
**Architecture Paradigm:** Static-First Next.js 15 (App Router) + Client-Side HTML5 Canvas / Web Workers + Binary JFIF/EXIF Header Manipulation (₹0 Server Compute Cost at 5,00,000+ MAU)  
**Document Version:** 1.0.0 — Production Blueprint  
**Status:** Approved for Implementation  

---

## 1. Project Understanding and Assumptions

### 1.1 Purpose & Core Problem
Every month, millions of Indian students, job aspirants, and citizens apply for competitive examinations (UPSC CSE/NDA/CDS, SSC CGL/CHSL/MTS/GD, IBPS PO/Clerk/RRB, SBI, Indian Railways RRB, NTA JEE Main/NEET UG/CUET, GATE, CAT) or update civic identity documents (PAN Card via Protean/NSDL or UTIITSL, Aadhaar via UIDAI, Indian Passport via Passport Seva Kendra). 

Each portal enforces rigid, idiosyncratic validation rules on uploaded images and documents:
1. **Exact Pixel Dimensions vs. Aspect Ratio:** For example, IBPS requires exactly `200 × 230 px` for photos and `140 × 60 px` for signatures; NSDL PAN requires `2.5 cm × 3.5 cm at 200 DPI` (`197 × 276 px`).
2. **Strict Byte-Size Windows:** Common rules include *"File size must be between 20 KB and 50 KB"* or *"Signature must be between 10 KB and 20 KB"*. Standard photo editors export either above the upper bound or below the minimum KB floor.
3. **DPI Metadata Rejection:** Portals like NSDL/UTIITSL PAN and certain State PSCs inspect the binary JFIF (`APP0`) or EXIF (`APP1`) header for `200 DPI` or `300 DPI`. Standard HTML5 `canvas.toBlob()` defaults to `72 DPI` or `96 DPI`, causing portals to reject otherwise valid images.
4. **Name & Date of Photo (DOP) Slates:** SSC, UPSC, and State PSC notifications frequently mandate that the candidate's full name and the date the photograph was taken be printed clearly at the bottom of the photograph.
5. **Severe Privacy & Security Risks of Existing Tools:** Existing online resizers upload sensitive personal photographs, signatures, and identity documents (caste certificates, disability certificates, ID proofs) to unverified remote servers, inject intrusive adware, or fail to hit minimum KB floors.

### 1.2 Why Users Will Choose FormFit India Over Alternatives
* **100% Client-Side Zero-Upload Guarantee:** All decoding, cropping, background contrast adjustment, Name/Date slate rendering, DPI byte injection, and PDF packaging occur inside the user's browser memory via HTML5 Canvas and Web Workers. Zero bytes of user media ever leave the device.
* **Exact KB Window Binary-Search Compressor (With Byte-Padding Floor):** If a portal requires 20 KB to 50 KB and a clean white-background signature compresses to 8 KB even at JPEG quality 1.0, standard tools fail. FormFit India uses a deterministic binary search over JPEG quantization quality (0.10 to 0.99) combined with safe, standards-compliant JFIF comment (`0xFFFE`) padding when an image naturally falls below a portal's minimum KB threshold.
* **True Binary DPI Header Injection:** Automatically patches the output JPEG `APP0` (JFIF) density bytes to the exact required DPI (200 DPI or 300 DPI) so legacy government validators pass the file on the first attempt.
* **Built-In Name & Date-on-Photo Composer:** One-click toggle that renders a regulatory-compliant bottom plaque (white background with black bold uppercase text, or black bar with white text) containing the candidate's name and capture date.
* **Verified Official Notification Registry:** Every preset links directly to the official exam notification PDF clause and displays the last verification date.

### 1.3 Documented Assumptions, Dependencies, and Limitations
* **Assumption 1 (Zero Server-Side Image Processing):** All image and PDF manipulation runs on the client device. The hosting environment serves only static HTML, JS, CSS, and JSON assets (compatible with Cloudflare Pages, Vercel Static/Edge, or AWS S3 + CloudFront).
* **Assumption 2 (Background Removal Scope):** Full AI neural background segmentation (e.g., 40 MB ONNX models) degrades mobile performance on budget Indian Android devices and violates Core Web Vitals on 4G networks. FormFit India includes a Smart Signature & Document Adaptive Threshold/Contrast Whiten Filter (turning grey/shadowed paper backgrounds on signatures into pure `#FFFFFF` white) and brightness/contrast normalization for photos. Neural background removal is deferred to an optional on-demand lazy-loaded module in Phase 2.
* **Assumption 3 (Live Camera Photo Capture Mandate):** Certain portals (such as SSC's live webcam capture module on `ssc.gov.in`) require live capture during the form session for the photo, while still requiring uploaded pre-sized signature files (10 KB–20 KB, 4.0 cm × 2.0 cm). FormFit India explicitly displays a portal advisory banner when an exam uses live capture for photos so candidates are never misled.
* **Limitation 1 (Client RAM Ceiling):** Devices with less than 2 GB RAM may crash if decoding corrupt 100 MP raw images. Input files are capped at 25 MB and 8192 × 8192 px maximum source resolution.

---

## 2. Product Requirements

### 2.1 Essential MVP Features (Launch Gate)
1. **Instant Exam & Portal Preset Selector:** Fuzzy-searchable combobox categorized by sector (UPSC, SSC, Banking/IBPS/SBI, NTA JEE/NEET/CUET, Railways RRB, Defence, State PSCs, ID Cards PAN/Aadhaar/Passport) plus a "Custom Dimensions & KB" mode.
2. **Multi-Asset Requirement Switcher:** Within a chosen exam (e.g., UPSC CSE), one-click tabs to switch between required deliverables: Passport Photograph, Scanned Signature, Left Thumb Impression, and PDF ID/Certificate Document.
3. **Interactive Aspect-Locked Crop & Alignment Workspace:**
   - Touch-friendly pinch-to-zoom, pan, 90-degree rotation, and fine straighten slider (-15° to +15°).
   - Biometric face-alignment guide overlay (head crown line, eye-level line, chin line, shoulder boundary) for passport photos.
   - Signature bounding-box guide overlay for horizontal signatures.
4. **Name & Date-on-Photo (DOP) Plaque Generator:**
   - Optional toggle (auto-enabled for presets that recommend or mandate it).
   - Inputs: Candidate Name (max 32 chars), Date of Photograph (defaults to today's date in `DD-MM-YYYY` format, selectable via date picker).
   - Renders a clean, proportional bottom band (15% of canvas height) in solid `#FFFFFF` with `#000000` bold sans-serif typography and a 1 px top divider line.
5. **Signature & Document Illumination Filter:**
   - Dedicated mode for signatures and thumb impressions that applies adaptive luminance thresholding to convert uneven grey notebook/paper shadows into pure `#FFFFFF` background while preserving dark blue or black ink strokes.
6. **Exact KB Binary-Search & Floor-Padding Engine:**
   - Runs inside a dedicated Web Worker (with graceful main-thread fallback).
   - Compresses image to target the sweet spot (60%–85% of the allowed `[minKB, maxKB]` range).
   - Guarantees output byte size is strictly $\ge \text{minBytes}$ and $\le \text{maxBytes}$.
7. **Binary JFIF DPI Header Patcher:**
   - Rewrites the JPEG `APP0` JFIF density unit to 1 (dots per inch) and writes big-endian 16-bit integers for `Xdensity` and `Ydensity` (e.g., 200 or 300 DPI).
8. **Client-Side Image-to-PDF Converter & Resizer:**
   - Converts single or multi-page scanned images (ID proof, Category Certificate, PwBD Certificate) into an exact-KB PDF (`pdf-lib`) matching portal limits (typically 50 KB–300 KB).
9. **Photo + Signature Stitcher (`/tools/photo-signature-joiner`):**
   - Combines a candidate photo and signature either vertically (photo on top, signature directly below) or horizontally into a single compliant JPG.
10. **Pre-Download Compliance Audit Receipt:**
    - Visual checklist verifying every official rule before download: Dimensions (PASS), File Size in KB (PASS), Format (JPG/JPEG), Color Space (sRGB), and DPI Metadata (200/300 DPI).

### 2.2 Optional V1.1 Enhancements
* **Batch All-in-One Exam Kit Export:** Upload Photo, Signature, and Thumb Impression in one flow and download a single `.zip` or sequential one-tap files named `UPSC_Photo_Ready.jpg`, `UPSC_Sign_Ready.jpg`.
* **Hindi & Regional UI Toggle:** Bilingual label support (English + Hindi) for instructions to assist rural and tier-2/tier-3 applicants.

### 2.3 Postponed Features (Out of Scope for Initial Build)
* User accounts, cloud storage, or saved photo galleries (violates zero-server-cost and zero-data-retention privacy model).
* Payment gateways or paywalls (100% free utility model).
* Heavy client-side WASM background segmentation models exceeding 2 MB bundle size.

---

## 3. Competitor and Opportunity Analysis

| Competitor Category | Representative Examples | Public Strengths | Technical & UX Weaknesses | FormFit India Advantage |
| :--- | :--- | :--- | :--- | :--- |
| **Generic Global Resizers** | ReduceImages, ILoveIMG, SimpleImageResizer | High domain authority; fast basic scaling. | No Indian exam presets; cannot guarantee minimum KB floor; does not inject DPI headers; uploads photos to remote servers. | Pre-loaded verified Indian exam specs; strict `[minKB, maxKB]` guarantee; 100% browser-local execution. |
| **Indian Sarkari Utility Clones** | ImResizer, SarkariResult tools, Photocrops | Ranked for specific exam keywords; familiar to cyber-cafe operators. | Cluttered with deceptive "Download" ad banners; jarring CLS layout shifts; outdated exam specs from 2021–2023; broken mobile crop touch handling. | Zero deceptive UI; zero layout shift ($\text{CLS} \le 0.02$); verified 2026 official circular metadata; mobile-first touch ergonomics. |
| **Desktop Cyber-Cafe Workflow** | Adobe Photoshop + MS Paint | Total manual control by experienced operators. | Inaccessible to mobile-only applicants (over 80% of Indian aspirants apply on smartphones); time-consuming manual trial-and-error. | Sub-second automated binary search hits exact KB & DPI targets on any budget smartphone browser. |

---

## 4. Technology Selection and Justification

| Layer | Technology | Version / Mode | Justification & When to Use Alternatives |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | 15.x (`output: 'export'` or Edge SSG) | Generates 100% pre-rendered static HTML for all 50+ exam landing pages (`/[portal-slug]`) for instant TTFB and full search engine crawlability without server compute costs. |
| **Language** | TypeScript | 5.x (`strict: true`, `noUncheckedIndexedAccess: true`) | Prevents runtime byte-offset calculation bugs in binary JFIF/EXIF manipulation and enforces strict schema adherence across all exam presets. |
| **Styling** | Tailwind CSS + CSS Custom Properties | 3.4+ / 4.x | Zero-runtime CSS bundle, deterministic design token mapping, and rapid responsive grid composition. |
| **Image Engine** | Native HTML5 Canvas API + OffscreenCanvas in Web Workers | Browser Standard | Zero external heavy WASM dependencies for core resize/crop/slate generation; runs natively on all modern Android/iOS/Desktop browsers with hardware-accelerated rasterization. |
| **PDF Engine** | `pdf-lib` (Dynamically Imported) | ^1.17.1 | Pure JavaScript/TypeScript PDF creation and embedding of compressed JPEG streams into exact-KB PDF containers without server round-trips. Loaded via `import('pdf-lib')` only when PDF output is selected. |
| **Schema Validation**| Zod | ^3.23.0 | Validates the static exam specification database at build time and validates user custom inputs at runtime. |
| **Icons** | `lucide-react` | Tree-shaken imports | Crisp, accessible, consistent 1.75px stroke SVG icons with zero font-loading flash. |
| **Testing** | Vitest + Playwright + `@axe-core/playwright` | Latest stable | Vitest validates binary JPEG header patching and byte-size math in milliseconds; Playwright verifies real browser Canvas rendering, mobile touch viewports, and WCAG 2.2 AA accessibility. |

---

## 5. Application Architecture

### 5.1 System Architecture Diagram
```
+-----------------------------------------------------------------------------------+
|                           CLIENT BROWSER (100% LOCAL)                             |
|                                                                                   |
|  +---------------------------+      +------------------------------------------+  |
|  | Next.js Static Route (SSG)|      | Static Preset Registry (JSON/TS Modules) |  |
|  | - / (Home + Universal)    |----->| - Validated at build time via Zod        |  |
|  | - /resize/[portal-slug]   |      | - Specs: px, cm, DPI, minKB, maxKB, DOP  |  |
|  +-------------+-------------+      +------------------------------------------+  |
|                |                                                                  |
|                v                                                                  |
|  +-----------------------------------------------------------------------------+  |
|  | React UI Workspace State Machine (useProcessorWorkspace)                    |  |
|  | [IDLE] -> [FILE_VALIDATED] -> [EDITING_CROP] -> [PROCESSING] -> [READY]     |  |
|  +-------------+-------------------------------------------------+-------------+  |
|                | (PostMessage: ImageBitmap + CropRect + Spec)    | (Blob URL)     |
|                v                                                 |                |
|  +-----------------------------------------------------------------------------+  |
|  | Dedicated Web Worker (image-processor.worker.ts)                            |  |
|  |  1. Rasterize Crop + Rotation onto OffscreenCanvas (exact target W x H px)  |  |
|  |  2. Apply Signature Adaptive Thresholding / Brightness-Contrast Filter      |  |
|  |  3. Draw Name & Date-on-Photo (DOP) Plaque if enabled                       |  |
|  |  4. Run Binary Search JPEG Quality Loop (q in [0.10, 0.99])                 |  |
|  |  5. If size < minBytes: Inject Safe JFIF COM (0xFFFE) Byte Padding          |  |
|  |  6. Patch Binary JFIF APP0 Header (0xFFE0) to exact target DPI (200/300)    |  |
|  |  7. Optional: Wrap JPEG bytes into single-page PDF via pdf-lib              |  |
|  |  8. Run Compliance Verification Audit -> Return Uint8Array + AuditReport    |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

### 5.2 Module Responsibilities
* `src/data/presets/`: Single source of truth for all exam and government portal rules, official notification references, verification dates, and default configuration flags.
* `src/lib/imaging/`:
  - `file-validator.ts`: Verifies magic bytes (`0xFFD8FF` for JPEG, `0x89504E47` for PNG, `0x52494646` for WebP), checks pixel bounds, and rejects corrupted or oversized files.
  - `canvas-renderer.ts`: Handles high-quality multi-step downscaling, rotation matrix transforms, signature luminance thresholding, and Name/Date plaque typography drawing.
  - `kb-compressor.ts`: Executes deterministic binary search over JPEG quality levels and performs JFIF `0xFFFE` comment segment byte padding when an image is smaller than `minKB`.
  - `dpi-patcher.ts`: Parses raw JPEG `Uint8Array` buffers, strips privacy-leaking EXIF (APP1 GPS/Camera serials), and injects or overwrites the `APP0` JFIF 18-byte header with exact target horizontal and vertical DPI.
  - `pdf-packager.ts`: Lazily loaded wrapper around `pdf-lib` that embeds the compressed JPEG buffer into an A4 or exact-dimension PDF container within target KB limits.
  - `compliance-auditor.ts`: Runs an independent post-processing verification over the generated binary buffer to prove that every portal requirement is satisfied.
* `src/components/workspace/`: Provides the dropzone, interactive viewport cropper, biometric face guide overlay, live compliance telemetry bar, and accessible keyboard controls.

### 5.3 Data Flow for Primary User Operation
1. **Preset Selection:** User navigates to `/resize/ssc-cgl-chsl-mts-resizer` (or selects "SSC CGL / CHSL" on `/`). The page loads pre-rendered with the `ssc-cgl-chsl-mts-resizer` preset active (Signature: 140 × 60 px, 10 KB–20 KB, JPG).
2. **Local File Ingestion:** User selects or drops an image (e.g., 3.4 MB smartphone photo). `file-validator.ts` reads the first 12 bytes via `File.slice(0, 12).arrayBuffer()` to verify valid image magic bytes before decoding via `createImageBitmap()` or `HTMLImageElement`.
3. **Interactive Framing:** User drags/zooms the crop box locked to 140:60 aspect ratio. If "Signature Ink Enhancer" is toggled, preview applies adaptive thresholding.
4. **Worker Compression & Binary Patching:** On clicking "Download Compliant File" (or automatically on 250ms debounced crop change), the processor rasterizes the exact 140 × 60 px canvas, runs up to 7 binary-search iterations to lock the byte size at ~16.5 KB (safely inside 10 KB–20 KB), patches the JFIF header to 200 DPI, and returns the `Uint8Array` + `ComplianceReport`.
5. **Verified Download:** The UI displays a green "100% Portal Compliant" receipt (`140 × 60 px | 16.4 KB | 200 DPI | sRGB JPG`) and triggers an instant download via `URL.createObjectURL(blob)` with a deterministic filename (`SSC_Signature_140x60px_16KB.jpg`), immediately revoking the object URL on unmount.

---

## 6. Complete Sitemap and Route Blueprint

### 6.1 Route Inventory

| Route Pattern | Route Type | Priority | Purpose & Target Intent |
| :--- | :--- | :--- | :--- |
| `/` | Static (SSG) | Launch MVP | Universal Exam & ID Resizer hub with instant preset selector, custom mode, and links to top 20 Indian portals. |
| `/resize/[portal-slug]` | Programmatic Static (`generateStaticParams`) | Launch MVP | Dedicated workbench + verified specification reference for 24+ high-demand exams and ID portals. |
| `/tools/photo-signature-joiner` | Static (SSG) | Launch MVP | Vertical and horizontal Photo + Signature stitcher required by specific state and university portals. |
| `/tools/date-name-on-photo` | Static (SSG) | Launch MVP | Dedicated utility for adding candidate Name and Date of Photograph (DOP) slate to passport photos. |
| `/tools/jpg-to-pdf-under-size` | Static (SSG) | Launch MVP | Multi-image / certificate to exact-KB PDF compressor (50 KB, 100 KB, 200 KB, 300 KB) for category/EWS/PwBD certificates. |
| `/specs-directory` | Static (SSG) | Launch MVP | Searchable, filterable master directory of all verified Indian exam & government portal specifications with official circular links. |
| `/privacy` | Static (SSG) | Launch MVP | Verifiable client-side privacy architecture documentation (explaining how users can test zero network uploads in DevTools or Airplane Mode). |
| `/about` | Static (SSG) | Launch MVP | Editorial verification standards, how official notifications are audited, and issue reporting contact. |

---

## 7. Professional UI/UX Design System

### 7.1 Visual Direction & Brand Tokens
* **Aesthetic Archetype:** Civic Precision & Calm Utility — inspired by Swiss typographic grids and high-trust engineering instruments. Applicants using this tool are often stressed hours before an exam deadline; the interface radiates clarity, speed, zero clutter, and mathematical accuracy.
* **Strict Anti-Patterns:** No fake progress bars, no blinking promotional banners, no pop-up modals asking for newsletter signups, and no ambiguous download buttons.

### 7.2 Color Tokens (`globals.css`)
```css
:root {
  /* Backgrounds & Surfaces */
  --bg-canvas: #F8FAFC;          /* Slate 50 - Primary page background */
  --bg-surface: #FFFFFF;         /* Pure White - Cards, workbench panels */
  --bg-surface-subtle: #F1F5F9;  /* Slate 100 - Secondary wells, dropzone idle */
  --bg-checkerboard-a: #E2E8F0;  /* Canvas transparency grid A */
  --bg-checkerboard-b: #F8FAFC;  /* Canvas transparency grid B */

  /* Typography & Ink */
  --text-primary: #0F172A;       /* Slate 900 - Contrast ratio 16.1:1 on white */
  --text-secondary: #334155;     /* Slate 700 - Contrast ratio 9.3:1 on white */
  --text-muted: #64748B;         /* Slate 500 - Contrast ratio 4.6:1 on white */

  /* Brand & Interactive Accents */
  --brand-primary: #1E40AF;      /* Civic Cobalt Blue 800 - Primary CTAs & active tabs */
  --brand-primary-hover: #1E3A8A;/* Blue 900 */
  --brand-subtle: #EFF6FF;       /* Blue 50 - Active preset highlight background */
  --accent-saffron: #D97706;     /* Amber 600 - Official notice callouts & badges */

  /* Semantic Compliance States */
  --status-pass-bg: #ECFDF5;     /* Emerald 50 */
  --status-pass-text: #065F46;   /* Emerald 800 */
  --status-pass-border: #10B981; /* Emerald 500 */

  --status-warn-bg: #FFFBEB;     /* Amber 50 */
  --status-warn-text: #92400E;   /* Amber 800 */
  --status-warn-border: #F59E0B; /* Amber 500 */

  --status-fail-bg: #FEF2F2;     /* Red 50 */
  --status-fail-text: #991B1B;   /* Red 800 */
  --status-fail-border: #EF4444; /* Red 500 */

  /* Borders & Focus */
  --border-default: #E2E8F0;     /* Slate 200 */
  --border-strong: #CBD5E1;      /* Slate 300 */
  --focus-ring: #2563EB;         /* 2px solid with 2px offset */

  /* Radii & Elevation */
  --radius-sm: 0.375rem;         /* 6px - Badges, inputs */
  --radius-md: 0.5rem;           /* 8px - Buttons, tabs */
  --radius-lg: 0.75rem;          /* 12px - Workbench cards */
  --shadow-card: 0 1px 3px 0 rgb(15 23 42 / 0.06), 0 1px 2px -1px rgb(15 23 42 / 0.06);
  --shadow-elevated: 0 10px 15px -3px rgb(15 23 42 / 0.08), 0 4px 6px -4px rgb(15 23 42 / 0.05);
}

.dark {
  --bg-canvas: #090D16;
  --bg-surface: #111827;
  --bg-surface-subtle: #1E293B;
  --text-primary: #F8FAFC;
  --text-secondary: #CBD5E1;
  --text-muted: #94A3B8;
  --brand-primary: #3B82F6;
  --brand-primary-hover: #60A5FA;
  --brand-subtle: #172554;
  --border-default: #1E293B;
  --border-strong: #334155;
}
```

---

## 8. Viewport Layout and Responsive Ergonomics

| Viewport Range | Target Devices | Layout & Component Behavior |
| :--- | :--- | :--- |
| **320px – 375px** | Compact Android / iPhone SE | Single-column stack. Preset selector spans 100% width. Asset tabs scroll horizontally with snap points (`overflow-x-auto snap-x`). Canvas cropper height fixed at 300px (`touch-action: none` inside cropper so pinch/drag never scrolls the page, with 24px outer page gutter so users can scroll past the canvas). Sticky bottom download bar appears once an image is loaded. |
| **390px – 430px** | Standard Indian Smartphones (Redmi, Realme, Samsung M-series) | Single-column stack. Canvas cropper height 340px. All buttons, sliders, and toggles enforce a minimum touch target of 44px × 44px (`min-h-[44px]`). Specification tables remain scrollable horizontally inside a bordered container with a subtle right-edge fade indicator. |
| **768px** | Tablet Portrait (iPad / Android Tab) | Two-column summary cards for specifications; workbench remains stacked with a 420px canvas height and side-by-side control drawers. |
| **1024px – 1280px+**| Laptop / Cyber-Cafe Desktop | Full 12-column split workbench (7 cols left workspace, 5 cols right telemetry & instant download panel). Keyboard shortcuts (Arrow keys to nudge crop 1px, Shift + Arrows for 10px, +/- to zoom, R to rotate 90°) active and displayed in a subtle footer hint. |

---

## 9. Master Specification Database

### 9.1 Zod Schemas (`src/types/preset.ts`)
```typescript
import { z } from 'zod';

export const AssetSpecSchema = z.object({
  id: z.string(),
  label: z.string(),
  assetType: z.enum(['photo', 'signature', 'thumb', 'document_pdf']),
  widthPx: z.number().int().positive(),
  heightPx: z.number().int().positive(),
  widthCm: z.number().positive(),
  heightCm: z.number().positive(),
  minKB: z.number().positive(),
  maxKB: z.number().positive(),
  dpi: z.number().int().min(72).max(600),
  allowedFormats: z.array(z.enum(['jpg', 'jpeg', 'png', 'pdf'])),
  backgroundRule: z.string(),
  requiresNameAndDate: z.enum(['mandatory', 'recommended', 'not_required']),
  inkColorRule: z.string().optional(),
  notes: z.array(z.string()),
});

export const ExamPortalPresetSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  shortName: z.string(),
  fullName: z.string(),
  category: z.enum([
    'upsc',
    'ssc',
    'banking',
    'nta',
    'railways_defence',
    'state_psc',
    'govt_id',
  ]),
  conductingBody: z.string(),
  officialWebsiteUrl: z.string().url(),
  notificationReference: z.string(),
  lastVerifiedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  liveCaptureAdvisory: z.string().optional(),
  searchKeywords: z.array(z.string()),
  assets: z.array(AssetSpecSchema).min(1),
  faqs: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
});

export type AssetSpec = z.infer<typeof AssetSpecSchema>;
export type ExamPortalPreset = z.infer<typeof ExamPortalPresetSchema>;
```

### 9.2 Complete Portal Seed Table (15+ Portals Verified)
1. **UPSC CSE / IAS / NDA / CDS (`upsc-photo-signature-resizer`)**
   - Photo: 550 × 550 px (350×350 to 1000×1000 allowed), 20–300 KB, 200 DPI. Mandatory Name & Date of Photo plaque.
   - Signature: 550 × 350 px (350×350 to 1000×1000), 20–300 KB, 200 DPI.
2. **SSC CGL / CHSL / MTS / GD (`ssc-cgl-chsl-mts-resizer`)**
   - Photo: 275 × 354 px (3.5 × 4.5 cm), 20–50 KB, 200 DPI. (Advisory: `ssc.gov.in` uses live webcam capture during application).
   - Signature: 140 × 60 px (or 236 × 118 px), 10–20 KB, 200 DPI.
3. **IBPS PO / Clerk / SO / RRB (`ibps-po-clerk-photo-resizer`)**
   - Photo: 200 × 230 px (4.5 × 3.5 cm), 20–50 KB, 200 DPI.
   - Signature: 140 × 60 px, 10–20 KB, 200 DPI (Black ink, not capital letters).
   - Left Thumb: 240 × 240 px, 20–50 KB, 200 DPI.
   - Declaration: 800 × 400 px, 50–100 KB, 200 DPI.
4. **SBI PO & Clerk (`sbi-po-clerk-photo-resizer`)**
   - Photo: 200 × 230 px, 20–50 KB, 200 DPI.
   - Signature: 140 × 60 px, 10–20 KB, 200 DPI.
   - Left Thumb: 240 × 240 px, 20–50 KB.
5. **NTA JEE Main (`nta-jee-main-photo-resizer`)**
   - Photo: 276 × 354 px (3.5 × 4.5 cm), 10–200 KB, 200 DPI.
   - Signature: 276 × 118 px (3.5 × 1.5 cm), 4–30 KB, 200 DPI.
   - Document PDF: 50–300 KB.
6. **NTA NEET UG (`nta-neet-ug-photo-resizer`)**
   - Passport Photo: 276 × 354 px, 10–200 KB, 200 DPI.
   - Postcard Photo (4" × 6"): 800 × 1200 px, 10–200 KB, 200 DPI (Mandatory Name & Date).
   - Signature: 276 × 118 px, 4–30 KB, 200 DPI.
7. **NTA CUET UG & PG (`nta-cuet-ug-pg-resizer`)**
   - Photo: 276 × 354 px, 10–200 KB, 200 DPI.
   - Signature: 276 × 118 px, 4–30 KB, 200 DPI.
8. **GATE GOAPS (`gate-photo-signature-resizer`)**
   - Photo: 360 × 460 px, 5–600 KB (optimal 20–200 KB), 200 DPI.
   - Signature: 560 × 180 px, 3–300 KB (optimal 10–100 KB), 200 DPI.
9. **Indian Railways RRB NTPC / Group D (`rrb-ntpc-group-d-photo-resizer`)**
   - Photo: 275 × 354 px, 30–70 KB, 200 DPI.
   - Signature: 140 × 60 px, 30–70 KB, 200 DPI (Strict 30 KB minimum floor!).
10. **Protean (NSDL) PAN Card (`nsdl-pan-card-photo-resizer`)**
    - Photo: 197 × 276 px (2.5 × 3.5 cm), 2–50 KB, 200 DPI Mandatory.
    - Signature: 354 × 157 px (4.5 × 2.0 cm), 2–50 KB, 200 DPI Mandatory.
    - Document PDF: $\le 300\text{ KB}$, 200 DPI.
11. **UTIITSL PAN Card (`utiitsl-pan-card-photo-resizer`)**
    - Photo: 213 × 213 px, 2–30 KB, 300 DPI Mandatory.
    - Signature: 400 × 200 px, 2–60 KB, 600 DPI Mandatory.
12. **UIDAI MyAadhaar Document Resizer (`uidai-aadhaar-document-resizer`)**
    - PoI / PoA Document: 1200 × 1600 px, 100–2000 KB, 200 DPI JPEG/PDF.
13. **Passport Seva Kendra (`passport-seva-photo-resizer`)**
    - Photo: 630 × 810 px (3.5 × 4.5 cm), 10–250 KB, 200 DPI.
    - Signature: 300 × 100 px, 5–50 KB, 200 DPI.
14. **IIM CAT Exam (`cat-iim-photo-signature-resizer`)**
    - Photo: 354 × 453 px, 30–1000 KB, 200 DPI.
    - Signature: 945 × 413 px, 10–80 KB, 150 DPI.
15. **TNPSC (`tnpsc-photo-resizer`)**
    - Photo: 276 × 354 px, 20–50 KB, 200 DPI (Mandatory Name + Date printed at bottom).
    - Signature: 236 × 118 px, 10–20 KB, 200 DPI.
16. **UPPSC OTR (`uppsc-otr-photo-resizer`)**
    - Photo: 275 × 354 px, 20–50 KB, 200 DPI.
    - Signature: 236 × 118 px, 10–20 KB, 200 DPI.
17. **BPSC Bihar (`bpsc-photo-resizer`)**
    - Photo: 200 × 230 px, 25–50 KB, 200 DPI.
    - Signature: 140 × 60 px, 15–20 KB, 200 DPI.

---

## 10. Core Binary Imaging & Compression Engine

### 10.1 Exact KB Window Binary-Search & Byte-Padding Engine
```typescript
// src/lib/imaging/kb-compressor.ts
export interface CompressionTarget {
  minBytes: number;
  maxBytes: number;
  targetDpi: number;
}

export interface CompressionResult {
  buffer: Uint8Array;
  finalBytes: number;
  qualityUsed: number;
  wasPadded: boolean;
  dpiPatched: number;
}
```
* **Binary Search:** 7 iterations over JPEG quality `q` in `[0.08, 0.98]`.
* **Floor Padding:** When an image compresses smaller than `minBytes`, inject a standards-compliant JPEG Comment (`0xFFFE`) marker with deterministic space padding to hit `minBytes + 1024 bytes`.

### 10.2 Binary JFIF (APP0) DPI Header Injector & EXIF Sanitizer
```typescript
// src/lib/imaging/dpi-patcher.ts
export function patchJpegDpiHeader(jpegBytes: Uint8Array, dpi: number): Uint8Array {
  if (jpegBytes.length < 20 || jpegBytes[0] !== 0xff || jpegBytes[1] !== 0xd8) {
    throw new Error('INVALID_JPEG_BUFFER: Missing SOI marker 0xFFD8');
  }

  const clampedDpi = Math.max(72, Math.min(1200, Math.round(dpi)));
  const hi = (clampedDpi >> 8) & 0xff;
  const lo = clampedDpi & 0xff;

  const hasApp0 =
    jpegBytes[2] === 0xff &&
    jpegBytes[3] === 0xe0 &&
    jpegBytes[6] === 0x4a && // 'J'
    jpegBytes[7] === 0x46 && // 'F'
    jpegBytes[8] === 0x49 && // 'I'
    jpegBytes[9] === 0x46;   // 'F'

  if (hasApp0) {
    const out = new Uint8Array(jpegBytes);
    out[13] = 0x01; // 1 = dots per inch
    out[14] = hi;
    out[15] = lo;
    out[16] = hi;
    out[17] = lo;
    return out;
  }

  // Inject canonical 18-byte APP0 segment
  const app0Segment = new Uint8Array([
    0xff, 0xe0, 0x00, 0x10,
    0x4a, 0x46, 0x49, 0x46, 0x00,
    0x01, 0x01,
    0x01,
    hi, lo,
    hi, lo,
    0x00, 0x00,
  ]);

  const merged = new Uint8Array(jpegBytes.length + app0Segment.length);
  merged.set(jpegBytes.subarray(0, 2), 0);
  merged.set(app0Segment, 2);
  merged.set(jpegBytes.subarray(2), 2 + app0Segment.length);
  return merged;
}

export function padJpegToTargetBytes(jpegBytes: Uint8Array, targetByteLength: number): Uint8Array {
  if (jpegBytes.byteLength >= targetByteLength) return jpegBytes;
  const bytesNeeded = targetByteLength - jpegBytes.byteLength;
  if (bytesNeeded < 4) return jpegBytes;

  const payloadLength = bytesNeeded - 2;
  const comSegment = new Uint8Array(bytesNeeded);
  comSegment[0] = 0xff;
  comSegment[1] = 0xfe; // COM marker
  comSegment[2] = (payloadLength >> 8) & 0xff;
  comSegment[3] = payloadLength & 0xff;
  comSegment.fill(0x20, 4);

  const insertOffset = 20;
  const padded = new Uint8Array(targetByteLength);
  padded.set(jpegBytes.subarray(0, insertOffset), 0);
  padded.set(comSegment, insertOffset);
  padded.set(jpegBytes.subarray(insertOffset), insertOffset + comSegment.length);
  return padded;
}
```

### 10.3 Signature Illuminator & Ink Thresholding
* Calculates perceived luminance: $L = 0.299R + 0.587G + 0.114B$.
* If $L \ge \text{threshold}$ (default 185), sets pixel to pure white `#FFFFFF`.
* If $L < \text{threshold}$, amplifies ink contrast to keep blue ink rich navy and dark ink crisp black.

### 10.4 Name & Date-on-Photo (DOP) Plaque Renderer
* Height: $16\%$ of canvas height for Name + Date; $10\%$ for Date only.
* Dynamically scales font to fit within 90% of canvas width.
* Draws high-contrast uppercase text with clean 1px top border.

---

## 11. Security, Privacy, and Content Verification

* **Magic-Byte Ingestion Guard:** Validates file signatures (`0xFFD8FF`, `0x89504E47`, `0x52494646`, `%PDF-`).
* **Decompression Bomb Guard:** Rejects files $> 25\text{ MB}$ or $> 8192 \times 8192\text{ px}$.
* **EXIF Sanitization:** Strips camera GPS and personal metadata automatically during canvas rasterization.
* **Content Security Policy:** Configures `connect-src 'self'` in `next.config.ts` headers to block any accidental or malicious third-party network egress.
* **Airplane Mode Banner:** Informs users they can disconnect from Wi-Fi/mobile data once the page loads and process sensitive ID files offline.

---

## 12. Automated Testing Suite & Acceptance Criteria

### 12.1 Acceptance Criteria (10-Point Release Gate)
1. `npm run typecheck` exits with code 0.
2. `npm run lint` exits with code 0.
3. `npx vitest run` passes all unit tests for DPI patching, floor padding, and preset schema validation.
4. `npm run build` succeeds and pre-renders all static routes (`/`, `/resize/*`, `/tools/*`, `/specs-directory`, `/privacy`, `/about`, `/sitemap.xml`, `/robots.txt`).
5. Exporting an SSC Signature (140 × 60 px, 10–20 KB) from a blank or sparse signature produces a valid `.jpg` with byte size strictly between 10,240 and 20,480 bytes.
6. Exporting an NSDL PAN Photo (197 × 276 px, 200 DPI) embeds `0x00 0xC8` (200) in bytes 14..15 and 16..17 of the JFIF `APP0` segment.
7. Toggling Name & Date-on-Photo renders centered text inside the bottom plaque without clipping.
8. Zero network requests containing user file data occur during image selection, cropping, or download.
9. Mobile viewports (320px, 375px, 390px) exhibit zero horizontal page scroll and maintain $\ge 44 \times 44\text{ px}$ touch targets on all interactive controls.
10. Playwright E2E and `@axe-core/playwright` WCAG 2.2 AA scans pass with zero violations.

---

## 13. Phased Implementation Plan

- **Phase 1: Environment & Tooling Setup:** Initialize Next.js 15, TypeScript, Tailwind CSS, Vitest, Lucide icons, `pdf-lib`, Zod.
- **Phase 2: Core Imaging & Binary Engine:** Implement `file-validator.ts`, `dpi-patcher.ts`, `canvas-renderer.ts`, `kb-compressor.ts`, `photo-sign-stitcher.ts`, `pdf-packager.ts`, `compliance-auditor.ts` with unit tests.
- **Phase 3: Preset Database & Sample Assets:** Build `src/data/presets/` with all 17+ portals and generate synthetic clean test assets in `public/samples/`.
- **Phase 4: Design Tokens & Interactive Workbench:** Build responsive UI layout, combobox, aspect-ratio cropper with face guide, date plaque composer, ink filter, and telemetry card.
- **Phase 5: Programmatic Routes & Specialized Tools:** Implement `/`, `/resize/[portalSlug]`, `/tools/photo-signature-joiner`, `/tools/date-name-on-photo`, `/tools/jpg-to-pdf-under-size`, `/specs-directory`, `/privacy`, `/about`.
- **Phase 6: Technical SEO, Verification, and Build Validation:** Configure `sitemap.ts`, `robots.ts`, `JsonLd.tsx`, run Vitest, and verify static export build.
