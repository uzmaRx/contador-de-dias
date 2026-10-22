import { validateDate, weekday } from "./calendar.js";

const WEEKDAY_NAMES = Object.freeze([
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
]);

export function formatDateBR(date) {
  const validDate = validateDate(date);
  return `${WEEKDAY_NAMES[weekday(validDate)]}, ${formatNumericDateBR(validDate)}`;
}

export function formatNumericDateBR(date) {
  const validDate = validateDate(date);
  const day = String(validDate.day).padStart(2, "0");
  const month = String(validDate.month).padStart(2, "0");
  return `${day}/${month}/${validDate.year}`;
}
