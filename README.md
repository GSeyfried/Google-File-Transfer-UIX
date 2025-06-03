# Google-File-Transfer-UIX

This project provides a simple Next.js dashboard to manage Google Drive file transfers. Portals map source folders to target folders, include a delete-original toggle, and a manual **Run Now** button. Selecting a portal's "View Source" option shows cached folder contents from the last run.

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file based on the example below and provide your Google OAuth credentials:

```bash
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```
