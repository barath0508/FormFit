export interface KbTarget {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  subheading: string;
  minKB: number;
  maxKB: number;
  defaultWidthPx: number;
  defaultHeightPx: number;
  defaultDpi: number;
  mode: 'photo' | 'signature' | 'declaration' | 'pdf';
  searchKeywords: string[];
  applicableExams: { name: string; url: string; spec: string }[];
  editorialContent: {
    whyThisSizeExists: string;
    compressionMechanics: string;
    stepByStepGuide: string[];
    technicalTable: { parameter: string; value: string; importance: string }[];
  };
  troubleshooting: { portalMessage: string; cause: string; solution: string }[];
  faqs: { question: string; answer: string }[];
}

export const KB_TARGETS: KbTarget[] = [
  {
    slug: '10kb-to-20kb-signature-resizer',
    title: '10KB to 20KB Signature Resizer & Compressor Online',
    metaTitle: '10KB to 20KB Signature Resizer & Converter Online (Zero-Upload)',
    metaDescription: 'Resize and compress your scanned signature strictly between 10KB and 20KB for SSC, IBPS, SBI, and State PSC forms. 100% private in-browser tool with auto-padding.',
    heading: 'Compress & Resize Signature to 10KB – 20KB Online',
    subheading: 'Enforce the strict 10 KB to 20 KB file size requirement mandated by SSC, IBPS, SBI, and State PSC portals with zero server uploads.',
    minKB: 10,
    maxKB: 20,
    defaultWidthPx: 140,
    defaultHeightPx: 60,
    defaultDpi: 200,
    mode: 'signature',
    searchKeywords: [
      'compress signature to 10kb to 20kb',
      'increase signature size from 5kb to 15kb',
      '10kb to 20kb jpg converter',
      'ssc signature resizer 10kb to 20kb',
      'ibps signature size 10 to 20 kb',
      'signature photo resizer 10kb 20kb',
    ],
    applicableExams: [
      { name: 'SSC CGL / CHSL / MTS / GD', url: '/resize/ssc-cgl-chsl-mts-gd-resizer', spec: '140×60 px, 10–20 KB, Black/Blue Ink' },
      { name: 'IBPS PO / Clerk / SO / RRB', url: '/resize/ibps-po-clerk-so-rrb-resizer', spec: '140×60 px, 10–20 KB, Black Ink' },
      { name: 'SBI PO & Clerk', url: '/resize/sbi-po-clerk-photo-signature-resizer', spec: '140×60 px, 10–20 KB, Black Ink' },
      { name: 'TNPSC Group 1, 2, 4', url: '/resize/tnpsc-group-1-2-4-photo-resizer', spec: '236×79 px, 10–20 KB' },
      { name: 'Parivahan Sarathi Driving License', url: '/resize/passport-seva-voter-id-dl-resizer', spec: '256×64 px, 10–20 KB' },
    ],
    editorialContent: {
      whyThisSizeExists:
        'The 10KB to 20KB signature file window is the most universally enforced biometric parameter across Indian government recruiting servers (including TCS iON, NIC, and IBPS engines). Examination servers enforce this lower bound (10 KB) to prevent candidates from uploading tiny, unreadable 2 KB thumbnail thumbnails or faint pencil scribbles that fail machine handwriting authentication during exam-hall bio-logging. Simultaneously, the 20 KB ceiling prevents server disk bloat when storing tens of millions of applicant records.',
      compressionMechanics:
        'When you take a smartphone photo of a signature on clean white paper, the vast majority of the image is uniform white space. Under standard Discrete Cosine Transform (DCT) and run-length encoding in baseline JPEG, uniform white blocks compress exceptionally well. As a consequence, high-contrast signatures frequently compress down to 4 KB to 8 KB—falling below the mandatory 10 KB threshold. FormFit solves this through an intelligent byte-floor algorithm: if the image compresses below 10 KB, safe non-rendered JFIF comment markers (0xFFFE) are injected into the binary stream until the file reaches the safe 14 KB to 18 KB range.',
      stepByStepGuide: [
        'Sign your usual signature on a clean, unruled sheet of white paper using a dark black or blue ballpoint pen.',
        'Capture the photo from your smartphone camera under direct daylight, avoiding phone shadows.',
        'Upload your photo into the FormFit 10KB–20KB Workbench above. The image remains 100% inside your browser RAM.',
        'Adjust the crop box to center the signature, maintaining a 2mm border of white space around the strokes.',
        'Enable Smart Whitening if the paper looks greyish or dim. FormFit normalizes background paper to #FFFFFF.',
        'Click "Download Compliant File". The output is verified to be strictly within 10 KB and 20 KB with a 200 DPI JFIF header.',
      ],
      technicalTable: [
        { parameter: 'Target File Size', value: '10.00 KB to 20.00 KB', importance: 'Mandatory on portal upload validation' },
        { parameter: 'Default Aspect Ratio', value: '7:3 or 14:6 (140 × 60 px)', importance: 'Universal standard for IBPS, SSC, and SBI' },
        { parameter: 'Recommended DPI', value: '200 DPI', importance: 'Ensures crisp handwriting strokes on admit card printouts' },
        { parameter: 'Color Space', value: 'sRGB / Grayscale JPEG', importance: 'CMYK profiles trigger server decoding errors' },
        { parameter: 'Binary Header', value: 'JFIF APP0 (0xFFE0)', importance: 'Required by government image verification scripts' },
      ],
    },
    troubleshooting: [
      {
        portalMessage: 'Signature file size is less than 10 KB.',
        cause: 'Scanned signature on clean paper contains few high-frequency details, causing standard JPEG engines to compress it to 4–7 KB.',
        solution: 'FormFit automatically adds JFIF application comment padding so the output sits safely between 14 KB and 18 KB.',
      },
      {
        portalMessage: 'Signature file size exceeds 20 KB.',
        cause: 'Smartphone cameras produce 2–5 MB images. If cropped without aggressive quantization, the file easily exceeds 25 KB.',
        solution: 'Our multi-iteration binary search compressor adjusts quantization tables to guarantee the file stays under 20.0 KB.',
      },
      {
        portalMessage: 'Signature image is blurred or illegible.',
        cause: 'Faint ink or camera motion blur causes loss of stroke definition when downscaled.',
        solution: 'Use our adaptive threshold paper whitener to boost contrast and produce dark, crisp ink strokes.',
      },
    ],
    faqs: [
      {
        question: 'Why does my signature file size drop below 10 KB when cropped?',
        answer: 'Signatures contain very little visual data compared to portraits. Because 90% of the image is pure white background, standard JPEG algorithms compress it efficiently down to 4–8 KB. Since Indian exam portals require at least 10 KB, FormFit applies safe byte-floor padding to keep it above 10 KB.',
      },
      {
        question: 'Which exams require a 10KB to 20KB signature?',
        answer: 'SSC (CGL, CHSL, MTS, GD, CPO), IBPS (PO, Clerk, SO, RRB), State Bank of India (SBI PO & Clerk), TNPSC, Parivahan Sarathi Driving License, and many state police boards mandate signatures between 10 KB and 20 KB.',
      },
      {
        question: 'Can I upload a signature signed with blue ink?',
        answer: 'While SSC and some state PSCs allow blue ink, IBPS, SBI, UPSC, and PAN card portals strictly mandate black ballpoint or gel ink. We recommend always using black ink on white paper for maximum compatibility.',
      },
      {
        question: 'Are signatures written in capital letters accepted?',
        answer: 'No. Government examination boards explicitly reject signatures written in block or CAPITAL letters. The signature must be in your normal running handwriting.',
      },
      {
        question: 'Does FormFit upload my signature to a remote server?',
        answer: 'No! FormFit operates 100% client-side in your browser memory. Your signature never leaves your phone or computer, protecting you from identity theft.',
      },
      {
        question: 'Can I resize my signature on an Android phone or iPhone?',
        answer: 'Yes! FormFit works natively on all mobile browsers including Chrome, Safari, Samsung Internet, and Firefox without requiring any app download.',
      },
    ],
  },
  {
    slug: '20kb-to-50kb-photo-resizer',
    title: '20KB to 50KB Photo Resizer & Compressor Online',
    metaTitle: '20KB to 50KB Photo Resizer & Passport Size Compressor (Private)',
    metaDescription: 'Resize and compress candidate passport photos strictly between 20KB and 50KB for SSC, IBPS, UPSC, SBI, and State PSC forms. 100% private in-browser tool.',
    heading: 'Compress & Resize Photo to 20KB – 50KB Online',
    subheading: 'Format candidate passport photos to exact 20 KB to 50 KB byte limits with 200 DPI resolution and optional Name and Date plaque.',
    minKB: 20,
    maxKB: 50,
    defaultWidthPx: 275,
    defaultHeightPx: 354,
    defaultDpi: 200,
    mode: 'photo',
    searchKeywords: [
      'compress photo to 20kb to 50kb online',
      'passport photo 20kb to 50kb converter',
      'photo compressor 20 to 50 kb',
      'ssc photo resizer 20kb to 50kb',
      'ibps photo 20kb to 50kb',
      'tnpsc photo resizer 20kb to 50kb',
    ],
    applicableExams: [
      { name: 'IBPS PO, Clerk & SO', url: '/resize/ibps-po-clerk-so-rrb-resizer', spec: '200×230 px, 20–50 KB' },
      { name: 'SBI PO & Clerk', url: '/resize/sbi-po-clerk-photo-signature-resizer', spec: '200×230 px, 20–50 KB' },
      { name: 'SSC CGL / CHSL Offline & PET', url: '/resize/ssc-cgl-chsl-mts-gd-resizer', spec: '275×354 px, 20–50 KB' },
      { name: 'TNPSC OTR & Group Exams', url: '/resize/tnpsc-group-1-2-4-photo-resizer', spec: '276×354 px, 20–50 KB with Name+Date' },
      { name: 'UPPSC OTR & UP Police', url: '/resize/uppsc-upsssc-up-police-photo-resizer', spec: '275×354 px, 20–50 KB' },
    ],
    editorialContent: {
      whyThisSizeExists:
        'The 20KB to 50KB range is the definitive gold standard for candidate photographs across Indian banking (IBPS, SBI, RBI), civil services, and state public service commissions. File uploads below 20 KB frequently exhibit blocking artifacts and severe facial blurring that hinder biometric verification at examination centers. Conversely, files above 50 KB strain central government databases that process millions of hall tickets concurrently on exam day.',
      compressionMechanics:
        'A modern smartphone camera takes photos between 3 MB and 12 MB (12 to 50 megapixels). Downscaling this raw asset to standard passport dimensions (3.5 × 4.5 cm or 200 × 230 px) without intelligent compression typically leaves the image either bloated at 70 KB or over-compressed into a pixelated 12 KB blob. FormFit uses adaptive binary-search quality targeting combined with Lanczos-3 resampling to converge smoothly into the 35 KB to 45 KB sweet spot.',
      stepByStepGuide: [
        'Select or take a front-facing portrait photo in bright daylight against a plain white wall.',
        'Upload the image into FormFit. The photo is parsed entirely inside your browser memory.',
        'Align your face within the 70%–80% biometric guides (eyes on the upper guideline, chin on the lower guideline).',
        'If applying for UPSC, TNPSC, or NEET, enable the "Name & Date on Photo" toggle to insert candidate name and DOP.',
        'Verify that the compliance checklist displays green checks for dimensions, 20–50 KB file size, and 200 DPI.',
        'Download your compliant JPEG file ready for instant submission.',
      ],
      technicalTable: [
        { parameter: 'Target File Size', value: '20.00 KB to 50.00 KB', importance: 'Strictly checked by portal server validation' },
        { parameter: 'Standard Dimensions', value: '3.5 × 4.5 cm (275 × 354 px @ 200 DPI)', importance: 'Universal standard for passport photos' },
        { parameter: 'Banking Dimensions', value: '200 × 230 pixels', importance: 'Mandatory standard for IBPS, SBI, and RBI' },
        { parameter: 'DPI Metadata', value: '200 DPI in JFIF APP0', importance: 'Guarantees crisp admit card printing' },
        { parameter: 'Face Coverage', value: '70% to 80% of photo area', importance: 'Prevents biometric verification failure at exam center' },
      ],
    },
    troubleshooting: [
      {
        portalMessage: 'Photo file size is greater than 50 KB.',
        cause: 'Smartphone photos carry rich color data and high-frequency noise that keeps file size high.',
        solution: 'FormFit automatically compresses the image using optimized quantization tables to guarantee size under 48 KB.',
      },
      {
        portalMessage: 'Photo file size is less than 20 KB.',
        cause: 'Overly aggressive third-party compression strips away detail, dropping size below 20 KB.',
        solution: 'Our tool automatically applies byte-floor preservation so the photo lands comfortably around 35 KB.',
      },
    ],
    faqs: [
      {
        question: 'Why do exam portals require photos between 20 KB and 50 KB?',
        answer: 'Photos below 20 KB are usually pixelated and fail biometric facial verification, while photos above 50 KB overload server storage when hundreds of thousands of candidates download admit cards simultaneously.',
      },
      {
        question: 'What are the pixel dimensions for a 20KB to 50KB photo?',
        answer: 'For banking exams (IBPS/SBI), the standard is 200 × 230 pixels. For SSC, UPSC, and State PSCs, the standard is 3.5 × 4.5 cm (275 × 354 pixels at 200 DPI).',
      },
      {
        question: 'Can I add my name and date of photo to this 20KB–50KB image?',
        answer: 'Yes! FormFit includes an integrated Name & Date generator that adds a clean white plaque at the bottom without exceeding the 50 KB limit.',
      },
      {
        question: 'What background color is required for 20KB to 50KB exam photos?',
        answer: 'Almost all Indian government exams require a plain white or very light off-white background. Dark, patterned, or outdoor backgrounds are rejected.',
      },
      {
        question: 'Is my photo uploaded to any server during compression?',
        answer: 'No. FormFit processes images 100% locally in your web browser. No photos are ever uploaded or stored on any server.',
      },
      {
        question: 'Can I compress photos directly from my smartphone gallery?',
        answer: 'Yes! FormFit is completely mobile-optimized. You can pick photos directly from your phone gallery or take a new picture using your camera.',
      },
    ],
  },
  {
    slug: 'compress-image-to-20kb',
    title: 'Compress Image to 20KB Online (Exact Target)',
    metaTitle: 'Compress Image to 20KB Online (Exact File Size Under 20KB)',
    metaDescription: 'Compress any photo or signature to exact 20KB online without losing quality. 100% private in-browser compression with zero server upload.',
    heading: 'Compress Image to 20KB Online Without Quality Loss',
    subheading: 'Reduce image and signature file size to under 20 KB or exactly 15–19 KB for government exam applications.',
    minKB: 10,
    maxKB: 20,
    defaultWidthPx: 200,
    defaultHeightPx: 100,
    defaultDpi: 200,
    mode: 'photo',
    searchKeywords: [
      'compress image to 20kb exact',
      'reduce photo size under 20kb',
      'photo compressor 20kb',
      'resize image to 20kb online',
      'jpg converter 20kb',
    ],
    applicableExams: [
      { name: 'SSC Signature Upload', url: '/resize/ssc-cgl-chsl-mts-gd-resizer', spec: '10–20 KB' },
      { name: 'IBPS Signature Upload', url: '/resize/ibps-po-clerk-so-rrb-resizer', spec: '10–20 KB' },
      { name: 'TNPSC Signature Upload', url: '/resize/tnpsc-group-1-2-4-photo-resizer', spec: '10–20 KB' },
      { name: 'Maharashtra Police Bharti', url: '/resize/mpsc-mahadbt-talathi-photo-resizer', spec: '5–20 KB' },
    ],
    editorialContent: {
      whyThisSizeExists:
        'A 20 KB upper limit is strictly checked on legacy government web portals to manage bandwidth constraints. When applicants try to compress an original 4 MB smartphone photo with ordinary tools, the text or facial features become illegible. FormFit utilizes chroma subsampling and adaptive quantization to compress images to under 20 KB while retaining crisp visual readability.',
      compressionMechanics:
        'Standard JPEG compression uses Discrete Cosine Transform on 8x8 pixel blocks. To reach 20 KB from a large image, ordinary tools slash the quality factor to 10%, causing ugly block artifacts. FormFit first downsamples the spatial resolution to the intended display dimensions (e.g., 200 × 230 px or 140 × 60 px) before compressing, allowing the JPEG quality to remain high (75%–85%) while still staying strictly under 20 KB.',
      stepByStepGuide: [
        'Select your file (JPG, PNG, or WEBP) from your computer or phone.',
        'FormFit analyzes the original dimensions and sets the target window to 10 KB–20 KB.',
        'Use the crop tool to center your subject and trim unnecessary borders.',
        'Click "Download Compliant File" to get an exact, high-clarity file under 20 KB.',
      ],
      technicalTable: [
        { parameter: 'Maximum Allowed Size', value: '20.00 KB (20,480 bytes)', importance: 'Strict server rejection threshold' },
        { parameter: 'Safe Target Range', value: '14.00 KB to 19.50 KB', importance: 'Guarantees acceptance on all portals' },
        { parameter: 'Format', value: 'Baseline JPEG (.jpg / .jpeg)', importance: 'Progressive JPEGs fail on older portals' },
      ],
    },
    troubleshooting: [
      {
        portalMessage: 'File size exceeds maximum limit of 20 KB.',
        cause: 'Standard phone crops preserve high resolution (1080p or 4K), keeping the file size above 30 KB.',
        solution: 'FormFit downscales spatial resolution to the exact standard dimensions before encoding.',
      },
    ],
    faqs: [
      {
        question: 'How can I compress an image to under 20KB without making it blurry?',
        answer: 'The secret is reducing pixel dimensions (e.g. to 200 × 230 px or 140 × 60 px) rather than just slashing JPEG quality. FormFit does this automatically, keeping quality high while ensuring the file is under 20 KB.',
      },
      {
        question: 'Is this tool safe for sensitive government documents?',
        answer: 'Yes! FormFit runs entirely on your client machine using HTML5 Canvas. Your files are never sent over the internet or saved on our servers.',
      },
      {
        question: 'Can I convert PNG to JPG under 20KB?',
        answer: 'Yes! You can upload PNG, WEBP, or JPEG files. FormFit automatically converts them to compliant baseline JPG format under 20 KB.',
      },
      {
        question: 'What if my file compresses too small, like 8KB?',
        answer: 'For portals that mandate at least 10 KB, FormFit automatically applies padding to ensure the file stays above the minimum threshold.',
      },
      {
        question: 'Does this tool work on iPhone and Android?',
        answer: 'Yes, it works smoothly on any modern smartphone browser without needing to download any app.',
      },
      {
        question: 'Is FormFit free to use?',
        answer: 'FormFit is 100% free with unlimited conversions and no sign-up required.',
      },
    ],
  },
  {
    slug: 'compress-image-to-50kb',
    title: 'Compress Image to 50KB Online (Exact Passport Size)',
    metaTitle: 'Compress Image to 50KB Online (Exact File Size Under 50KB)',
    metaDescription: 'Compress photos and images to under 50KB online with sharp clarity. Perfect for UPSC, SSC, IBPS, and State PSC application forms. 100% private.',
    heading: 'Compress Image to 50KB Online with High Clarity',
    subheading: 'Resize photos to under 50 KB or within the standard 20 KB–50 KB range for government and college application forms.',
    minKB: 20,
    maxKB: 50,
    defaultWidthPx: 275,
    defaultHeightPx: 354,
    defaultDpi: 200,
    mode: 'photo',
    searchKeywords: [
      'resize image to 50kb',
      'photo compressor under 50kb',
      'compress photo to 50kb online',
      'reduce image size to 50kb',
      'convert jpg to 50kb',
    ],
    applicableExams: [
      { name: 'UPSC Civil Services & OTR', url: '/resize/upsc-cse-ias-photo-signature-resizer', spec: '20–300 KB' },
      { name: 'IBPS Banking Exams', url: '/resize/ibps-po-clerk-so-rrb-resizer', spec: '20–50 KB' },
      { name: 'SBI PO & Clerk Exams', url: '/resize/sbi-po-clerk-photo-signature-resizer', spec: '20–50 KB' },
      { name: 'NSDL PAN Card Photo', url: '/resize/nsdl-protean-pan-card-resizer', spec: '10–50 KB' },
    ],
    editorialContent: {
      whyThisSizeExists:
        '50 KB is the single most common upper file-size ceiling across Indian recruitment and identity systems. Portals reject files exceeding 50.00 KB immediately upon file selection. FormFit’s multi-pass compression engine ensures your output lands between 35 KB and 48 KB, maximizing image clarity while preventing rejection.',
      compressionMechanics:
        'When resizing an image to 50 KB, preserving skin tone gradations and facial contours is vital for human and algorithmic verification. FormFit uses standard 4:2:0 YUV chroma subsampling and fine-tuned DCT quantization matrices to retain high facial definition while staying below the 50 KB limit.',
      stepByStepGuide: [
        'Upload your candidate photo from your computer or smartphone.',
        'FormFit automatically selects the 20 KB–50 KB target window.',
        'Use the crop handles to frame your head and shoulders with ears clearly visible.',
        'Click "Download Compliant File" to save your optimized 50 KB JPEG.',
      ],
      technicalTable: [
        { parameter: 'Maximum Allowed Size', value: '50.00 KB (51,200 bytes)', importance: 'Enforced by portal upload scripts' },
        { parameter: 'Target Compression Band', value: '35.00 KB to 48.00 KB', importance: 'Optimal balance of sharpness and compliance' },
        { parameter: 'DPI Resolution', value: '200 DPI', importance: 'Mandatory standard for government admissions' },
      ],
    },
    troubleshooting: [
      {
        portalMessage: 'File size exceeds 50 KB.',
        cause: 'Camera output is too large and was not compressed with strict byte boundaries.',
        solution: 'FormFit’s exact-KB engine ensures the output file never exceeds 50.0 KB.',
      },
    ],
    faqs: [
      {
        question: 'How do I compress a photo to exactly under 50KB?',
        answer: 'Upload your photo to FormFit’s 50KB compressor. The tool downsamples to standard passport dimensions and applies binary search compression to ensure the file is between 35 KB and 48 KB.',
      },
      {
        question: 'Does compressing to 50KB affect photo clarity?',
        answer: 'Not when done correctly. Because passport photos are displayed at around 200 × 230 to 275 × 354 pixels, a 40 KB file provides more than enough data for a razor-sharp image.',
      },
      {
        question: 'Can I compress my signature to 50KB too?',
        answer: 'Yes! However, note that many exams require signatures to be under 20 KB (or 10–20 KB). Check your exam notification before choosing 50 KB for signatures.',
      },
      {
        question: 'Are my files stored on FormFit servers?',
        answer: 'No. FormFit operates 100% in your local browser. No images are uploaded to any server.',
      },
      {
        question: 'Which file formats can I upload?',
        answer: 'You can upload JPG, JPEG, PNG, WEBP, and HEIC files. The tool outputs a standardized baseline JPEG file.',
      },
      {
        question: 'Can I add my name and date on the photo?',
        answer: 'Yes, FormFit provides an optional Name & Date on Photo toggle for exams like UPSC, NEET, and TNPSC.',
      },
    ],
  },
  {
    slug: '30kb-to-70kb-railway-resizer',
    title: '30KB to 70KB Railway Resizer (RRB NTPC, Group D, ALP)',
    metaTitle: '30KB to 70KB Railway Resizer Online (RRB NTPC, Group D, ALP)',
    metaDescription: 'Resize and compress photo and signature strictly between 30KB and 70KB for Railway RRB NTPC, Group D, and ALP recruitment forms. 100% private.',
    heading: 'Railway RRB Photo & Signature Resizer (30KB – 70KB)',
    subheading: 'Enforce Railway Recruitment Board (RRB) strict 30 KB to 70 KB photo and signature upload requirements.',
    minKB: 30,
    maxKB: 70,
    defaultWidthPx: 275,
    defaultHeightPx: 354,
    defaultDpi: 200,
    mode: 'photo',
    searchKeywords: [
      'compress photo and signature 30kb to 70kb for rrb',
      'rrb ntpc photo resizer 30kb to 70kb',
      'railway group d signature resizer 30kb to 70kb',
      'increase signature size above 30kb for railway exam',
      'rrb alp photo size',
    ],
    applicableExams: [
      { name: 'RRB NTPC Recruitment', url: '/resize/rrb-ntpc-group-d-alp-resizer', spec: '30–70 KB, 200 DPI' },
      { name: 'RRB Group D (Level 1)', url: '/resize/rrb-ntpc-group-d-alp-resizer', spec: '30–70 KB, 200 DPI' },
      { name: 'RRB Assistant Loco Pilot (ALP)', url: '/resize/rrb-ntpc-group-d-alp-resizer', spec: '30–70 KB, 200 DPI' },
      { name: 'RPF Constable & Sub-Inspector', url: '/resize/rrb-ntpc-group-d-alp-resizer', spec: '30–70 KB, 200 DPI' },
    ],
    editorialContent: {
      whyThisSizeExists:
        'Railway Recruitment Boards (RRB) uniquely mandate that BOTH candidate photographs and signatures must be strictly between 30 KB and 70 KB. Most other exams allow signatures between 10 KB and 20 KB. This 30 KB lower floor on Railway portals trips up thousands of applicants whose clean signature crops naturally compress to 8–15 KB. FormFit uses intelligent byte padding to elevate signature files safely above 30 KB.',
      compressionMechanics:
        'To elevate a clean handwriting crop above 30 KB without distorting the visual stroke, FormFit uses lossless JFIF padding injection. Rather than artificially introducing noise or blurring the ink, our engine injects valid metadata comment segments into the JPEG stream, ensuring the file passes RRB’s automated byte-check perfectly.',
      stepByStepGuide: [
        'Select whether you are resizing your Railway Photo or Signature.',
        'Upload your image into the workbench. Everything is parsed inside your browser RAM.',
        'Crop to center your face or signature with crisp margins.',
        'FormFit automatically enforces the 30 KB–70 KB byte window.',
        'Download your RRB-compliant file and upload with confidence.',
      ],
      technicalTable: [
        { parameter: 'Minimum File Size', value: '30.00 KB (30,720 bytes)', importance: 'Strictly checked on RRB portals' },
        { parameter: 'Maximum File Size', value: '70.00 KB (71,680 bytes)', importance: 'Upper limit for photo & signature' },
        { parameter: 'Resolution', value: '200 DPI', importance: 'Mandatory standard for RRB verification' },
      ],
    },
    troubleshooting: [
      {
        portalMessage: 'RRB Portal: Signature size is less than 30 KB.',
        cause: 'Signatures on white paper naturally compress to 8–18 KB.',
        solution: 'FormFit automatically pads the file stream to guarantee it lands at 45–55 KB.',
      },
    ],
    faqs: [
      {
        question: 'Why does Railway RRB require signatures to be above 30 KB?',
        answer: 'RRBs enforce high-resolution scanning to prevent blurry signatures from hindering biometric attendance and handwriting verification during Computer Based Tests (CBT).',
      },
      {
        question: 'How do I increase my signature size to 30KB for Railway exams?',
        answer: 'FormFit automatically detects when your signature is below 30 KB and injects safe, non-destructive padding bytes to bring it safely between 40 KB and 60 KB.',
      },
      {
        question: 'What are the photo dimensions for RRB NTPC?',
        answer: 'RRB NTPC photos should be 3.5 × 4.5 cm (275 × 354 pixels at 200 DPI) with file size strictly between 30 KB and 70 KB.',
      },
      {
        question: 'Can I use blue ink for Railway signature?',
        answer: 'Yes, RRB allows black or blue ballpoint ink on clean white unruled paper.',
      },
      {
        question: 'Does FormFit work for RPF Constable and SI forms?',
        answer: 'Yes, Railway Protection Force (RPF) recruitment uses identical 30 KB–70 KB specifications.',
      },
      {
        question: 'Is my data secure when using FormFit?',
        answer: 'Completely secure. FormFit runs 100% locally in your browser memory without uploading any files to any server.',
      },
    ],
  },
  {
    slug: '50kb-to-100kb-declaration-resizer',
    title: '50KB to 100KB Declaration Resizer (IBPS, SBI, RPSC)',
    metaTitle: '50KB to 100KB Declaration & Photo Resizer Online (IBPS & SBI)',
    metaDescription: 'Resize and compress handwritten declarations and photos strictly between 50KB and 100KB for IBPS, SBI, and RPSC forms. 100% private in-browser tool.',
    heading: 'Handwritten Declaration Resizer (50KB – 100KB)',
    subheading: 'Format handwritten declarations to exact 800 × 400 pixels and 50 KB to 100 KB for IBPS, SBI, and state recruitment portals.',
    minKB: 50,
    maxKB: 100,
    defaultWidthPx: 800,
    defaultHeightPx: 400,
    defaultDpi: 200,
    mode: 'declaration',
    searchKeywords: [
      'handwritten declaration 50kb to 100kb converter',
      '50kb to 100kb photo resizer',
      'ibps declaration 800x400 resizer',
      'sbi handwritten declaration resizer',
      'rajasthan sso id photo 50kb to 100kb',
    ],
    applicableExams: [
      { name: 'IBPS PO / Clerk / SO / RRB', url: '/resize/ibps-po-clerk-so-rrb-resizer', spec: '800×400 px, 50–100 KB, Black Ink' },
      { name: 'SBI PO & Clerk Declaration', url: '/resize/sbi-po-clerk-photo-signature-resizer', spec: '800×400 px, 50–100 KB, Black Ink' },
      { name: 'RPSC SSO ID Candidate Photo', url: '/resize/rpsc-sso-rsmssb-wbpsc-mppsc-resizer', spec: '275×354 px, 50–100 KB' },
    ],
    editorialContent: {
      whyThisSizeExists:
        'IBPS and SBI require candidates to write a mandatory legal declaration in their own handwriting on white paper: "I, _______, hereby declare that all the information submitted by me...". Because this declaration contains several lines of handwritten English text, examination boards require higher resolution (800 × 400 pixels, 50 KB to 100 KB) to ensure every handwritten character is legible when examined during document verification.',
      compressionMechanics:
        'Smartphone camera photos of a written page typically range from 2 MB to 6 MB. Simple web compressors often reduce this so aggressively that the pen strokes become illegible. FormFit preserves stroke edges using directional sharpening and adjusts JPEG tables to keep the final output comfortably between 65 KB and 85 KB.',
      stepByStepGuide: [
        'Write the official declaration text in your handwriting with black ballpoint ink on clean white unruled paper.',
        'Snap a clear, well-lit photo of the declaration block from above.',
        'Upload into FormFit. The crop box automatically defaults to the standard 2:1 aspect ratio (800 × 400 pixels).',
        'Verify that all text is clearly visible and the output is within 50 KB to 100 KB.',
        'Download your compliant declaration JPEG file.',
      ],
      technicalTable: [
        { parameter: 'Pixel Dimensions', value: '800 × 400 pixels (2:1 aspect ratio)', importance: 'Mandatory standard for IBPS and SBI' },
        { parameter: 'File Size Window', value: '50.00 KB to 100.00 KB', importance: 'Enforced by banking application portals' },
        { parameter: 'Ink Rule', value: 'Black ink only', importance: 'Blue ink declarations are rejected by IBPS' },
      ],
    },
    troubleshooting: [
      {
        portalMessage: 'Handwritten declaration file size is not between 50 KB and 100 KB.',
        cause: 'Uploading full page photo (over 500 KB) or over-compressed image (under 50 KB).',
        solution: 'FormFit locks the crop to the declaration text and converges compression into the 65–85 KB range.',
      },
      {
        portalMessage: 'Declaration written in capital letters is not acceptable.',
        cause: 'Writing the declaration in block/capital letters violates examination rules.',
        solution: 'Rewrite the declaration in natural running handwriting using black ink.',
      },
    ],
    faqs: [
      {
        question: 'What is the official text for the IBPS handwritten declaration?',
        answer: 'The official text is: "I, [Name of Candidate], hereby declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required."',
      },
      {
        question: 'Can I write the IBPS declaration in blue ink?',
        answer: 'No! The IBPS notification strictly specifies that the handwritten declaration must be written in English with black ink pen only.',
      },
      {
        question: 'What are the dimensions for IBPS handwritten declaration?',
        answer: 'The dimensions are 800 × 400 pixels (aspect ratio 2:1) with file size strictly between 50 KB and 100 KB.',
      },
      {
        question: 'Can someone else write the declaration for me?',
        answer: 'No. The declaration must be written in the candidate’s own handwriting. In cases of visually impaired candidates who cannot write, scribes must follow designated disability guidelines.',
      },
      {
        question: 'Can I use this tool for RPSC 50KB to 100KB photos?',
        answer: 'Yes! RPSC SSO ID requires candidate photos to be strictly between 50 KB and 100 KB, which FormFit supports seamlessly.',
      },
      {
        question: 'Does FormFit save or read my declaration text?',
        answer: 'No. Everything is processed purely as pixels in your browser memory. We never read, extract, or upload your personal handwriting.',
      },
    ],
  },
  {
    slug: 'pdf-compressor-under-100kb',
    title: 'PDF Compressor Under 100KB for Exam Forms',
    metaTitle: 'Compress PDF Under 100KB Online (Free & Private for Exams)',
    metaDescription: 'Compress PDF certificates and documents strictly under 100KB for government exam applications. 100% private client-side processing.',
    heading: 'Compress PDF Under 100KB for Exam Forms',
    subheading: 'Reduce PDF file size under 100 KB for category certificates, marksheets, and identity documents with sharp text readability.',
    minKB: 20,
    maxKB: 100,
    defaultWidthPx: 1240,
    defaultHeightPx: 1754,
    defaultDpi: 200,
    mode: 'pdf',
    searchKeywords: [
      'compress pdf under 100kb for exam form',
      'jpg to pdf under 100kb',
      'reduce pdf size under 100kb',
      'compress certificate pdf under 100kb',
      'online pdf compressor under 100kb',
    ],
    applicableExams: [
      { name: 'UPSC Photo ID & Caste Certificate', url: '/resize/upsc-cse-ias-photo-signature-resizer', spec: '20–300 KB PDF' },
      { name: 'GATE Category Certificate', url: '/resize/gate-goaps-photo-signature-resizer', spec: '20–300 KB PDF' },
      { name: 'State PSC Educational Certificates', url: '/resize/tnpsc-group-1-2-4-photo-resizer', spec: 'Under 100 KB / 200 KB' },
    ],
    editorialContent: {
      whyThisSizeExists:
        'Many state government recruitment and scholarship portals (such as MahaDBT, UP Scholarship, and state education boards) enforce a strict 100 KB ceiling for uploaded certificate PDFs. A standard scanned A4 certificate at 300 DPI can easily measure 1.5 MB to 4 MB. FormFit uses client-side PDF downsampling to compress document imagery under 100 KB without sacrificing stamp and signature clarity.',
      compressionMechanics:
        'PDFs often contain uncompressed high-resolution raster images embedded within stream objects. FormFit decompresses the stream in browser memory, resamples the image matrix to 150–200 DPI grayscale or indexed color, and re-encodes the stream with standard FlateDecode compression to bring the total PDF under 95 KB.',
      stepByStepGuide: [
        'Select your certificate PDF or scanned image (JPG/PNG).',
        'FormFit analyzes the document pages inside your browser.',
        'Choose grayscale or color mode depending on whether the document contains colored government seals.',
        'Click "Compress PDF" to download an optimized PDF under 100 KB.',
      ],
      technicalTable: [
        { parameter: 'Maximum File Size', value: '100.00 KB (102,400 bytes)', importance: 'Strict portal cutoff' },
        { parameter: 'Page Size', value: 'Standard A4 (210 × 297 mm)', importance: 'Standard document specification' },
        { parameter: 'Resolution', value: '150 to 200 DPI', importance: 'Keeps text and stamps legible' },
      ],
    },
    troubleshooting: [
      {
        portalMessage: 'Uploaded PDF exceeds maximum allowed size of 100 KB.',
        cause: 'High-DPI color scanner outputs contain uncompressed full-page bitmaps.',
        solution: 'FormFit recompresses document pages to 150 DPI grayscale/color to bring the file under 95 KB.',
      },
    ],
    faqs: [
      {
        question: 'How do I compress a PDF under 100KB without making text unreadable?',
        answer: 'FormFit downsamples document imagery to 150–200 DPI while preserving text sharpness. This brings file size under 100 KB while keeping all roll numbers, stamps, and signatures clearly legible.',
      },
      {
        question: 'Is it safe to compress my caste or marksheet PDF here?',
        answer: 'Yes! FormFit uses client-side WebAssembly to process your PDF completely inside your local browser. Your documents are never uploaded to any remote server.',
      },
      {
        question: 'Can I convert JPG images into a PDF under 100KB?',
        answer: 'Yes! You can upload a photo of your certificate in JPG or PNG format, and FormFit will package it into a compliant PDF under 100 KB.',
      },
      {
        question: 'What if my PDF contains multiple pages?',
        answer: 'For multi-page PDFs, FormFit optimizes each page sequentially to ensure the total combined file size stays under 100 KB.',
      },
      {
        question: 'Does FormFit add any watermarks to my PDF?',
        answer: 'No. FormFit never adds watermarks, stamps, or branding to your official government documents.',
      },
      {
        question: 'Does this tool work on mobile phones?',
        answer: 'Yes, FormFit works on Android and iOS browsers without requiring any app installation.',
      },
    ],
  },
  {
    slug: 'pdf-compressor-under-300kb',
    title: 'PDF Compressor Under 300KB (Caste, EWS, PwD Certificates)',
    metaTitle: 'Compress PDF Under 300KB Online (UPSC, NSDL PAN, JEE, GATE)',
    metaDescription: 'Compress certificate and document PDFs strictly under 300KB for UPSC, NSDL PAN, JEE Main, and GATE. 100% private in-browser compression.',
    heading: 'Compress Certificate PDF Under 300KB Online',
    subheading: 'Format category (OBC/SC/ST/EWS), PwD, and photo ID PDFs to exact 50 KB to 300 KB limits for UPSC, NSDL, and JEE.',
    minKB: 50,
    maxKB: 300,
    defaultWidthPx: 1240,
    defaultHeightPx: 1754,
    defaultDpi: 200,
    mode: 'pdf',
    searchKeywords: [
      'caste ews certificate pdf under 300kb',
      'nsdl pan document pdf under 300kb',
      'jee main category certificate pdf under 300kb',
      'gate sc st pwd certificate pdf under 300kb',
      'compress pdf to 300kb online',
    ],
    applicableExams: [
      { name: 'UPSC Photo ID & Degree PDF', url: '/resize/upsc-cse-ias-photo-signature-resizer', spec: '20–300 KB PDF' },
      { name: 'NSDL PAN Supporting Documents', url: '/resize/nsdl-protean-pan-card-resizer', spec: 'Under 300 KB PDF, 200 DPI' },
      { name: 'JEE Main Category Certificate', url: '/resize/nta-jee-main-advanced-resizer', spec: '50–300 KB PDF' },
      { name: 'GATE GOAPS Certificate Upload', url: '/resize/gate-goaps-photo-signature-resizer', spec: '20–300 KB PDF' },
    ],
    editorialContent: {
      whyThisSizeExists:
        'A 300 KB ceiling is the standard document specification across major central recruitment and entrance examination bodies, including UPSC, NTA (JEE Main & NEET), IIT GATE, and Income Tax PAN (Protean NSDL). Documents such as OBC-NCL, EWS, SC/ST, PwD disability certificates, and college degrees must be clearly readable by scrutiny officers. 300 KB provides ample headroom for high-clarity 200 DPI scans without overburdening verification servers.',
      compressionMechanics:
        'Standard scanner software often generates uncompressed PDF files of 2 MB to 5 MB for a 2-page document. FormFit strips unnecessary embedded fonts, compresses internal bitmap streams using balanced Deflate compression, and downsamples images to 200 DPI to reliably compress documents into the 150 KB to 260 KB range.',
      stepByStepGuide: [
        'Select your supporting certificate PDF or image scans.',
        'FormFit parses the document locally in browser memory.',
        'Select 200 DPI standard resolution for official examination compliance.',
        'Click "Compress PDF" to download your compliant PDF under 300 KB.',
      ],
      technicalTable: [
        { parameter: 'Maximum Allowed Size', value: '300.00 KB (307,200 bytes)', importance: 'Strict cutoff for UPSC, NSDL, and JEE' },
        { parameter: 'Recommended Band', value: '100.00 KB to 250.00 KB', importance: 'Ensures flawless visual verification' },
        { parameter: 'DPI Resolution', value: '200 DPI', importance: 'Mandatory standard for PAN and UPSC' },
      ],
    },
    troubleshooting: [
      {
        portalMessage: 'Document file size exceeds 300 KB.',
        cause: 'Scanned document contains high-density color information.',
        solution: 'FormFit recompresses document pages to 200 DPI, bringing file size smoothly below 280 KB.',
      },
    ],
    faqs: [
      {
        question: 'Which portals require certificate PDFs under 300 KB?',
        answer: 'UPSC Civil Services, NSDL PAN Card, NTA JEE Main, IIT GATE, and SSC document verification portals all mandate certificate PDFs under 300 KB.',
      },
      {
        question: 'Can I merge multiple certificate pages into a single PDF under 300 KB?',
        answer: 'Yes! FormFit supports merging multiple identity or address pages into a single compressed PDF under 300 KB.',
      },
      {
        question: 'What resolution is required for NSDL PAN PDF documents?',
        answer: 'NSDL PAN requires 200 DPI resolution with file size strictly less than or equal to 300 KB.',
      },
      {
        question: 'Will government officers be able to read my compressed certificate?',
        answer: 'Yes. FormFit targets the 150–250 KB sweet spot, maintaining crisp contrast on all signatures, stamps, and serial numbers.',
      },
      {
        question: 'Are my private caste or income certificates uploaded anywhere?',
        answer: 'Never. FormFit processes all files 100% inside your local device memory. Your documents are never sent over the internet.',
      },
      {
        question: 'Is FormFit free to use?',
        answer: 'Yes, FormFit is 100% free with no limits, subscriptions, or watermarks.',
      },
    ],
  },
];

export function getKbTargetBySlug(slug: string): KbTarget | undefined {
  return KB_TARGETS.find((t) => t.slug === slug);
}

export function getAllKbTargetSlugs(): string[] {
  return KB_TARGETS.map((t) => t.slug);
}
