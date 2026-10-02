# Security Policy

The PramaanGrid team takes the security of civic infrastructure, municipal escrow mechanisms, and anti-fraud protocols seriously. This policy outlines our vulnerability disclosure process and our threat mitigation framework.

---

## Supported Versions

Only the latest release and the current `master` branch receive security patches and updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

---

## Reporting a Vulnerability

If you discover a security vulnerability or exploit vector in PramaanGrid, please report it privately. **Do NOT disclose vulnerabilities in public GitHub issues, discussions, or social media.**

### Contact
Please send detailed security vulnerability reports to:
**[reach.saad@outlook.com](mailto:reach.saad@outlook.com)**

### What to Include
To expedite triage, please provide:
1. A clear description of the vulnerability and its potential impact.
2. Step-by-step instructions or proof-of-concept (PoC) code to reproduce the issue.
3. Affected components (e.g., VLM verification pipeline, escrow balance calculator, API endpoints, or client-side telemetry capture).
4. Any proposed remediations or patches if available.

### Response Timelines
- **Initial Acknowledgment**: Within 48 hours of receipt.
- **Triage & Assessment**: Within 5 business days.
- **Remediation & Patch Release**: Dependent on severity, typically within 14 business days.

---

## Threat Model & Civic Security Considerations

PramaanGrid operates at the intersection of municipal governance, civic financial escrow, and automated computer vision audits. Security considerations unique to this domain include:

### 1. Spatial Telemetry & GPS Spoofing
- **Risk**: Contractors submitting photos captured kilometers away from the assigned incident site.
- **Mitigation**: Cross-validation of EXIF geolocation data against carrier cell tower telemetry, municipal ward boundary polygons, and device sensor orientation before accepting cleanup claims.

### 2. Generative AI & Deepfake Inpainting
- **Risk**: Contractors using synthetic image generation or digital inpainting to fabricate "cleaned" waste dumps.
- **Mitigation**: Dual-temporal VLM landmark triangulation inspecting invariant structural anchors (e.g., masonry walls, curb patterns, utility poles) alongside error-level analysis (ELA) to detect manipulated pixels.

### 3. Ghost Contractor Collusion & Double Claims
- **Risk**: Re-uploading previously cleared photo proofs across multiple wards or tenders.
- **Mitigation**: Perceptual image hashing (`pHash`) and cryptographic hash registries that reject duplicate or near-duplicate visual submissions across municipal database records.

### 4. API Key & Client Secret Hygiene
- **Risk**: Exposure of upstream AI provider tokens (e.g., Gemini AI Studio, Replicate, or map tile credentials).
- **Mitigation**: All AI model inference is conducted server-side via Next.js Route Handlers. No private API tokens are bundled into client-side browser bundles.

---

## Hall of Fame & Responsible Disclosure

We deeply appreciate security researchers and civic technologists who adhere to responsible disclosure. Security contributors who help identify and remediate vulnerabilities will be acknowledged in our release notes and repository security hall of fame (with your explicit permission).

For any questions regarding security policy, reach out to [reach.saad@outlook.com](mailto:reach.saad@outlook.com).
