// Single source of truth for CHOPPED. drop timing.
//
// Drops land on the 1st of each month at 02:00 — "the god hour" — in Austin
// time (America/Chicago). The next-drop date is computed dynamically so the
// hero countdown never goes stale: once a drop passes, the timer rolls forward
// to the following month automatically.
//
// We intentionally avoid printing a timezone abbreviation in copy (the brand
// is Austin/Central but legacy copy said "PST"). On-brand strings say
// "02:00 AM" / "THE GOD HOUR" instead — see DROP_TIME_LABEL.

export const DROP_TIMEZONE = 'America/Chicago'; // Austin, TX
export const DROP_HOUR = 2; // 02:00 — the god hour
export const DROP_TIME_LABEL = '02:00 AM';

// How long a drop stays "LIVE" after it opens before the timer counts down to
// the next one.
export const LIVE_WINDOW_MS = 6 * 60 * 60 * 1000; // 6 hours

// Returns the timezone's UTC offset (in ms) at the given instant.
function getTimeZoneOffsetMs(timeZone: string, date: Date): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const parts = dtf.formatToParts(date);
  const map: Record<string, number> = {};
  for (const p of parts) {
    if (p.type !== 'literal') map[p.type] = parseInt(p.value, 10);
  }
  const asUTC = Date.UTC(
    map.year,
    map.month - 1,
    map.day,
    map.hour === 24 ? 0 : map.hour,
    map.minute,
    map.second,
  );
  return asUTC - date.getTime();
}

// Converts a wall-clock time in `timeZone` to the corresponding UTC instant.
function zonedTimeToUtc(
  year: number,
  month: number, // 0-indexed
  day: number,
  hour: number,
  timeZone: string,
): Date {
  const utcGuess = Date.UTC(year, month, day, hour, 0, 0);
  const offset = getTimeZoneOffsetMs(timeZone, new Date(utcGuess));
  return new Date(utcGuess - offset);
}

// The next drop strictly after `from`.
export function getNextDrop(from: Date = new Date()): Date {
  let year = from.getUTCFullYear();
  let month = from.getUTCMonth();
  for (let i = 0; i < 18; i++) {
    const candidate = zonedTimeToUtc(year, month, 1, DROP_HOUR, DROP_TIMEZONE);
    if (candidate.getTime() > from.getTime()) return candidate;
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
  }
  return zonedTimeToUtc(year, month, 1, DROP_HOUR, DROP_TIMEZONE);
}

// The most recent drop at or before `from`.
export function getPrevDrop(from: Date = new Date()): Date {
  let year = from.getUTCFullYear();
  let month = from.getUTCMonth();
  for (let i = 0; i < 18; i++) {
    const candidate = zonedTimeToUtc(year, month, 1, DROP_HOUR, DROP_TIMEZONE);
    if (candidate.getTime() <= from.getTime()) return candidate;
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
  }
  return zonedTimeToUtc(year, month, 1, DROP_HOUR, DROP_TIMEZONE);
}

export type DropState = {
  next: Date;
  isLive: boolean;
};

export function getDropState(from: Date = new Date()): DropState {
  const prev = getPrevDrop(from);
  const isLive = from.getTime() - prev.getTime() < LIVE_WINDOW_MS;
  return { next: getNextDrop(from), isLive };
}

// "JULY 1, 2026" in Austin time.
export function formatDropDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: DROP_TIMEZONE,
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
    .format(date)
    .toUpperCase();
}

// "JULY 1, 2026 // 02:00 AM"
export function formatDropDateTime(date: Date = getNextDrop()): string {
  return `${formatDropDate(date)} // ${DROP_TIME_LABEL}`;
}
