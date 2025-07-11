# 🧠 Swipe Savvy Freemium Assessment

A full-stack business onboarding experience built as part of a hiring assessment using **Next.js**, **PostgreSQL**, **Prisma**, and **Tailwind CSS**.

---

## 🚀 Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (hosted on [Neon.tech](https://neon.tech))
- **ORM**: Prisma
- **Payments**: Stripe (test environment)
- **Places Autocomplete**: Google Places API

---

## 🌟 Features

### 🔹 Hero Section (Step 1)
- Google Places autocomplete input
- Background blur + call-to-action UI
- Client testimonials (scrolling bar)

### 🔹 Business Verification (Step 2)
- Matches user entry with business name and phone
- Displays confirmation UI with business card
- Stores selection in `localStorage`

### 🔹 Create Account (Step 3)
- Full Name, Email, Phone, Website form
- Database update for the lead via Prisma
- Checkbox to confirm business ownership

### 🔹 Free Plan Confirmation (Step 4)
- Shows Free Plan features
- Upgrade card with Stripe checkout
- Confetti animation after payment success

### 🔹 Premium Plan Celebration
- Visual confirmation for paid users
- Returns to homepage after celebration

---

## 🛠 Setup Instructions

### 1. Clone this Repo
```bash
git clone https://github.com/John27052001/swipe-savvy.git
cd swipe-savvy
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file:
```env
DATABASE_URL="postgresql://neondb_owner:npg_9dz1DvKumtHN@ep-soft-tree-adi1x2as-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
STRIPE_SECRET_KEY="sk_test_51Rj8l2FMqUB3TLQjq9LNx7alRVZI277dbJL9WaGJsPAEMIROjcWyrpWNdD6pGlGy3omTZrejDsYa7Sksbzv9NlFa00LW4g5Eh3"
STRIPE_PRICE_ID="price_1Rj8syFMqUB3TLQjf7AY6cXz"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your_google_maps_key"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 4. Run Prisma Migrations
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Start Local Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 🎥 Video Walkthrough
Coming soon...

---

## 📁 Folder Structure
```
├── app/
│   ├── api/
│   │   ├── leads/route.ts
│   │   └── checkout/route.ts
│   ├── verify/page.tsx
│   ├── create-account/page.tsx
│   ├── success/page.tsx
│   └── terms/page.tsx
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
├── components/
├── .env.local
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

---

## 🧪 Notes
- Stripe is in **test mode**
- Google Maps API is restricted to Places
- Deployment-ready with Vercel if needed

---

## 👩‍💻 Author
**Megha John**  
Email: meghajohnbabu@gmail.com  
GitHub: [@John27052001](https://github.com/John27052001)

---

> Made with ❤️ for the Swipe Savvy assessment
