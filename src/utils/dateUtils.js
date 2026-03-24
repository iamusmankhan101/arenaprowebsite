// Pakistan Standard Time is UTC+5 (no DST)
const PKT_OFFSET_MS = 5 * 60 * 60 * 1000;

/**
 * Returns a Date object adjusted to Pakistan Standard Time.
 */
export const nowInPKT = () => {
    const utc = Date.now();
    return new Date(utc + PKT_OFFSET_MS);
};

/**
 * Returns today's date string in PKT as "YYYY-MM-DD".
 */
export const todayPKT = () => {
    const pkt = nowInPKT();
    const y = pkt.getUTCFullYear();
    const m = String(pkt.getUTCMonth() + 1).padStart(2, '0');
    const d = String(pkt.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

/**
 * Returns current hours and minutes in PKT.
 */
export const currentMinutesPKT = () => {
    const pkt = nowInPKT();
    return pkt.getUTCHours() * 60 + pkt.getUTCMinutes();
};
