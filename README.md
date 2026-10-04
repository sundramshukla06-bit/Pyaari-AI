# Pyaari AI 💕

Ready-to-run Hindi/Hinglish AI companion web app.

## Requirements
- Node.js 18+
- An OpenAI API key

## Setup

1. Extract this folder.
2. Open terminal inside the folder.
3. Run:

```bash
npm install
```

4. Copy `.env.example` to `.env`.
5. Put your API key in `.env`:

```env
OPENAI_API_KEY=your_real_key
OPENAI_MODEL=gpt-6-luna
PORT=3000
```

6. Start:

```bash
npm start
```

7. Open:

http://localhost:3000

## Features
- Real AI replies through the OpenAI Responses API
- Hindi/Hinglish personality
- Typing animation
- Browser text-to-speech
- Chat history in localStorage
- Mobile-friendly UI
- API key stays on the server

## Important
Do NOT put the API key inside `public/index.html`.
Do NOT upload `.env` to GitHub.

If your API account does not have access to the configured model, change
`OPENAI_MODEL` in `.env` to a model available in your account.
