export interface DimensionTarget {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  subheading: string;
  widthPx: number;
  heightPx: number;
  widthCm: number;
  heightCm: number;
  dpi: number;
  minKB: number;
  maxKB: number;
  aspectRatio: string;
  searchKeywords: string[];
  applicableExams: { name: string; url: string; spec: string }[];
  editorialContent: {
    dimensionalMathExplanation: string;
    aspectRatioFormula: string;
    stepByStepGuide: string[];
    technicalTable: { parameter: string; value: string; importance: string }[];
  };
  troubleshooting: { portalMessage: string; cause: string; solution: string }[];
  faqs: { question: string; answer: string }[];
}

export const DIMENSION_TARGETS: DimensionTarget[] = [
  {
    slug: '200x230-pixel-photo-converter',
    title: '200x230 Pixel Photo Converter (IBPS, SBI & Banking)',
    metaTitle: '200x230 Pixel Photo Converter & Resizer Online (IBPS & SBI)',
    metaDescription: 'Convert and resize candidate passport photo to exact 200x230 pixels (20KB to 50KB) for IBPS PO, Clerk, SBI, and India Post forms. 100% private in-browser tool.',
    heading: '200 × 230 Pixel Photo Resizer & Converter Online',
    subheading: 'Format candidate photographs to the exact 200 × 230 pixels dimension with 20 KB–50 KB file size for Indian banking exams.',
    widthPx: 200,
    heightPx: 230,
    widthCm: 3.5,
    heightCm: 4.5,
    dpi: 200,
    minKB: 20,
    maxKB: 50,
    aspectRatio: '20:23 (0.869)',
    searchKeywords: [
      '200x230 pixel photo converter',
      'ibps photo 200x230 resizer',
      'sbi po photo 200x230 20kb to 50kb',
      'convert photo to 200x230 pixels online',
      'photo size 200 x 230 pixels',
    ],
    applicableExams: [
      { name: 'IBPS PO / Management Trainee', url: '/resize/ibps-po-clerk-so-rrb-resizer', spec: '200×230 px, 20–50 KB' },
      { name: 'IBPS Clerk & Regional Rural Banks (RRB)', url: '/resize/ibps-po-clerk-so-rrb-resizer', spec: '200×230 px, 20–50 KB' },
      { name: 'State Bank of India (SBI PO & Clerk)', url: '/resize/sbi-po-clerk-photo-signature-resizer', spec: '200×230 px, 20–50 KB' },
      { name: 'RBI Grade B & Assistant', url: '/resize/rbi-grade-b-assistant-resizer', spec: '200×230 px, 20–50 KB' },
      { name: 'India Post GDS Recruitment', url: '/resize/india-post-gds-photo-signature-resizer', spec: '200×230 px, 20–50 KB' },
    ],
    editorialContent: {
      dimensionalMathExplanation:
        'The 200 × 230 pixel dimension represents a specialized portrait aspect ratio of 20:23 (0.8695). Converted to physical printing dimensions at 165 DPI, this corresponds closely to a standard 3.1 cm × 3.5 cm passport thumbnail. Banking recruiting portals (IBPS and SBI) utilize automated server-side raster decoders that strictly check the EXIF/SOF0 marker of the uploaded JPEG. If the image is even one pixel off (e.g. 200 × 231 px or 199 × 230 px), the backend validation script throws an immediate rejection error.',
      aspectRatioFormula:
        'Aspect Ratio = Width / Height = 200 / 230 ≈ 0.86956. For every 100 pixels of horizontal width, the photograph must have exactly 115 pixels of vertical height.',
      stepByStepGuide: [
        'Select your portrait photograph from your computer or smartphone.',
        'FormFit locks the crop canvas strictly to the 200:230 aspect ratio.',
        'Center your facial features so your eyes align with the upper third guideline and chin aligns with the lower third guideline.',
        'Verify that the compliance auditor shows green PASS badges for 200 × 230 px and 20–50 KB.',
        'Click "Download Compliant File" to get an exact 200 × 230 pixel JPEG ready for IBPS/SBI upload.',
      ],
      technicalTable: [
        { parameter: 'Exact Pixel Width', value: '200 pixels', importance: 'Mandatory on IBPS/SBI portals' },
        { parameter: 'Exact Pixel Height', value: '230 pixels', importance: 'Mandatory on IBPS/SBI portals' },
        { parameter: 'Target File Size', value: '20.00 KB to 50.00 KB', importance: 'Enforced by banking application servers' },
        { parameter: 'Color Space', value: 'sRGB / 24-bit True Color', importance: 'Prevents color inversion errors' },
        { parameter: 'Resolution', value: '200 DPI', importance: 'Standard JFIF header tag' },
      ],
    },
    troubleshooting: [
      {
        portalMessage: 'Image dimensions must be 200 x 230 pixels.',
        cause: 'Uploading a standard 3.5 × 4.5 cm photo (275 × 354 px) instead of the exact 200 × 230 pixel size.',
        solution: 'FormFit automatically rescales your crop to exactly 200 pixels width by 230 pixels height.',
      },
      {
        portalMessage: 'File size is less than 20 KB or exceeds 50 KB.',
        cause: 'High compression strips too much data, or camera output remains too dense.',
        solution: 'Our multi-iteration compressor locks the output between 30 KB and 45 KB.',
      },
    ],
    faqs: [
      {
        question: 'Why do IBPS and SBI specifically require 200x230 pixels?',
        answer: 'The Institute of Banking Personnel Selection (IBPS) established 200 × 230 pixels as the fixed digital dimensions for candidate photos to standardize display across electronic hall tickets and biometric verification systems.',
      },
      {
        question: 'Can I resize a photo to 200x230 pixels on my smartphone?',
        answer: 'Yes! FormFit runs directly inside Chrome, Safari, and other mobile browsers. You can crop and download a 200 × 230 px photo without installing any app.',
      },
      {
        question: 'What is the required file size for a 200x230 pixel photo?',
        answer: 'For IBPS, SBI, and India Post, the file size must be strictly between 20 KB and 50 KB in JPG/JPEG format.',
      },
      {
        question: 'What background color should be used for 200x230 banking photos?',
        answer: 'IBPS and SBI require a light-coloured background, preferably pure white. Avoid dark or textured backgrounds.',
      },
      {
        question: 'Are spectacles allowed in 200x230 banking photos?',
        answer: 'Regular prescription spectacles are allowed as long as there is no glare or reflection on the lenses. Dark or tinted glasses are strictly forbidden.',
      },
      {
        question: 'Is my photograph uploaded to any server?',
        answer: 'No. FormFit is a 100% client-side privacy tool. All image cropping and scaling occur exclusively in your browser memory.',
      },
    ],
  },
  {
    slug: '140x60-pixel-signature-converter',
    title: '140x60 Pixel Signature Converter (Universal Indian Standard)',
    metaTitle: '140x60 Pixel Signature Converter & Resizer Online (10KB–20KB)',
    metaDescription: 'Convert and resize scanned signatures to exact 140x60 pixels (10KB to 20KB) for SSC, IBPS, SBI, and RRB exam forms. 100% private in-browser tool.',
    heading: '140 × 60 Pixel Signature Resizer & Converter Online',
    subheading: 'Format scanned signatures to the universal 140 × 60 pixel dimension with strict 10 KB–20 KB file size and white paper background.',
    widthPx: 140,
    heightPx: 60,
    widthCm: 3.5,
    heightCm: 1.5,
    dpi: 200,
    minKB: 10,
    maxKB: 20,
    aspectRatio: '7:3 (2.333)',
    searchKeywords: [
      '140x60 pixel signature converter',
      'ibps signature 140x60 resizer',
      'ssc signature 140x60 converter',
      'convert signature to 140x60 pixels online',
      'signature size 140 x 60 pixels 10kb to 20kb',
    ],
    applicableExams: [
      { name: 'IBPS PO / Clerk / SO / RRB', url: '/resize/ibps-po-clerk-so-rrb-resizer', spec: '140×60 px, 10–20 KB, Black Ink' },
      { name: 'SBI PO & Clerk Recruitment', url: '/resize/sbi-po-clerk-photo-signature-resizer', spec: '140×60 px, 10–20 KB, Black Ink' },
      { name: 'SSC CGL, CHSL, MTS & GD', url: '/resize/ssc-cgl-chsl-mts-gd-resizer', spec: '140×60 px (or 4.0×2.0 cm), 10–20 KB' },
      { name: 'India Post Gramin Dak Sevak (GDS)', url: '/resize/india-post-gds-photo-signature-resizer', spec: '140×60 px, 10–20 KB' },
    ],
    editorialContent: {
      dimensionalMathExplanation:
        'The 140 × 60 pixel dimension is the single most widely used signature specification in India. Representing an aspect ratio of 7:3 (2.333:1), this rectangular slot is optimized to fit a natural candidate handwriting signature on admission cards, attendance sheets, and scorecards. Government portal validation scripts check for exact width of 140 pixels and height of 60 pixels, rejecting non-conforming dimensions.',
      aspectRatioFormula:
        'Aspect Ratio = Width / Height = 140 / 60 = 7 / 3 ≈ 2.3333. The signature bounding box must be 2.33 times wider than its height.',
      stepByStepGuide: [
        'Sign on a clean sheet of white paper using a black ballpoint or gel pen.',
        'Take a clear, shadow-free photo of your signature with your phone.',
        'Upload into FormFit. The crop box is automatically locked to 140 × 60 pixels.',
        'Enable Smart Whitening if the paper looks greyish or unevenly lit.',
        'Download your compliant 140 × 60 px signature verified between 10 KB and 20 KB.',
      ],
      technicalTable: [
        { parameter: 'Exact Width', value: '140 pixels', importance: 'Mandatory portal validation parameter' },
        { parameter: 'Exact Height', value: '60 pixels', importance: 'Mandatory portal validation parameter' },
        { parameter: 'File Size Limits', value: '10.00 KB to 20.00 KB', importance: 'Strictly checked on IBPS, SBI, and SSC' },
        { parameter: 'Background Rule', value: 'Clean white paper', importance: 'Grey backgrounds cause scrutiny failure' },
        { parameter: 'Ink Rule', value: 'Black ink pen', importance: 'Mandatory for banking exams' },
      ],
    },
    troubleshooting: [
      {
        portalMessage: 'Signature dimensions must be 140 x 60 pixels.',
        cause: 'Uploading arbitrary crops (e.g. 300 × 120 px or 200 × 100 px).',
        solution: 'FormFit automatically scales and renders the signature to exact 140 × 60 pixels.',
      },
      {
        portalMessage: 'Signature size is below 10 KB.',
        cause: 'Clean handwriting on white paper naturally compresses to 4–8 KB in JPEG.',
        solution: 'Our automated byte-floor padding injects safe JFIF comment bytes to guarantee 14–18 KB output.',
      },
    ],
    faqs: [
      {
        question: 'Which exams require a 140x60 pixel signature?',
        answer: 'IBPS (PO, Clerk, SO, RRB), State Bank of India (SBI PO & Clerk), Staff Selection Commission (SSC), RBI, and India Post all require 140 × 60 pixel signatures between 10 KB and 20 KB.',
      },
      {
        question: 'Why does my 140x60 signature drop below 10 KB?',
        answer: 'Because signatures contain very few pixels with visual information (most of the image is white space), JPEG algorithms compress them down to 4–8 KB. FormFit automatically adds safe byte-padding so the file stays above 10 KB.',
      },
      {
        question: 'Can I sign in CAPITAL letters for 140x60 signatures?',
        answer: 'No. Examination authorities explicitly reject signatures in CAPITAL letters. Signatures must be in running handwriting.',
      },
      {
        question: 'What ink color is mandatory for 140x60 signatures?',
        answer: 'IBPS and SBI mandate black ballpoint or gel ink. SSC allows black or blue ink. We recommend black ink for universal compatibility.',
      },
      {
        question: 'Does FormFit work on mobile browsers?',
        answer: 'Yes! You can crop, paper-whiten, and compress your signature to 140 × 60 pixels directly from your phone.',
      },
      {
        question: 'Is FormFit private?',
        answer: 'Yes, 100% private. FormFit processes all images in browser memory using HTML5 Canvas. Your signature is never uploaded to any server.',
      },
    ],
  },
  {
    slug: '3-5cm-x-4-5cm-photo-resizer',
    title: '3.5 x 4.5 cm Photo Resizer & Pixel Converter Online',
    metaTitle: '3.5 x 4.5 cm Photo Resizer in Pixels (200 & 300 DPI Math)',
    metaDescription: 'Convert 3.5 cm x 4.5 cm passport photo to exact pixels at 200 DPI (276x354 px) and 300 DPI (413x531 px). 100% private in-browser resizer.',
    heading: '3.5 cm × 4.5 cm Photo Resizer & Pixel Calculator',
    subheading: 'Convert physical 3.5 cm × 4.5 cm passport photos to exact digital pixel dimensions at 200 DPI or 300 DPI with compliant KB limits.',
    widthPx: 276,
    heightPx: 354,
    widthCm: 3.5,
    heightCm: 4.5,
    dpi: 200,
    minKB: 20,
    maxKB: 100,
    aspectRatio: '7:9 (0.777)',
    searchKeywords: [
      '3.5cm x 4.5cm photo resizer',
      '3.5 x 4.5 cm in pixels',
      '3.5 cm x 4.5 cm photo size in pixels 200 dpi',
      '3.5 x 4.5 cm in pixels 300 dpi',
      'cm to pixels photo converter',
    ],
    applicableExams: [
      { name: 'UPSC Civil Services Examination', url: '/resize/upsc-cse-ias-photo-signature-resizer', spec: '3.5×4.5 cm, 20–300 KB' },
      { name: 'NTA JEE Main & Advanced', url: '/resize/nta-jee-main-advanced-resizer', spec: '3.5×4.5 cm, 10–200 KB' },
      { name: 'NTA NEET UG Passport Photo', url: '/resize/nta-neet-ug-passport-postcard-resizer', spec: '3.5×4.5 cm, 10–200 KB' },
      { name: 'TNPSC Group Exams', url: '/resize/tnpsc-group-1-2-4-photo-resizer', spec: '3.5×4.5 cm, 20–50 KB' },
      { name: 'Indian Passport Seva', url: '/resize/passport-seva-voter-id-dl-resizer', spec: '3.5×4.5 cm, 10–50 KB @ 300 DPI' },
    ],
    editorialContent: {
      dimensionalMathExplanation:
        'The mathematical formula to convert centimeters to digital pixels is: Pixels = (Centimeters / 2.54) × DPI. For a standard 3.5 cm × 4.5 cm Indian passport photograph: At 200 DPI: Width = (3.5 / 2.54) × 200 = 275.59 ≈ 276 pixels; Height = (4.5 / 2.54) × 200 = 354.33 ≈ 354 pixels. At 300 DPI: Width = (3.5 / 2.54) × 300 = 413.38 ≈ 413 pixels; Height = (4.5 / 2.54) × 300 = 531.49 ≈ 531 pixels. FormFit computes this exact geometry and embeds the corresponding JFIF density markers.',
      aspectRatioFormula:
        'Aspect Ratio = 3.5 / 4.5 = 7 / 9 ≈ 0.7778. For every 7 units of width, the photograph must have exactly 9 units of height.',
      stepByStepGuide: [
        'Upload your candidate portrait into the FormFit workbench.',
        'Choose whether your portal specifies 200 DPI (276 × 354 px) or 300 DPI (413 × 531 px).',
        'Center your face within the 70%–80% biometric guides.',
        'Toggle Name & Date if required by your exam board (e.g. UPSC, TNPSC, or NEET).',
        'Download your pixel-perfect 3.5 × 4.5 cm compliant photo.',
      ],
      technicalTable: [
        { parameter: '200 DPI Pixels', value: '276 × 354 pixels', importance: 'Standard for NTA, SSC, and TNPSC' },
        { parameter: '300 DPI Pixels', value: '413 × 531 pixels', importance: 'Standard for Indian Passport Seva and Visa' },
        { parameter: 'Aspect Ratio', value: '7:9 (0.778)', importance: 'Standard passport aspect ratio' },
        { parameter: 'Face Height', value: '2.5 cm to 3.2 cm (approx 75%)', importance: 'Prevents face rejection during scanning' },
      ],
    },
    troubleshooting: [
      {
        portalMessage: 'Aspect ratio mismatch for 3.5 x 4.5 cm photo.',
        cause: 'Uploading a square (1:1) photo or uncropped smartphone portrait (9:16 ratio).',
        solution: 'FormFit locks the crop boundary strictly to 7:9 aspect ratio.',
      },
    ],
    faqs: [
      {
        question: 'How many pixels is 3.5 cm x 4.5 cm in photo resizer?',
        answer: 'At 200 DPI (the most common Indian exam standard), 3.5 cm × 4.5 cm equals 276 × 354 pixels. At 300 DPI (used for Passport Seva and PVC cards), it equals 413 × 531 pixels.',
      },
      {
        question: 'How do you calculate cm to pixels?',
        answer: 'The formula is: Pixels = (Centimeters ÷ 2.54) × DPI. For example: (3.5 ÷ 2.54) × 200 = 276 pixels.',
      },
      {
        question: 'Which exams use 3.5 cm x 4.5 cm photos?',
        answer: 'UPSC, SSC, NTA NEET, NTA JEE Main, GATE, TNPSC, UPPSC, BPSC, and Indian Passport Seva all use 3.5 cm × 4.5 cm as their primary photograph specification.',
      },
      {
        question: 'What is the face coverage rule for 3.5 x 4.5 cm photos?',
        answer: 'Most exam bodies mandate that candidate face must occupy between 70% and 80% of the photograph height (from top of hair to bottom of chin).',
      },
      {
        question: 'Can I add candidate name and date to a 3.5 x 4.5 cm photo?',
        answer: 'Yes! FormFit includes a one-click toggle to add candidate name and date of photo (DOP) at the bottom without distorting the 3.5 × 4.5 cm ratio.',
      },
      {
        question: 'Is FormFit safe to use for official documents?',
        answer: 'Yes! FormFit runs 100% client-side in your web browser. Your photo is never sent to any server.',
      },
    ],
  },
  {
    slug: '200-dpi-photo-signature-converter',
    title: '200 DPI Photo & Signature Converter (NSDL, UPSC, SSC)',
    metaTitle: '200 DPI Photo & Signature Converter Online (NSDL & UPSC Compliant)',
    metaDescription: 'Convert any photo or signature to 200 DPI with valid binary JFIF headers for NSDL PAN Card, UPSC, and SSC portals. 100% private in-browser tool.',
    heading: '200 DPI Photo & Signature Converter Online',
    subheading: 'Inject true binary 200 DPI JFIF metadata into candidate photos and signatures to pass strict government backend validation checks.',
    widthPx: 276,
    heightPx: 354,
    widthCm: 3.5,
    heightCm: 4.5,
    dpi: 200,
    minKB: 10,
    maxKB: 50,
    aspectRatio: '7:9 (0.777)',
    searchKeywords: [
      '200 dpi photo signature converter',
      'convert jpg to 200 dpi for nsdl pan',
      '200 dpi converter online',
      'change photo dpi to 200',
      'nsdl pan card photo 200 dpi',
      '200 dpi image resizer',
    ],
    applicableExams: [
      { name: 'NSDL / Protean PAN Card Portal', url: '/resize/nsdl-protean-pan-card-resizer', spec: '200 DPI strictly checked in binary header' },
      { name: 'UPSC Civil Services OTR', url: '/resize/upsc-cse-ias-photo-signature-resizer', spec: '200 DPI resolution standard' },
      { name: 'SSC Staff Selection Commission', url: '/resize/ssc-cgl-chsl-mts-gd-resizer', spec: '200 DPI standard' },
      { name: 'UIDAI myAadhaar Document Update', url: '/resize/uidai-myaadhaar-document-pdf-resizer', spec: '200 DPI scan requirement' },
    ],
    editorialContent: {
      dimensionalMathExplanation:
        'DPI (Dots Per Inch) is a metadata tag that defines print density. While web browsers render images based on pixel dimensions alone, government backend servers (notably Protean / NSDL PAN and state exam engines) inspect bytes 13–17 of the JPEG file’s APP0 marker segment. These bytes contain: Byte 13 (Density Units: 1 = Dots Per Inch), Bytes 14–15 (X Density in big-endian: 0x00C8 = 200), and Bytes 16–17 (Y Density: 0x00C8 = 200). If an image has 72 DPI or 96 DPI metadata, the server rejects it even if the pixel dimensions are correct. FormFit directly rewrites these exact header bytes.',
      aspectRatioFormula:
        'At 200 DPI, each inch of physical paper contains exactly 200 digital dots (pixels). 1 millimeter = 7.874 pixels at 200 DPI. 1 centimeter = 78.74 pixels at 200 DPI.',
      stepByStepGuide: [
        'Upload your image into FormFit’s 200 DPI workbench.',
        'Adjust crop and whitening as desired.',
        'Our binary engine encodes the JPEG and patches the JFIF APP0 header segment with binary values 0x00C8 (200 DPI) for both X and Y resolution.',
        'Download your 200 DPI certified JPEG file.',
      ],
      technicalTable: [
        { parameter: 'JFIF Marker', value: '0xFFE0 (APP0 Segment)', importance: 'Standard JPEG resolution container' },
        { parameter: 'Density Unit Byte', value: '0x01 (Dots Per Inch)', importance: 'Distinguishes DPI from DPCM (Dots Per CM)' },
        { parameter: 'X & Y Density', value: '0x00C8 (200 in Hexadecimal)', importance: 'Target requirement for NSDL PAN and UPSC' },
      ],
    },
    troubleshooting: [
      {
        portalMessage: 'NSDL PAN Portal: Resolution of photograph must be 200 DPI.',
        cause: 'Standard phone and web apps save images with 72 DPI or 96 DPI header flags.',
        solution: 'FormFit automatically injects the exact 200 DPI JFIF binary segment into every generated JPEG.',
      },
    ],
    faqs: [
      {
        question: 'Why does NSDL PAN require exactly 200 DPI?',
        answer: 'NSDL / Protean PAN verification systems check the binary metadata in the JPEG header to verify the image was scanned at 200 DPI print quality for physical PAN card production.',
      },
      {
        question: 'Does changing DPI change the image dimensions?',
        answer: 'DPI specifies print density (dots per inch), not pixel count. However, for a given physical size in centimeters, changing DPI changes the required pixel dimensions. FormFit handles both pixel dimensions and DPI header injection simultaneously.',
      },
      {
        question: 'How do I check if my image is 200 DPI?',
        answer: 'On Windows, right-click the image, select Properties -> Details, and check Horizontal and Vertical resolution. Both will show "200 dpi". FormFit’s compliance badge also verifies this in real time.',
      },
      {
        question: 'Can I convert photos to 200 DPI on my phone without Photoshop?',
        answer: 'Yes! FormFit runs completely in your mobile browser and modifies the binary JPEG headers without needing Photoshop or complex desktop software.',
      },
      {
        question: 'Can I convert signatures to 200 DPI as well?',
        answer: 'Yes! Both photos and signatures can be converted to 200 DPI with FormFit.',
      },
      {
        question: 'Is FormFit free?',
        answer: 'Yes, 100% free with no limits and zero server uploads.',
      },
    ],
  },
  {
    slug: '213x213-pixel-300-dpi-pan-resizer',
    title: '213x213 Pixel 300 DPI PAN Resizer (UTIITSL)',
    metaTitle: '213x213 Pixel 300 DPI PAN Resizer Online (UTIITSL Portal)',
    metaDescription: 'Resize photos to exact 213x213 pixels at 300 DPI (under 30KB) and signature to 400x200 (under 60KB) for UTIITSL PAN Card applications. 100% private.',
    heading: 'UTIITSL PAN Card Photo Resizer (213 × 213 px, 300 DPI)',
    subheading: 'Format candidate photographs to the strict 213 × 213 pixels, 300 DPI, under 30 KB specification mandated by the UTIITSL PAN portal.',
    widthPx: 213,
    heightPx: 213,
    widthCm: 1.8,
    heightCm: 1.8,
    dpi: 300,
    minKB: 10,
    maxKB: 30,
    aspectRatio: '1:1 (1.000)',
    searchKeywords: [
      'uti pan photo 213x213 300 dpi resizer',
      'utiitsl pan card photo resizer',
      '213x213 pixels 300 dpi jpg',
      'uti pan cropping utility alternative online',
      'uti pan signature 400x200',
    ],
    applicableExams: [
      { name: 'UTIITSL Online PAN Portal', url: '/resize/utiitsl-pan-card-photo-signature-resizer', spec: '213×213 px, 300 DPI, < 30 KB' },
      { name: 'UTIITSL Signature Upload', url: '/resize/utiitsl-pan-card-photo-signature-resizer', spec: '400×200 px, 600 DPI, < 60 KB' },
    ],
    editorialContent: {
      dimensionalMathExplanation:
        'UTIITSL enforces one of the most idiosyncratic image specifications in India: exactly 213 × 213 pixels (a 1:1 square) with a 300 DPI metadata tag and file size under 30 KB. Physical PAN cards allocate a small square window on the printed plastic card. The legacy UTIITSL cropping utility was an old desktop application requiring Java runtime. FormFit replicates this exact geometric specification directly inside modern browsers.',
      aspectRatioFormula:
        'Aspect Ratio = 1:1 square. Width = Height = 213 pixels. At 300 DPI, 213 pixels equals exactly 0.71 inches or 1.80 centimeters.',
      stepByStepGuide: [
        'Select your portrait photo or passport picture.',
        'The FormFit crop boundary automatically locks to a 1:1 square at 213 × 213 pixels.',
        'Adjust the crop to frame your head and shoulders.',
        'Click "Download Compliant File" to get a 213 × 213 px JPEG with a 300 DPI JFIF header under 30 KB.',
      ],
      technicalTable: [
        { parameter: 'Width & Height', value: '213 × 213 pixels', importance: 'Mandatory on UTIITSL PAN portal' },
        { parameter: 'Resolution', value: '300 DPI', importance: 'Required binary JFIF header density' },
        { parameter: 'Maximum File Size', value: '30.00 KB', importance: 'Server reject threshold' },
        { parameter: 'Signature Spec', value: '400 × 200 pixels, 600 DPI, < 60 KB', importance: 'UTIITSL signature requirement' },
      ],
    },
    troubleshooting: [
      {
        portalMessage: 'Photo dimension must be 213x213 pixels.',
        cause: 'Uploading rectangular or arbitrary dimension photos to the UTI portal.',
        solution: 'FormFit locks the output strictly to 213 × 213 pixels.',
      },
      {
        portalMessage: 'Photo file size exceeds 30 KB.',
        cause: 'Standard cropping leaves file size around 40–80 KB.',
        solution: 'Our tool ensures the file is compressed between 15 KB and 28 KB.',
      },
    ],
    faqs: [
      {
        question: 'Why does UTIITSL require 213x213 pixels?',
        answer: 'UTIITSL’s PVC card manufacturing system requires exact 213 × 213 square pixel raster images with a 300 DPI header tag to render the applicant photo directly onto the physical card.',
      },
      {
        question: 'What is the signature requirement for UTIITSL PAN?',
        answer: 'UTIITSL requires signatures to be 400 × 200 pixels with file size under 60 KB and resolution of 600 DPI (or 300 DPI) in black ink.',
      },
      {
        question: 'Do I need Java or the old UTI Crop Utility?',
        answer: 'No! FormFit runs modern HTML5 image math directly inside your browser without needing any Java plugins or desktop downloads.',
      },
      {
        question: 'What is the maximum file size for UTIITSL photo?',
        answer: 'The photo file size must be strictly under 30 KB in JPG format.',
      },
      {
        question: 'Can I do this on my phone?',
        answer: 'Yes! FormFit is completely mobile-friendly and works on Android and iOS.',
      },
      {
        question: 'Is my PAN photo saved on any server?',
        answer: 'Never. FormFit operates 100% locally in your browser memory. Your images never leave your phone or computer.',
      },
    ],
  },
  {
    slug: '4x6-inch-postcard-photo-maker',
    title: '4x6 Inch Postcard Photo Maker Online (NEET UG)',
    metaTitle: '4x6 Inch Postcard Photo Maker Online (NEET UG Compliant)',
    metaDescription: 'Create 4x6 inch postcard size photo (800x1200 px, 10KB-200KB) with Name and Date for NTA NEET UG online application. 100% private in-browser tool.',
    heading: '4" × 6" Postcard Photo Maker for NEET UG Online',
    subheading: 'Format candidate photographs to the mandatory 4 × 6 inch (800 × 1200 pixels) postcard size with Name and Date of Photo (DOP) for NEET UG.',
    widthPx: 800,
    heightPx: 1200,
    widthCm: 10.16,
    heightCm: 15.24,
    dpi: 200,
    minKB: 10,
    maxKB: 200,
    aspectRatio: '2:3 (0.667)',
    searchKeywords: [
      '4x6 inch postcard photo maker',
      'neet postcard size photo 4x6 inch maker',
      '4x6 inch photo in pixels 200 dpi',
      'neet postcard photo 10kb to 200kb with name and date',
      '80% face coverage neet photo',
    ],
    applicableExams: [
      { name: 'NTA NEET (UG) Postcard Photo', url: '/resize/nta-neet-ug-passport-postcard-resizer', spec: '4×6 inch (800×1200 px), 10–200 KB' },
      { name: 'NTA NEET (UG) Passport Photo', url: '/resize/nta-neet-ug-passport-postcard-resizer', spec: '3.5×4.5 cm (276×354 px), 10–200 KB' },
    ],
    editorialContent: {
      dimensionalMathExplanation:
        'NEET UG uniquely requires both a standard passport-size photo AND a 4" × 6" Postcard Size Photo. At 200 DPI, 4 inches width equals 4 × 200 = 800 pixels, and 6 inches height equals 6 × 200 = 1200 pixels (aspect ratio 2:3). In centimeters, this measures 10.16 cm × 15.24 cm. NTA guidelines mandate that candidate full name and date on which the photograph was taken (DOP) must be clearly printed at the bottom of the photo against a white plaque.',
      aspectRatioFormula:
        'Aspect Ratio = 4 / 6 = 2 / 3 ≈ 0.6667. For every 2 units of horizontal width, the photograph must have exactly 3 units of vertical height.',
      stepByStepGuide: [
        'Select your portrait photograph taken against a plain white wall.',
        'FormFit automatically locks the crop frame to the 2:3 postcard ratio (800 × 1200 pixels).',
        'Frame your face so that 80% of the image covers your face from forehead to chin, with both ears clearly visible.',
        'Enter your Candidate Name and Date of Photograph (DOP) in the plaque controls.',
        'Download your NEET-compliant 4 × 6 inch postcard JPEG ready for submission.',
      ],
      technicalTable: [
        { parameter: 'Pixel Dimensions', value: '800 × 1200 pixels (at 200 DPI)', importance: 'Mandatory standard for NEET Postcard' },
        { parameter: 'Physical Dimensions', value: '4 × 6 inches (10.16 × 15.24 cm)', importance: 'Official print size for exam center' },
        { parameter: 'File Size Window', value: '10.00 KB to 200.00 KB', importance: 'Enforced by NTA NEET application portal' },
        { parameter: 'Candidate Name & Date', value: 'Mandatory printed at bottom', importance: 'Explicitly checked during NTA scrutiny' },
        { parameter: 'Face Coverage', value: '80% face coverage with visible ears', importance: 'Anti-impersonation rule' },
      ],
    },
    troubleshooting: [
      {
        portalMessage: 'Postcard photo dimensions not within allowed limits.',
        cause: 'Uploading standard passport ratio (3.5:4.5) instead of true 4:6 (2:3) postcard ratio.',
        solution: 'FormFit automatically configures the canvas to exactly 800 × 1200 pixels.',
      },
      {
        portalMessage: 'Candidate photograph missing Name or Date of Photograph.',
        cause: 'Uploading plain camera image without mandatory candidate identity text.',
        solution: 'Our tool automatically overlays candidate name and DOP in crisp, compliant bold typography.',
      },
    ],
    faqs: [
      {
        question: 'What is the 4x6 postcard photo in NEET UG?',
        answer: 'NEET UG mandates that candidates upload both a standard passport photo and a 4" × 6" postcard size photo (800 × 1200 px at 200 DPI). The postcard photo is verified at the examination centre and pasted on the attendance sheet.',
      },
      {
        question: 'Is name and date mandatory on NEET postcard photo?',
        answer: 'Yes! The NTA NEET information bulletin explicitly mandates that candidate name and date of photo (DOP) must be clearly printed at the bottom of both passport and postcard photos.',
      },
      {
        question: 'What is the 80% face coverage rule for NEET?',
        answer: 'NTA requires that 80% of the photo must be the candidate’s face, including both ears, without any caps, dark glasses, or masks.',
      },
      {
        question: 'What is the file size limit for NEET postcard photo?',
        answer: 'The file size must be strictly between 10 KB and 200 KB in JPG/JPEG format.',
      },
      {
        question: 'Can I wear spectacles in the NEET postcard photo?',
        answer: 'Prescription spectacles used regularly are allowed provided there is no flash reflection on the lenses. Tinted or sunglasses are not allowed.',
      },
      {
        question: 'Is my data secure with FormFit?',
        answer: '100% secure. Everything is processed entirely in your web browser memory without any remote server uploads.',
      },
    ],
  },
];

export function getDimensionTargetBySlug(slug: string): DimensionTarget | undefined {
  return DIMENSION_TARGETS.find((d) => d.slug === slug);
}

export function getAllDimensionTargetSlugs(): string[] {
  return DIMENSION_TARGETS.map((d) => d.slug);
}
