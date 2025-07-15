# 🧠 Nooria – Your AI Chat Companion

**Nooria** is a modern AI chatbot built with **Next.js (TypeScript)**, **Supabase**, and **Gemini AI**. It provides a clean, responsive interface for chatting with intelligent assistants, and is designed to grow into a powerful AI agent framework.

---

## 🚀 Tech Stack

| Layer      | Technology                        |
| ---------- | --------------------------------- |
| Frontend   | Next.js 14 (App Router, TS)       |
| Styling    | Tailwind CSS                      |
| Auth       | Supabase Auth                     |
| Database   | Supabase PostgreSQL               |
| AI Model   | Gemini Pro (Google Generative AI) |
| Deployment | Vercel                            |

---

## ✨ Features (MVP)

* 🔐 User Authentication (email/password)
* 💬 Gemini AI-powered chatbot
* 🗂 Chat history per user
* 🧠 System prompt customization
* 🌗 Dark mode support
* 🔧 Scalable and developer-friendly architecture

---

## 🧱 Project Structure

```bash
/app
  /chat         # Chat UI
  /login        # Login page
  /signup       # Signup page
  /api/chat     # Handles chat POST to Gemini
/components     # UI components (ChatUI, Sidebar, etc)
/lib            # Supabase and Gemini config helpers
/types          # Shared types
/utils          # Utility functions (e.g. tokenizer)
```

---

## 🛠 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/nooria.git
cd nooria
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
GOOGLE_API_KEY=your-gemini-api-key
```

### 4. Run the App

```bash
npm run dev
```

---

## 🔮 Roadmap

### Phase 1 (Now)

* [x] Gemini Chatbot Integration
* [x] Supabase Auth + User Sessions
* [x] Save chat history per user
* [x] Clean, mobile-friendly UI

### Phase 2 (Next)

* [ ] Create and manage custom AI agents
* [ ] Add tool usage (search, file reading)
* [ ] Stripe billing integration
* [ ] API access for user agents

---

## 📄 License

MIT

---

## 👤 Author

**Akanbi AbdulAzeez** – [@Harziz712]((https://github.com/Harziz712))

Have questions or ideas? Feel free to open an issue or contribute!
