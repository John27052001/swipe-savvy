🚀 Swipe Savvy - Freemium Business Listing
A full-stack, multi-step landing page with smart lead capture, Google Places autocomplete, Stripe upgrade flow, and PostgreSQL storage — built with Next.js 15 App Router, Prisma, Neon, and Tailwind CSS.

📆 Completed on: July 10, 2025
🧑‍💻 Built by: Megha John


🧠 Features
✅ Hero Search: Business lookup (mocked or Google Places API)

✅ Multi-Step Flow:

Step 1: Business search

Step 2: Confirmation card

Step 3: Create Account (name, email, phone, website)

Step 4: Terms + Upgrade options

✅ Stripe Checkout (post-trial freemium conversion)

✅ Lead Capture: All user input stored in PostgreSQL via Neon

✅ Confetti Celebration 🎉

✅ Responsive + Animated UI with Tailwind + Framer Motion

🛠 Tech Stack
Frontend	Backend/API	Database	Auth / Payments
Next.js 15 App Router	API Routes (Node.js)	PostgreSQL via Neon	Stripe Checkout
Tailwind CSS	Prisma ORM	Prisma Schema	(Optional: Supabase)
Framer Motion	TypeScript	Neon Dashboard	

🗂 Folder Structure
pgsql
Copy
Edit
app/
  ├─ api/leads         → lead creation & updates
  ├─ api/checkout      → Stripe checkout session
  ├─ verify            → confirm business page
  ├─ create-account    → form to collect user info
  ├─ success           → upgrade celebration page
  └─ terms             → TOS & opt-in upgrade
💾 Database Schema
prisma
Copy
Edit
model Lead {
  id        String   @id @default(uuid())
  business  String
  phone     String?
  upgraded  Boolean  @default(false)
  fullName  String?
  email     String?
  website   String?
  createdAt DateTime @default(now())
}
⚙️ Setup & Development
bash
Copy
Edit
git clone https://github.com/John27052001/swipe-savvy.git
cd swipe-savvy

# Install dependencies
npm install

# Add your environment variables
touch .env.local
Required .env.local
ini
Copy
Edit
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
Then run locally:
bash
Copy
Edit
npx prisma generate
npx prisma migrate dev --name init
npm run dev
🧪 Test Stripe
Use Stripe test card:
4242 4242 4242 4242 — Exp: 12/34 — CVC: 123

📌 Deployment
Frontend + API hosted on Vercel

Database hosted on Neon

Stripe integrated securely in server API route

🙌 Acknowledgments
Inspired by real-world SaaS upgrade flows like Square, ToastTab, and Yelp.

💬 Contact
Megha John
