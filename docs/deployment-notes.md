# DMO bot deployment notes

## Meta WhatsApp Cloud API setup

1. Create a Meta developer app
2. Add the WhatsApp product
3. Get the test phone number
4. Generate a permanent access token
5. Copy the phone number ID
6. Configure the webhook callback URL as `/webhook`
7. Configure the verify token to match `.env`
8. Subscribe to `messages` events

## Hosting options

- Hostinger VPS
- Render
- Railway
- DigitalOcean
- Any Node.js hosting with HTTPS support

## Live data integration ideas

- Rainfall: district control room sheet or IMD feed
- River/dam level: irrigation department API or manual admin entry
- Alerts: IMD / district warning feed
- Road closures: PWD or district emergency desk updates
- Maps: Google Maps, district GIS, or static public map links

## Recommended database tables for production

- `bot_sessions`
- `bot_messages`
- `bot_content_items`
- `bot_broadcast_jobs`
- `bot_admin_users`
