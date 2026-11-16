import config from '../event.json';

export const event = { ...config };
const start = Date.parse(event.startsAt);
if (!Number.isFinite(start) || !/(Z|[+-]\d\d:\d\d)$/.test(event.startsAt)) {
  throw new Error('event.json startsAt must include the event’s UTC offset.');
}

function validateUrl(value, label) {
  if (!value) return '';
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password) {
    throw new Error(label + ' must be a public HTTPS URL.');
  }
  return url.href;
}

event.mapsUrl = validateUrl(process.env.INVITATION_MAPS_URL || event.mapsUrl, 'mapsUrl');
event.canonicalUrl = validateUrl(
  process.env.INVITATION_CANONICAL_URL || event.canonicalUrl ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL : ''),
  'canonicalUrl'
);
const timeZone = event.timeZone;
export const date = new Intl.DateTimeFormat('en-GB', {
  timeZone, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
}).format(start);
export const time = new Intl.DateTimeFormat('en-US', {
  timeZone, hour: '2-digit', minute: '2-digit', hour12: true
}).format(start);
