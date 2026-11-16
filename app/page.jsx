import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Invitation } from '../components/invitation.js';
import { date, event, time } from '../lib/event.js';

export function generateMetadata() {
  const title = event.title + (event.houseName ? ' · ' + event.houseName : ' Invitation');
  const description = 'Join us for our housewarming on ' + date + ' at ' + time + '.';
  const openGraph = { type: 'website', title, description };
  const twitter = { card: 'summary_large_image', title, description };

  if (!event.canonicalUrl) return { title, description, openGraph, twitter };

  const artwork = readFileSync(join(process.cwd(), 'public/housewarming-share.png'));
  const version = createHash('sha256').update(artwork).digest('hex').slice(0, 12);
  const url = new URL('/housewarming-share.png?v=' + version, event.canonicalUrl).href;
  const alt = 'Housewarming invitation with a pencil sketch of the new home';

  return {
    title,
    description,
    alternates: { canonical: event.canonicalUrl },
    openGraph: {
      ...openGraph,
      url: event.canonicalUrl,
      images: [{ url, width: 1200, height: 630, type: 'image/png', alt }]
    },
    twitter: { ...twitter, images: [{ url, alt }] }
  };
}

export default function Page() {
  return <Invitation event={event} date={date} time={time} />;
}
