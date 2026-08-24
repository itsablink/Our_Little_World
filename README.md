# Our Little World 💌

A private memory world + relationship quiz gate. Login → 3-question memory
check → the main site (years, events, a leveled quiz game).

## What's already built

- Login screen (glass card, floating pixel hearts, animated background, idle cat illustration)
- Server-side session, gated with your real ID/password from env vars
- 3-question memory gate, randomly picked from the full question bank
- **Photos** — real Google Drive links wired in for all 5 categories (Trips,
  Birthdays, College, Dates, Random Special's) and all their nested
  events/sub-folders. Year Wise (2023–2026) is *derived* from that same data
  — nothing is duplicated. Clicking any event opens its actual Drive folder.
- **Quiz** — 5 levels × 10 questions each (50 total), 5 randomly picked per level
  per attempt, independently shuffled, nothing removed between attempts
- **Diary** — create, edit, and delete entries (date, heading, body — all
  required), delete asks for confirmation first, shown newest-first, starts
  completely empty
- **Letters** — Handwritten Letters links out to your real Drive Letters
  folder (scales automatically as you add more — nothing assumes there's
  only one letter); Messages lets you save curated "message memories" by
  uploading screenshots (title required, date/author optional), viewed in a
  lightbox with prev/next
- **Today in Our Story** — homepage feature that randomly surfaces literally
  anything: a photo/event folder, a diary entry, a letter, or a message
  memory — every source has equal odds, nothing is hardcoded or prioritized
- A persistent nav (📸 Photos · 🎮 Quiz · 📖 Diary · 💌 Letters) on every page
- The homepage closes with your anniversary message, and "Scroll down" is a
  pure in-page anchor (never leaves the site)
- Everything styled in the pink · cream · lavender glass palette

## How Photos + Year Wise work together

`data/events.json` is the single source of truth: a tree of categories →
(optional nested groups, like "Neha's bday") → dated leaf events, each with
its own Drive link. `lib/photoIndex.js` walks that same tree two ways:

- **Category view** (`/photos/category/[id]`) — shows the tree as-is
- **Year Wise view** (`/photos/year/[year]`) — regroups the exact same leaf
  events by year instead of by category

Nothing is stored twice. Adding a new event is one entry in `events.json`
and it shows up correctly in both views automatically.

## How Diary and Messages save data

Same reasoning as before: Vercel's serverless functions have no writable,
persistent filesystem, so nothing can be saved to a JSON file on the server
at runtime. Both Diary entries and Message-memory screenshots are saved in
the browser's `localStorage` — `lib/diaryStore.js` and `lib/messageStore.js`
isolate that logic so either can be swapped for a real database later
without touching any UI component.

**Worth knowing about Messages specifically:** screenshots are stored as
base64 text inside localStorage, which typically caps around 5–10MB per
browser. That's plenty for a curated handful of meaningful screenshots (which
is what this section is for), but if you ever want to store dozens of
high-resolution images, that's the point to swap in real file storage
(Vercel Blob, S3, Cloudinary, etc.) — again, only `messageStore.js` would
need to change.

Both localStorage stores are per-browser: clearing site data or switching
browsers/devices loses what's saved there.

## What's still placeholder — fill these in later

1. **Individual handwritten letters** — `data/letters.json` is empty by
   default, so the Letters page just links out to your real Drive folder.
   If you ever want individual letters to render as their own clickable
   cards with a lightbox viewer (nicer than just linking the whole folder),
   add entries like:
   ```json
   { "id": "letter-001", "title": "Our First Letter", "date": "2024-02-14",
     "imageUrl": "https://...", "description": "optional" }
   ```
2. **Diary** — nothing to configure; the "+ Write your first entry" button
   on `/diary` handles everything, including edit and delete.
3. **Messages** — nothing to configure; use "+ Save a Memory" on the
   Messages tab in `/letters` to upload screenshots.
4. **Your credentials** are already set in `.env.local` (not committed to
   git): ID `Dudee>`, password `28082022`. Change them there any time.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it'll redirect you to `/login` automatically.

## Deploy to Vercel

1. Push this folder to a **private** GitHub repo (don't make it public — the
   quiz answers and album links live in the repo).
2. Go to vercel.com → New Project → import that repo.
3. Before the first deploy, add environment variables in the Vercel project
   settings (Settings → Environment Variables):
   - `LOGIN_ID` = `Dudee>`
   - `LOGIN_PASSWORD` = `28082022`
   - `SESSION_SECRET` = any long random string (this signs the session
     cookie — pick something only you know)
4. Deploy. You'll get a `your-project.vercel.app` URL.
5. Later: Vercel → Settings → Domains, to attach a custom domain.

## Notes on privacy

- The site itself is behind your login + the 3-question gate.
- Google Photos album links are "anyone with the link" — the doc's own
  security model flags this: **don't post those links anywhere public**,
  since the website is private but an individual album link isn't.
- Keep the GitHub repo private, since `data/*.json` will eventually contain
  your real answers and album links.

## Folder structure

```
app/
  login/                    → login page
  challenge/                → 3-question gate
  home/                     → main memory world (Photos, Today in Our Story, CTAs)
  quiz/                     → 5-level quiz game
  diary/                    → diary section
  letters/                  → handwritten letters + message memories
  photos/category/[id]/     → one category's nested events, real Drive links
  photos/year/[year]/       → same events, regrouped by year
  api/auth/                 → login / gate / logout routes
components/      → all UI pieces (Diary*, Letter*, Message*, Year/EventCard, etc.)
data/            → albums.json, events.json (the real Drive tree), questions.json,
                   diary.json, letters.json, driveRoot.json  ← edit these
lib/             → session, answer-checking, question-bank, photo-index,
                   diary-storage, and message-storage helpers
```

## Next up (not built yet, per the original roadmap)

- Phase 6: extra visual polish pass (more GIF/pixel-art flourishes)
- Phase 7: real content once you send it over
- A tiny admin view instead of hand-editing the JSON files (optional —
  the JSON files work fine on their own for a project this size)
