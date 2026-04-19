# DMO bot

`DMO bot` is a fresh standalone Node.js project for a WhatsApp chatbot that serves the District Disaster Management Authority menu in Marathi.

## What this starter already does

- Creates a WhatsApp webhook endpoint at `/webhook`
- Verifies the Meta webhook subscription request
- Receives incoming WhatsApp text messages
- Sends the main menu when the user sends `0`, `hi`, `hello`, or `menu`
- Sends a reply for options `1` to `9`
- Keeps a simple in-memory session for each mobile number

## Project structure

- `src/server.js` : Express server and webhook routes
- `src/bot.js` : menu routing logic
- `src/content.js` : Marathi menu and reply messages
- `src/sessionStore.js` : in-memory session storage
- `src/whatsapp.js` : outbound message sender for WhatsApp Cloud API
- `.env.example` : environment variables template

## Quick start

1. Open terminal in `DMO-bot`
2. Run `npm install`
3. Copy `.env.example` to `.env`
4. Fill these values from Meta WhatsApp Cloud API:
   - `WHATSAPP_VERIFY_TOKEN`
   - `WHATSAPP_ACCESS_TOKEN`
   - `WHATSAPP_PHONE_NUMBER_ID`
5. Start the app:

```bash
npm run dev
```

6. Expose your local server with a public HTTPS URL using a tunnel like ngrok or Cloudflare Tunnel
7. In Meta App Dashboard, set webhook URL to:

```text
https://your-public-domain.com/webhook
```

8. Use the same value from `.env` as the verify token in Meta dashboard
9. Subscribe to WhatsApp `messages` webhook events

## How the menu flow works

- User sends `hi`
- Bot returns the Marathi main menu
- User replies `1`
- Bot returns rainfall information text
- User replies `0`
- Bot returns main menu again

## Important production notes

- Current session storage is in memory only
- If the server restarts, chat session data will be lost
- For production, replace `src/sessionStore.js` with MySQL, PostgreSQL, Redis, or MongoDB
- Replace static sample replies with live district data from APIs, Excel imports, or admin panel data
- Add logging, rate limits, authentication, and admin content management before public launch

## Suggested next upgrade

1. Store menu content in a database table
2. Create an admin panel to update daily rainfall, road closures, and alerts
3. Send interactive reply buttons instead of only plain text
4. Add Marathi + English language support
5. Save every inbound and outbound message for audit and analytics
