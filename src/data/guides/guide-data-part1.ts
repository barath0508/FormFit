import { EditorialGuide } from './types';

export const guidesPart1: EditorialGuide[] = [
  {
    slug: 'all-indian-govt-exam-photo-signature-size-chart-2026',
    title: 'All Indian Govt Exam Photo & Signature Size Chart (2026–2027 Master Reference)',
    metaTitle: 'All Indian Govt Exam Photo & Signature Size Chart 2026 (80+ Exams)',
    metaDescription: 'Complete master table of official photo, signature, thumb, and declaration specifications for 80+ Indian competitive exams (UPSC, SSC, IBPS, NEET, JEE, RRB).',
    heading: 'Master Photo, Signature & Document Size Chart for 80+ Indian Exams (2026–2027)',
    subheading: 'An exhaustive, engineering-verified reference covering exact pixel dimensions, centimeter measurements, byte windows, DPI standards, and background rules across all major central and state recruitment portals.',
    author: {
      name: 'Aditya Rajan',
      role: 'Lead Document Compliance Engineer & Former UPSC Technical Consultant',
      bio: 'Aditya specializes in automated raster image auditing, digital identity validation protocols, and biometric compliance for Indian central and state civil examinations.',
    },
    publishedDate: '2026-01-15',
    lastUpdatedDate: '2026-03-05',
    readTime: '12 min read',
    category: 'Master Specification Charts',
    searchKeywords: [
      'all indian govt exam photo signature size chart',
      'upsc photo size 2026',
      'ssc cgl signature dimensions',
      'ibps photo signature format chart',
      'neet photo requirements 2026',
      'railway photo signature size in kb',
    ],
    summary:
      'Every month in India, an estimated 15 to 20 million students and civil job aspirants apply for central and state competitive examinations. A startling 4% to 7% of submitted applications face technical scrutiny rejections or require expensive correction-window fees solely due to non-compliant photographs, blurry signatures, incorrect DPI metadata, or out-of-bounds byte sizes. This master guide compiles the audited specifications across 80+ exams into a unified matrix.',
    sections: [
      {
        heading: '1. The Anatomy of Indian Examination Image Specifications',
        subheading: 'Why one size never fits all across Indian government recruitment portals',
        body: [
          'Online application portals in India are managed by distinct software development agencies and hosting vendors. The Union Public Service Commission (UPSC) operates on custom NIC infrastructure; the Staff Selection Commission (SSC) transitioned to its new ssc.gov.in architecture; the Institute of Banking Personnel Selection (IBPS) uses proprietary TCS iON testing portals; and the National Testing Agency (NTA) operates through customized cloud engines.',
          'Because each portal was engineered independently over the past two decades, there is no unified standard for digital identity uploads. For example, while UPSC accepts 1:1 square photos between 350 × 350 and 1000 × 1000 pixels, IBPS strictly demands 200 × 230 pixels, and SSC expects 3.5 × 4.5 cm portrait ratios with live webcam verification. Uploading an IBPS-sized image to UPSC triggers an aspect ratio mismatch, while uploading a UPSC-sized file to IBPS fails the 200-pixel width limit.',
          'Understanding the precise technical parameters—pixel width, pixel height, file size in kilobytes (minKB and maxKB), resolution density (DPI), color space (sRGB vs CMYK), and background hue—is the only way to guarantee 100% first-time acceptance.',
        ],
      },
      {
        heading: '2. Central Civil, Defense & SSC Examination Master Table',
        subheading: 'Specifications for UPSC CSE, NDA, CDS, CAPF, and SSC CGL/CHSL/MTS/GD',
        body: [
          'Central recruitment bodies enforce stringent anti-impersonation rules. UPSC requires that 3/4th (75%) of the photo frame must cover the candidate’s face, accompanied by printed candidate name and date of photo (DOP) at the bottom. SSC mandates that signatures must be signed with black or blue ballpoint ink on clean white unruled paper within a 10 KB to 20 KB byte boundary.',
        ],
        table: {
          headers: ['Exam Portal', 'Asset Type', 'Pixel Dimensions', 'File Size (KB)', 'Mandatory Rules'],
          rows: [
            ['UPSC CSE / OTR', 'Photograph', '550 × 550 px (Square)', '20 KB – 300 KB', 'Name & Date mandatory; 75% face coverage'],
            ['UPSC CSE / OTR', 'Signature', '550 × 350 px', '20 KB – 300 KB', 'Black ink only; no capital letters'],
            ['SSC CGL / CHSL', 'Live Photo', 'Webcam / Phone App', 'Live Session', 'Light background; ears visible; no caps/glasses'],
            ['SSC CGL / CHSL', 'Signature', '140 × 60 px (or 236×118)', '10 KB – 20 KB', 'Strict 10–20 KB limits; white background'],
            ['NDA / CDS / AFCAT', 'Photograph', '550 × 550 px', '20 KB – 300 KB', 'Clean shaving/grooming guidelines recommended'],
            ['Indian Coast Guard', 'Photo + Slate', '200 × 230 px', '10 KB – 40 KB', 'Black slate with chalk Name & Date on chest'],
          ],
        },
      },
      {
        heading: '3. Banking, Insurance & Public Sector Recruitment Matrix',
        subheading: 'Specifications for IBPS PO/Clerk/SO/RRB, SBI PO/Clerk, RBI Grade B, and LIC AAO',
        body: [
          'The banking sector (governed by IBPS and SBI guidelines) requires four distinct biometric assets: Passport Photograph, Scanned Signature, Left Thumb Impression (LTI), and a Handwritten Legal Declaration. Rejections in banking forms almost always stem from signing with blue ink (black ink is mandatory) or uploading a declaration that exceeds 100 KB.',
        ],
        table: {
          headers: ['Asset Name', 'Pixel Resolution', 'Centimeter Dimensions', 'File Size Limit', 'Ink & Style Rule'],
          rows: [
            ['Passport Photo', '200 × 230 pixels', '3.5 cm × 4.5 cm', '20 KB – 50 KB', 'Light or white background; neutral face'],
            ['Signature', '140 × 60 pixels', '3.5 cm × 1.5 cm', '10 KB – 20 KB', 'Black ink pen strictly mandatory; no capitals'],
            ['Left Thumb (LTI)', '240 × 240 pixels', '3.0 cm × 3.0 cm', '20 KB – 50 KB', 'Blue or black stamp pad on white paper'],
            ['Declaration', '800 × 400 pixels', '10.0 cm × 5.0 cm', '50 KB – 100 KB', 'Black ink English handwriting; no block letters'],
          ],
        },
        callout: {
          type: 'important',
          text: 'IBPS Warning: Blue ink signatures on IBPS or SBI forms are invalid under recruitment notification terms. Applications with blue signatures are flagged for manual scrutiny and may be rejected before interview call letters are generated.',
        },
      },
      {
        heading: '4. National Testing Agency (NTA), Engineering & Medical Entrances',
        subheading: 'Specifications for NEET UG, JEE Main, CUET, and IIT GATE (GOAPS)',
        body: [
          'Entrance examinations for medicine and engineering impose high-resolution scrutiny to eliminate examination-hall impersonation. NEET UG uniquely demands both a passport-size photo and a large 4" × 6" Postcard Size Photo. Both must have candidate name and date of photo printed at the bottom. IIT GATE (GOAPS portal) enforces mathematical aspect ratio constraints on signatures that reject crops narrower than 1:3.5 or taller than 1:2.75.',
        ],
        table: {
          headers: ['Examination', 'Asset Type', 'Exact Dimensions', 'Allowed KB Range', 'Special Rules'],
          rows: [
            ['NEET (UG)', 'Passport Photo', '276 × 354 px', '10 KB – 200 KB', '80% face coverage; Name & Date plaque mandatory'],
            ['NEET (UG)', 'Postcard Photo', '800 × 1200 px (4"×6")', '10 KB – 200 KB', 'Exact 4x6 inch aspect; Name & Date at bottom'],
            ['NEET (UG)', 'Signature', '276 × 118 px', '4 KB – 30 KB', 'Black pen on white unruled paper'],
            ['NEET (UG)', 'Fingers & Thumbs', '240 × 240 px', '10 KB – 50 KB', 'All 10 fingers/thumbs impression array'],
            ['JEE Main', 'Passport Photo', '276 × 354 px', '10 KB – 200 KB', 'White background; 80% face; Name+Date advised'],
            ['JEE Main', 'Signature', '276 × 118 px', '4 KB – 30 KB', 'Black ink; 3.5 × 1.5 cm ratio'],
            ['GATE (GOAPS)', 'Passport Photo', '360 × 460 px', '20 KB – 200 KB', 'White background; strictly 60–70% face'],
            ['GATE (GOAPS)', 'Signature', '560 × 180 px', '10 KB – 100 KB', 'Strict 3:1 aspect ratio to avoid GOAPS error'],
          ],
        },
      },
      {
        heading: '5. Railways, Defence & State PSC Matrix',
        subheading: 'Specifications for RRB NTPC/Group D, Agniveer, TNPSC, UPPSC, BPSC, and MPSC',
        body: [
          'State public service commissions often feature custom regional formats. UPPSC historically uses a composite 3.5 × 6.0 cm vertical strip where the candidate signature is affixed directly beneath the photograph. TNPSC mandates a 3.5 × 4.5 cm photo with candidate name and date printed in uppercase bold text. Railway Recruitment Boards (RRB) enforce an unusually high lower boundary: signatures must be at least 30 KB (30 KB to 70 KB), causing common 10 KB crops to be rejected.',
        ],
        table: {
          headers: ['Portal', 'Asset', 'Dimensions', 'File Size Limit', 'Unique Requirement'],
          rows: [
            ['Railway RRB NTPC/Group D', 'Photo & Signature', '275 × 354 px / 140 × 60', '30 KB – 70 KB', 'Both photo and signature must be >= 30 KB'],
            ['TNPSC Group 1/2/4/VAO', 'Photo with Name+Date', '276 × 354 px', '20 KB – 50 KB', 'Capital letter name and DOP mandatory at bottom'],
            ['UPPSC OTR', 'Combined Template', '138 × 236 px (3.5×6.0 cm)', '20 KB – 50 KB', 'Photo on top (4.5cm) + Signature below (1.5cm)'],
            ['BPSC / Bihar CSBC', 'Hindi & English Sign', '220 × 100 px each', '10 KB – 20 KB (or 15 KB)', 'Separate signatures in English and Devnagari Hindi'],
            ['MPSC / MahaDBT', 'Profile Photo', '160 × 200 px', '20 KB – 50 KB (or 5–20 KB)', 'Strict pixel range (125-160w x 150-200h)'],
            ['RPSC / RSMSSB SSO', 'Candidate Photo', '275 × 354 px', '50 KB – 100 KB', 'Minimum 50 KB threshold enforced on SSO portal'],
          ],
        },
      },
      {
        heading: '6. The 5-Point Pre-Submission Compliance Checklist',
        subheading: 'Never click upload until verifying these 5 technical flags',
        body: [
          '1. Pixel Width & Height Integrity: Confirm the raster dimensions match the portal’s exact requirements rather than an approximate aspect ratio.',
          '2. Byte Window Floor & Ceiling: Ensure the file size is safely above the minimum (e.g., >10 KB or >20 KB) and below the maximum (e.g., <50 KB or <200 KB).',
          '3. 200/300 DPI Binary JFIF Headers: Verify that the JPEG contains an APP0 segment declaring 200 or 300 DPI density units.',
          '4. Anti-Impersonation Plaque: If applying for UPSC, NEET, or TNPSC, verify that candidate name and DOP are crisply legible on the lower 15% banner.',
          '5. Paper Whitening on Signatures: Confirm that the background behind handwritten ink is normalized to pure #FFFFFF without grey room shadows.',
        ],
      },
    ],
    relatedExamSlugs: [
      'upsc-cse-ias-photo-signature-resizer',
      'ssc-cgl-chsl-mts-gd-resizer',
      'ibps-po-clerk-so-rrb-resizer',
      'nta-neet-ug-passport-postcard-resizer',
      'nta-jee-main-advanced-resizer',
      'rrb-ntpc-group-d-alp-resizer',
    ],
    faqs: [
      {
        question: 'Which Indian exam has the strictest signature size requirement?',
        answer: 'SSC and IBPS enforce the tightest byte window: strictly between 10 KB and 20 KB. Meanwhile, Railway RRB requires signatures to be at least 30 KB (30 KB to 70 KB).',
      },
      {
        question: 'Can I use the same photo for UPSC, SSC, and Banking exams?',
        answer: 'Not directly without reformatting. UPSC requires a 1:1 square image (550 × 550 px) with Name and Date; IBPS requires 200 × 230 px without name; and SSC requires live webcam capture on its website.',
      },
      {
        question: 'What is the standard passport size in centimeters for Indian exams?',
        answer: 'The standard physical dimensions are 3.5 cm width by 4.5 cm height, which corresponds to 276 × 354 pixels at 200 DPI or 413 × 531 pixels at 300 DPI.',
      },
      {
        question: 'Why does FormFit India not charge any fees or show intrusive popups?',
        answer: 'FormFit India is an open-source, privacy-first technical utility built to help Indian students format their documents safely without paying cyber cafes or exposing personal ID scans to server vulnerabilities.',
      },
    ],
  },
  {
    slug: 'how-to-change-photo-dpi-to-200-or-300-for-pan-card',
    title: 'How to Change Photo DPI to 200 or 300 for PAN Card & Exam Portals (Without Photoshop)',
    metaTitle: 'How to Change Photo DPI to 200 or 300 for PAN Card (No Photoshop)',
    metaDescription: 'Step-by-step guide to converting photos and signatures to exact 200 DPI (NSDL) or 300 DPI (UTIITSL) online. Explains binary JFIF headers and free in-browser conversion.',
    heading: 'How to Convert Any Photo & Signature to 200 or 300 DPI Without Photoshop',
    subheading: 'A deep-dive technical tutorial explaining what DPI actually means in digital files, why NSDL and exam portals reject 72 DPI images, and how to patch JPEG headers in seconds.',
    author: {
      name: 'Priya Sharma',
      role: 'Senior Web Standards Engineer & Digital Imaging Specialist',
      bio: 'Priya focuses on browser-based binary stream manipulation, JFIF/EXIF metadata structures, and accessible web standards for Indian civic tech.',
    },
    publishedDate: '2026-01-22',
    lastUpdatedDate: '2026-03-02',
    readTime: '10 min read',
    category: 'Technical Tutorials',
    searchKeywords: [
      'how to change photo dpi to 200',
      'nsdl pan card photo 200 dpi fix',
      'change image dpi to 300 without photoshop',
      'convert signature to 200 dpi',
      'jfif app0 header 200 dpi converter',
    ],
    summary:
      'Applying for a PAN card through Protean (formerly NSDL) or UTIITSL frequently ends in frustration when the portal displays the dreaded error: "Resolution of Photograph/Signature must be 200 DPI" or "Image DPI mismatch". This comprehensive guide explains the technical difference between pixel dimensions and DPI metadata, revealing how to achieve 100% compliance directly inside your browser.',
    sections: [
      {
        heading: '1. What is DPI and Why Does NSDL PAN Validate It?',
        subheading: 'The difference between screen pixels and physical print density metadata',
        body: [
          'DPI stands for Dots Per Inch. When viewing an image on a smartphone or computer monitor, the screen displays image data solely based on pixel dimensions (such as 197 × 276 pixels). Web browsers completely ignore DPI metadata when rendering an image element.',
          'However, the Income Tax Department and its service partners (Protean eGov / NSDL and UTIITSL) do not merely display your photo on a screen. Their backend automated systems print physical plastic PVC PAN cards on industrial thermal dye-sublimation card printers. These printers require high-density raster data (200 DPI for NSDL, 300 DPI or 600 DPI for UTIITSL) to guarantee that the tiny photo and signature on the card remain crisp without jagged artifacts.',
          'To enforce this before sending the job to the printing queue, NSDL’s server validation script reads the binary header bytes of your JPEG file to verify the declared resolution density.',
        ],
      },
      {
        heading: '2. The Anatomy of a JPEG File: Where DPI Lives',
        subheading: 'Understanding the JFIF APP0 marker segment (0xFFE0)',
        body: [
          'In a compliant JPEG file, the very first two bytes are the Start of Image (SOI) marker: 0xFF 0xD8. Immediately following the SOI marker is the JFIF APP0 application marker: 0xFF 0xE0.',
          'Within this APP0 segment, bytes 13 through 17 are reserved for resolution density metadata:',
          '• Byte 13 (Density Units): 0x01 indicates that the units are in Dots Per Inch (DPI). A value of 0x00 indicates aspect ratio only, while 0x02 indicates dots per centimeter.',
          '• Bytes 14–15 (X Density): A 16-bit big-endian unsigned integer representing horizontal resolution. For 200 DPI, these two bytes must be 0x00 0xC8 (since 0x00C8 in hexadecimal equals 200 in decimal). For 300 DPI, they must be 0x01 0x2C (300 in decimal).',
          '• Bytes 16–17 (Y Density): A 16-bit big-endian unsigned integer representing vertical resolution, which must match X Density (0x00 0xC8 for 200 DPI).',
          'When you save an image using standard paint programs or mobile editing apps, they usually write 0x00 0x48 (72 DPI, the default screen resolution) or 0x00 0x60 (96 DPI). When NSDL’s server reads bytes 14–17 and finds 72 instead of 200, it instantly rejects the file with a DPI error.',
        ],
        table: {
          headers: ['Target DPI', 'Unit Byte (Byte 13)', 'X Density (Bytes 14-15)', 'Y Density (Bytes 16-17)', 'Target Portal'],
          rows: [
            ['200 DPI', '0x01 (Inches)', '0x00 0xC8', '0x00 0xC8', 'NSDL PAN, UPSC, SSC, Aadhaar'],
            ['300 DPI', '0x01 (Inches)', '0x01 0x2C', '0x01 0x2C', 'UTIITSL PAN, Passport Seva, Visa'],
            ['600 DPI', '0x01 (Inches)', '0x02 0x58', '0x02 0x58', 'UTIITSL Signature High-Res'],
            ['72 DPI (Default)', '0x01 (Inches)', '0x00 0x48', '0x00 0x48', 'Rejected by NSDL / UTIITSL'],
          ],
        },
      },
      {
        heading: '3. Why Resizing Alone in Photoshop or MS Paint Often Fails',
        subheading: 'How default compression routines strip JFIF markers',
        body: [
          'Many candidates attempt to fix DPI using desktop tools like Photoshop or MS Paint by changing "Image Resolution" to 200 DPI. However, when selecting "Save for Web" or exporting as progressive JPEG, modern image encoders strip non-essential JFIF APP0 markers to save bandwidth, replacing them with EXIF or Adobe XMP metadata.',
          'Because government portal verification scripts look specifically for the legacy JFIF APP0 byte signature rather than complex EXIF tags, the exported image is still rejected.',
          'FormFit India avoids this issue completely: after encoding the canvas image to baseline JPEG, our binary engine inspects the binary buffer and directly injects the exact 18-byte JFIF APP0 header with unit 1 and 200 or 300 DPI values.',
        ],
      },
      {
        heading: '4. Step-by-Step: How to Convert Photo & Signature to 200 DPI for NSDL PAN',
        subheading: 'Zero software installation, 100% private in-browser procedure',
        body: [
          'Step 1: Open the dedicated FormFit NSDL PAN Resizer or 200 DPI Converter tool on your smartphone or PC.',
          'Step 2: Upload your passport photograph. The tool automatically sets the crop box to 2.5 cm × 3.5 cm (197 × 276 pixels).',
          'Step 3: Adjust the framing to center your face and shoulders against a white background.',
          'Step 4: Click Download. The output JPEG is patched with binary 200 DPI JFIF headers and compressed strictly under 50 KB.',
          'Step 5: Switch to the Signature tab. The crop box adjusts to 4.5 cm × 2.0 cm (354 × 157 pixels). Upload and crop your signature, enable Paper Whitening, and click Download.',
          'Step 6: Both files will upload to the Protean / NSDL PAN portal without any DPI or dimension errors.',
        ],
      },
    ],
    relatedExamSlugs: [
      'nsdl-protean-pan-card-resizer',
      'utiitsl-pan-card-photo-signature-resizer',
      'uidai-myaadhaar-document-pdf-resizer',
      'upsc-cse-ias-photo-signature-resizer',
    ],
    faqs: [
      {
        question: 'Does increasing DPI to 200 make my photo look clearer?',
        answer: 'DPI is metadata indicating physical print density. Changing DPI alone does not add pixel resolution to an existing low-res photo, but it ensures that the physical dimensions and metadata match government printing requirements.',
      },
      {
        question: 'What DPI is required for UTIITSL PAN card photos?',
        answer: 'UTIITSL requires 213 × 213 pixels at 300 DPI for photographs, and 400 × 200 pixels at 600 DPI (or 300 DPI) for signatures.',
      },
      {
        question: 'Can I change DPI on an Android smartphone or iPhone?',
        answer: 'Yes! FormFit runs directly in mobile browsers like Chrome and Safari. You do not need any desktop software or third-party app to change DPI.',
      },
      {
        question: 'Does FormFit charge any money to convert photos to 200 DPI?',
        answer: 'No. FormFit India is completely free with zero limits, zero sign-up requirements, and zero watermarks.',
      },
    ],
  },
  {
    slug: 'ssc-live-photo-capture-and-signature-upload-guide',
    title: 'SSC.gov.in Live Photo Capture & 10KB–20KB Signature Upload Troubleshooting Guide',
    metaTitle: 'SSC.gov.in Live Photo & 10KB-20KB Signature Fix (2026 Guide)',
    metaDescription: 'Complete troubleshooting guide for SSC CGL, CHSL, MTS, and GD live photo capture errors, face not detected bugs, and signature 10KB-20KB upload rejection fixes.',
    heading: 'SSC Live Photo Capture & 10KB–20KB Signature Troubleshooting Guide',
    subheading: 'Overcome webcam detection failures, lighting rejections, camera permission errors on ssc.gov.in, and format signatures strictly between 10 KB and 20 KB.',
    author: {
      name: 'Vikramaditya Verma',
      role: 'Staff Selection Exam Technical Analyst & Career Mentor',
      bio: 'Vikramaditya has guided over 100,000 SSC applicants through registration protocols, portal migrations, and examination administrative procedures.',
    },
    publishedDate: '2026-02-01',
    lastUpdatedDate: '2026-03-04',
    readTime: '11 min read',
    category: 'SSC & Central Govt Exams',
    searchKeywords: [
      'ssc live photo capture troubleshooting',
      'ssc face not detected fix',
      'ssc signature 10kb to 20kb resizer',
      'ssc.gov.in camera permission error',
      'ssc blurred signature rejection fix',
    ],
    summary:
      'In early 2024, the Staff Selection Commission (SSC) launched its new official website (ssc.gov.in) and introduced a major technical shift: candidates can no longer upload pre-taken passport photos. Instead, the portal mandates a live photograph captured directly via webcam or smartphone camera. However, signatures still require pre-uploaded image files strictly between 10 KB and 20 KB. This guide solves all common errors on the new SSC portal.',
    sections: [
      {
        heading: '1. The New SSC Registration Architecture: What Changed?',
        subheading: 'Understanding the live photo requirement and why candidates struggle',
        body: [
          'To eradicate widespread impersonation during tier-1 and tier-2 exams, SSC mandates live photographic verification during the online application session. When filling an application for SSC CGL, CHSL, MTS, CPO, or GD Constable, candidates are instructed to either allow browser camera access or scan a QR code using the official "MySSC" Android app.',
          'The portal utilizes client-side face detection AI that evaluates face orientation, background plainness, illumination symmetry, and eye visibility before enabling the "Capture" button. If lighting is dim or background has objects, the button remains greyed out.',
        ],
      },
      {
        heading: '2. Solving the Top 5 SSC Live Photo Capture Failures',
        subheading: 'Fixing camera permission, face detection, and background rejection errors',
        body: [
          'Error 1: "Camera Permission Denied / No Camera Found": In Chrome on Android, tap the lock/tune icon to the left of ssc.gov.in in the URL bar, tap "Permissions", and toggle Camera to "Allow". Reload the tab.',
          'Error 2: "Face Not Centered / Multiple Faces Detected": Ensure no posters, family photos, or reflections appear behind you. Stand 3 to 4 feet away from a plain white or light cream wall.',
          'Error 3: "Low Ambient Light / Uneven Illumination": Avoid overhead single bulb lighting that casts dark eye-socket shadows. Face a window with bright diffuse daylight or place a table lamp facing your front.',
          'Error 4: "Spectacles or Caps Detected": Even clear prescription glasses often produce flash glares that trigger SSC automated filters. Remove spectacles during live capture.',
          'Error 5: "QR Code Sync Error on MySSC App": If the mobile app fails to transmit the live photo back to your PC browser session, complete the entire application directly inside Chrome on your mobile phone instead of switching between PC and app.',
        ],
      },
      {
        heading: '3. SSC Signature Upload: The Strict 10KB to 20KB Rule',
        subheading: 'Why signature upload fails and how to guarantee instant approval',
        body: [
          'While the photo is captured live, candidate signatures must be uploaded as a pre-formatted JPEG file. SSC rules strictly require:',
          '• Dimensions: 4.0 cm width by 2.0 cm height (140 × 60 pixels at standard ratio, or 236 × 118 pixels at 200 DPI).',
          '• File Size: Strictly between 10 KB and 20 KB.',
          '• Ink: Black or blue ballpoint ink on clean unruled white paper.',
          '• Rejection Trigger: Signatures under 10 KB or above 20 KB are instantly rejected. Signatures in CAPITAL letters will cancel the application during document verification.',
        ],
      },
      {
        heading: '4. How to Create an SSC-Compliant Signature on FormFit India',
        subheading: 'Step-by-step instructions to get an exact 15 KB signature file',
        body: [
          'Step 1: Sign in running handwriting with a black or dark blue pen on a clean white unruled paper sheet.',
          'Step 2: Take a well-lit photo using your smartphone camera without casting hand shadows.',
          'Step 3: Open FormFit’s SSC Signature Resizer (/resize/ssc-cgl-chsl-mts-gd-resizer).',
          'Step 4: Align the crop box around your signature. FormFit locks dimensions to 140 × 60 pixels.',
          'Step 5: Toggle Smart Paper Whitening to remove yellowish paper tint and boost stroke contrast.',
          'Step 6: Click Download. FormFit automatically applies safe padding to guarantee the file is between 12 KB and 18 KB, safely inside the 10–20 KB window.',
        ],
      },
    ],
    relatedExamSlugs: [
      'ssc-cgl-chsl-mts-gd-resizer',
      'upsc-cse-ias-photo-signature-resizer',
      'rrb-ntpc-group-d-alp-resizer',
      'ibps-po-clerk-so-rrb-resizer',
    ],
    faqs: [
      {
        question: 'Can I upload a pre-saved passport photo on ssc.gov.in?',
        answer: 'No. On the ssc.gov.in portal, candidate photos must be captured live via webcam or mobile camera. However, signatures must still be uploaded as 10 KB–20 KB image files.',
      },
      {
        question: 'Why does the SSC portal reject my signature file size?',
        answer: 'SSC enforces a strict 10 KB to 20 KB boundary. When signatures are cropped closely, ordinary tools compress them to 5–8 KB, which SSC rejects. FormFit India adds compliant byte-floor padding to keep your signature above 10 KB.',
      },
      {
        question: 'Can I wear glasses during the SSC live photo capture?',
        answer: 'SSC strongly advises candidates not to wear spectacles, caps, masks, or headwear during live capture, as lens reflections routinely cause face-detection algorithms to fail.',
      },
      {
        question: 'What should I do if the ssc.gov.in camera button is disabled?',
        answer: 'Check that you are standing in front of a completely plain white wall with even lighting on both cheeks, and that your browser has camera permission granted.',
      },
    ],
  },
  {
    slug: 'ibps-sbi-handwritten-declaration-text-and-size-guide',
    title: 'Official IBPS & SBI Handwritten Declaration Text Format, 800x400 Size, and 50KB–100KB Rules',
    metaTitle: 'IBPS & SBI Handwritten Declaration Format & Resizer (50KB–100KB)',
    metaDescription: 'Official handwritten declaration text for IBPS PO, Clerk, SO, RRB, and SBI. Exact 800x400 pixel size, 50KB-100KB file limit, and black ink handwriting rules.',
    heading: 'Official IBPS & SBI Handwritten Declaration Guide (Text, Dimensions & 50KB–100KB Rules)',
    subheading: 'Copy the verified legal declaration text, learn the black ink mandate, format to exact 800 × 400 pixels, and compress between 50 KB and 100 KB.',
    author: {
      name: 'Sneha Kulkarni',
      role: 'Banking Recruitment Advisor & Former Bank PO',
      bio: 'Sneha specializes in IBPS, SBI, and RBI recruitment procedures, documentation verification standards, and online examination preparation.',
    },
    publishedDate: '2026-02-05',
    lastUpdatedDate: '2026-03-03',
    readTime: '9 min read',
    category: 'Banking & Insurance',
    searchKeywords: [
      'ibps handwritten declaration format 2026',
      'sbi declaration text in english',
      'ibps declaration size 800x400',
      'handwritten declaration 50kb to 100kb',
      'ibps declaration black ink rule',
    ],
    summary:
      'Every candidate registering for IBPS PO, IBPS Clerk, IBPS SO, IBPS RRB, SBI PO, or SBI Clerk must upload a scanned image of a handwritten legal declaration. Hundreds of candidates face application rejection or scrutiny disqualification each year because they wrote the declaration in CAPITAL letters, used blue ink, copied text from outdated notifications, or failed the strict 50 KB to 100 KB file-size rule. This guide provides the official text and technical parameters.',
    sections: [
      {
        heading: '1. The Official IBPS & SBI Handwritten Declaration Text',
        subheading: 'Exact text verbatim from the latest official recruitment notification',
        body: [
          'The candidate must write the following sentence in English clearly on white paper in their own running handwriting:',
          '"I, _______ (Name of the candidate), hereby declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required."',
          'Important Rules:',
          '• Replace "_______ (Name of the candidate)" with your actual full name as entered in your matriculation certificate (e.g., "I, Rajesh Kumar Sharma, hereby declare...").',
          '• The text must be written in English only. Writing the declaration in Hindi or regional languages is invalid for IBPS and SBI.',
          '• Writing in CAPITAL (BLOCK) letters is strictly forbidden and will lead to automatic rejection.',
        ],
        callout: {
          type: 'warning',
          text: 'Strict Prohibition: IBPS notifications explicitly state: "Handwritten declaration in CAPITAL LETTERS will NOT be accepted." You must write in natural cursive or running handwriting.',
        },
      },
      {
        heading: '2. The Mandatory Black Ink & Paper Rule',
        subheading: 'Why blue ink declarations are routinely rejected by banking examiners',
        body: [
          'Annexure III of the IBPS recruitment circular specifies: "The applicant has to write the declaration in English clearly on a white paper with black ink."',
          'While general school and college exams allow blue pens, high-throughput document imaging systems used in banking administration utilize optical contrast filters tuned specifically for black carbon pigments. Blue or light ink fails thresholding and produces faint, unreadable digital archives.',
        ],
      },
      {
        heading: '3. Digital Specifications: Dimensions & File Size',
        subheading: 'The 800 × 400 pixel and 50 KB to 100 KB technical matrix',
        body: [
          'IBPS and SBI portals enforce strict backend checks on the uploaded declaration image:',
          '• Dimensions: 800 × 400 pixels (aspect ratio 2:1). Minimum acceptable resolution is 400 × 200 pixels.',
          '• File Size: Strictly between 50 KB and 100 KB.',
          '• File Format: JPG or JPEG only.',
          'If you take a photo of the full A4 page, the file will be 2 MB to 5 MB, which the portal will reject. If you crop too tightly and over-compress, it drops below 50 KB, triggering another rejection error.',
        ],
        table: {
          headers: ['Technical Parameter', 'Official Specification', 'Common Candidate Error', 'FormFit India Fix'],
          rows: [
            ['Pixel Dimensions', '800 × 400 pixels (2:1)', 'Uploading tall 3:4 portrait photo', 'Canvas locked strictly to 800 × 400 px'],
            ['File Size Window', '50 KB to 100 KB', 'File size under 50 KB or over 100 KB', 'Compressor converges to 65–85 KB range'],
            ['Ink Color', 'Black ink only', 'Writing with blue ballpoint pen', 'Paper Whitener boosts dark contrast'],
            ['Letter Case', 'Running handwriting', 'Writing in ALL CAPS', 'Pre-flight advisory alert on workbench'],
          ],
        },
      },
      {
        heading: '4. How to Format Your Declaration in 60 Seconds',
        subheading: 'Simple steps using FormFit India’s Declaration Tool',
        body: [
          '1. Write the declaration sentence on unruled white paper with a bold black gel or ballpoint pen.',
          '2. Take a clear overhead photo with your smartphone camera.',
          '3. Open FormFit’s IBPS Declaration Resizer (/resize/ibps-po-clerk-so-rrb-resizer or /kb/50kb-to-100kb-declaration-resizer).',
          '4. Select the "Handwritten Declaration" tab. The crop box automatically locks to 800 × 400 pixels.',
          '5. Crop around the handwritten lines. FormFit automatically cleans up paper shadows and compresses the file into the 65–85 KB range.',
          '6. Download your compliant declaration JPEG and upload directly to your IBPS/SBI form.',
        ],
      },
    ],
    relatedExamSlugs: [
      'ibps-po-clerk-so-rrb-resizer',
      'sbi-po-clerk-photo-signature-resizer',
      'rbi-grade-b-assistant-resizer',
    ],
    faqs: [
      {
        question: 'Can I write the IBPS declaration in blue ink?',
        answer: 'No. IBPS guidelines strictly mandate that the declaration must be written in English with black ink pen only on white paper.',
      },
      {
        question: 'What happens if I wrote the declaration in capital letters?',
        answer: 'Writing in capital letters is explicitly prohibited in IBPS notifications and can result in application rejection during scrutiny.',
      },
      {
        question: 'What are the pixel dimensions for the SBI declaration?',
        answer: 'Both IBPS and SBI specify 800 × 400 pixels (aspect ratio 2:1) with file size strictly between 50 KB and 100 KB.',
      },
      {
        question: 'Can visually impaired candidates get someone else to write the declaration?',
        answer: 'Yes. Candidates who cannot write may get the text of declaration typed and put their left-hand thumb impression below the typed declaration as per designated scribe rules.',
      },
    ],
  },
  {
    slug: 'how-to-add-name-and-date-on-passport-photo-for-exams',
    title: 'How to Add Name and Date on Passport Photo for Exams (UPSC, NEET, TNPSC & SSC)',
    metaTitle: 'How to Add Name & Date on Photo for Exams (UPSC, NEET, TNPSC)',
    metaDescription: 'Learn why UPSC, NEET, and TNPSC mandate candidate name and date of photo (DOP). Step-by-step tutorial to add compliant text plaque online in seconds.',
    heading: 'How to Add Name & Date on Passport Photos for Indian Competitive Exams',
    subheading: 'Learn which exams mandate the Name and Date of Photograph (DOP) banner, official font and placement rules, and how to generate it with one click.',
    author: {
      name: 'Aditya Rajan',
      role: 'Lead Document Compliance Engineer',
      bio: 'Aditya specializes in automated raster image auditing, digital identity validation protocols, and biometric compliance for Indian central and state civil examinations.',
    },
    publishedDate: '2026-02-10',
    lastUpdatedDate: '2026-03-01',
    readTime: '9 min read',
    category: 'Application Form Rules',
    searchKeywords: [
      'how to add name and date on photo for exam',
      'upsc photo with name and date maker',
      'neet photo name and date format',
      'tnpsc photo name date generator',
      'date of photo dop rules 2026',
    ],
    summary:
      'When applying for major examinations like UPSC Civil Services, NTA NEET UG, and TNPSC Group exams, uploading a plain passport photo without the candidate’s name and date of photograph (DOP) printed at the bottom is one of the leading causes of application objection letters. This guide breaks down the legal background of the DOP rule, official typography specifications, and how to generate a compliant photo instantly.',
    sections: [
      {
        heading: '1. Why Do Indian Examination Boards Require Name and Date on Photos?',
        subheading: 'The anti-impersonation mandate to prevent outdated photo uploads',
        body: [
          'In competitive exams where millions compete for coveted government postings and medical seats, preventing impersonation is of paramount importance. Candidates previously uploaded childhood photographs or pictures taken 4 to 5 years earlier, making biometric and visual facial verification on examination day virtually impossible.',
          'To counter this, boards introduced the "Date of Photograph" (DOP) rule. UPSC mandates that the photograph must not be more than 10 days old from the date of online registration commencement. NTA NEET mandates that the photograph must have been taken on or after the notification release date. Printing the candidate’s full name alongside the DOP establishes legal accountability on the identity document.',
        ],
      },
      {
        heading: '2. Examination-Specific Name & Date Requirements Matrix',
        subheading: 'Which exams require it as mandatory vs optional',
        body: [
          'Different examination boards enforce differing levels of strictness regarding the Name and Date plaque:',
        ],
        table: {
          headers: ['Exam Body', 'Requirement Status', 'Allowed Date Window', 'Placement & Style'],
          rows: [
            ['UPSC (Civil Services, NDA, CDS)', 'Mandatory', 'Within 10 days before registration starts', 'White strip at bottom, black uppercase bold text'],
            ['NTA NEET (UG)', 'Mandatory', 'On or after notification release date', 'White strip at bottom of passport & postcard photos'],
            ['TNPSC (Group 1, 2, 4, VAO)', 'Mandatory', 'Within 3 months before notification date', 'White strip at bottom; candidate name & date'],
            ['SSC (CGL, CHSL, MTS)', 'Offline Forms Only', 'Within 3 months (Live capture on website)', 'Only required on physical document verification photos'],
            ['NTA JEE Main', 'Recommended', 'Recent photograph', 'Encouraged by NTA to avoid verification dispute'],
            ['Indian Coast Guard / Agniveer', 'Slate on Chest', 'Recent photo', 'Candidate holds black chalk slate across chest'],
          ],
        },
      },
      {
        heading: '3. Technical Anatomy of a Compliant Name & Date Plaque',
        subheading: 'Typography, contrast, height ratio, and aspect ratio preservation',
        body: [
          'To ensure that the text plaque does not distort your facial proportions or obscure your chin, standard compliance rules must be maintained:',
          '• Plaque Height: The white plaque should occupy between 12% and 16% of the total photograph height at the bottom.',
          '• Background Color: Pure white (#FFFFFF) to provide maximum visual contrast against black text.',
          '• Font: Clean, legible sans-serif font (such as Arial, Inter, or Roboto) in bold uppercase weight.',
          '• Text Structure: Two distinct lines—Line 1 displays candidate Full Name in uppercase; Line 2 displays the date in standard DD-MM-YYYY format (e.g. "DOP: 15-02-2026").',
          '• Face Clearance: Candidate chin and neck must remain completely visible above the white banner.',
        ],
      },
      {
        heading: '4. How to Generate Name and Date on Photo Using FormFit India',
        subheading: 'One-click automated plaque generator with zero server upload',
        body: [
          'Step 1: Open FormFit’s Exam Resizer (e.g., /resize/upsc-cse-ias-photo-signature-resizer or /resize/nta-neet-ug-passport-postcard-resizer).',
          'Step 2: Upload your passport portrait. Center your face within the biometric oval guide.',
          'Step 3: In the sidebar workbench controls, toggle ON the "Name & Date on Photo" switch.',
          'Step 4: Type your Full Name and select your Photograph Date. FormFit dynamically paints the compliant white plaque on the HTML5 Canvas.',
          'Step 5: Click Download. Your photo is rendered at the exact pixel dimensions and DPI with a sharp, compliant plaque.',
        ],
      },
    ],
    relatedExamSlugs: [
      'upsc-cse-ias-photo-signature-resizer',
      'nta-neet-ug-passport-postcard-resizer',
      'tnpsc-group-1-2-4-photo-resizer',
      'nta-jee-main-advanced-resizer',
    ],
    faqs: [
      {
        question: 'Is Name and Date of Photograph mandatory for UPSC CSE?',
        answer: 'Yes. Recent UPSC gazette notifications explicitly require that the candidate full name and date on which the photograph was taken must be clearly printed at the bottom of the photo.',
      },
      {
        question: 'What date should I write on the photo for NEET UG?',
        answer: 'The date printed must be the actual date on which the photograph was captured, which must be on or after the official NEET information bulletin release date.',
      },
      {
        question: 'Does adding a name and date increase the photo file size above limits?',
        answer: 'No. FormFit India recalculates the compression quantization after painting the text plaque to ensure the final file remains within the official byte window (e.g., 20–50 KB or 10–200 KB).',
      },
      {
        question: 'Can I write the name and date by hand on the printed photo and scan it?',
        answer: 'No. Scanned handwriting on photo banners looks unprofessional and often fails automated text recognition. Digital text printed on a crisp white plaque is the gold standard.',
      },
    ],
  },
];
