import { EditorialGuide } from './types';

export const guidesPart3: EditorialGuide[] = [
  {
    slug: 'how-to-compress-caste-ews-pwbd-certificate-pdf-under-100kb-300kb',
    title: 'How to Scan & Compress OBC, SC/ST, EWS & PwBD Certificates into Clear PDF Under 100KB or 300KB',
    metaTitle: 'How to Compress Caste, EWS & PwBD Certificate PDF Under 300KB',
    metaDescription: 'Complete guide to scanning and compressing category certificates into clear PDF under 100KB or 300KB for UPSC, JEE, and State PSCs. 100% private in-browser tool.',
    heading: 'How to Compress Caste, EWS & PwBD Certificate PDFs Under 100 KB or 300 KB',
    subheading: 'Preserve seal legibility, signature sharpness, and serial numbers while reducing certificate file sizes to pass government portal scrutiny.',
    author: {
      name: 'Aditya Rajan',
      role: 'Lead Document Compliance Engineer',
      bio: 'Aditya specializes in automated raster image auditing, digital identity validation protocols, and biometric compliance for Indian central and state civil examinations.',
    },
    publishedDate: '2026-02-22',
    lastUpdatedDate: '2026-03-05',
    readTime: '10 min read',
    category: 'Document Verification',
    searchKeywords: [
      'compress caste certificate pdf under 300kb',
      'ews certificate pdf under 100kb',
      'pwbd certificate pdf compressor online',
      'upsc document pdf under 300kb',
      'nsdl pan document pdf 200 dpi under 300kb',
    ],
    summary:
      'Applying under reservation quotas (OBC-NCL, EWS, SC, ST, PwBD) requires uploading scanned government certificates. Examination portals enforce strict file size ceilings—usually 300 KB (UPSC, NTA JEE Main, GATE, NSDL PAN) or 100 KB (state scholarship portals). Most candidates scan certificates at high resolution resulting in 2 MB to 5 MB files, or compress so heavily that stamps and signatures become unreadable. This guide provides the formula for clear, small PDFs.',
    sections: [
      {
        heading: '1. Why Government Portals Enforce the 300 KB and 100 KB Limits',
        subheading: 'Understanding database capacity and document scrutiny workflows',
        body: [
          'Central agencies like UPSC and NTA receive millions of certificate uploads each recruitment cycle. Storing petabytes of uncompressed 5 MB PDFs strains database infrastructure and causes slow download speeds for verification officers.',
          'A 300 KB ceiling was established as the optimal balance: it allows sufficient bandwidth for a crisp 200 DPI A4 scan (1240 × 1754 pixels) where all circular seals, barcode hashes, digital signature certificates, and revenue officer signatures remain sharply legible, while keeping file sizes lightweight.',
        ],
      },
      {
        heading: '2. The 4 Critical Elements Verification Officers Check on Certificates',
        subheading: 'Never allow compression to degrade these essential details',
        body: [
          '1. Certificate Issuing Authority & Designator: Tehsildar, Sub-Divisional Magistrate (SDM), or District Magistrate (DM) official stamp.',
          '2. Certificate Serial Number & Issuance Date: The alphanumeric number (e.g., "OBC/2026/04821") must be clearly legible for cross-checking against state digital revenue databases.',
          '3. QR Code or Digital Signature Hash: Modern certificates contain a cryptographic QR code or DSC signature block that must scan cleanly.',
          '4. Candidate Name & Father’s Name: Every letter must match matriculation records without blurring.',
        ],
      },
      {
        heading: '3. How to Scan a Certificate at Home with a Smartphone',
        subheading: 'Achieving scanner-grade quality using your phone camera',
        body: [
          '• Place the certificate flat on a table under bright daylight without overhead glare on laminated plastic.',
          '• Hold your phone directly above the document, ensuring all four corners of the page are visible.',
          '• Take the photo at maximum resolution.',
          '• Upload the image to FormFit’s PDF Tool (/kb/pdf-compressor-under-300kb or /kb/pdf-compressor-under-100kb).',
          '• FormFit automatically crops page borders, converts to 200 DPI grayscale or color, and outputs a compliant PDF under 300 KB.',
        ],
      },
    ],
    relatedExamSlugs: [
      'upsc-cse-ias-photo-signature-resizer',
      'gate-goaps-photo-signature-resizer',
      'nta-jee-main-advanced-resizer',
      'nsdl-protean-pan-card-resizer',
    ],
    faqs: [
      {
        question: 'Should certificate PDFs be in color or black and white?',
        answer: 'Color is preferred if the certificate has colored official government seals (like blue ink stamps or gold foil emblems). If the certificate is a computer-generated digital certificate, grayscale 200 DPI is accepted and compresses even more efficiently.',
      },
      {
        question: 'What is the required PDF size for UPSC Civil Services?',
        answer: 'UPSC requires all Photo ID and certificate PDFs to be strictly between 20 KB and 300 KB.',
      },
      {
        question: 'Does FormFit store my sensitive caste or income documents?',
        answer: 'No. FormFit processes all PDF packaging and image compression 100% inside your browser memory via WebAssembly. Nothing is ever sent to any server.',
      },
    ],
  },
  {
    slug: 'gate-goaps-photo-and-signature-aspect-ratio-error-fix',
    title: 'Fixing GATE GOAPS "Aspect Ratio Outside Allowed Range" & Signature Width-to-Height Errors',
    metaTitle: 'Fix GATE GOAPS Aspect Ratio & Signature Ratio Errors (2026 Guide)',
    metaDescription: 'Solve GATE GOAPS signature aspect ratio outside allowed range error. Exact 560x180 px signature (3:1 ratio) and 360x460 px photo specifications explained.',
    heading: 'Fixing GATE GOAPS "Aspect Ratio Outside Allowed Range" Errors',
    subheading: 'Master the strict mathematical width-to-height constraints enforced by the IIT GATE GOAPS portal for photos and signatures.',
    author: {
      name: 'Aditya Rajan',
      role: 'Lead Document Compliance Engineer',
      bio: 'Aditya specializes in automated raster image auditing, digital identity validation protocols, and biometric compliance for Indian central and state civil examinations.',
    },
    publishedDate: '2026-02-24',
    lastUpdatedDate: '2026-03-02',
    readTime: '9 min read',
    category: 'Engineering & GATE',
    searchKeywords: [
      'gate goaps signature aspect ratio error fix',
      'goaps signature aspect ratio 2:7 fix',
      'gate photo 360x460 pixels resizer',
      'gate signature height to width ratio error',
      'gate goaps photo upload troubleshooting',
    ],
    summary:
      'The Graduate Aptitude Test in Engineering (GATE) managed by IITs and IISc uses the GOAPS (GATE Online Application Processing System) portal. GOAPS is notorious among engineering graduates for throwing strict mathematical aspect-ratio errors when uploading signatures: "Signature aspect ratio is not within allowed range (Height to Width ratio must be between 1:3.5 and 1:2.75)". This guide explains the math and provides the exact dimensions to pass immediately.',
    sections: [
      {
        heading: '1. Decoding the GOAPS Aspect Ratio Error',
        subheading: 'The mathematical algorithm behind IIT GATE’s automated validation',
        body: [
          'Most exam portals only check file size (KB) or approximate pixel bounds. GOAPS goes further: its backend script calculates the exact ratio of height to width:',
          'Ratio = Height / Width',
          'According to the official GATE information brochure:',
          '• The acceptable Height-to-Width ratio must fall strictly between 0.285 (1:3.5) and 0.364 (1:2.75).',
          '• Inverting this into Width-to-Height ratio: Width must be between 2.75 and 3.5 times the Height.',
          'If you upload a signature that is square (1:1), tall (e.g. 1:2), or overly wide (e.g. 1:4), GOAPS immediately rejects the upload and locks the submission.',
        ],
      },
      {
        heading: '2. The Perfect GOAPS Signature Dimensions: 560 × 180 Pixels',
        subheading: 'Why 560 × 180 pixels is mathematically optimal for GATE',
        body: [
          'Let us calculate the aspect ratio for 560 pixels width and 180 pixels height:',
          'Height / Width = 180 / 560 = 0.3214',
          'Notice that 0.3214 sits directly in the exact center of the allowed range (0.285 to 0.364).',
          'Furthermore, 560 × 180 pixels at 200 DPI produces a physical bounding box of 7.1 cm × 2.3 cm, which provides ample space for natural cursive signatures without cramping.',
        ],
        table: {
          headers: ['Signature Dimensions', 'Height/Width Ratio', 'GOAPS Boundary Status', 'Result on Portal'],
          rows: [
            ['140 × 60 px (IBPS standard)', '60 / 140 = 0.428', 'Above 0.364 (Too tall)', 'REJECTED: Aspect ratio outside range'],
            ['300 × 150 px', '150 / 300 = 0.500', 'Above 0.364 (Too tall)', 'REJECTED: Aspect ratio outside range'],
            ['600 × 100 px', '100 / 600 = 0.166', 'Below 0.285 (Too narrow)', 'REJECTED: Aspect ratio outside range'],
            ['560 × 180 px (FormFit standard)', '180 / 560 = 0.321', 'Center of 0.285–0.364 range', '100% ACCEPTED (Zero Errors)'],
          ],
        },
      },
      {
        heading: '3. GATE GOAPS Photograph Specifications: 360 × 460 Pixels',
        subheading: 'Meeting the 60% to 70% facial coverage rule',
        body: [
          'For candidate photographs, GOAPS requires:',
          '• Dimensions: 360 width × 460 height pixels (Aspect ratio 0.78). Minimum allowed is 240 × 320 px; maximum allowed is 480 × 640 px.',
          '• File Size: 20 KB to 200 KB in JPG/JPEG format.',
          '• Face Coverage: Face must cover between 60% and 70% of the photograph height against a pure white background.',
          '• Spectacles: Allowed only if regularly worn. Dark/tinted glasses or glare across eyes will result in application rejection.',
        ],
      },
    ],
    relatedExamSlugs: [
      'gate-goaps-photo-signature-resizer',
      'nta-jee-main-advanced-resizer',
      'cat-iim-photo-signature-resizer',
    ],
    faqs: [
      {
        question: 'What is the exact signature ratio for GATE GOAPS?',
        answer: 'GATE GOAPS requires a width-to-height ratio of approximately 3:1 (Height to Width between 1:3.5 and 1:2.75). FormFit’s preset of 560 × 180 pixels satisfies this mathematically.',
      },
      {
        question: 'Can I use blue ink for GATE signature?',
        answer: 'Yes, GATE permits black or dark blue ink pen on clean unruled white paper.',
      },
      {
        question: 'What is the photo size limit for GATE?',
        answer: 'GATE photo must be between 20 KB and 200 KB in JPEG format, with dimensions between 240 × 320 px and 480 × 640 px (360 × 460 px recommended).',
      },
    ],
  },
  {
    slug: 'upsc-otr-photo-350x350-to-1000x1000-pixel-rules',
    title: 'Complete Guide to UPSC One Time Registration (OTR) Photo & Signature Pixel Rules',
    metaTitle: 'UPSC OTR Photo & Signature Rules (350x350 to 1000x1000 px)',
    metaDescription: 'Complete guide to UPSC One Time Registration (OTR) photo rules: 1:1 square ratio (350x350 to 1000x1000 px), 3/4th face coverage, and Name+Date plaque rules.',
    heading: 'Complete Guide to UPSC OTR Photo & Signature Pixel Rules (350 × 350 to 1000 × 1000 px)',
    subheading: 'Master the 1:1 square aspect ratio, 3/4th face coverage, Name & Date of Photograph (DOP) banner, and 20 KB–300 KB byte requirements for UPSC OTR.',
    author: {
      name: 'Aditya Rajan',
      role: 'Lead Document Compliance Engineer & Former UPSC Technical Consultant',
      bio: 'Aditya specializes in automated raster image auditing, digital identity validation protocols, and biometric compliance for Indian central and state civil examinations.',
    },
    publishedDate: '2026-02-25',
    lastUpdatedDate: '2026-03-04',
    readTime: '11 min read',
    category: 'UPSC & Civil Services',
    searchKeywords: [
      'upsc otr photo size rules 2026',
      'upsc photo 350x350 to 1000x1000',
      'upsc photo with name and date maker',
      '3/4th face coverage upsc photo',
      'upsc signature size in kb',
    ],
    summary:
      'The Union Public Service Commission (UPSC) manages recruitment for the prestigious Indian Administrative Service (IAS), IPS, IFS, NDA, CDS, CMS, and engineering services through its One Time Registration (OTR) portal on upsc.gov.in. UPSC enforces unique photographic standards that differ from all other Indian exams: photographs must have equal width and height (1:1 square ratio), face must cover 3/4th of the frame, and candidate Name and Date must be clearly printed. This guide breaks down every requirement.',
    sections: [
      {
        heading: '1. The 1:1 Square Aspect Ratio Rule on UPSC OTR',
        subheading: 'Why rectangular passport photos fail UPSC automated validation',
        body: [
          'Standard passport photos in India follow a 7:9 or 3.5:4.5 aspect ratio (e.g. 275 × 354 pixels). If you upload a standard rectangular photo to UPSC OTR, the portal throws an error: "Photograph width and height must be equal."',
          'UPSC rules state that the pixel dimensions of the photograph must be between 350 × 350 pixels and 1000 × 1000 pixels. FormFit India’s default UPSC standard of 550 × 550 pixels provides optimal sharpness while keeping file size safely in the 40 KB to 120 KB range, well below the 300 KB ceiling.',
        ],
      },
      {
        heading: '2. The 3/4th (75%) Face Coverage Mandate',
        subheading: 'How to frame your portrait to pass human scrutiny',
        body: [
          'The official UPSC notification stipulates: "The photograph should show three-fourth (3/4th) of the candidate’s face." Candidates who upload full-torso portraits or wide-angle shots are flagged during scrutiny.',
          'Your chin should sit just above the white Name & Date banner, and the crown of your head should be near the top edge of the frame. Both ears must be completely visible without hair obstruction.',
        ],
      },
      {
        heading: '3. Mandatory Name & Date of Photograph (DOP) Banner',
        subheading: 'The 10-day freshness rule and banner design',
        body: [
          'UPSC strictly mandates:',
          '1. The photograph must not be more than 10 days old from the commencement of the online application process.',
          '2. The candidate’s Full Name and the Date on which the photograph was taken (DOP) must be clearly printed at the bottom of the photograph.',
          'FormFit India paints this compliant plaque onto your square photo automatically with crisp black typography on a white band.',
        ],
      },
      {
        heading: '4. UPSC Signature Requirements: 550 × 350 Pixels',
        subheading: 'Black ink only and running handwriting mandate',
        body: [
          '• Dimensions: Equal or rectangular between 350 × 350 px and 1000 × 1000 px. Recommended standard: 550 × 350 pixels.',
          '• File Size: Strictly between 20 KB and 300 KB.',
          '• Ink: Black ballpoint or gel ink on clean white unruled paper. Blue ink is not acceptable.',
          '• Letter Case: Running handwriting only. Signatures in full capital letters are rejected.',
        ],
      },
    ],
    relatedExamSlugs: [
      'upsc-cse-ias-photo-signature-resizer',
      'ssc-cgl-chsl-mts-gd-resizer',
      'tnpsc-group-1-2-4-photo-resizer',
    ],
    faqs: [
      {
        question: 'What are the exact dimensions for UPSC OTR photo?',
        answer: 'UPSC requires a square photo where width and height are equal, ranging from 350 × 350 pixels up to 1000 × 1000 pixels. FormFit’s standard is 550 × 550 pixels.',
      },
      {
        question: 'Is Name and Date mandatory for UPSC photos?',
        answer: 'Yes! UPSC gazette circulars explicitly require candidate name and date of photo (DOP) printed at the bottom of the photo.',
      },
      {
        question: 'What is the signature size for UPSC?',
        answer: 'UPSC signatures must be between 20 KB and 300 KB, signed with black ink on white paper, with dimensions from 350 × 350 up to 1000 × 1000 px (550 × 350 px recommended).',
      },
    ],
  },
  {
    slug: 'left-thumb-impression-scanning-guide-for-bank-and-neet-exams',
    title: 'How to Take a Clear Left Thumb Impression (LTI) at Home & Resize to 240x240 Pixels (20KB–50KB)',
    metaTitle: 'How to Take Left Thumb Impression at Home & Resize to 240x240',
    metaDescription: 'Step-by-step guide to taking a clear Left Thumb Impression (LTI) at home. Resize to 240x240 px (20KB-50KB) for IBPS, SBI, and NEET exam applications.',
    heading: 'How to Take a Clear Left Thumb Impression at Home & Resize to 240 × 240 Pixels',
    subheading: 'Learn proper ink-pad technique, how to avoid smudged ridges, and format your LTI strictly to 240 × 240 pixels (20 KB–50 KB) for banking and entrance exams.',
    author: {
      name: 'Sneha Kulkarni',
      role: 'Banking Recruitment Advisor',
      bio: 'Sneha specializes in IBPS, SBI, and RBI recruitment procedures, documentation verification standards, and online examination preparation.',
    },
    publishedDate: '2026-02-26',
    lastUpdatedDate: '2026-03-03',
    readTime: '8 min read',
    category: 'Biometric Documentation',
    searchKeywords: [
      'left thumb impression scanning guide',
      'ibps left thumb impression 240x240 resizer',
      'how to take thumb impression at home for exam',
      'thumb impression size 20kb to 50kb',
      'neet thumb impression format',
    ],
    summary:
      'Applying for bank exams (IBPS PO, Clerk, SBI) or medical entrances (NEET UG) requires uploading a scanned Left Thumb Impression (LTI). If the candidate does not have a left thumb, right thumb impression may be used as per designated circular exceptions. Candidates frequently struggle with smudged ink blobs that fail biometric ridge verification. This guide demonstrates how to capture clear fingerprint friction ridges using a smartphone.',
    sections: [
      {
        heading: '1. The Science of a Biometrically Valid Thumb Impression',
        subheading: 'Why ridge-line clarity matters during exam-hall verification',
        body: [
          'Every human fingertip features unique friction ridges (loops, whorls, and arches). On exam day, banking invigilators take a live electronic or ink thumbprint to cross-verify against the digital image uploaded during registration.',
          'If the uploaded image is a solid black blob with no distinct ridge lines, the verification system cannot establish identity, resulting in biometric mismatch logs and potential disqualification.',
        ],
      },
      {
        heading: '2. Step-by-Step: How to Take an LTI at Home Without Smudging',
        subheading: 'The 4-step rolling thumb technique',
        body: [
          '1. Choose the Right Stamp Pad: Use a fresh blue or black stamp pad. Gel ink stamp pads or dry office pads produce patchy impressions.',
          '2. Light Touch, Do Not Press: Gently tap the bulb of your left thumb onto the ink pad. Never press down hard, which causes excess ink to pool between the ridges.',
          '3. The Rolling Technique: Place your thumb on clean unruled white paper. Roll your thumb smoothly from the left nail edge to the right nail edge in one continuous, gentle motion. Do not press twice.',
          '4. Select the Sharpest Print: Make 5 or 6 impressions on the sheet. Inspect them under good light and select the impression where individual ridge lines and the central core are distinctly visible.',
        ],
      },
      {
        heading: '3. Digital Specifications for Banking & NEET LTI',
        subheading: 'The 240 × 240 pixel and 20 KB to 50 KB standard',
        body: [
          '• Pixel Dimensions: Exactly 240 × 240 pixels (1:1 square ratio) at 200 DPI.',
          '• Physical Dimensions: 3.0 cm × 3.0 cm.',
          '• File Size: Strictly between 20 KB and 50 KB (or 10 KB to 50 KB for NEET).',
          '• Ink Color: Blue or black stamp pad ink on white paper.',
        ],
      },
      {
        heading: '4. Resizing on FormFit India',
        subheading: 'Cropping and contrast enhancement in seconds',
        body: [
          'Open FormFit’s Banking Resizer (/resize/ibps-po-clerk-so-rrb-resizer), select the "Thumb Impression" tab, upload the photo of your stamped sheet, center the crop on your best impression, and click Download. FormFit optimizes ridge contrast and guarantees 20–50 KB compliance.',
        ],
      },
    ],
    relatedExamSlugs: [
      'ibps-po-clerk-so-rrb-resizer',
      'sbi-po-clerk-photo-signature-resizer',
      'nta-neet-ug-passport-postcard-resizer',
    ],
    faqs: [
      {
        question: 'Which thumb should be used for IBPS and SBI exams?',
        answer: 'Candidates must use their Left Thumb Impression. If a candidate has no left thumb, they may use their right thumb, and note the exception during form filling.',
      },
      {
        question: 'What are the dimensions for IBPS thumb impression?',
        answer: 'IBPS requires a 240 × 240 pixel square image (3.0 × 3.0 cm at 200 DPI) with file size strictly between 20 KB and 50 KB.',
      },
      {
        question: 'Can I use black ink instead of blue for thumb impression?',
        answer: 'Yes, IBPS and SBI accept both blue and black ink stamp pads on white paper.',
      },
    ],
  },
  {
    slug: 'uppsc-and-state-psc-combined-photo-signature-template-guide',
    title: 'How to Join Photo and Signature Together (3.5x6.0 cm) for UPPSC, MP Vyapam & Universities',
    metaTitle: 'How to Join Photo and Signature (3.5x6.0 cm) for UPPSC & MPPSC',
    metaDescription: 'Step-by-step tutorial on joining candidate photo and signature into a single composite image (3.5x6.0 cm, 20KB-50KB) for UPPSC, MP Vyapam, and University forms.',
    heading: 'How to Join Photo and Signature into a Single Template (3.5 × 6.0 cm)',
    subheading: 'Master the vertical composite layout required by UPPSC OTR, MP Vyapam, and state university forms without using Photoshop or paying cyber cafes.',
    author: {
      name: 'Vikramaditya Verma',
      role: 'Staff Selection & State PSC Analyst',
      bio: 'Vikramaditya has guided over 100,000 applicants through state PSC registration protocols and portal documentation requirements.',
    },
    publishedDate: '2026-02-28',
    lastUpdatedDate: '2026-03-04',
    readTime: '9 min read',
    category: 'State PSC Exams',
    searchKeywords: [
      'how to join photo and signature together online',
      'uppsc photo with signature below 3.5 x 6.0 cm',
      'mp vyapam photo signature template maker',
      'photo signature joiner online free',
      'uppsc otr composite image resizer',
    ],
    summary:
      'While central exams like UPSC and SSC provide two separate upload buttons for photo and signature, several major state boards—notably Uttar Pradesh Public Service Commission (UPPSC OTR), Madhya Pradesh PEB / MP Vyapam, and numerous state universities—require candidates to upload a single composite image. In this composite, the photograph occupies the upper section and the signature is positioned directly underneath within a 3.5 × 6.0 cm frame. This guide shows how to generate it in seconds.',
    sections: [
      {
        heading: '1. Anatomy of the UPPSC 3.5 × 6.0 cm Composite Template',
        subheading: 'Understanding the dimensional division of the single image file',
        body: [
          'The UPPSC composite template is a vertical rectangle measuring 3.5 cm in width by 6.0 cm in height (corresponding to 138 × 236 pixels at standard screen ratio, or 276 × 472 pixels at 200 DPI):',
          '• Upper Section (Photograph): Occupies 3.5 cm width by 4.5 cm height (75% of total height). Shows candidate front-facing portrait.',
          '• Lower Section (Signature): Occupies 3.5 cm width by 1.5 cm height (25% of total height). Shows candidate handwriting signature in black ink.',
          '• File Size: Strictly between 20 KB and 50 KB in JPG/JPEG format.',
        ],
      },
      {
        heading: '2. Why Manual Pasting and Re-Scanning Fails',
        subheading: 'The cyber cafe method and why it produces blurry submissions',
        body: [
          'Candidates who do not have graphic software often print a passport photo, tape it onto paper above their signature, and scan the entire paper. This method introduces tape shadows, paper creases, skew angles, and graininess that often fail scrutiny.',
          'FormFit India solves this digitally: our automated Photo + Signature Joiner accepts two separate clean digital image files (your photo and your signature), centers both into their designated portions on an HTML5 Canvas, and renders a single seamless composite file.',
        ],
      },
      {
        heading: '3. Step-by-Step: Creating a 3.5 × 6.0 cm Composite on FormFit India',
        subheading: 'Zero software installation, 100% private in-browser procedure',
        body: [
          'Step 1: Open FormFit’s UPPSC Resizer (/resize/uppsc-upsssc-up-police-photo-resizer).',
          'Step 2: Click the "Combined Photo + Signature" tab.',
          'Step 3: Upload your passport photo in Slot 1 and your signature in Slot 2.',
          'Step 4: FormFit automatically arranges the photo in the top 4.5 cm and the signature in the bottom 1.5 cm.',
          'Step 5: Click Download. The resulting single JPEG file is guaranteed to be 3.5 × 6.0 cm and strictly between 20 KB and 50 KB.',
        ],
      },
    ],
    relatedExamSlugs: [
      'uppsc-upsssc-up-police-photo-resizer',
      'rpsc-sso-rsmssb-wbpsc-mppsc-resizer',
      'bpsc-bihar-police-tre-photo-resizer',
    ],
    faqs: [
      {
        question: 'Which exams require a combined photo and signature image?',
        answer: 'UPPSC (Uttar Pradesh PSC OTR), MP Vyapam (MPPEB), certain Rajasthan university admissions, and specific state teacher eligibility tests require a single composite image.',
      },
      {
        question: 'What are the dimensions of the UPPSC combined template?',
        answer: 'The dimensions are 3.5 cm width by 6.0 cm height (276 × 472 pixels at 200 DPI) with file size strictly between 20 KB and 50 KB.',
      },
      {
        question: 'Can I join photo and signature on my smartphone?',
        answer: 'Yes! FormFit’s joiner runs completely in mobile browsers without requiring Photoshop, Canva, or any app download.',
      },
    ],
  },
  {
    slug: 'how-client-side-browser-image-processing-protects-id-privacy',
    title: 'Why You Should Never Upload Aadhaar, PAN, or Passport Scans to Server-Based Online Resizers',
    metaTitle: 'Why Server-Based Resizers Risk Aadhaar & PAN Privacy (Client-Side Guide)',
    metaDescription: 'Discover why uploading Aadhaar, PAN, and passport scans to online resizers risks identity theft, and how FormFit 100% client-side HTML5 Canvas keeps data private.',
    heading: 'Why You Should Never Upload Identity Documents to Server-Based Online Resizers',
    subheading: 'A cybersecurity analysis of cyber cafe data leaks, remote file upload vulnerabilities, and how FormFit India’s 100% in-browser architecture protects Indian citizens.',
    author: {
      name: 'Aditya Rajan',
      role: 'Lead Document Compliance Engineer & Cybersecurity Advocate',
      bio: 'Aditya specializes in automated raster image auditing, digital identity validation protocols, and biometric compliance for Indian central and state civil examinations.',
    },
    publishedDate: '2026-03-01',
    lastUpdatedDate: '2026-03-05',
    readTime: '10 min read',
    category: 'Privacy & Security',
    searchKeywords: [
      'why not upload aadhaar to online resizers',
      'privacy risks of online photo resizers',
      'client side image processing html5 canvas',
      'safe pan card resizer',
      'formfit india zero upload privacy architecture',
    ],
    summary:
      'Every day, millions of Indian applicants search Google for "resize photo to 20kb" or "compress aadhaar pdf under 300kb" and drag sensitive documents into random web tools. Most users assume these websites simply process the image and discard it. In reality, typical server-based utilities upload full-resolution identity documents to cloud storage where they may persist indefinitely, creating catastrophic identity theft vulnerabilities. Here is how client-side processing solves this permanently.',
    sections: [
      {
        heading: '1. The Hidden Risks of Server-Based Online File Converters',
        subheading: 'Where do your uploaded Aadhaar, PAN, and signatures actually go?',
        body: [
          'When you use a conventional online image resizer, clicking "Upload" executes a multipart/form-data HTTP POST request. Your raw image file travels over the internet to a backend web server running PHP, Python, or Node.js.',
          'On that server, the file is saved into a temporary filesystem folder (such as /tmp/uploads/). While ethical operators may run cleanup cron jobs, many sites retain uploaded files in unencrypted cloud buckets (e.g. Amazon S3 or Google Cloud Storage) for logging, caching, or data harvesting. In numerous documented cybersecurity leaks, millions of Aadhaar scans, driving licenses, and signatures have been discovered in publicly accessible server buckets.',
        ],
      },
      {
        heading: '2. The Cyber Cafe Threat Vector',
        subheading: 'Shared computers and desktop download folders across India',
        body: [
          'In smaller towns and tier-2/3 cities across India, millions of candidates rely on local cyber cafes to apply for government jobs. Cyber cafe operators routinely download applicant identity documents onto shared desktop folders ("NEW FOLDER", "ADMIT CARDS 2026"), where subsequent visitors can copy or view them.',
          'FormFit India was engineered specifically to run smoothly on any basic smartphone browser, enabling candidates to format documents privately in their own hands without ever visiting a cyber cafe.',
        ],
      },
      {
        heading: '3. How FormFit India Works: The Zero-Server Architecture',
        subheading: 'The technical mechanics of in-browser HTML5 Canvas and WebAssembly',
        body: [
          'FormFit India does not possess a backend image processing server. In fact, our server costs for image processing are exactly ₹0, because your device’s own processor does all the work:',
          '1. Local File Reading: When you select a file, the browser’s native FileReader API or createImageBitmap reads the raw binary bytes directly into your computer’s local RAM.',
          '2. In-Memory Canvas Manipulation: All image decoding, aspect ratio cropping, luminance thresholding (paper whitening), and Name & Date plaque painting are executed on an offscreen HTML5 <canvas> element using GPU-accelerated 2D rendering contexts.',
          '3. Binary JFIF & PDF Packaging: The canvas exports a blob into local memory. Our custom JavaScript binary patcher scans the JPEG byte buffer and injects 200/300 DPI markers and byte-padding directly in RAM.',
          '4. Local Download: The file is passed to an object URL (blob:http://formfit.in/...) and saved directly to your Downloads folder.',
          'At no point during this pipeline does a single byte of your photo, signature, or certificate leave your device.',
        ],
        table: {
          headers: ['Security Dimension', 'Standard Online Resizers', 'FormFit India Engine'],
          rows: [
            ['File Destination', 'Transmitted to remote cloud server', 'Remains 100% inside your browser RAM'],
            ['Server Storage Risk', 'High (Stored in /tmp or cloud bucket)', 'Zero (No server storage exists)'],
            ['Network Traffic', 'Uploads 5 MB, downloads 50 KB', 'Zero network upload (0 bytes sent)'],
            ['Offline Capability', 'Fails without active internet', 'Works 100% offline once loaded in cache'],
            ['Aadhaar / PAN Safety', 'Extremely dangerous for ID documents', '100% Safe & DPDP Act Compliant'],
          ],
        },
      },
      {
        heading: '4. How You Can Verify Our Zero-Upload Architecture Yourself',
        subheading: 'A 30-second verification using Chrome Developer Tools',
        body: [
          'You do not have to take our word for it—you can verify FormFit’s privacy yourself:',
          '1. Open Chrome Developer Tools on FormFit India (Press F12 or Right Click -> Inspect).',
          '2. Click on the "Network" tab.',
          '3. Drag and drop any 5 MB photo into our resizer.',
          '4. Crop, whiten, and download the file.',
          '5. Notice that the Network tab shows ZERO outgoing POST or PUT requests containing image payloads. All processing is strictly local.',
        ],
      },
    ],
    relatedExamSlugs: [
      'uidai-myaadhaar-document-pdf-resizer',
      'nsdl-protean-pan-card-resizer',
      'passport-seva-voter-id-dl-resizer',
      'upsc-cse-ias-photo-signature-resizer',
    ],
    faqs: [
      {
        question: 'Does FormFit save my photos or documents on any server?',
        answer: 'Never. FormFit has no backend database or image storage. All image processing and PDF creation execute entirely inside your device’s browser memory.',
      },
      {
        question: 'Can FormFit work if I turn off my Wi-Fi or mobile data?',
        answer: 'Yes! Once you have opened the FormFit web page, you can turn on Airplane Mode or disconnect from the internet, and the resizer will continue to process and download your images flawlessly.',
      },
      {
        question: 'Is FormFit compliant with the Digital Personal Data Protection (DPDP) Act of India?',
        answer: 'Yes. Because FormFit never collects, stores, or processes your personal image data on any server, it provides the ultimate level of privacy by design.',
      },
    ],
  },
];
