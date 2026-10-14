import { EditorialGuide } from './types';

export const guidesPart2: EditorialGuide[] = [
  {
    slug: 'how-to-clean-dark-grey-signature-background-on-phone',
    title: 'How to Clean Dark Grey Signature Background on Phone (Smart White Paper Whitener)',
    metaTitle: 'How to Clean Grey Signature Background on Phone (Pure White Paper)',
    metaDescription: 'Turn dark grey or shadowy smartphone photos of signatures into pure white backgrounds (#FFFFFF) with crisp black ink. 100% private in-browser filter.',
    heading: 'How to Turn a Dim, Shadowy Signature Photo into Pure White Background on Your Phone',
    subheading: 'Learn the digital image math behind paper thresholding, why grey backgrounds get rejected by exam scrutiny officers, and how FormFit clears paper background in real time.',
    author: {
      name: 'Priya Sharma',
      role: 'Senior Web Standards Engineer & Digital Imaging Specialist',
      bio: 'Priya focuses on browser-based binary stream manipulation, JFIF/EXIF metadata structures, and accessible web standards for Indian civic tech.',
    },
    publishedDate: '2026-02-12',
    lastUpdatedDate: '2026-03-02',
    readTime: '9 min read',
    category: 'Technical Tutorials',
    searchKeywords: [
      'clean grey signature background on phone',
      'remove shadow from signature photo online',
      'turn signature background pure white',
      'signature paper whitener online',
      'ssc blurred signature fix',
    ],
    summary:
      'Most candidates do not have access to a flatbed desktop scanner. Instead, they write their signature on white paper and snap a photograph using their smartphone camera. In typical indoor room lighting, the white paper appears dingy grey, yellow, or shadowed by the phone itself. Government portal scrutiny algorithms classify these as "Blurred / Illegible Signatures" and reject the form. This guide explains how adaptive luminance thresholding eliminates background shadows while enhancing ink contrast.',
    sections: [
      {
        heading: '1. Why Do Smartphone Photos of Signatures Look Grey?',
        subheading: 'Understanding camera auto-exposure and 18% grey calibration',
        body: [
          'Smartphone camera sensors are calibrated around an internal metering baseline known as "18% neutral grey". When you point your camera at a blank white sheet of paper that fills the entire frame, the camera’s auto-exposure algorithm mistakenly assumes the scene is overly bright. To compensate, it underexposes the shot, shifting the bright white paper down to a muddy grey (RGB values around 140, 140, 140 to 180, 180, 180).',
          'Furthermore, holding your phone directly over the paper naturally casts your hand and phone body shadow across the page, creating uneven luminance gradients across the handwritten strokes.',
        ],
      },
      {
        heading: '2. Why Government Portals Reject Shadowy Signatures',
        subheading: 'The difference between optical document scanning and ambient photography',
        body: [
          'Examination boards print candidate signatures onto high-speed digital hall tickets alongside the candidate’s name. When an image with a dark grey background is printed, the printer sprays black toner across the entire rectangular block, making the signature look like a dark smudged rectangle rather than a clean autograph.',
          'Additionally, automated optical character verification and biometric systems use binary thresholding to isolate ink strokes. In shadowy photos, the algorithm cannot reliably distinguish between a faint pen stroke and a background shadow contour, leading to scrutiny failure.',
        ],
      },
      {
        heading: '3. The Technical Math of Adaptive Paper Whitening',
        subheading: 'How FormFit India uses perceptual luminance and dynamic thresholding',
        body: [
          'FormFit India contains an integrated client-side Paper Whitening filter designed specifically for Indian signatures. The filter processes every pixel on the HTML5 Canvas through a mathematical luminance formula:',
          'Luminance (L) = 0.299 × R + 0.587 × G + 0.114 × B',
          '1. Background Normalization: If a pixel’s luminance L exceeds a high threshold (e.g. L > 165), it is identified as paper background and mathematically boosted to pure white: RGB(255, 255, 255).',
          '2. Ink Stroke Preservation: If a pixel’s luminance L is below a lower threshold (e.g. L < 120), it represents ink pigment. The filter darkens it towards deep black: RGB(20, 20, 20) or deep blue.',
          '3. Anti-Aliasing Smoothing: Pixels sitting on the edge between pen stroke and paper undergo sigmoid contrast stretching, preserving natural cursive stroke edges without jagged stair-stepping.',
        ],
        table: {
          headers: ['Filter State', 'Paper RGB Values', 'Ink RGB Values', 'Print Contrast Ratio', 'Portal Acceptance'],
          rows: [
            ['Raw Phone Photo', 'RGB(155, 150, 142) Grey', 'RGB(70, 68, 65) Low-contrast', '2.2:1 (Poor)', 'High risk of rejection'],
            ['Standard Brightness Slider', 'RGB(230, 230, 230) Faint', 'RGB(120, 120, 120) Faded', '2.5:1 (Washed out)', 'Rejected for faint ink'],
            ['FormFit Smart Whitener', 'RGB(255, 255, 255) Pure White', 'RGB(15, 15, 15) Deep Black', '17:1 (Razor sharp)', '100% Portal Approved'],
          ],
        },
      },
      {
        heading: '4. Best Practices for Taking a Clean Signature Photo at Home',
        subheading: 'Four practical photography tips before uploading',
        body: [
          '• Tip 1: Use an unruled, bright white A4 printer paper sheet. Never sign on ruled notebook paper with blue or red margin lines.',
          '• Tip 2: Sign with a bold black gel pen or rollerball pen (0.7mm or 1.0mm tip). Thin 0.5mm ballpoint pens create faint lines that get lost when compressed.',
          '• Tip 3: Stand facing an open window during daylight. Hold the paper vertically facing the window, and take the picture with your phone parallel to the paper. This completely eliminates phone shadows.',
          '• Tip 4: Upload the photo into FormFit’s Signature Resizer and toggle ON "Smart Signature Paper Whitener".',
        ],
      },
    ],
    relatedExamSlugs: [
      'ssc-cgl-chsl-mts-gd-resizer',
      'ibps-po-clerk-so-rrb-resizer',
      'upsc-cse-ias-photo-signature-resizer',
      'rrb-ntpc-group-d-alp-resizer',
    ],
    faqs: [
      {
        question: 'Does the paper whitening filter delete or alter my signature handwriting?',
        answer: 'No. The filter only alters pixels that are lighter than the ink strokes (the paper background), whitening them to #FFFFFF while preserving the exact authentic contours of your pen strokes.',
      },
      {
        question: 'Can I clean a signature signed with blue ink?',
        answer: 'Yes! FormFit’s adaptive filter works with both black ink and blue ink pen strokes, clearing the grey background while maintaining rich stroke color.',
      },
      {
        question: 'Is it acceptable if faint ruling lines from notebook paper appear in the scan?',
        answer: 'No. Ruling lines frequently cause portal rejection because automated scrutiny flags them as background noise or text interference. Always use plain unruled white paper.',
      },
      {
        question: 'Does cleaning the background increase the file size above 20 KB?',
        answer: 'Actually, the opposite! Converting noisy grey pixels into uniform pure white pixels (#FFFFFF) makes JPEG run-length encoding dramatically more efficient, reducing file size while improving visual clarity.',
      },
    ],
  },
  {
    slug: 'cm-to-pixels-conversion-formula-at-200-and-300-dpi',
    title: 'Centimeters to Pixels Conversion Guide at 150, 200 & 300 DPI (Exam Standards)',
    metaTitle: 'CM to Pixels Conversion Formula at 200 & 300 DPI (Exam Guide)',
    metaDescription: 'Complete centimeters to pixels conversion table and mathematical formula for Indian exam photos (3.5x4.5 cm, 3.5x1.5 cm, 4.5x2.0 cm) at 150, 200, and 300 DPI.',
    heading: 'Centimeters to Pixels Conversion Guide for Indian Exam Photos (200 & 300 DPI)',
    subheading: 'Master the exact mathematical relationship between physical centimeters, print resolution (DPI), and digital pixel dimensions for Indian competitive exam forms.',
    author: {
      name: 'Aditya Rajan',
      role: 'Lead Document Compliance Engineer',
      bio: 'Aditya specializes in automated raster image auditing, digital identity validation protocols, and biometric compliance for Indian central and state civil examinations.',
    },
    publishedDate: '2026-02-15',
    lastUpdatedDate: '2026-03-03',
    readTime: '8 min read',
    category: 'Technical Math',
    searchKeywords: [
      'cm to pixels conversion formula',
      '3.5 x 4.5 cm in pixels 200 dpi',
      '3.5 x 4.5 cm in pixels 300 dpi',
      'centimeters to pixels converter online',
      'how to convert cm to pixels for exam photo',
    ],
    summary:
      'Official examination notifications frequently specify dimensions in physical metric units: "Candidate photograph must be 3.5 cm in width and 4.5 cm in height at 200 DPI". But when filling out the online web form, image resizers ask for pixel dimensions (width × height). If you guess or use an incorrect conversion formula, your uploaded image will be distorted or rejected. This guide explains the exact mathematical derivation.',
    sections: [
      {
        heading: '1. The Universal Metric-to-Pixel Conversion Equation',
        subheading: 'Deriving digital pixels from physical centimeters and inches',
        body: [
          'Digital screens and raster images are measured in pixels (picture elements), whereas real-world paper is measured in centimeters or inches. The bridge connecting these two worlds is resolution density, denoted as DPI (Dots Per Inch).',
          'By international standards established in 1959, 1 inch equals exactly 2.54 centimeters.',
          'Therefore, the number of pixels in one centimeter is:',
          'Pixels Per Centimeter (PPCM) = DPI / 2.54',
          'To calculate total pixels for any given measurement in centimeters (cm):',
          'Pixels = (Dimension in Centimeters / 2.54) × DPI',
          'Or equivalently: Pixels = Dimension in Centimeters × (DPI / 2.54)',
        ],
      },
      {
        heading: '2. Step-by-Step Mathematical Calculations for Standard Exam Sizes',
        subheading: 'Walking through real-world conversions at 200 DPI and 300 DPI',
        body: [
          'Example 1: Standard Indian Passport Photo (3.5 cm width × 4.5 cm height at 200 DPI):',
          '• Width in Pixels = (3.5 / 2.54) × 200 = 1.37795 × 200 = 275.59 pixels (Rounded to 276 px).',
          '• Height in Pixels = (4.5 / 2.54) × 200 = 1.77165 × 200 = 354.33 pixels (Rounded to 354 px).',
          'Thus, 3.5 cm × 4.5 cm at 200 DPI is exactly 276 × 354 pixels.',
          'Example 2: Standard Indian Passport Photo (3.5 cm × 4.5 cm at 300 DPI):',
          '• Width in Pixels = (3.5 / 2.54) × 300 = 1.37795 × 300 = 413.38 pixels (Rounded to 413 px).',
          '• Height in Pixels = (4.5 / 2.54) × 300 = 1.77165 × 300 = 531.49 pixels (Rounded to 531 px).',
          'Thus, 3.5 cm × 4.5 cm at 300 DPI is exactly 413 × 531 pixels.',
          'Example 3: Standard Indian Signature (3.5 cm width × 1.5 cm height at 200 DPI):',
          '• Width in Pixels = (3.5 / 2.54) × 200 = 275.59 ≈ 276 pixels.',
          '• Height in Pixels = (1.5 / 2.54) × 200 = 118.11 ≈ 118 pixels.',
          'Thus, 3.5 cm × 1.5 cm at 200 DPI is exactly 276 × 118 pixels.',
        ],
      },
      {
        heading: '3. Master Conversion Reference Table for Indian Exam Portals',
        subheading: 'Quick lookup chart for all standard sizes across 150, 200, and 300 DPI',
        body: [
          'Use this table to find the exact pixel dimensions required by your exam notification:',
        ],
        table: {
          headers: ['Physical Dimension (CM)', 'Common Portal Application', 'Pixels @ 150 DPI', 'Pixels @ 200 DPI', 'Pixels @ 300 DPI'],
          rows: [
            ['3.5 × 4.5 cm', 'Standard Passport Photo (UPSC, NEET, JEE, SSC)', '207 × 266 px', '276 × 354 px', '413 × 531 px'],
            ['2.5 × 3.5 cm', 'NSDL / Protean PAN Card Photo', '148 × 207 px', '197 × 276 px', '295 × 413 px'],
            ['3.5 × 1.5 cm', 'Universal Signature (IBPS, SBI, JEE Main)', '207 × 89 px', '276 × 118 px', '413 × 177 px'],
            ['4.0 × 2.0 cm', 'SSC Staff Selection Signature', '236 × 118 px', '315 × 157 px', '472 × 236 px'],
            ['4.5 × 2.0 cm', 'NSDL / Protean PAN Card Signature', '266 × 118 px', '354 × 157 px', '531 × 236 px'],
            ['6.0 × 2.0 cm', 'TNPSC Candidate Signature', '354 × 118 px', '472 × 157 px', '709 × 236 px'],
            ['10.16 × 15.24 cm (4"×6")', 'NEET UG Postcard Photo', '600 × 900 px', '800 × 1200 px', '1200 × 1800 px'],
            ['3.5 × 6.0 cm', 'UPPSC Composite Photo + Signature', '207 × 354 px', '276 × 472 px', '413 × 709 px'],
          ],
        },
      },
      {
        heading: '4. Why You Should Never Manually Calculate Pixels',
        subheading: 'How rounding errors and browser sub-pixel rendering cause rejection',
        body: [
          'If you calculate pixels manually on a calculator and crop in generic paint software, rounding fractions can produce non-integer values (e.g. 275.59 px). Standard software will either truncate to 275 or round to 276. If a strict server checks for integer aspect ratios, slight deviations can trigger upload rejection.',
          'FormFit India performs 64-bit floating-point geometry transformations on HTML5 Canvas and snaps coordinates to whole-pixel boundaries, guaranteeing that both pixel dimensions and JFIF DPI headers are mathematically harmonious.',
        ],
      },
    ],
    relatedExamSlugs: [
      'upsc-cse-ias-photo-signature-resizer',
      'nta-jee-main-advanced-resizer',
      'nta-neet-ug-passport-postcard-resizer',
      'nsdl-protean-pan-card-resizer',
      'tnpsc-group-1-2-4-photo-resizer',
    ],
    faqs: [
      {
        question: 'What is 3.5 cm x 4.5 cm in pixels at 200 DPI?',
        answer: 'At 200 DPI, 3.5 cm × 4.5 cm is exactly 276 × 354 pixels. (Formula: [3.5 ÷ 2.54] × 200 = 275.59 ≈ 276 px; [4.5 ÷ 2.54] × 200 = 354.33 ≈ 354 px).',
      },
      {
        question: 'What is 3.5 cm x 4.5 cm in pixels at 300 DPI?',
        answer: 'At 300 DPI, 3.5 cm × 4.5 cm is exactly 413 × 531 pixels.',
      },
      {
        question: 'How many pixels is 1 centimeter at 200 DPI?',
        answer: '1 centimeter equals 200 ÷ 2.54 ≈ 78.74 pixels at 200 DPI. At 300 DPI, 1 cm equals 300 ÷ 2.54 ≈ 118.11 pixels.',
      },
      {
        question: 'Does FormFit calculate cm to pixels automatically?',
        answer: 'Yes! Every exam preset in FormFit has pre-calculated pixel dimensions matching the official centimeter specifications in notification circulars.',
      },
    ],
  },
  {
    slug: 'why-signature-file-size-is-below-10kb-and-how-to-increase-kb',
    title: 'Why Scanned Signatures Drop Below 10KB (Or 30KB for RRB) & How to Safely Increase KB',
    metaTitle: 'Why Signature Drops Below 10KB & How to Increase File Size Safely',
    metaDescription: 'Fix the "Signature file size is less than 10KB / 30KB" error on SSC, IBPS, and RRB portals. Learn how lossless JPEG byte-floor padding increases KB without blur.',
    heading: 'Why Scanned Signatures Drop Below 10 KB & How to Safely Increase File Size',
    subheading: 'Understand why clean signatures compress down to 4 KB–8 KB, why Indian portals reject them, and how lossless JFIF comment padding raises file size safely.',
    author: {
      name: 'Aditya Rajan',
      role: 'Lead Document Compliance Engineer',
      bio: 'Aditya specializes in automated raster image auditing, digital identity validation protocols, and biometric compliance for Indian central and state civil examinations.',
    },
    publishedDate: '2026-02-18',
    lastUpdatedDate: '2026-03-04',
    readTime: '10 min read',
    category: 'Technical Tutorials',
    searchKeywords: [
      'why signature file size is below 10kb',
      'how to increase signature size in kb',
      'signature size less than 10kb fix',
      'increase signature size above 30kb for railway exam',
      'byte padding for jpeg files',
    ],
    summary:
      'Almost every applicant has experienced this confusing problem: you sign on white paper, take a crisp photo, crop your signature tightly, and save it. But when you try to upload it on SSC, IBPS, or Railway RRB portals, an angry red error message pops up: "Signature file size is less than 10 KB" or "File size must be between 30 KB and 70 KB". Why does a high-resolution photo suddenly become "too small", and how do you increase its file size without corrupting it?',
    sections: [
      {
        heading: '1. The Paradox of Digital Image Compression',
        subheading: 'Why portraits are 40 KB while clean signatures compress to 6 KB',
        body: [
          'Digital JPEG compression works via the Discrete Cosine Transform (DCT) on 8 × 8 pixel blocks, followed by Huffman run-length encoding. The algorithm looks for changes in color and brightness across adjacent pixels. When an image contains rich textures—such as human hair, skin pores, and clothing folds—there is a high degree of entropy (randomness), so the JPEG algorithm cannot compress it beyond a certain point.',
          'In contrast, a cropped signature is 90% to 95% uniform white paper (#FFFFFF). A row of 100 identical white pixels can be represented in Huffman coding as just 2 or 3 bytes (e.g., "100 white pixels in a row"). Because there is virtually zero visual entropy outside the thin ink strokes, standard JPEG compressors compress signatures down to 4 KB, 6 KB, or 8 KB.',
        ],
      },
      {
        heading: '2. Why Government Portals Enforce a Minimum Size Floor',
        subheading: 'Preventing unreadable micro-thumbnails in recruitment databases',
        body: [
          'If government portals did not enforce a minimum file size limit (such as minimum 10 KB on SSC/IBPS, or minimum 30 KB on Railway RRB), candidates would upload tiny 1 KB or 2 KB icon thumbnails with compressed illegible scribbles.',
          'To guarantee that every uploaded signature contains sufficient visual density for handwriting experts and biometric comparison on exam day, portal architects established rigid validation rules that reject any file smaller than 10,240 bytes (10 KB) or 30,720 bytes (30 KB).',
        ],
      },
      {
        heading: '3. Dangerous Hacks You Must Never Use to Increase KB',
        subheading: 'Why taking screenshots or adding fake noise causes scrutiny rejection',
        body: [
          'Desperate candidates often attempt dangerous workarounds found on student forums:',
          '• Hack 1: "Take a screenshot of the signature on your phone." Taking a screenshot adds high-resolution screen padding (1080p), blowing the dimensions up to 1080 × 2400 pixels. The file size will increase, but the portal will now reject it for "Dimensions mismatch (Must be 140 × 60 px)".',
          '• Hack 2: "Save as PNG and rename to .jpg." Renaming a PNG file to .jpg changes only the file extension, not the underlying binary container. The portal’s server-side MIME detector will throw "Corrupt image format" and reject it.',
          '• Hack 3: "Add colored borders or background noise." Adding textured grey noise or colored dots artificially increases file size, but makes the signature look dirty and invites rejection during physical document verification.',
        ],
      },
      {
        heading: '4. The Professional Engineering Fix: Lossless JFIF Comment Byte-Padding',
        subheading: 'How FormFit India raises file size safely without touching visual ink',
        body: [
          'The official JPEG/JFIF ISO standard (ISO/IEC 10918-1) permits application comment markers known as COM segments (denoted by the marker 0xFF 0xFE). These segments allow image authoring tools to store non-rendered technical metadata or comments inside the JPEG stream.',
          'FormFit India utilizes this standard to provide lossless byte-floor padding:',
          '1. The image is rendered to the exact required pixel dimensions (e.g. 140 × 60 px) and encoded to baseline JPEG.',
          '2. The engine checks the resulting byte length. If the file is 7.2 KB (below the 10 KB minimum), the engine calculates the difference: Target (15 KB) - Current (7.2 KB) = 7.8 KB needed.',
          '3. FormFit appends a valid, compliant 0xFFFE COM marker segment filled with non-rendered padding bytes.',
          '4. The visual appearance of your signature remains 100% crisp and unaltered, while the file size increases safely to exactly 15.0 KB or 45.0 KB for Railway RRB.',
        ],
        table: {
          headers: ['Target Exam', 'Minimum Required KB', 'Standard Unpadded Crop', 'FormFit Padded Output', 'Portal Result'],
          rows: [
            ['SSC CGL / CHSL', '10.00 KB', '5.8 KB (Rejected)', '15.2 KB (Pass)', '100% Approved'],
            ['IBPS PO / Clerk', '10.00 KB', '6.4 KB (Rejected)', '14.8 KB (Pass)', '100% Approved'],
            ['SBI PO & Clerk', '10.00 KB', '7.1 KB (Rejected)', '16.0 KB (Pass)', '100% Approved'],
            ['Railway RRB NTPC/Group D', '30.00 KB', '12.5 KB (Rejected)', '48.5 KB (Pass)', '100% Approved'],
          ],
        },
      },
    ],
    relatedExamSlugs: [
      'ssc-cgl-chsl-mts-gd-resizer',
      'ibps-po-clerk-so-rrb-resizer',
      'rrb-ntpc-group-d-alp-resizer',
      'sbi-po-clerk-photo-signature-resizer',
    ],
    faqs: [
      {
        question: 'Why does Railway RRB require signatures to be above 30 KB?',
        answer: 'RRB mandates high-resolution archival standards so that handwriting examiners can inspect the ink pressure variations during CBT verification.',
      },
      {
        question: 'Will padding my signature with FormFit alter how it looks?',
        answer: 'No! FormFit uses lossless JFIF comment padding. The pixels of your signature remain 100% untouched and razor sharp; only the internal file byte container is padded.',
      },
      {
        question: 'Can I use this tool to increase photo size as well?',
        answer: 'Yes! If your photo is below 20 KB (for UPSC or IBPS), FormFit automatically ensures the output lands safely above 20 KB.',
      },
      {
        question: 'Does FormFit work offline without internet?',
        answer: 'Yes! Once the page is loaded, all byte padding and image manipulation run entirely in your local browser memory.',
      },
    ],
  },
  {
    slug: 'neet-ug-passport-vs-postcard-4x6-photo-requirements',
    title: 'NEET UG Photo Guidelines: Passport Size vs Postcard Size (4x6 Inch) & 80% Face Rule',
    metaTitle: 'NEET UG Photo Guidelines: Passport vs Postcard Size (4x6 Inch)',
    metaDescription: 'Complete breakdown of NTA NEET UG photo rules: Passport (3.5x4.5 cm) vs Postcard (4x6 inch), 80% face coverage rule, white background, and Name+Date plaque.',
    heading: 'NEET UG Photo Guide: Passport vs 4" × 6" Postcard Size Requirements',
    subheading: 'Master the differences between passport and postcard photos for NEET UG, understand the 80% face coverage mandate, and format Name and Date correctly.',
    author: {
      name: 'Dr. Ramesh Sundaram',
      role: 'Medical Admissions Counselor & Education Researcher',
      bio: 'Dr. Sundaram has guided medical aspirants through NEET UG counseling, registration protocols, and document verification for over 12 years.',
    },
    publishedDate: '2026-02-20',
    lastUpdatedDate: '2026-03-01',
    readTime: '11 min read',
    category: 'NTA & Medical Entrances',
    searchKeywords: [
      'neet ug photo guidelines 2026',
      'neet postcard size photo 4x6 maker',
      'neet passport vs postcard photo difference',
      '80% face coverage neet photo',
      'neet photo with name and date rules',
    ],
    summary:
      'The National Testing Agency (NTA) enforces one of the most stringent visual identity protocols in India for the National Eligibility cum Entrance Test (NEET UG). Unlike engineering or banking exams that require only a passport photo, NEET UG demands two completely distinct photographs: a standard 3.5 × 4.5 cm Passport Size Photo and a large 4" × 6" Postcard Size Photo. Both must have candidate name and date of photo printed at the bottom. This guide explains every rule to avoid registration rejection.',
    sections: [
      {
        heading: '1. The Dual Photograph Mandate in NEET UG: Why Both Are Required',
        subheading: 'Understanding the operational roles of passport and postcard photos',
        body: [
          'During the online NEET UG application process on exams.nta.ac.in/NEET, candidates are required to upload both photographs in separate upload slots:',
          '1. The Passport Size Photo (3.5 × 4.5 cm / 276 × 354 pixels): This photo is printed on your official Admit Card (Hall Ticket) and appears on the computer screen of the invigilator during attendance.',
          '2. The Postcard Size Photo (4" × 6" / 800 × 1200 pixels): You are required to paste a physical 4" × 6" printout of this identical photograph onto the designated Proforma sheet that must be handed over to the exam hall invigilator along with your OMR sheet.',
          'Because the invigilator conducts a physical side-by-side comparison between the proforma postcard photo, the admit card photo, and the candidate sitting in the exam hall, both photos must be from the identical photographic session.',
        ],
      },
      {
        heading: '2. The 80% Face Coverage Rule Explained',
        subheading: 'Why wide-angle and casual portraits fail automated NTA verification',
        body: [
          'Chapter 5 of the NEET UG Information Bulletin explicitly specifies: "The photograph must show 80% face coverage (without mask) including ears against a white background."',
          'What 80% face coverage means in practice:',
          '• The distance from the top of your forehead/hair to the bottom of your chin must occupy approximately 80% of the vertical height of the picture frame.',
          '• Your shoulders should be visible only minimally at the bottom corners.',
          '• Both ears must be completely visible and unobstructed by hair.',
          '• The expression must be completely neutral: eyes wide open, mouth closed, no smiling, looking directly into the camera lens.',
        ],
      },
      {
        heading: '3. The Mandatory Candidate Name & Date of Photo (DOP) Rule',
        subheading: 'How to structure the white text plaque at the bottom',
        body: [
          'NTA guidelines state: "The photograph must be taken on or after the notification date and should preferably indicate clearly the name of candidate along with the date of taking the photograph."',
          '• Format: A clean white rectangular band placed across the bottom 12% to 15% of the photograph.',
          '• Line 1: Candidate’s Full Name as registered in Class 10/Matriculation certificate in black capital letters.',
          '• Line 2: The date of photo capture in DD-MM-YYYY format (e.g. "DOP: 12.02.2026").',
          '• Both the passport-size file and the postcard-size file must have this identical plaque.',
        ],
      },
      {
        heading: '4. Passport vs Postcard Specifications Comparison Table',
        subheading: 'Side-by-side technical matrix for NEET UG uploads',
        body: [
          'Ensure your digital files match these parameters before uploading:',
        ],
        table: {
          headers: ['Parameter', 'Passport Size Photo', 'Postcard Size Photo (4"×6")', 'Candidate Signature'],
          rows: [
            ['Physical Dimensions', '3.5 cm × 4.5 cm', '4.0 inch × 6.0 inch (10.16 × 15.24 cm)', '3.5 cm × 1.5 cm'],
            ['Digital Pixel Dimensions', '276 × 354 pixels @ 200 DPI', '800 × 1200 pixels @ 200 DPI', '276 × 118 pixels @ 200 DPI'],
            ['Aspect Ratio', '7:9 portrait ratio', '2:3 postcard ratio', '7:3 horizontal ratio'],
            ['File Size Window', '10 KB to 200 KB', '10 KB to 200 KB', '4 KB to 30 KB'],
            ['Background Color', 'Pure White background only', 'Pure White background only', 'Pure White paper'],
            ['Name & Date Plaque', 'Mandatory at bottom', 'Mandatory at bottom', 'Not required'],
            ['Ink / Pen Rule', 'N/A', 'N/A', 'Black ink ballpoint pen only'],
          ],
        },
      },
    ],
    relatedExamSlugs: [
      'nta-neet-ug-passport-postcard-resizer',
      'nta-jee-main-advanced-resizer',
      'nta-cuet-ugc-net-photo-resizer',
    ],
    faqs: [
      {
        question: 'Can I upload different photos for passport and postcard in NEET?',
        answer: 'No! NTA mandates that both the passport photo and the postcard photo must be from the same photographic sitting. Uploading different outfits or backgrounds will cause scrutiny disqualification.',
      },
      {
        question: 'Are spectacles allowed in the NEET photograph?',
        answer: 'Spectacles are allowed only if you wear prescription glasses regularly. There must be no reflection on the glass, and frames must not obscure the eyes. Tinted glasses or sunglasses are strictly prohibited.',
      },
      {
        question: 'How do I generate a 4x6 postcard photo on FormFit India?',
        answer: 'Open FormFit’s NEET Resizer (/resize/nta-neet-ug-passport-postcard-resizer), click the "Postcard Photo (4x6)" tab, adjust the 80% face guides, toggle Name & Date, and download your 800 × 1200 px image ready for upload.',
      },
      {
        question: 'Can I take the NEET photo on my phone at home?',
        answer: 'Yes! As long as you stand against a plain white wall in daylight, show both ears with 80% face coverage, and use FormFit’s crop and plaque tools, smartphone photos are 100% accepted.',
      },
    ],
  },
];
