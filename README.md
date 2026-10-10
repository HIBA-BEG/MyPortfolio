# Hiba BEGHDI

Personal portfolio. English by default, French from the FR button.

## Run

```bash
npm install
npm run dev
```

## Contact form

Copy `.env.example` to `.env` and fill in the EmailJS ids. Restart `npm run dev` after that. The template variables have to be `{{name}}`, `{{email}}`, and `{{message}}`.

On a host, set those same three variables before the production build. Vite copies them in at build time, and `.env` is not committed.

## Build

```bash
npm run build
```
