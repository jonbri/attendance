import { expect, test } from "vitest";
import type { OfficeMonth } from "./types";
import { getGreenColor, getFigures } from "~/logic";

test("figures", () => {
  const attendance: OfficeMonth[] = [
    ["Oct 2024", 10, 20],
    ["Nov 2024", 20, 40],
  ];
  const {
    totalInOffice,
    totalOffice,
    highestPercent,
    lowestPercent,
    // highestRate,
    // lowestRate,
    totalInOfficeLast6Months,
    totalAbsentLast6Months,
    inOfficePercentageLast6Months,
    totalOfficeLast6Months,
    // rateLast6Months,
    totalAbsent,
    // rate,
    inOfficePercentage,
    inOfficePercentageValue,
    lowestPresent,
    highestPresent,
    lowestAbsent,
    highestAbsent,
  } = getFigures(attendance);
  expect(totalInOffice).toBe(30);
  expect(totalOffice).toBe(60);
  expect(totalAbsent).toBe(30);
  // expect(rate).toBe(0.5);
  expect(highestPercent).toBe(50);
  expect(lowestPercent).toBe(50);
  // expect(highestRate).toBe(0.5);
  // expect(lowestRate).toBe(0.25);
  expect(totalInOfficeLast6Months).toBe(30);
  expect(totalAbsentLast6Months).toBe(30);
  expect(inOfficePercentageLast6Months).toBe("50.0%");
  expect(totalOfficeLast6Months).toBe(60);
  // expect(rateLast6Months).toBe(0.5);
  expect(inOfficePercentage).toBe("50.0%");
  expect(inOfficePercentageValue).toBe(50);
  expect(lowestPresent).toBe(10);
  expect(highestPresent).toBe(20);
  expect(lowestAbsent).toBe(10);
  expect(highestAbsent).toBe(20);
});

test("getGreenColor", () => {
  expect(getGreenColor(0)).toBe("rgb(255, 255, 255)");
  expect(getGreenColor(50)).toBe("rgb(212.5, 255, 212.5)");
  // expect(getGreenColor(100)).toBe("rgb(255, 255, 255)");
});
