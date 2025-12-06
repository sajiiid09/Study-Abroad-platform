# Study-Abroad-platform

## Tech Stack Overview

### Backend

* Node.js + Express.js
* MongoDB + **Mongoose** (active ORM)
* JWT Authentication
* Runs on [http://localhost:5000](http://localhost:5000)

### Frontend

* React / Next.js-like custom frontend (runs with `npm run dev`)
* Runs on [http://localhost:8080](http://localhost:8080)

### Local Development

```
cd backend
npm install
npm run dev   # backend runs on port 5000

cd frontend
npm install
npm run dev   # frontend runs on port 8080
```

> Note: Prisma references are legacy (not used). **Mongoose is the active ORM.**
