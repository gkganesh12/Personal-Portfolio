# AI Summit

The AI race in one page, by Ganesh Khetawat. Live at
https://ganeshkhetawat.tech/new/ and refreshed every Saturday at 9:00 AM IST
by a Claude Code routine.

- `src/edition.js` holds all the news (edition labels, topics, stats, race
  lanes, watch list). The weekly refresh rewrites only this file and logs its
  sources in `editions/`.
- `src/App.jsx` is the layout, the thank-you note and the "What's next" section.

## Build and deploy

```sh
npm ci
npm run build   # writes ../public/new (base path /new/)
```

Commit `ai-summit/` and `public/new/` and push `main`; Render rebuilds the
portfolio and serves the page at `/new/`.
