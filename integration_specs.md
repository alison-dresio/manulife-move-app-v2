Technical Architecture
🌐 All Phase 1 deliverables include localization for 3 languages: English, Traditional Chinese, and Simplified Chinese.
Requirements Summary

Platform Compatibility

Device Brand Testing: DRESIO will test on major device brands including Samsung, Apple, Google Pixel, and Huawei. Testing on Xiaomi, OPPO, and other brands with custom Android WebView implementations will be conducted on a best-effort basis. Manulife is responsible for providing test devices for any specific brand or model not listed above. Compatibility issues arising from non-standard manufacturer WebView modifications are excluded from warranty scope.
Infrastructure

DRESIO's cloud infrastructure is hosted on Amazon Web Services (AWS) in the Asia Pacific (Hong Kong) region (ap-east-1) to ensure data residency compliance with PDPO requirements. The architecture is designed for production-grade reliability, security, and scalability:
Multi-AZ Deployment: Application servers and databases distributed across multiple Availability Zones for high availability (99.5% uptime SLA, excluding scheduled maintenance windows with 48 hours advance notice)
Auto-Scaling: Elastic compute capacity adjusts automatically to user demand, handling campaign-driven traffic spikes without manual intervention
CDN Delivery: Amazon CloudFront serves game assets, SDK libraries, and static content with targeted sub-100ms latency via CloudFront CDN
Security Layers: AWS WAF (Web Application Firewall) for DDoS protection; TLS 1.3 encryption in transit; AES-256 encryption at rest; network isolation via VPC
Monitoring: Real-time CloudWatch dashboards for performance, error rates, and latency; automated alerting for anomalies; Sentry for application error tracking
Incident Notification — P1 incidents (complete service outage): Manulife designated contact notified via email within 2 hours during business hours or 4 hours outside business hours. P2 incidents (degraded service): notification within 4 business hours. Post-incident report provided within 5 business days of resolution. Notification channel and designated contacts to be agreed during onboarding
CI/CD: Automated deployment pipeline with staging environment; blue-green deployments for zero-downtime releases
Backup & DR: Daily automated database backups (30-day retention), cross-AZ replication within ap-east-1 (Hong Kong), bi-annual disaster recovery testing
Integration Architecture
The DRESIO × Manulife Move solution follows a WebView-based integration model:
Manulife Move App embeds DRESIO web games via WebView component
DRESIO Cloud handles all AI processing, game hosting, and data storage
DRESIO SDK provides real-time pose detection and movement analysis in-browser
SSO Integration allows seamless authentication from Manulife Move app
Data Flow: User actions → DRESIO SDK → DRESIO Backend → REST API for Manulife access
Integration Responsibilities
Manulife Provides
SSO endpoint (OIDC or OAuth2) — DRESIO implements client-side
User Data API — fetch/push user profile and activity data
Reward Points API — DRESIO sends achievement threshold signals; Manulife issues Move points
Deep Linking — configure Move app deep links to DRESIO web games
Test accounts and test environment access
Production deployment sign-off before each phase go-live
DRESIO Provides
API documentation (OpenAPI/Swagger)
Integration guide with code samples
Sandbox environment
Data Privacy
Data Collected
User ID (from Manulife SSO)
Game session data (game ID, duration, score, accuracy, reps)
Device type and browser
Session timestamps
Data NOT Collected
Raw video/images of users
Biometric data beyond pose landmarks
Location data
Personal health records
Data Access for Manulife
REST API — Programmatic access to all exercise metrics, session data, and aggregated statistics
Admin Dashboard — Visual interface for usage analytics, user engagement, and performance reports
Data Exports — Scheduled or on-demand exports in CSV/JSON format for BI

All data access is anonymized. No directly identifying personal information (name, email, address) is collected by DRESIO. User sessions are identified via pseudonymous identifiers provided through Manulife SSO.
Third-Party Service Providers
The following third-party service providers are used in the DRESIO × Manulife Move platform. This list is provided for Manulife's vendor assessment and due diligence process.

DRESIO performs core engineering in-house. Any specialized sub-contracting requires prior written approval from Manulife. No raw user data (video, images, PII) is shared with any third-party provider.
