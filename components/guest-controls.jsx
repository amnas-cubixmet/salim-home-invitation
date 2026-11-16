'use client';

import { useEffect, useState } from 'react';

function formatRemaining(minutes) {
  return [
    [Math.floor(minutes / 1440), 'day', 'days'],
    [Math.floor((minutes % 1440) / 60), 'hr', 'hrs'],
    [minutes % 60, 'min', 'mins']
  ].map(([number, singular, plural]) => number + ' ' + (number === 1 ? singular : plural)).join(' · ');
}

export function Countdown({ startsAt }) {
  const [minutes, setMinutes] = useState(null);

  useEffect(() => {
    const end = Date.parse(startsAt);
    let timer;

    function refresh() {
      clearTimeout(timer);
      const remaining = end - Date.now();
      setMinutes(remaining > 0 ? Math.ceil(remaining / 60_000) : null);
      if (remaining > 0) timer = setTimeout(refresh, remaining % 60_000 || 60_000);
    }

    function refreshOnReturn() {
      if (!document.hidden) refresh();
    }

    refresh();
    document.addEventListener('visibilitychange', refreshOnReturn);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', refreshOnReturn);
    };
  }, [startsAt]);

  if (minutes === null) return null;

  return (
    <div className="countdown">
      <span className="eyebrow">Until we welcome you</span>
      <span className="countdown-value">{formatRemaining(minutes)}</span>
    </div>
  );
}

export function NativeShare({ title, url }) {
  const [capability, setCapability] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (navigator.share) setCapability('share');
    else if (navigator.clipboard) setCapability('copy');
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus('Invitation link copied.');
    } catch {
      setStatus('Couldn’t copy the link. You can copy it from your browser.');
    }
  }

  async function share() {
    setStatus('');
    if (capability === 'copy') {
      await copyLink();
      return;
    }

    try {
      await navigator.share({ title, url });
    } catch (error) {
      if (error.name !== 'AbortError') await copyLink();
    }
  }

  if (!capability) return null;

  return (
    <>
      <button className="button button-outline" type="button" onClick={share}>
        {capability === 'share' ? 'Share invitation' : 'Copy invitation link'}
      </button>
      <p className="share-status" aria-live="polite">{status}</p>
    </>
  );
}
