import { test, expect } from '@playwright/test';

const SAMPLE_ROUTES_TO_AUDIT = [
  '/',
  '/resize/upsc-cse-ias-photo-signature-resizer',
  '/resize/ssc-cgl-chsl-mts-gd-resizer',
  '/resize/ibps-po-clerk-so-rrb-resizer',
  '/resize/nsdl-protean-pan-card-resizer',
  '/kb/20kb-to-50kb-photo-resizer',
  '/kb/10kb-to-20kb-signature-resizer',
  '/dimensions/200x230-pixel-photo-converter',
  '/guides/all-indian-govt-exam-photo-signature-size-chart-2026',
];

const MANDATORY_LEGAL_ROUTES = [
  '/privacy',
  '/terms',
  '/disclaimer',
  '/about',
  '/contact',
];

test.describe('Google AdSense & Technical SEO Readiness Gate', () => {
  for (const route of SAMPLE_ROUTES_TO_AUDIT) {
    test(`Route ${route} passes AdSense word-count depth (>= 800 words), H1 uniqueness, canonical, and JSON-LD validation`, async ({
      page,
    }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      // 1. Exactly one H1 tag
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);

      // 2. Self-referencing canonical link exists
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toContain(route === '/' ? 'https://formfit-rust.vercel.app' : route);

      // 3. Meta description length check (110 to 175 chars)
      const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDesc?.length).toBeGreaterThanOrEqual(110);
      expect(metaDesc?.length).toBeLessThanOrEqual(175);

      // 4. Visible editorial word count >= 800 words (Prevents AdSense "Low Value Content")
      const mainText = await page.locator('main').innerText();
      const wordCount = mainText
        .trim()
        .split(/\s+/)
        .filter((w: string) => w.length > 1).length;
      expect(wordCount).toBeGreaterThanOrEqual(800);

      // 5. Valid JSON-LD structured data parses cleanly
      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').allInnerTexts();
      expect(jsonLdScripts.length).toBeGreaterThanOrEqual(1);
      for (const rawJson of jsonLdScripts) {
        expect(() => JSON.parse(rawJson)).not.toThrow();
      }
    });
  }

  for (const legalRoute of MANDATORY_LEGAL_ROUTES) {
    test(`Mandatory trust page ${legalRoute} returns 200 OK and is linked in global footer`, async ({
      page,
    }) => {
      const res = await page.goto(legalRoute);
      expect(res?.status()).toBe(200);
      const h1Text = await page.locator('h1').innerText();
      expect(h1Text.length).toBeGreaterThan(3);

      const footerLink = page.locator(`footer a[href="${legalRoute}"]`).first();
      await expect(footerLink).toBeVisible();
    });
  }

  test('ads.txt and sitemap.xml and robots.txt are served with valid content', async ({
    request,
  }) => {
    const adsTxt = await request.get('/ads.txt');
    expect(adsTxt.status()).toBe(200);
    expect(await adsTxt.text()).toContain('google.com,');
    expect(await adsTxt.text()).toContain('DIRECT, f08c47fec0942fa0');

    const robotsTxt = await request.get('/robots.txt');
    expect(robotsTxt.status()).toBe(200);
    expect(await robotsTxt.text()).toContain('Mediapartners-Google');

    const sitemapXml = await request.get('/sitemap.xml');
    expect(sitemapXml.status()).toBe(200);
    expect(await sitemapXml.text()).toContain('<urlset');
  });
});
