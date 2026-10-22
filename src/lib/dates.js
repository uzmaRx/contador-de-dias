import {
  DateEngineError,
  assertInteger,
  compareDates,
  daysInMonth,
  fromDayNumber,
  isLeapYear,
  toDayNumber,
  validateDate,
  weekday,
} from "./calendar.js";
import { holidaysForYear } from "./holidays.js";

const DEFAULT_BUSINESS_OPTIONS = Object.freeze({
  countStart: false,
  saturdayIsBusiness: false,
  excludeOptional: false,
});

export { DateEngineError, daysInMonth, isLeapYear, validateDate, weekday };
export { holidaysForYear } from "./holidays.js";

export function normalizeRange(start, end) {
  const validStart = validateDate(start, "A data inicial");
  const validEnd = validateDate(end, "A data final");

  if (compareDates(validStart, validEnd) <= 0) {
    return { start: validStart, end: validEnd, swapped: false };
  }

  return { start: validEnd, end: validStart, swapped: true };
}

export function daysBetween(start, end, { includeEnd = false } = {}) {
  assertBoolean(includeEnd, "includeEnd");
  const range = normalizeRange(start, end);
  const difference = toDayNumber(range.end) - toDayNumber(range.start);
  return difference + (includeEnd ? 1 : 0);
}

export function addDays(start, numberOfDays) {
  const startDayNumber = toDayNumber(start, "A data inicial");
  assertInteger(numberOfDays, "A quantidade de dias");
  return fromDayNumber(startDayNumber + numberOfDays);
}

export function daysUntil(target, today) {
  return toDayNumber(target, "A data de destino") - toDayNumber(today, "A data de hoje");
}

export function businessDaysBetween(start, end, options = {}) {
  const settings = parseBusinessOptions(options);
  const range = normalizeRange(start, end);
  const startDayNumber = toDayNumber(range.start);
  const endDayNumber = toDayNumber(range.end);
  const firstDayNumber = settings.countStart ? startDayNumber : startDayNumber + 1;
  const holidayIndex = createHolidayIndex(range.start.year, range.end.year, settings.excludeOptional);
  const holidays = [];
  let count = 0;
  let weekendDays = 0;

  for (let dayNumber = firstDayNumber; dayNumber <= endDayNumber; dayNumber += 1) {
    const date = fromDayNumber(dayNumber);
    const isWeekendDay = isWeekend(date, settings.saturdayIsBusiness);
    const holiday = holidayIndex.get(dayNumber);

    if (isWeekendDay) {
      weekendDays += 1;
    }

    if (holiday) {
      holidays.push({ ...holiday, fallsOnWeekend: isWeekendDay });
    }

    if (!isWeekendDay && (!holiday || !holiday.excludesBusinessDay)) {
      count += 1;
    }
  }

  return { count, holidays, weekendDays };
}

export function addBusinessDays(start, numberOfDays, options = {}) {
  const validStart = validateDate(start, "A data inicial");
  assertInteger(numberOfDays, "A quantidade de dias úteis");
  const settings = parseBusinessOptions(options);

  if (numberOfDays === 0) {
    return {
      date: validStart,
      skippedHolidays: [],
      informationalHolidays: [],
      skippedWeekendDays: 0,
    };
  }

  const direction = Math.sign(numberOfDays);
  let remaining = Math.abs(numberOfDays);
  let cursor = toDayNumber(validStart);
  let considerCurrentDay = settings.countStart;
  let skippedWeekendDays = 0;
  const skippedHolidays = [];
  const informationalHolidays = [];
  const holidayIndexes = new Map();

  while (remaining > 0) {
    if (!considerCurrentDay) {
      cursor += direction;
    }
    considerCurrentDay = false;

    const date = fromDayNumber(cursor);
    const holidayIndex = getHolidayIndexForYear(holidayIndexes, date.year, settings.excludeOptional);
    const holiday = holidayIndex.get(cursor);
    const weekendDay = isWeekend(date, settings.saturdayIsBusiness);

    if (weekendDay) {
      skippedWeekendDays += 1;
    }
    if (holiday?.excludesBusinessDay) {
      skippedHolidays.push({ ...holiday, fallsOnWeekend: weekendDay });
    }
    if (holiday && !holiday.excludesBusinessDay) {
      informationalHolidays.push({ ...holiday, fallsOnWeekend: weekendDay });
    }
    if (!weekendDay && (!holiday || !holiday.excludesBusinessDay)) {
      remaining -= 1;
    }
  }

  return { date: fromDayNumber(cursor), skippedHolidays, informationalHolidays, skippedWeekendDays };
}

export function businessDaysInMonth(year, month, options = {}) {
  const lastDay = daysInMonth(year, month);
  const settings = parseBusinessOptions(options);
  return businessDaysBetween(
    { year, month, day: 1 },
    { year, month, day: lastDay },
    { ...settings, countStart: true },
  );
}

function createHolidayIndex(firstYear, lastYear, includeOptional) {
  const index = new Map();
  for (let year = firstYear; year <= lastYear; year += 1) {
    for (const holiday of holidaysForYear(year, { includeOptional })) {
      index.set(toDayNumber(holiday.date), holiday);
    }
  }
  return index;
}

function getHolidayIndexForYear(indexes, year, includeOptional) {
  if (!indexes.has(year)) {
    indexes.set(year, createHolidayIndex(year, year, includeOptional));
  }
  return indexes.get(year);
}

function isWeekend(date, saturdayIsBusiness) {
  const dayOfWeek = weekday(date);
  return dayOfWeek === 0 || (dayOfWeek === 6 && !saturdayIsBusiness);
}

function parseBusinessOptions(options) {
  if (options === null || typeof options !== "object" || Array.isArray(options)) {
    throw new TypeError("As opções de dias úteis devem ser um objeto.");
  }

  const allowedOptions = new Set(Object.keys(DEFAULT_BUSINESS_OPTIONS));
  const unknownOption = Object.keys(options).find((name) => !allowedOptions.has(name));
  if (unknownOption) {
    throw new TypeError(`A opção ${unknownOption} não é reconhecida.`);
  }

  const settings = { ...DEFAULT_BUSINESS_OPTIONS, ...options };
  assertBoolean(settings.countStart, "countStart");
  assertBoolean(settings.saturdayIsBusiness, "saturdayIsBusiness");
  assertBoolean(settings.excludeOptional, "excludeOptional");
  return settings;
}

function assertBoolean(value, name) {
  if (typeof value !== "boolean") {
    throw new TypeError(`A opção ${name} deve ser verdadeira ou falsa.`);
  }
}
