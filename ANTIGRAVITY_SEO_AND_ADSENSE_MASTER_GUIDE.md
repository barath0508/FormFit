# ANTIGRAVITY SEO AND ADSENSE MASTER IMPLEMENTATION GUIDE
## FormFit India (`formfit.in`)
### Programmatic SEO Engine, Rich E-E-A-T Editorial Layer, and 100% Policy-Compliant Google AdSense Monetization Architecture

---

**Project Name:** FormFit India  
**Production Domain:** `formfit.in`  
**Objective:** Architect, implement, and verify a high-reach programmatic SEO engine, rich E-E-A-T editorial layer, and 100% policy-compliant Google AdSense monetization infrastructure on top of the FormFit India client-side resizer workbench.  
**Document Version:** 2.0.0 — SEO & Monetization Architecture  
**Status:** Approved for Implementation  

---

## 1. Why Utility & Tool Websites Fail AdSense (And How Antigravity Must Engineer Around It)

Single-page web utilities frequently fail initial Google AdSense reviews with the status **"Low Value Content"** or **"Site Behavior: Navigation"**. This happens when Google's crawler (`Mediapartners-Google` and `Googlebot`) sees only an `<input type="file">`, a `<canvas>`, and 150 words of generic boilerplate repeated across 50 URLs.

### 1.1 Mandatory Anti-Rejection Architecture Rules
Antigravity MUST enforce these 6 architectural rules across the codebase:
1. **No Thin Doorway Pages:** Every programmatic route (`/resize/[portalSlug]`, `/kb/[kbSlug]`, `/dimensions/[dimSlug]`) MUST contain at least 900 words of unique, exam-specific or specification-specific static HTML content below the interactive workbench, including:
   - Official Specification Matrix Table (Pixels, Centimeters, Inches, Min/Max KB, Mandatory DPI, Background Rule, Signature Ink Rule).
   - Portal-Specific Rejection Troubleshooting Table (real portal error messages and exact fixes).
   - Step-by-Step Smartphone & Scanner Capture Guide tailored to that asset type.
   - Official Notification Source Citation + Last Verified Timestamp + Reviewer Attribution Card.
   - 6–8 Exam-Specific FAQs rendered inside semantic `<details><summary>` elements in the initial HTML payload.
2. **Dedicated Editorial Knowledge Base (`/guides/[slug]`):** Build 15+ long-form (1,000–1,600 words each) original pillar guides covering high-search-volume procedural problems.
3. **Complete 5-Page Legal & E-E-A-T Trust Suite:** Implement `/privacy`, `/terms`, `/disclaimer`, `/contact`, and `/about` linked visibly in the global footer and crawlable within 1 click from any page.
4. **Zero Broken Links or Empty States:** Never link to "Coming Soon" pages, empty category archives, or placeholder `href="#"` links.
5. **AdSense Policy Protection Against Accidental Clicks:** Never place an ad unit within 32px of the interactive crop canvas, sliders, or the "Download Compliant File" button. Every ad slot must display a permanent 11px uppercase "Advertisement" label above its reserved border box.
6. **Two-Stage Ad Rendering Flag (`NEXT_PUBLIC_ADSENSE_STATUS`):**
   - When `NEXT_PUBLIC_ADSENSE_STATUS="review"`, load only the single AdSense verification `<script>` in `<head>` without rendering empty blank whitespace boxes across the page.
   - When `NEXT_PUBLIC_ADSENSE_STATUS="active"`, activate the CLS-safe `<AdSlot/>` components with reserved min-height containers.

---

## 2. 4-Pillar Hub-and-Spoke Programmatic URL Architecture

```
                                   [ / ] (Home Hub)
       "Exam Photo, Signature & PDF Resizer India (20KB-50KB, 200 DPI)"
                                         |
     +-----------------------+-----------+-----------+-----------------------+
     |                       |                       |                       |
     v                       v                       v                       v
[Pillar 1: Exams]     [Pillar 2: Exact KB]   [Pillar 3: Dimensions]   [Pillar 4: Guides & Tools]
/resize/[portalSlug]  /kb/[kbSlug]           /dimensions/[dimSlug]    /tools/* & /guides/[slug]
- UPSC, SSC, IBPS     - 10kb-to-20kb         - 200x230-pixels         - /tools/date-name-on-photo
- SBI, RRB, NEET      - 20kb-to-50kb         - 140x60-pixels          - /tools/photo-signature-joiner
- JEE, CUET, GATE     - under-50kb           - 3.5x4.5-cm-in-pixels   - /tools/jpg-to-pdf-under-size
- NSDL & UTI PAN      - under-100kb          - 200-dpi-converter      - /guides/[15+ deep tutorials]
- State PSCs & Police - pdf-under-300kb      - 213x213-300-dpi        - /specs-directory
```

---

## 3. AdSense Infrastructure & Policy Compliance

* **`/ads.txt` Route**: Directly serves `google.com, pub-XXXX, DIRECT, f08c47fec0942fa0`.
* **`robots.txt`**: Unblocks both `Googlebot` and `Mediapartners-Google`.
* **Zero-CLS Ad Containers**: Min-height reservations (`min-h-[100px]`, `min-h-[250px]`, `min-h-[120px]`).
* **Placement Restrictions**: Strictly 40px away from interactive canvas and download buttons.
