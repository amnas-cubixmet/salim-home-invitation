import React from 'react';
import { Countdown, NativeShare } from './guest-controls.jsx';

const h = React.createElement;
const reference = '/assets/invitation-reference.jpg';

const icons = {
  calendar: ['M8 2v4m8-4v4M3 10h18', 'M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z'],
  clock: ['M12 7v5l3 2', 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z'],
  pin: ['M19 10c0 5-7 10-7 10s-7-5-7-10a7 7 0 1 1 14 0Z', 'M14.4 10a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0Z'],
  arrow: ['M4 12h15m-6-6 6 6-6 6'],
  down: ['M12 4v15m-6-6 6 6 6-6'],
  home: ['m3 11 9-8 9 8M6 9v12h12V9m-8 12v-6h4v6']
};

function Icon({ name }) {
  return h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' },
    icons[name].map((d) => h('path', { key: d, d })));
}

function House({ decorative = false }) {
  return h('div', { className: 'house-art' },
    h('img', { src: reference, width: 1083, height: 1536, alt: decorative ? '' : 'Pencil sketch of the new two-storey home with glass balconies and a stepped entrance', fetchPriority: 'high' }));
}

function Leaves({ className = '' }) {
  return h('div', { className: 'leaves ' + className, 'aria-hidden': 'true' },
    h('img', { src: reference, alt: '', width: 1083, height: 1536 }));
}

function Ornament() {
  return h('div', { className: 'ornament', 'aria-hidden': 'true' }, h('span'));
}

function Fact({ icon, label, value, dateTime }) {
  return h('div', { className: 'fact' }, h(Icon, { name: icon }),
    h('div', null, h('span', { className: 'eyebrow' }, label),
      h('time', { dateTime }, value)));
}

function Location({ event }) {
  return h('section', { className: 'location-card', 'aria-labelledby': 'location-title' },
    h('div', { className: 'location-copy' },
      h('div', { className: 'location-icon' }, h(Icon, { name: 'pin' })),
      h('h2', { id: 'location-title' }, 'Location'),
      event.venue && h('strong', { className: 'venue' }, event.venue),
      event.address && h('p', { className: 'address' }, event.address),
      !event.mapsUrl && h('p', null, event.venue || event.address ? 'Directions will be shared soon.' : 'Venue and directions will be shared soon.'),
      event.mapsUrl && h('a', { className: 'button', href: event.mapsUrl, target: '_blank', rel: 'noopener noreferrer' }, 'Get Directions', h(Icon, { name: 'arrow' }))),
    h('div', { className: 'location-art', 'aria-hidden': 'true' },
      h('div', { className: 'location-stamp' }, h(Icon, { name: 'home' })),
      h(Leaves, { className: 'location-leaves' })));
}

function Share({ event }) {
  const url = event.canonicalUrl;
  if (!url) return null;
  return h('div', { className: 'share' },
    h('a', { className: 'button button-outline', href: 'https://wa.me/?text=' + encodeURIComponent(event.title + '\n' + url), target: '_blank', rel: 'noopener noreferrer' }, 'Share on WhatsApp'),
    h(NativeShare, { url, title: event.title }));
}

export function Invitation({ event, date, time }) {
  return h(React.Fragment, null,
    h('header', { className: 'navigation' },
      h('a', { className: 'brand', href: '#top' }, h(Icon, { name: 'home' }), 'House Warming'),
      h('a', { href: '#location', className: 'nav-location' }, h(Icon, { name: 'pin' }), 'Location')),
    h('main', { id: 'top' },
      h('section', { className: 'hero', 'aria-labelledby': 'invitation-title' },
        h(Leaves, { className: 'hero-leaves' }),
        h('p', { className: 'bismillah', lang: 'ar', dir: 'rtl' }, event.bismillah),
        h('h1', { id: 'invitation-title' }, event.title),
        event.houseName && h('p', { className: 'house-name' }, event.houseName),
        h('p', { className: 'intro' }, event.introduction),
        h('p', { className: 'hero-date' }, h('time', { dateTime: event.startsAt }, date + ' · ' + time)),
        h('figure', { className: 'hero-figure' }, h(House)),
        h(Ornament),
        h('a', { className: 'jump', href: '#details' }, 'Event details', h(Icon, { name: 'down' }))),
      h('section', { id: 'details', className: 'details', 'aria-labelledby': 'details-title' },
        h('h2', { id: 'details-title' }, 'Join us at our new home'),
        h('p', { className: 'message' }, event.message),
        h('div', { className: 'facts' },
          h(Fact, { icon: 'calendar', label: 'Date', value: date, dateTime: event.startsAt }),
          h(Fact, { icon: 'clock', label: 'Time', value: time, dateTime: event.startsAt })),
        h(Countdown, { startsAt: event.startsAt })),
      h('div', { id: 'location', className: 'location-section' }, h(Location, { event })),
      h('footer', { className: 'closing' }, h(Ornament), h('p', null, event.closing),
        event.familyName && h('p', { className: 'family' }, event.familyName),
        h(Share, { event }))));
}
