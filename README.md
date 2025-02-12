# ZocMLM - Network Marketing Platform

![Platform Dashboard Preview](public/screenshot-dashboard.png)

Enterprise-grade MLM solution with advanced network management and compensation tracking.

## Key Features

### Network Management
- 3D Network Visualization
- Matrix Placement System
- Downline Auto-Balancing
- Stagnation Risk Analysis
- Cross-line Commission Calculation

### Compensation Plan
- Multi-level Commissions (Unilevel/Binary)
- Compression Algorithm
- Reward Tier System
- Leadership Bonuses
- Performance Analytics

### Security & Compliance
- KYC Document Verification
- MFA Authentication
- Role-based Access Control
- GDPR-compliant Data Handling
- Audit Logging

## Technology Stack

| Component              | Technology               |
|------------------------|--------------------------|
| Frontend               | Next.js 14, TypeScript   |
| Styling                | Tailwind CSS             |
| State Management       | Zustand                  |
| Data Visualization     | React Force Graph 3D     |
| AI Integration         | TensorFlow.js            |
| Authentication         | Supabase Auth            |
| Deployment             | Netlify                  |

## Getting Started

### Prerequisites
- Node.js 18.x
- Netlify CLI
- PostgreSQL (for local development)

### Installation
```bash
git clone https://github.com/your-org/zocmlm-platform.git
cd zocmlm-platform
npm install
ntl login
```

### Configuration
Create `.env` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_KEY=your-supabase-key
MLM_COMMISSION_RATES=0.10,0.07,0.05,0.03
MLM_MAX_LEVEL=15
```

### Running Locally
```bash
npm run dev
```

## Deployment

1. Production Build:
```bash
npm run build
```

2. Deploy to Netlify:
```bash
ntl deploy --prod --mlm-mode=advanced
```

## Commission Structure

Configure in `src/store/commissionStore.ts`:
```typescript
const COMMISSION_RATES = [
  { level: 1, rate: 0.10 },
  { level: 2, rate: 0.07 },
  { level: 3, rate: 0.05 },
  { level: 4, rate: 0.03 }
];
```

## License

Proprietary MLM Software License © 2024 ZocMLM
