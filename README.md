# Housewarming invitation · Next.js

The Next.js App Router serves the invitation as a static export. Countdown and device sharing are client components.

## Development

Use Node.js 20.9 or later.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Run `npm run build` for the production export, then serve the `out/` directory with any static HTTP server. For example, run `python3 -m http.server 3000 --directory out` from the project root.

## Invitation details

Edit `event.json` and rebuild. The current date is 21 November 2026, 4:00 PM India Standard Time, as shown in the supplied invitation. Use an ISO timestamp with an explicit UTC offset and an IANA display time zone.

Set `venue`, `address`, and `mapsUrl` to enable the Location Card's Get Directions action. Provide an HTTPS Google Maps share link. If no link is configured, the card shows that directions are pending. Family and house names are optional.

Set `canonicalUrl` to the final HTTPS invitation URL or use the build-time variable `INVITATION_CANONICAL_URL`. The Vercel project production host is a fallback when exposed during the build. The canonical URL enables WhatsApp sharing and absolute Open Graph and Twitter image tags. `INVITATION_MAPS_URL` can override the Maps link at build time.

The matching social banner is `public/housewarming-share.png`. Update it when the text shown in the banner changes and rebuild to update its fingerprint in the social metadata.

## Vercel

Import the authorized repository and use the Next.js framework preset. Confirm the canonical URL after deployment, then verify that unauthenticated HTTPS requests return the invitation and the banner. Check the actual WhatsApp preview using the public URL.

## Build verification

The package includes the production `out/` directory generated with Next.js 16.3.2. Chromium checks passed at 320 px, an emulated iPhone viewport and desktop. Checks covered the Location anchor, upward animation, reduced motion with JavaScript disabled, and countdown expiry. With test configuration, the exported HTML included absolute Open Graph and Twitter image URLs, a Maps link and an encoded WhatsApp link. The social PNG returned HTTP 200 locally, and native share was tested with a simulated browser API.

A real Maps pin, a public Vercel URL, a WhatsApp-rendered preview and physical-device testing are pending.
