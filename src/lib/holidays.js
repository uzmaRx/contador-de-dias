import {
  assertSupportedYear,
  fromDayNumber,
  toDayNumber,
  validateDate,
  weekday,
} from "./calendar.js";

const NATIONAL_SOURCE = "Lei nº 662/1949 e alterações posteriores";
const GOOD_FRIDAY_SOURCE = "Lei nº 9.093/1995";
const BLACK_CONSCIOUSNESS_SOURCE = "Lei nº 14.759/2023";
const OPTIONAL_SOURCE = "Calendário oficial anual do Governo Federal";

export const HOLIDAY_RULES = Object.freeze([
  fixedRule("new-year", "Confraternização Universal", "national", 1, 1, NATIONAL_SOURCE),
  easterRule("good-friday", "Paixão de Cristo", "national", -2, GOOD_FRIDAY_SOURCE),
  fixedRule("tiradentes", "Tiradentes", "national", 4, 21, NATIONAL_SOURCE),
  fixedRule("labour-day", "Dia do Trabalho", "national", 5, 1, NATIONAL_SOURCE),
  fixedRule("independence-day", "Independência do Brasil", "national", 9, 7, NATIONAL_SOURCE),
  fixedRule("our-lady-aparecida", "Nossa Senhora Aparecida", "national", 10, 12, "Lei nº 6.802/1980"),
  fixedRule("all-souls-day", "Finados", "national", 11, 2, NATIONAL_SOURCE),
  fixedRule("republic-day", "Proclamação da República", "national", 11, 15, NATIONAL_SOURCE),
  fixedRule(
    "black-consciousness-day",
    "Dia Nacional de Zumbi e da Consciência Negra",
    "national",
    11,
    20,
    BLACK_CONSCIOUSNESS_SOURCE,
    2024,
  ),
  fixedRule("christmas", "Natal", "national", 12, 25, NATIONAL_SOURCE),
  easterRule("carnival-monday", "Carnaval (segunda-feira)", "optional", -48, OPTIONAL_SOURCE),
  easterRule("carnival-tuesday", "Carnaval (terça-feira)", "optional", -47, OPTIONAL_SOURCE),
  easterRule(
    "ash-wednesday",
    "Quarta-feira de Cinzas (até 14h)",
    "optional",
    -46,
    OPTIONAL_SOURCE,
    1900,
    2100,
    false,
  ),
  easterRule("corpus-christi", "Corpus Christi", "optional", 60, OPTIONAL_SOURCE),
]);

export function calculateEaster(year) {
  assertSupportedYear(year);

  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return { year, month, day };
}

export function holidaysForYear(year, { includeOptional = false } = {}) {
  assertSupportedYear(year);
  assertBoolean(includeOptional, "includeOptional");

  const easterDayNumber = toDayNumber(calculateEaster(year));

  return HOLIDAY_RULES.filter((rule) => {
    const validForYear = year >= rule.validFrom && year <= rule.validTo;
    return validForYear && (rule.type === "national" || includeOptional);
  })
    .map((rule) => {
      const date = rule.rule.kind === "fixed"
        ? { year, month: rule.rule.month, day: rule.rule.day }
        : fromDayNumber(easterDayNumber + rule.rule.offset);

      return Object.freeze({
        id: rule.id,
        name: rule.name,
        type: rule.type,
        date: validateDate(date),
        weekday: weekday(date),
        source: rule.source,
        excludesBusinessDay: rule.excludesBusinessDay,
      });
    })
    .sort((left, right) => toDayNumber(left.date) - toDayNumber(right.date));
}

function fixedRule(
  id,
  name,
  type,
  month,
  day,
  source,
  validFrom = 1900,
  validTo = 2100,
  excludesBusinessDay = true,
) {
  return Object.freeze({
    id,
    name,
    type,
    rule: Object.freeze({ kind: "fixed", month, day }),
    validFrom,
    validTo,
    source,
    excludesBusinessDay,
  });
}

function easterRule(
  id,
  name,
  type,
  offset,
  source,
  validFrom = 1900,
  validTo = 2100,
  excludesBusinessDay = true,
) {
  return Object.freeze({
    id,
    name,
    type,
    rule: Object.freeze({ kind: "easterOffset", offset }),
    validFrom,
    validTo,
    source,
    excludesBusinessDay,
  });
}

function assertBoolean(value, name) {
  if (typeof value !== "boolean") {
    throw new TypeError(`A opção ${name} deve ser verdadeira ou falsa.`);
  }
}
