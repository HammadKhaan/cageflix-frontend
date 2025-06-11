# 🎬 CageFlix - Collection of all movies and shows of Nicolas Cage

CageFlix is a dynamic, responsive movie explorer built with React and TypeScript. It fetches all Nicolas Cage's movie data and displays it in an engaging and cinematic UI. The app features a hero section, top picks, genre rows, and full-screen movie detail pages with animated transitions.

---

## 🚀 Features

- 🏆 **Hero Section**: Highlights the top-rated movie with IMDb score and metadata.
- 🎥 **Top Picks Carousel**: Horizontally scrollable movie posters.
- 📁 **Genre Rows**: Movies grouped by genre.
- 📄 **Movie Detail Page**: Dedicated full-screen view for each movie.
- 🔍 **Search Functionality**: Fuzzy search for partial/misspelled, genre and title based queries.
- 📱 **Responsive Design**: Works great on desktop and mobile.

---

## 🧰 Tech Stack

| Tool           | Reason for Use |
|----------------|----------------|
| **React**      | Component-based UI and interactivity |
| **TypeScript** | Type safety and better tooling support |
| **Tailwind CSS** | Utility-first styling and responsive design |
| **React Router** | SPA routing and navigation |
| **Fuse.js** | Lightweight fuzzy search library for client-side movie search functionality |
| **Heroicons**   | Clean and consistent icons |
| **Custom API** (Mock or actual) | Fetches movie and poster data |

---

## 🛠️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/cageflix-frontend.git
   cd cageflix-frontend

2. **Install dependencies**
   ```bash
   npm install

3. **Start the dev server**
   ```bash
   npm run dev

4. **Visit in browser**
    Open http://localhost:5173


## ⚠️ Known Issues
🔄 Some poster URLs may be unavailable from the backend or API and fall back to a placeholder.

💾 No persistent storage — app state resets on refresh.

🧠 No recommendation logic for related movies (yet).


## ✨ Future Enhancements
🔎 Dedicated search results page with filters and pagination.

👥 User authentication for watchlists and favorites.

📽️ Trailer embedding from YouTube or TMDB.

💡 Improve lazy loading and infinite scroll for better performance.