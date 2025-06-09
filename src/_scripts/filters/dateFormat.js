import { DateTime } from "luxon";

export function dateFormat(dateObj) {
  return DateTime.fromJSDate(new Date(dateObj)).toFormat("dd MMMM yyyy");
}
