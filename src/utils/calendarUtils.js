export function getISOWeekNumber(date) {
  const tempDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = tempDate.getUTCDay() || 7;
  tempDate.setUTCDate(tempDate.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
  const weekNum = Math.ceil(((tempDate - yearStart) / 86400000 + 1) / 7);
  return weekNum;
}

export function has53Weeks(year) {
  const dec31 = new Date(year, 11, 31);
  return getISOWeekNumber(dec31) === 53;
}

export const STORAGE_KEY = "calendarEvents_v1";

export function serializeEvents(events) {
  return events.map((e) => ({
    ...e,
    date: e.date instanceof Date ? e.date.toISOString() : e.date
  }));
}

export function deserializeEvents(serialized) {
  try {
    return serialized.map((e) => ({
      ...e,
      date: e.date ? new Date(e.date) : null
    }));
  } catch (err) {
    console.error("Failed to deserialize events", err);
    return [];
  }
}
