# Gamification Reward Campaign Builder

A dynamic reward campaign builder built with React, Vite, Tailwind CSS, Redux Toolkit, and React Router.

## Features

- Create reward campaigns with multiple rules
- Config-driven reward events and reward types
- Custom staged dropdowns with save confirmation
- Dynamic field rendering from configuration
- Time-bound rewards with date ranges
- Business rules via `allowedRewards` in config (e.g. onboarding disables tier upgrades)
- Redux for campaign state; local state for UI interactions

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Project Structure

```
src/
 ├── app/           # Redux store
 ├── components/    # Reusable UI components
 ├── configs/       # Reward events & types configuration
 ├── features/      # Redux slices
 ├── hooks/         # Custom hooks (staged selection)
 ├── layouts/       # Page layouts
 ├── pages/         # Route pages
 ├── routes/        # React Router setup
 ├── styles/        # Additional styles (if needed)
 └── utils/         # Helpers & validation
```

## Deploy

Deploy to [Vercel](https://vercel.com) or Netlify by connecting your GitHub repository.
