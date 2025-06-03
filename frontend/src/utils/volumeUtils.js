import { MAX_VOLUME, MIN_VOLUME } from "../config/synthConfiguration";

export function dbToPercent(db, minDb = MIN_VOLUME, maxDb = MAX_VOLUME) {
    const clampedDb = Math.max(minDb, Math.min(db, maxDb));
    const percent = ((clampedDb - minDb) / (maxDb - minDb)) * 100;
    return Math.round(percent);
}
