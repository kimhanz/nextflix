# Nextflix — Frontend (Next.js + TailwindCSS + TypeScript)

เว็บแอป “Nextflix” ฝั่ง Frontend พัฒนาโดย Next.js (App Router) + TailwindCSS + Zustand
เชื่อมต่อกับ Backend (NestJS) ผ่าน REST API และออกแบบตามแนวคิด Clean Architecture (Presentation แยกจาก Data)

## Link

- Production URL (Vercel): https://<your-frontend-on-vercel>.vercel.app
- Backend API Base: https://<your-backend-on-render>.onrender.com
- API Docs (Swagger): https://<your-backend-on-render>.onrender.com/api/docs

## Features

- หน้า Home: แสดงรายการภาพยนตร์แบบแถวเลื่อนแนวนอน (Horizontal row)
- Hero Section: หยิบหนังเด่นแบบสุ่มมาแสดงเป็นแบนเนอร์
- Movie Card Hover (Desktop): แสดง popup (portal + z-index fix) พร้อมปุ่ม action
- Movie Detail Page: /movies/[id] แสดงรายละเอียดจาก Backend
- State Management: ใช้ Zustand (จัดการ loading / error / empty)
- Skeleton Shimmer: แสดง loading state แบบ Netflix-style
- Global Data Flow: hook + store รวมศูนย์ (ใช้ MovieAPI layer)

## Project Structure

```
apps/frontend
├─ src/
│  ├─ app/
│  │  ├─ page.tsx                 // หน้า Home
│  │  └─ movies/[id]/page.tsx     // หน้า Movie Detail
│  ├─ components/
│  │  ├─ AccountMenu.tsx
│  │  ├─ Hero.tsx
│  │  ├─ MobileMenu.tsx
│  │  ├─ MovieGrid.tsx
│  │  ├─ MovieCard.tsx
│  │  ├─ Navbar.tsx
│  │  ├─ NavbarItem.tsx
│  │  ├─ Portal.tsx
│  │  └─ states/
│  │     ├─ LoadingState.tsx
│  │     ├─ ErrorState.tsx
│  │     └─ EmptyState.tsx
│  ├─ hooks/
│  │  ├─ useMovies.ts
│  │  ├─ useHeroMovie.ts
│  │  └─ useMovieDetail.ts
│  ├─ lib/
│  │  ├─ api.ts
│  │  └─ handleError.ts           // MovieAPI (fetch layer)
│  ├─ store/
│  │  └─ movies.ts                // Zustand store รวมศูนย์
│  ├─ types/
│  │   └─ movie.ts                 // DTO กลางจาก Backend
│  └─ styles/
│  │   └─ globals.css
├─ public/images/...
├─ tailwind.config.ts
├─ postcss.config.js
├─ tsconfig.json
├─ .eslintrc.js
└─ vercel.json                    # ค่าตัวอย่าง deploy Vercel
```

## ติดตั้ง & รัน (Local)

ต้องมี Node.js 18+

```
/* ที่ root monorepo */
cd apps/frontend
npm install

/* สร้างไฟล์ env ของ frontend */
cp .env.example .env.local
```

แก้ไข .env.local (ตัวอย่าง):

```
/* Backend API (สำคัญ) */
NEXT_PUBLIC_API_URL=https://backend-nextflix-qsxh.onrender.com
```

รัน dev

```
npm run dev
```

Build + start

```
npm run build
npm start
```

## เชื่อมต่อ Backend

Frontend เรียก API ผ่าน layer src/lib/api.ts และอิง NEXT_PUBLIC_API_URL เช่น endpoint ที่เรียก:

- GET ${NEXT_PUBLIC_API_URL}/movies?page=1
- GET ${NEXT_PUBLIC_API_URL}/movies/:id

อย่าลืมตั้งค่า CORS ที่ฝั่ง Backend ให้ allow origin ของ Vercel

## Deploy (Vercel)

1. เชื่อม GitHub repo → Import โปรเจกต์ใน Vercel
2. เลือก Framework = Next.js
3. Root Directory: apps/frontend
4. Environment Variables
   - NEXT_PUBLIC_API_URL = https://backend-nextflix-qsxh.onrender.com

ถ้าคุณใช้ vercel.json ใน apps/frontend ให้ตัวอย่างดังนี้ (optional):

```
{
  "version": 2,
  "builds": [{ "src": "package.json", "use": "@vercel/next" }],
  "env": {
    "NEXT_PUBLIC_API_URL": "https://<your-backend-on-render>.onrender.com"
  },
  "framework": "nextjs"
}
```

## สถาปัตยกรรม (ฝั่ง Frontend)

```
graph TD
  UI[Presentation: Next.js components/pages] --> Hooks[Hooks: useMovies/useHeroMovie/useMovieDetail]
  Hooks --> Store[Zustand Store]
  Hooks --> API[MovieAPI (fetch layer)]
  API --> Backend[(NestJS API)]
```

- Presentation: Hero, MovieGrid, MovieCard
- Hooks: ดึง/แปลงข้อมูล + คุม loading/error
- Store (Zustand): เก็บ state รวมศูนย์ (items/page/loading/error/hero)
- API Layer: เรียก backend ผ่าน MovieAPI
- Types: ใช้ src/types/movie.ts ที่ตรงกับ DTO จาก Backend

## สถานะการทำงาน (State)

- Loading: skeleton shimmer (หน้า Home + Hero + Detail)
- Error: แสดงข้อความจาก ErrorState
- Empty: แสดง “No movies found” (กรณี list ว่าง)

## Troubleshooting

- 500 Internal Server Error: เช็คว่า Backend ตั้งค่า .env ครบ (TMDB_API_KEY, TMDB_API_BASE_URL) และ deploy แล้ว
- รูปภาพไม่ขึ้น (undefined/...): ตรวจ backdrop/poster ที่ mapping จาก Backend
- CORS: Backend ต้อง allow origin ของ Vercel domain
