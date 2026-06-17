# eSports Store — Project Blueprint

An online shop for gaming gear and team merch. Think Logitech mice, Wooting keyboards, Team Liquid jerseys — all in a dark, neon-styled store that actually works end to end.

**What we're building with:** React (frontend) · Node.js + Express (backend) · MongoDB (database)

**What this project proves you can do:** React, Node.js, REST APIs, JWT login, and a site that looks good on phone and desktop.

---

## What the app does

A visitor can browse products, filter by game or category, add stuff to a cart, create an account, and check out. Logged-in users can see their order history on a profile page.

**Product categories:** mice, keyboards, headsets, jerseys, collectibles

**Example inventory:** Razer Viper, Wooting 60HE, HyperX Cloud III, FaZe hoodie, CS2 trophy replica

---

## How it fits together

```
Browser (React)  →  talks to  →  API (Express)  →  saves to  →  MongoDB
```

- **React** handles everything the user sees — pages, cart, login forms
- **Express** handles the logic — auth, products, orders
- **MongoDB** stores users, products, and orders

The frontend and backend live in two folders: `client/` and `server/`. The root `package.json` can run both at once with `npm run dev`.

For the step-by-step build order, see [`PARTS.md`](./PARTS.md). Build one part, commit, move on.

---

## Tech choices (and why)

**Frontend**
- **React + Vite** — fast setup, modern React
- **React Router** — different URLs for home, products, cart, etc.
- **Tailwind CSS** — responsive styling without writing tons of custom CSS
- **Context API** — keeps auth and cart state simple (no Redux needed here)
- **Axios** — sends API requests and attaches the login token automatically

**Backend**
- **Express** — standard Node.js API framework
- **Mongoose** — talks to MongoDB with clean schemas
- **JWT + bcrypt** — login without server-side sessions; passwords are hashed
- **express-validator** — catches bad form data before it hits the database

---

## Folder layout (the short version)

```
client/src/
  pages/        → Home, Products, Cart, Login, etc.
  components/   → Navbar, ProductCard, CartItem, etc.
  context/      → AuthContext, CartContext
  api/          → axios setup + API helper functions

server/src/
  models/       → User, Product, Order
  routes/       → auth, products, orders
  controllers/  → the actual logic for each route
  middleware/   → JWT check, error handling, validation
```

That's the shape. Exact files get added part by part — don't try to create everything on day one.

---

## The data we store

**Users** — name, email, hashed password, role (`user` or `admin`)

**Products** — name, price, description, images, category, game (Valorant, CS2, etc.), team, brand, stock, rating

**Orders** — who bought it, what they bought (name + price saved at checkout time), shipping address, total, status (`pending` → `shipped` → `delivered`)

When someone checks out, the server looks up real prices from the database. Never trust whatever the browser sends.

---

## The API

Base URL: `http://localhost:5000/api`

**Auth**
- `POST /auth/register` — sign up
- `POST /auth/login` — get a token back
- `GET /auth/me` — who's logged in (needs token)

**Products**
- `GET /products` — list with filters (category, game, search, price, sort)
- `GET /products/:slug` — one product
- `POST/PUT/DELETE /products` — admin only

**Orders**
- `POST /orders` — place an order (needs token)
- `GET /orders` — your order history (needs token)

**Health check:** `GET /api/health` — quick way to confirm the server is alive

All responses follow the same pattern: `{ success: true, data: ... }` or `{ success: false, message: "..." }`.

---

## Login flow (in plain English)

1. User logs in → server checks password → sends back a JWT token
2. Browser saves the token in `localStorage`
3. Every API call after that includes `Authorization: Bearer <token>`
4. Server middleware checks the token before allowing protected routes
5. On page load, if a token exists, call `/auth/me` to restore the session

Protected pages (checkout, profile) redirect to login if there's no valid token.

---

## Cart

Keep it simple: the cart lives in the browser (`localStorage` via `CartContext`). No login needed to add items.

On checkout, send the cart to the server. The server double-checks stock and prices, then creates the order.

---

## Pages & routes

| URL | What it is |
|-----|------------|
| `/` | Home — hero banner, featured products, category links |
| `/products` | Full catalog with filters |
| `/products/:slug` | Single product page |
| `/cart` | Cart |
| `/checkout` | Shipping form + place order (login required) |
| `/login` / `/register` | Auth |
| `/profile` | Account info + past orders (login required) |

---

## Look & feel

Dark gaming aesthetic — not a generic white ecommerce template.

**Colors:** near-black background (`#0a0a0f`), cyan accents (`#00f0ff`), purple gradients, neon green for sale badges

**Fonts:** Orbitron or Rajdhani for headings, Inter for body text

**Vibe:** neon glow on hover, sharp/angular card edges, badges like `PRO`, `LIMITED`, team names

Works on mobile first, then scales up to a 4-column product grid on wide screens.

---

## Environment variables

Copy the example files before running anything:

**`server/.env`** — `PORT`, `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`

**`client/.env`** — `VITE_API_URL=http://localhost:5000/api`

Never commit real `.env` files. The examples in `.env.example` are fine to commit.

---

## Security basics

- Hash passwords with bcrypt
- Keep `JWT_SECRET` in `.env` only
- Validate all incoming data on the server
- Rate-limit login/register so nobody brute-forces accounts
- Admin routes check `role === 'admin'`

---

## Build order

Don't build everything at once. [`PARTS.md`](./PARTS.md) breaks it into 16 small commits:

1. **Backend first** (Parts 1–5) — server, login, products, orders
2. **Frontend next** (Parts 6–14) — React app, pages, cart, checkout
3. **Polish last** (Parts 15–16) — theme tweaks, mobile pass, README

**Right now:** Parts 1–2 are done (server + auth). **Next:** Part 3 — Product model and seed data.

---

## Nice-to-haves (after the core app works)

Stripe payments, admin dashboard, user reviews, wishlist, image uploads, Docker setup, deploy to Vercel + Railway + MongoDB Atlas.

Skip these until the main store actually works.

---

*One part at a time. Commit when each part works. That's the whole strategy.*
