# Implementation Parts — Commit Roadmap

Build the eSports E-Commerce store **one part at a time**. Each part is a self-contained slice you can implement, test, and commit before moving on.

> **Rule of thumb:** One part ≈ one focused commit. If a part feels large, split it into `Part Xa` and `Part Xb` (noted below).

---

## Progress Tracker

| Part | Name | Status |
|------|------|--------|
| 0 | Project blueprint & root config | ✅ Done |
| 1 | Express server foundation | ✅ Done |
| 2 | User model & JWT auth API | ✅ Done |
| 3 | Product model & seed data | ⬜ |
| 4 | Product REST API | ⬜ |
| 5 | Order model & REST API | ⬜ |
| 6 | React client scaffold | ⬜ |
| 7 | App shell, routing & layout | ⬜ |
| 8 | API client & auth (frontend) | ⬜ |
| 9 | Home page & hero | ⬜ |
| 10 | Product listing & filters | ⬜ |
| 11 | Product detail page | ⬜ |
| 12 | Shopping cart | ⬜ |
| 13 | Checkout & place order | ⬜ |
| 14 | Profile & order history | ⬜ |
| 15 | E-sports theme polish | ⬜ |
| 16 | Responsive pass & README | ⬜ |

Update the status column as you complete each part.

---

## Part 0 — Project Blueprint & Root Config ✅

**Goal:** Establish the plan and monorepo scripts before any app code.

**Includes:**
- `BLUEPRINT.md` — architecture reference
- `PARTS.md` — this roadmap
- Root `package.json` with `concurrently` scripts
- `server/.env.example`, `client/.env.example`

**Suggested commit:**
```
docs: add project blueprint and phased implementation plan
```

**Verify:** Files exist; no runtime needed yet.

---

## Part 1 — Express Server Foundation

**Goal:** A running Node.js server that connects to MongoDB.

**Depends on:** Part 0

**Create:**
```
server/
├── package.json
└── src/
    ├── index.js          # Express app, middleware, listen
    ├── config/db.js      # Mongoose connect
    └── middleware/
        └── error.middleware.js
```

**Implement:**
- Express with `cors`, `helmet`, `express.json()`
- MongoDB connection via `MONGODB_URI`
- `GET /api/health` → `{ success: true, data: { status: "ok" } }`
- Centralized error handler (404 + 500)
- `npm run dev` with nodemon

**Suggested commit:**
```
feat(server): scaffold Express app with MongoDB connection and health endpoint
```

**Verify:**
```bash
cd server && cp .env.example .env && npm install && npm run dev
# GET http://localhost:5000/api/health → 200
```

---

## Part 2 — User Model & JWT Auth API

**Goal:** Register, login, and protected `/me` endpoint.

**Depends on:** Part 1

**Create:**
```
server/src/
├── models/User.js
├── controllers/auth.controller.js
├── routes/auth.routes.js
├── middleware/auth.middleware.js
└── middleware/validate.middleware.js
```

**Implement:**
- User schema (name, email, password hash, role)
- `POST /api/auth/register`
- `POST /api/auth/login` → `{ token, user }`
- `GET /api/auth/me` (JWT required)
- bcrypt password hashing, `jsonwebtoken` sign/verify
- `express-validator` on register/login bodies

**Suggested commit:**
```
feat(server): add User model and JWT authentication routes
```

**Verify:** Register a user, login, call `/me` with Bearer token via Postman/Thunder Client.

---

## Part 3 — Product Model & Seed Data

**Goal:** MongoDB product schema and 20+ e-sports sample products.

**Depends on:** Part 1 (Part 2 optional — seed doesn't need auth)

**Create:**
```
server/src/
├── models/Product.js
└── utils/seed.js
```

**Implement:**
- Product schema per `BLUEPRINT.md` (slug, category, game, team, brand, etc.)
- Seed script: mice, keyboards, headsets, jerseys, collectibles
- `npm run seed` script in `server/package.json`

**Suggested commit:**
```
feat(server): add Product model and e-sports seed data
```

**Verify:**
```bash
npm run seed
# Products visible in MongoDB Compass or mongosh
```

---

## Part 4 — Product REST API

**Goal:** Public product listing with filters and single-product lookup.

**Depends on:** Part 3

**Create:**
```
server/src/
├── controllers/product.controller.js
└── routes/product.routes.js
```

**Implement:**
- `GET /api/products` — pagination, `category`, `game`, `team`, `search`, `minPrice`, `maxPrice`, `sort`
- `GET /api/products/:slug`
- `POST /api/products` — admin only (use auth + role middleware)
- `PUT /api/products/:id` — admin only
- `DELETE /api/products/:id` — admin only

**Suggested commit:**
```
feat(server): add product REST API with filtering and admin CRUD
```

**Verify:** `GET /api/products?category=mouse&game=Valorant` returns filtered results.

---

## Part 5 — Order Model & REST API

**Goal:** Authenticated users can place and view orders.

**Depends on:** Part 2, Part 4

**Create:**
```
server/src/
├── models/Order.js
├── controllers/order.controller.js
└── routes/order.routes.js
```

**Implement:**
- Order schema with item snapshots and shipping address
- `POST /api/orders` — re-fetch product prices from DB (never trust client)
- `GET /api/orders` — current user's orders
- `GET /api/orders/:id` — owner or admin
- Stock decrement on order (basic)

**Suggested commit:**
```
feat(server): add Order model and order placement API
```

**Verify:** Login → POST order with cart items → GET order history.

---

## Part 6 — React Client Scaffold

**Goal:** Vite + React + Tailwind running on port 5173.

**Depends on:** Part 0

**Create:**
```
client/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── src/
    ├── main.jsx
    ├── App.jsx
    └── index.css      # Tailwind directives
```

**Implement:**
- Vite React template
- Tailwind with e-sports color tokens in `tailwind.config.js` (from blueprint)
- Google Fonts: Orbitron + Inter
- Proxy or env `VITE_API_URL` pointing to `localhost:5000/api`

**Suggested commit:**
```
feat(client): scaffold React app with Vite and Tailwind CSS
```

**Verify:**
```bash
cd client && cp .env.example .env && npm install && npm run dev
# App loads at http://localhost:5173
```

---

## Part 7 — App Shell, Routing & Layout

**Goal:** Navigable SPA with navbar and footer — no real data yet.

**Depends on:** Part 6

**Create:**
```
client/src/
├── components/layout/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── Layout.jsx
└── pages/
    ├── Home.jsx          # placeholder
    ├── Products.jsx      # placeholder
    ├── Cart.jsx          # placeholder
    ├── Login.jsx         # placeholder
    └── Register.jsx      # placeholder
```

**Implement:**
- React Router v6 routes in `App.jsx`
- Navbar: logo, links, cart icon (badge = 0), auth links
- Footer: simple links + copyright
- Dark background shell matching theme

**Suggested commit:**
```
feat(client): add React Router, layout components, and page placeholders
```

**Verify:** Click nav links; each route renders its placeholder.

---

## Part 8 — API Client & Auth (Frontend)

**Goal:** Users can register, login, and stay logged in across refresh.

**Depends on:** Part 2, Part 7

**Create:**
```
client/src/
├── api/
│   ├── axios.js          # instance + JWT interceptor
│   └── auth.js           # login, register, getMe
├── context/AuthContext.jsx
├── components/auth/
│   ├── LoginForm.jsx
│   └── RegisterForm.jsx
└── components/ProtectedRoute.jsx
```

**Implement:**
- Axios attaches `Authorization: Bearer` from `localStorage`
- `AuthContext`: login, logout, register, bootstrap from token
- Wire Login and Register pages
- `ProtectedRoute` wrapper for later checkout/profile

**Suggested commit:**
```
feat(client): add AuthContext, API client, and login/register pages
```

**Verify:** Register → login → refresh page → still logged in → logout works.

---

## Part 9 — Home Page & Hero

**Goal:** Landing page that sells the e-sports brand.

**Depends on:** Part 7 (Part 4 needed for featured products — can use static placeholders first)

**Create:**
```
client/src/components/
├── home/Hero.jsx
├── home/CategoryGrid.jsx
└── home/FeaturedProducts.jsx
```

**Implement:**
- Full-width hero with gradient/neon CTA → `/products`
- Category cards: Mice, Keyboards, Headsets, Jerseys, Collectibles
- Featured products section (fetch `GET /products?featured=true` or first 4)

**Suggested commit:**
```
feat(client): build home page with hero, categories, and featured products
```

**Verify:** Home looks themed; featured products load from API (server running).

---

## Part 10 — Product Listing & Filters

**Goal:** Browse and filter the full catalog.

**Depends on:** Part 4, Part 7

**Create:**
```
client/src/
├── components/products/
│   ├── ProductCard.jsx
│   ├── ProductGrid.jsx
│   └── ProductFilters.jsx
└── hooks/useProducts.js
```

**Implement:**
- Products page: grid of `ProductCard`
- Filters: category, game, team, price range, sort, search
- URL query params sync with filters (shareable links)
- Loading and empty states

**Suggested commit:**
```
feat(client): add product listing page with search and filters
```

**Verify:** Filter by category/game; grid updates; pagination works.

---

## Part 11 — Product Detail Page

**Goal:** Single product view with add-to-cart.

**Depends on:** Part 10

**Create:**
```
client/src/pages/ProductDetail.jsx
client/src/components/products/ProductGallery.jsx
```

**Implement:**
- Route `/products/:slug`
- Image gallery, name, price, rating, description, stock badge
- Quantity selector + "Add to Cart" button (wired in Part 12 — can stub `onClick` now)
- Breadcrumb back to listing

**Suggested commit:**
```
feat(client): add product detail page with gallery and specs
```

**Verify:** Click product card → detail page loads correct product.

---

## Part 12 — Shopping Cart

**Goal:** Client-side cart with persistence.

**Depends on:** Part 11

**Create:**
```
client/src/
├── context/CartContext.jsx
└── components/cart/
    ├── CartItem.jsx
    ├── CartSummary.jsx
    └── CartDrawer.jsx    # optional mobile slide-over
```

**Implement:**
- `CartContext` + `localStorage` persistence
- Add/remove/update quantity
- Cart page with line items and subtotal
- Navbar cart badge shows item count
- Wire "Add to Cart" on ProductDetail and ProductCard

**Suggested commit:**
```
feat(client): add CartContext with persistent cart and cart page
```

**Verify:** Add items → refresh → cart persists → badge updates.

---

## Part 13 — Checkout & Place Order

**Goal:** Complete purchase flow (mock payment).

**Depends on:** Part 5, Part 8, Part 12

**Create:**
```
client/src/pages/Checkout.jsx
client/src/api/orders.js
```

**Implement:**
- Protected `/checkout` route
- Shipping address form
- Order summary from cart
- `POST /api/orders` on submit
- Success screen; clear cart on success

**Suggested commit:**
```
feat(client): add checkout flow with order placement
```

**Verify:** Login → cart with items → checkout → order created in DB.

---

## Part 14 — Profile & Order History

**Goal:** User account page with past orders.

**Depends on:** Part 5, Part 8

**Create:**
```
client/src/
├── pages/Profile.jsx
└── components/orders/OrderCard.jsx
```

**Implement:**
- Protected `/profile` route
- Display user name/email
- List orders from `GET /api/orders`
- Order card: date, status, items, total

**Suggested commit:**
```
feat(client): add profile page with order history
```

**Verify:** Place an order → see it on profile page.

---

## Part 15 — E-Sports Theme Polish

**Goal:** Make it look like a real gaming store, not a generic template.

**Depends on:** Parts 7–14 (visual pass over existing UI)

**Touch:**
- Global neon hover effects, angular card corners
- Product badges: `PRO`, `LIMITED`, team names
- Loading spinners, toast notifications (e.g. `react-hot-toast`)
- 404 page, empty cart state, out-of-stock styling
- Reusable `Button`, `Badge`, `Spinner` in `components/ui/`

**Suggested commit:**
```
style(client): apply e-sports theme polish and shared UI components
```

**Verify:** Visual consistency across all pages; hover/glow effects work.

---

## Part 16 — Responsive Pass & README

**Goal:** Mobile/tablet/desktop QA and project documentation.

**Depends on:** All previous parts

**Implement:**
- Mobile hamburger nav
- 1-col → 4-col product grid at breakpoints
- Sticky "Add to Cart" bar on mobile product detail
- Collapsible filters on small screens
- Root `README.md`: setup, env vars, scripts, screenshots

**Suggested commit:**
```
docs: add README and finalize responsive layout across breakpoints
```

**Verify:** Test at 375px, 768px, 1280px widths; README instructions work on fresh clone.

---

## Suggested Branch Strategy (Optional)

| Branch | Parts |
|--------|-------|
| `main` | Stable, merged parts only |
| `part-01-server-foundation` | Part 1 |
| `part-02-auth-api` | Part 2 |
| … | one branch per part |

Merge each part branch into `main` after verification. Keeps history clean and reviewable.

---

## Commit Message Convention

```
feat(server): ...
feat(client): ...
docs: ...
style(client): ...
fix(server): ...
```

Use `server` or `client` scope so commits are easy to scan in `git log`.

---

## Quick Reference: Backend vs Frontend Order

```
BACKEND FIRST (Parts 1–5)          FRONTEND SECOND (Parts 6–14)        POLISH (15–16)
─────────────────────────          ─────────────────────────────        ──────────────
1. Express + MongoDB               6. Vite + Tailwind                   15. Theme
2. Auth API                        7. Layout + routes                   16. Responsive + README
3. Product model + seed            8. Auth UI
4. Product API                     9. Home
5. Order API                       10. Product listing
                                   11. Product detail
                                   12. Cart
                                   13. Checkout
                                   14. Profile
```

Backend parts can be committed over several days/sessions before starting the React client. The frontend parts (6–8) only need the server running for auth; parts 9–11 need the product API; parts 13–14 need the order API.

---

## What to Do Next

**Parts 1–2 are done.** Say *"implement Part 3"* when you're ready for the Product model and e-sports seed data.
