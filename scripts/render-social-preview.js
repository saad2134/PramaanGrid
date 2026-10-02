const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const sharp = require('sharp');

async function renderSocialPreview() {
  const bgPath = 'C:\\Users\\UwU\\.gemini\\antigravity\\brain\\7fbd6709-a7bc-4106-bfac-b2767470a021\\social_preview_bg_1790968027375.jpg';
  const iconPath = path.resolve(__dirname, '../public/icon.png');
  const outPath640 = path.resolve(__dirname, '../public/social-preview.png');
  const outPathOg = path.resolve(__dirname, '../public/og-image.png');

  const bgBase64 = fs.readFileSync(bgPath).toString('base64');
  const iconBase64 = fs.readFileSync(iconPath).toString('base64');

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      width: 640px;
      height: 320px;
      overflow: hidden;
      background: #07090c;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      position: relative;
      color: #fff;
    }
    .bg-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('data:image/jpeg;base64,${bgBase64}');
      background-size: cover;
      background-position: center;
      opacity: 0.38;
      filter: saturate(1.2) contrast(1.1);
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(7,9,12,0.95) 0%, rgba(7,9,12,0.82) 50%, rgba(7,9,12,0.92) 100%);
    }
    .grid-lines {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        linear-gradient(rgba(16, 185, 129, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(16, 185, 129, 0.04) 1px, transparent 1px);
      background-size: 24px 24px;
    }
    .frame {
      position: absolute;
      inset: 8px;
      border: 1px solid rgba(16, 185, 129, 0.22);
      border-radius: 8px;
      pointer-events: none;
      box-shadow: inset 0 0 24px rgba(16, 185, 129, 0.05);
    }
    .corner-tl { position: absolute; top: 7px; left: 7px; width: 10px; height: 10px; border-top: 2px solid #10b981; border-left: 2px solid #10b981; }
    .corner-tr { position: absolute; top: 7px; right: 7px; width: 10px; height: 10px; border-top: 2px solid #10b981; border-right: 2px solid #10b981; }
    .corner-bl { position: absolute; bottom: 7px; left: 7px; width: 10px; height: 10px; border-bottom: 2px solid #10b981; border-left: 2px solid #10b981; }
    .corner-br { position: absolute; bottom: 7px; right: 7px; width: 10px; height: 10px; border-bottom: 2px solid #10b981; border-right: 2px solid #10b981; }

    .container {
      position: relative;
      z-index: 10;
      width: 100%;
      height: 100%;
      padding: 24px 28px 20px 28px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 3px 10px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.35);
      border-radius: 9999px;
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #34d399;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .badge-dot {
      width: 6px;
      height: 6px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 6px #10b981;
    }
    .sla-badge {
      font-size: 9.5px;
      font-family: ui-monospace, SFMono-Regular, monospace;
      color: #94a3b8;
      background: rgba(255, 255, 255, 0.05);
      padding: 3px 8px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .sla-badge strong {
      color: #38bdf8;
    }

    .main {
      display: flex;
      align-items: center;
      gap: 18px;
      margin-top: 4px;
    }
    .logo-box {
      width: 64px;
      height: 64px;
      border-radius: 14px;
      background: rgba(16, 185, 129, 0.08);
      border: 1px solid rgba(16, 185, 129, 0.4);
      box-shadow: 0 0 24px rgba(16, 185, 129, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      overflow: hidden;
    }
    .logo-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .title-group {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .title-row {
      display: flex;
      align-items: baseline;
      gap: 10px;
    }
    .title {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.03em;
      background: linear-gradient(180deg, #ffffff 20%, #cbd5e1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1.1;
    }
    .devanagari {
      font-size: 14px;
      font-weight: 700;
      color: #10b981;
      letter-spacing: 0.01em;
      text-shadow: 0 0 10px rgba(16, 185, 129, 0.4);
    }
    .subtitle {
      font-size: 11.5px;
      color: #94a3b8;
      margin-top: 3px;
      line-height: 1.35;
      font-weight: 400;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-top: 6px;
    }
    .feature-card {
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      padding: 7px 10px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .feature-val {
      font-size: 12px;
      font-weight: 700;
      color: #f1f5f9;
      font-family: ui-monospace, SFMono-Regular, monospace;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .feature-val.green { color: #34d399; }
    .feature-val.cyan { color: #38bdf8; }
    .feature-val.amber { color: #fbbf24; }
    .feature-label {
      font-size: 9px;
      color: #64748b;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.07);
      padding-top: 8px;
      font-size: 9.5px;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, monospace;
    }
    .footer-left {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .footer-pill {
      color: #a1a1aa;
    }
    .footer-right {
      color: #10b981;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="bg-image"></div>
  <div class="overlay"></div>
  <div class="grid-lines"></div>
  <div class="frame"></div>
  <div class="corner-tl"></div>
  <div class="corner-tr"></div>
  <div class="corner-bl"></div>
  <div class="corner-br"></div>

  <div class="container">
    <div class="header">
      <div class="badge">
        <span class="badge-dot"></span>
        <span>DMAUD Civic Infrastructure Protocol</span>
      </div>
      <div class="sla-badge">
        Statutory <strong>12-Hour SLA</strong> Enforced
      </div>
    </div>

    <div class="main">
      <div class="logo-box">
        <img class="logo-img" src="data:image/png;base64,${iconBase64}" alt="PramaanGrid Logo" />
      </div>
      <div class="title-group">
        <div class="title-row">
          <h1 class="title">PramaanGrid</h1>
          <span class="devanagari">प्रमाण-ग्रिड</span>
        </div>
        <p class="subtitle">
          Algorithmic Proof-of-Clearance & Anti-Fraud Escrow Protocol for Urban Municipalities
        </p>
      </div>
    </div>

    <div class="features-grid">
      <div class="feature-card">
        <span class="feature-val green">₹4.16L+</span>
        <span class="feature-label">Escrow Locked</span>
      </div>
      <div class="feature-card">
        <span class="feature-val cyan">VLM Bi-Temporal</span>
        <span class="feature-label">Vision Audits</span>
      </div>
      <div class="feature-card">
        <span class="feature-val amber">52 Spoofs</span>
        <span class="feature-label">Intercepted</span>
      </div>
      <div class="feature-card">
        <span class="feature-val green">87.4%</span>
        <span class="feature-label">SLA Compliance</span>
      </div>
    </div>

    <div class="footer">
      <div class="footer-left">
        <span>Smart Sanitation & Fraud Mitigation System</span>
        <span>•</span>
        <span class="footer-pill">college.dev Hackathon 2026</span>
      </div>
      <div class="footer-right">
        GNU GPL v3 • Open Source
      </div>
    </div>
  </div>
</body>
</html>
  `;

  console.log('Launching Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 640, height: 320, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });

  console.log('Taking high-resolution screenshot...');
  const buffer = await page.screenshot({ type: 'png', omitBackground: false });
  await browser.close();

  console.log('Resizing with sharp to exact 640x320 pixels...');
  await sharp(buffer)
    .resize(640, 320, { kernel: 'lanczos3' })
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(outPath640);

  console.log(`Saved social preview to ${outPath640}`);

  await sharp(buffer)
    .resize(1200, 630, { fit: 'cover' })
    .png({ quality: 95 })
    .toFile(outPathOg);

  console.log(`Saved OpenGraph 1200x630 image to ${outPathOg}`);
}

renderSocialPreview().catch(err => {
  console.error(err);
  process.exit(1);
});
