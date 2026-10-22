export const MIN_YEAR = 1900;
export const MAX_YEAR = 2100;

const MILLISECONDS_PER_DAY = 86_400_000;

export class DateEngineError extends RangeError {
  constructor(message) {
    super(message);
    this.name = "DateEngineError";
  }
}

export function isLeapYear(year) {
  assertSupportedYear(year);
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

export function daysInMonth(year, month) {
  assertSupportedYear(year);
  assertInteger(month, "O mês");

  if (month < 1 || month > 12) {
    throw new DateEngineError("O mês deve estar entre 1 e 12.");
  }

  const monthLengths = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return monthLengths[month - 1];
}

export function validateDate(date, label = "A data") {
  if (date === null || typeof date !== "object" || Array.isArray(date)) {
    throw new DateEngineError(`${label} deve ter ano, mês e dia.`);
  }

  const { year, month, day } = date;
  assertSupportedYear(year, label);
  assertInteger(month, `O mês de ${label.toLowerCase()}`);
  assertInteger(day, `O dia de ${label.toLowerCase()}`);

  if (month < 1 || month > 12) {
    throw new DateEngineError(`O mês de ${label.toLowerCase()} deve estar entre 1 e 12.`);
  }

  const maximumDay = daysInMonth(year, month);
  if (day < 1 || day > maximumDay) {
    throw new DateEngineError(
      `${label} é inválida: ${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year} não existe.`,
    );
  }

  return { year, month, day };
}

export function toDayNumber(date, label) {
  const validDate = validateDate(date, label);
  return Date.UTC(validDate.year, validDate.month - 1, validDate.day) / MILLISECONDS_PER_DAY;
}

export function fromDayNumber(dayNumber) {
  assertInteger(dayNumber, "O número do dia");
  const value = new Date(dayNumber * MILLISECONDS_PER_DAY);
  const date = {
    year: value.getUTCFullYear(),
    month: value.getUTCMonth() + 1,
    day: value.getUTCDate(),
  };

  return validateDate(date, "A data resultante");
}

export function weekday(date) {
  const dayNumber = toDayNumber(date);
  return ((dayNumber + 4) % 7 + 7) % 7;
}

export function compareDates(left, right) {
  return Math.sign(toDayNumber(left, "A primeira data") - toDayNumber(right, "A segunda data"));
}

export function assertInteger(value, label) {
  if (!Number.isSafeInteger(value)) {
    throw new DateEngineError(`${label} deve ser um número inteiro.`);
  }
}

export function assertSupportedYear(year, label = "O ano") {
  assertInteger(year, label);
  if (year < MIN_YEAR || year > MAX_YEAR) {
    throw new DateEngineError(`${label} deve estar entre ${MIN_YEAR} e ${MAX_YEAR}.`);
  }
}
