import { describe, expect, it } from "vitest";

import {
  addBusinessDays,
  addDays,
  businessDaysBetween,
  businessDaysInMonth,
  daysBetween,
  daysInMonth,
  daysUntil,
  isLeapYear,
  normalizeRange,
  validateDate,
  weekday,
} from "../src/lib/dates.js";
import { formatDateBR, formatNumericDateBR } from "../src/lib/format.js";
import { calculateEaster, holidaysForYear } from "../src/lib/holidays.js";

const date = (year, month, day) => ({ year, month, day });

describe("calendário gregoriano", () => {
  it.each([
    [2026, "05/04/2026"],
    [2027, "28/03/2027"],
    [2028, "16/04/2028"],
  ])("calcula a Páscoa de %i", (year, expected) => {
    expect(formatNumericDateBR(calculateEaster(year))).toBe(expected);
  });

  it("calcula o Carnaval de 2028 na terça-feira bissexta", () => {
    const carnival = holidaysForYear(2028, { includeOptional: true })
      .find((holiday) => holiday.id === "carnival-tuesday");

    expect(formatNumericDateBR(carnival.date)).toBe("29/02/2028");
  });

  it("aplica as regras de anos bissextos e quantidade de dias no mês", () => {
    expect(isLeapYear(2000)).toBe(true);
    expect(isLeapYear(2028)).toBe(true);
    expect(isLeapYear(2100)).toBe(false);
    expect(daysInMonth(2028, 2)).toBe(29);
    expect(daysInMonth(2027, 2)).toBe(28);
  });

  it("calcula o dia da semana sem depender do fuso horário", () => {
    expect(weekday(date(2027, 10, 25))).toBe(1);
    expect(formatDateBR(date(2027, 10, 25))).toBe("segunda-feira, 25/10/2027");
  });
});

describe("dias corridos", () => {
  it("calcula 364 dias entre o início e o fim de 2027 sem incluir o final", () => {
    expect(daysBetween(date(2027, 1, 1), date(2027, 12, 31))).toBe(364);
  });

  it("atravessa 29 de fevereiro em ano bissexto", () => {
    expect(daysBetween(date(2028, 2, 28), date(2028, 3, 1))).toBe(2);
  });

  it("não inventa 29 de fevereiro em ano comum", () => {
    expect(daysBetween(date(2027, 2, 28), date(2027, 3, 1))).toBe(1);
  });

  it("inclui o dia final quando solicitado", () => {
    expect(daysBetween(date(2027, 5, 10), date(2027, 5, 10), { includeEnd: false })).toBe(0);
    expect(daysBetween(date(2027, 5, 10), date(2027, 5, 10), { includeEnd: true })).toBe(1);
  });

  it("normaliza um intervalo invertido e informa a troca", () => {
    const result = normalizeRange(date(2027, 12, 31), date(2027, 1, 1));

    expect(result).toEqual({
      start: date(2027, 1, 1),
      end: date(2027, 12, 31),
      swapped: true,
    });
    expect(daysBetween(date(2027, 12, 31), date(2027, 1, 1))).toBe(364);
  });

  it("soma, subtrai e calcula dias até uma data", () => {
    expect(addDays(date(2028, 2, 28), 2)).toEqual(date(2028, 3, 1));
    expect(addDays(date(2027, 1, 1), -1)).toEqual(date(2026, 12, 31));
    expect(daysUntil(date(2027, 1, 1), date(2027, 1, 10))).toBe(-9);
  });

  it("rejeita um resultado fora do intervalo de anos suportado", () => {
    expect(() => addDays(date(2100, 12, 31), 1)).toThrow("entre 1900 e 2100");
  });
});

describe("feriados", () => {
  it("gera os dez feriados nacionais esperados em 2027", () => {
    const holidays = holidaysForYear(2027);

    expect(holidays.map((holiday) => formatNumericDateBR(holiday.date))).toEqual([
      "01/01/2027",
      "26/03/2027",
      "21/04/2027",
      "01/05/2027",
      "07/09/2027",
      "12/10/2027",
      "02/11/2027",
      "15/11/2027",
      "20/11/2027",
      "25/12/2027",
    ]);
    expect(holidays.every((holiday) => holiday.source.length > 0)).toBe(true);
  });

  it("não considera 20/11 feriado nacional antes de 2024", () => {
    const ids = holidaysForYear(2023).map((holiday) => holiday.id);
    expect(ids).not.toContain("black-consciousness-day");
  });

  it("mantém a Quarta-feira de Cinzas como nota sem excluir o dia útil", () => {
    const ashWednesday = holidaysForYear(2027, { includeOptional: true })
      .find((holiday) => holiday.id === "ash-wednesday");

    expect(ashWednesday.excludesBusinessDay).toBe(false);
    expect(formatNumericDateBR(ashWednesday.date)).toBe("10/02/2027");
  });
});

describe("dias úteis", () => {
  it("conta 20 dias úteis em novembro de 2027", () => {
    const result = businessDaysInMonth(2027, 11);

    expect(result.count).toBe(20);
    expect(result.holidays.map((holiday) => holiday.id)).toEqual([
      "all-souls-day",
      "republic-day",
      "black-consciousness-day",
    ]);
    expect(result.holidays.find((holiday) => holiday.id === "black-consciousness-day").fallsOnWeekend).toBe(true);
  });

  it("conta 20 dias úteis em fevereiro de 2027, ou 18 sem pontos facultativos", () => {
    expect(businessDaysInMonth(2027, 2).count).toBe(20);

    const result = businessDaysInMonth(2027, 2, { excludeOptional: true });
    expect(result.count).toBe(18);
    expect(result.holidays.map((holiday) => holiday.id)).toEqual([
      "carnival-monday",
      "carnival-tuesday",
      "ash-wednesday",
    ]);
  });

  it("conta 254 dias úteis em 2027, ou 251 sem pontos facultativos", () => {
    const start = date(2027, 1, 1);
    const end = date(2027, 12, 31);

    expect(businessDaysBetween(start, end, { countStart: true }).count).toBe(254);
    expect(businessDaysBetween(start, end, { countStart: true, excludeOptional: true }).count).toBe(251);
  });

  it("soma dez dias úteis a 08/10/2027", () => {
    const result = addBusinessDays(date(2027, 10, 8), 10);

    expect(result.date).toEqual(date(2027, 10, 25));
    expect(result.skippedHolidays.map((holiday) => holiday.id)).toContain("our-lady-aparecida");
  });

  it("soma cinco dias úteis a 20/12/2027 sem descontar Natal duas vezes", () => {
    const result = addBusinessDays(date(2027, 12, 20), 5);

    expect(result.date).toEqual(date(2027, 12, 27));
    expect(result.skippedHolidays).toHaveLength(1);
    expect(result.skippedHolidays[0]).toMatchObject({ id: "christmas", fallsOnWeekend: true });
  });

  it("suporta subtração e contagem opcional da data inicial", () => {
    expect(addBusinessDays(date(2027, 10, 25), -10).date).toEqual(date(2027, 10, 8));
    expect(addBusinessDays(date(2027, 10, 8), 1, { countStart: true }).date).toEqual(date(2027, 10, 8));
  });

  it("pode considerar sábado como dia útil", () => {
    const friday = date(2027, 10, 8);
    const monday = date(2027, 10, 11);

    expect(businessDaysBetween(friday, monday).count).toBe(1);
    expect(businessDaysBetween(friday, monday, { saturdayIsBusiness: true }).count).toBe(2);
  });

  it("reporta a Quarta-feira de Cinzas sem pular sua contagem", () => {
    const result = addBusinessDays(date(2027, 2, 9), 1, { excludeOptional: true });

    expect(result.date).toEqual(date(2027, 2, 10));
    expect(result.informationalHolidays.map((holiday) => holiday.id)).toEqual(["ash-wednesday"]);
  });

  it("retorna a própria data e listas vazias ao adicionar zero dias úteis", () => {
    expect(addBusinessDays(date(2027, 2, 10), 0, { excludeOptional: true })).toEqual({
      date: date(2027, 2, 10),
      skippedHolidays: [],
      informationalHolidays: [],
      skippedWeekendDays: 0,
    });
  });
});

describe("validação e segurança das entradas", () => {
  it("rejeita 31/02/2027 com mensagem amigável", () => {
    expect(() => validateDate(date(2027, 2, 31))).toThrow("31/02/2027 não existe");
  });

  it.each([1899, 2101])("rejeita o ano não suportado %i", (year) => {
    expect(() => validateDate(date(year, 1, 1))).toThrow("entre 1900 e 2100");
  });

  it("rejeita valores, deslocamentos e opções malformados", () => {
    expect(() => validateDate("2027-01-01")).toThrow("deve ter ano, mês e dia");
    expect(() => addDays(date(2027, 1, 1), 1.5)).toThrow("número inteiro");
    expect(() => daysBetween(date(2027, 1, 1), date(2027, 1, 2), { includeEnd: "sim" })).toThrow(
      "verdadeira ou falsa",
    );
    expect(() => businessDaysInMonth(2027, 1, { unknown: true })).toThrow("não é reconhecida");
    expect(() => businessDaysInMonth(2027, 1, null)).toThrow("devem ser um objeto");
    expect(() => holidaysForYear(2027, { includeOptional: "sim" })).toThrow("verdadeira ou falsa");
    expect(() => daysInMonth(2027, 13)).toThrow("entre 1 e 12");
    expect(() => validateDate(date(2027, 0, 1))).toThrow("entre 1 e 12");
  });

  it("não altera os objetos fornecidos pelo chamador", () => {
    const start = Object.freeze(date(2027, 12, 31));
    const end = Object.freeze(date(2027, 1, 1));

    normalizeRange(start, end);
    expect(start).toEqual(date(2027, 12, 31));
    expect(end).toEqual(date(2027, 1, 1));
  });
});
