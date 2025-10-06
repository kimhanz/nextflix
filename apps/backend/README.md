# Nextflix — Backend (NestJS + Swagger + TMDB)

Backend ของ “Nextflix” ทำหน้าที่เป็น API Gateway เรียกข้อมูลจาก TMDB → Normalize/Transform → ให้ Frontend ใช้งาน

## Link

- Production API:: https://<your-backend-on-render>h.onrender.com
- Swagger Docs: https://<your-backend-on-render>.com/api

## Features
#### Endpoints
- GET /movies?page=1 — รายการหนัง (popular)
- GET /movies/search?q=...&page=1 — ค้นหาหนัง
- GET /movies/:id — รายละเอียดหนัง (รวม backdrop/poster/overview/rating)
#### Swagger (OpenAPI): พร้อม “Try it out”
#### Error Handling: แปลง upstream error เป็น 5xx ที่เหมาะสม
#### CORS: เปิดเฉพาะ origin ของ Frontend (Vercel) ใน main.ts

## Project Structure

```
apps/backend
├─ src/
│  ├─ app.module.ts
│  ├─ main.ts
│  ├─ config/
│  │  └─ swagger.ts
│  ├─ movie/
│  │  ├─ movie.module.ts
│  │  ├─ movie.controller.ts
│  │  ├─ movie.service.ts
│  │  ├─ movie.mapper.ts
│  │  └─ dtos/
│  │     ├─ movie-list.dto.ts     # list item schema
│  │     ├─ movie.dto.ts          # movie schema
│  │     └─ movie-detail.dto.ts   # detail schema
│  └─ common/...
├─ package.json
└─ tsconfig.json
```

## ติดตั้ง & รัน (Local)

ต้องมี Node.js 18+

```
cd apps/backend
npm install

/* สร้างไฟล์ env */
cp .env.example .env
```

แก้ไข .env (ตัวอย่าง):

```
// Server
PORT=3001

// Swagger
SWAGGER_PATH=/api/docs

// CORS
CORS_ORIGIN=https://<your-frontend-on-vercel>.vercel.app

// TMDB
TMDB_API_BASE_URL=https://api.themoviedb.org/3
TMDB_API_KEY=<YOUR_TMDB_READ_ACCESS_TOKEN_BEARER>
```
สำคัญ: TMDB_API_KEY คือ API Read Access Token (v4 auth) (รูปแบบ Bearer) จาก TMDB


รัน dev

```
npm run start:dev
# เปิด http://localhost:3001
# Swagger: http://localhost:3001/api
```

Build + start

```
npm run build
npm run start:prod
```

## การตั้งค่า Swagger & CORS

src/main.ts (สรุปแนวทางที่เข้ากันกับ Deploy)
```
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule, { cors: true });

  // CORS (ตั้งตาม .env)
  const origin = process.env.CORS_ORIGIN?.split(',').map(s => s.trim()) ?? ['*'];
  app.enableCors({
    origin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
```
src/config/swagger.ts
```
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Nextflix API')
    .setDescription('API gateway for movie data (TMDB → normalized)')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const path = process.env.SWAGGER_PATH || '/api/docs';
  SwaggerModule.setup(path.replace(/^\//, ''), app, document);
}
```

## Deploy (Render)

1. Create new Web Service → Connect GitHub repo
2. Root Directory: apps/backend
3. Build & Start (Render Dashboard)
   - Build Command: npm install && npm run build
   - Start Command: npm run start:prod
4. Environment Variables
   - PORT=10000 (Render set automatically; ใน Nest ใช้ process.env.PORT)
	 - SWAGGER_PATH=/api/docs
   - CORS_ORIGIN=https://<your-frontend-on-vercel>.vercel.app
	 -	TMDB_API_BASE_URL=https://api.themoviedb.org/3
	 -	TMDB_API_KEY=<YOUR_TMDB_READ_ACCESS_TOKEN_BEARER>

เสร็จแล้วจะได้ URL ประมาณ https://<service-name>.onrender.com
ทดสอบ: GET /movies และเปิด Swagger ที่ /api/docs


## สถาปัตยกรรม (ฝั่ง Backend)

```
graph TD
  FE[Frontend] --> BE[Nextflix NestJS API]
  BE -->|popular/search/detail| TMDB[(TMDB API)]
  BE -->|map/normalize| DTOs[Movie DTOs (List/Detail)]
```

- Controller: รับ HTTP + validate params
- Service: เรียก TMDB + รวมข้อมูลที่จำเป็น (popular/detail/search)
- Mapper: แปลงรูปแบบ TMDB → DTO กลาง (id/title/poster/backdrop/overview/releaseDate/rating)
- DTO: สัญญาโครงสร้างข้อมูลให้ Frontend ใช้งานสะดวก

## รายการ Endpoint (ตัวอย่าง)

#### GET /movies?page=1
##### Response
```
{
  "items": [
    {
      "id": 550,
      "title": "Fight Club",
      "poster": "https://image.tmdb.org/t/p/w342/abc.jpg",
      "backdrop": "https://image.tmdb.org/t/p/w780/xyz.jpg",
      "overview": "A ticking-time-bomb insomniac...",
      "releaseDate": "1999-10-15",
      "rating": 8.4
    }
  ],
  "page": 1,
  "totalPages": 500
}
```

#### GET /movies/:id
##### Response (ย่อ)
```
{
  "id": 550,
  "title": "Fight Club",
  "poster": "https://image.tmdb.org/t/p/w500/abc.jpg",
  "backdrop": "https://image.tmdb.org/t/p/original/xyz.jpg",
  "overview": "...",
  "releaseDate": "1999-10-15",
  "rating": 8.4
}
```

## Troubleshooting

- 500 Internal Server Error / Upstream error
→ ตรวจ .env โดยเฉพาะ TMDB_API_KEY (ต้องเป็น Read Access Token (v4) ขึ้นต้นด้วย Bearer) และ TMDB_API_BASE_URL=https://api.themoviedb.org/3
- CORS blocked
→ ตรวจ CORS_ORIGIN ให้รวมโดเมนของ Vercel ที่ถูกต้อง
- Swagger 404
→ ตรวจ SWAGGER_PATH และ path ที่ตั้งใน setupSwagger(app) ให้ตรงกัน (เช่น /api/docs)
