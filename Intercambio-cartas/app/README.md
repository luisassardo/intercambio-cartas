# Anonymous Letter Exchange

A secure, privacy-focused web application for connecting strangers through handwritten letters. Built with React, TypeScript, Supabase, and modern encryption.

## Features

- **Complete Anonymity**: Participants use pseudonyms, real identities are never shared
- **Encrypted Data**: All personal information is encrypted at rest
- **Random Matching**: Fair, unbiased algorithm pairs participants
- **Hospice Program**: Special option to write to elderly hospice residents
- **Open Source**: Fully transparent, community-driven development
- **Privacy First**: No tracking, minimal data collection, one-time address sharing

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Encryption**: Client-side encryption for sensitive data
- **Deployment**: Static hosting (Vercel, Netlify, etc.)

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo>
cd anonymous-letter-exchange
npm install
```

### 2. Set Up Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to the SQL Editor and run the schema from `supabase/schema.sql`
4. Copy your project URL and anon key from Settings > API

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ENCRYPTION_KEY=your-encryption-key-min-32-chars
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

## How It Works

### Registration
1. User chooses or receives a unique pseudonym
2. User provides email and mailing address (encrypted)
3. Data is stored securely in Supabase

### Matching Process
1. Admin monitors participant count
2. When enough participants register, admin generates matches
3. System creates random pairs (no self-matches)
4. Each participant receives exactly one assignment

### Email Notifications
1. System sends email to each writer
2. Email contains recipient's pseudonym and decrypted address
3. Writer's real identity remains hidden

### Letter Writing
1. Writer composes handwritten letter
2. Signs with pseudonym only
3. Mails to provided address (no return address needed)

## Security Model

### Data Encryption
- Names and addresses are encrypted before storage
- Encryption key is environment-specific
- Database only stores ciphertext

### Access Control
- Row Level Security (RLS) policies restrict data access
- Service role for admin operations
- Anonymous users can only register, not read data

### Privacy Guarantees
- Pseudonymization breaks direct identity linkage
- One-time address sharing minimizes exposure
- No persistent session tracking
- No third-party analytics

## Admin Dashboard

Access the admin panel at `/admin` (from footer link).

Default password: `letter-exchange-2024`

**Change this in production!**

### Admin Features
- View participant statistics
- See unmatched participants count
- Generate random matches
- Send notification emails
- Manage hospice recipients
- Clear all data (for new rounds)

## Customization

### Adding Hospice Recipients

You can pre-register hospice recipients:

1. Use the registration form
2. Check "This is a hospice/recipient address"
3. Enter facility name
4. These participants will be marked specially

### Customizing Pseudonyms

Edit `src/lib/supabase.ts`:

```typescript
const adjectives = ['Your', 'Custom', 'Words'];
const nouns = ['Choices', 'Here'];
```

### Email Templates

Edit `src/lib/matching.ts`:

```typescript
export function generateMatchEmail(...) {
  // Customize subject and body
}
```

## Deployment

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Netlify

1. Push to GitHub
2. Connect repository in Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables
5. Deploy

### Self-Hosted

```bash
npm run build
# Serve the `dist` folder with any static file server
```

## Email Configuration

For production, set up an email service:

### Option 1: Supabase Edge Functions

Create a Supabase Edge Function to send emails using:
- Resend
- SendGrid
- AWS SES

### Option 2: External Service

Use a webhook to trigger emails from your preferred service.

### Option 3: Manual (Current)

The current implementation marks emails as "sent" in the database. 
You can export the match data and send emails manually.

## Database Schema

### participants
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| pseudonym | TEXT | Unique anonymous identifier |
| email | TEXT | For notifications |
| name_encrypted | TEXT | Encrypted real name |
| address_encrypted | TEXT | Encrypted street address |
| city_encrypted | TEXT | Encrypted city |
| postal_code_encrypted | TEXT | Encrypted postal code |
| country_encrypted | TEXT | Encrypted country |
| is_hospice | BOOLEAN | If this is a hospice recipient |
| hospice_name | TEXT | Facility name |
| matched | BOOLEAN | If participant has been matched |
| matched_to | UUID | Reference to assigned recipient |

### matches
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| sender_id | UUID | Who writes the letter |
| receiver_id | UUID | Who receives the letter |
| sender_pseudonym | TEXT | Writer's pseudonym |
| receiver_pseudonym | TEXT | Recipient's pseudonym |
| emails_sent | BOOLEAN | If notification was sent |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use, modify, and distribute.

## Support

For questions, issues, or feature requests:
- Open an issue on GitHub
- Contact the project maintainer

---

**Privacy Note**: This application is designed with privacy as the primary concern. 
All data handling follows the principle of minimal collection and maximal protection.
