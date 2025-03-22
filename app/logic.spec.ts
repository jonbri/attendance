import { expect, test } from "vitest";
import type { OfficeMonth } from "./types";
import { getGreenColor, getFigures } from "~/logic";

test("one month", () => {
  const attendance: OfficeMonth[] = [["Oct 2024", 1, 2]];
  const {
    totalInOffice,
    totalOffice,
    highestPercent,
    lowestPercent,
    highestRate,
    lowestRate,
    totalInOfficeLast6Months,
    totalAbsentLast6Months,
    inOfficePercentageLast6Months,
    totalOfficeLast6Months,
    rateLast6Months,
    totalAbsent,
    rate,
    inOfficePercentage,
    inOfficePercentageValue,
    lowestPresent,
    highestPresent,
    lowestAbsent,
    highestAbsent,
  } = getFigures(attendance);
  expect(totalInOffice).toBe(1);
  expect(totalOffice).toBe(2);
  expect(totalAbsent).toBe(1);
  expect(rate).toBe("2.50");
  expect(highestPercent).toBe(50);
  expect(lowestPercent).toBe(50);
  expect(highestRate).toBe(2.5);
  expect(lowestRate).toBe(2.5);
  expect(totalInOfficeLast6Months).toBe(1);
  expect(totalAbsentLast6Months).toBe(1);
  expect(inOfficePercentageLast6Months).toBe("50.0%");
  expect(totalOfficeLast6Months).toBe(2);
  expect(rateLast6Months).toBe("2.50");
  expect(inOfficePercentage).toBe("50.0%");
  expect(inOfficePercentageValue).toBe(50);
  expect(lowestPresent).toBe(1);
  expect(highestPresent).toBe(1);
  expect(lowestAbsent).toBe(1);
  expect(highestAbsent).toBe(1);
});

test("two months", () => {
  const attendance: OfficeMonth[] = [
    ["Oct 2024", 10, 20],
    ["Nov 2024", 20, 40],
  ];
  const {
    totalInOffice,
    totalOffice,
    highestPercent,
    lowestPercent,
    highestRate,
    lowestRate,
    totalInOfficeLast6Months,
    totalAbsentLast6Months,
    inOfficePercentageLast6Months,
    totalOfficeLast6Months,
    rateLast6Months,
    totalAbsent,
    rate,
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
  expect(rate).toBe("2.50");
  expect(highestPercent).toBe(50);
  expect(lowestPercent).toBe(50);
  expect(highestRate).toBe(2.5);
  expect(lowestRate).toBe(2.5);
  expect(totalInOfficeLast6Months).toBe(30);
  expect(totalAbsentLast6Months).toBe(30);
  expect(inOfficePercentageLast6Months).toBe("50.0%");
  expect(totalOfficeLast6Months).toBe(60);
  expect(rateLast6Months).toBe("2.50");
  expect(inOfficePercentage).toBe("50.0%");
  expect(inOfficePercentageValue).toBe(50);
  expect(lowestPresent).toBe(10);
  expect(highestPresent).toBe(20);
  expect(lowestAbsent).toBe(10);
  expect(highestAbsent).toBe(20);
});

test("ten months", () => {
  const attendance: OfficeMonth[] = [
    ["Jan 2024", 11, 20],
    ["Feb 2024", 0, 30],
    ["Mar 2024", 0, 20],
    ["Apr 2024", 0, 20],
    ["May 2024", 0, 20],
    ["Jun 2024", 0, 20],
    ["Jul 2024", 0, 20],
    ["Aug 2024", 0, 20],
    ["Sep 2024", 10, 20],
    ["Oct 2024", 0, 21],
  ];
  const {
    totalInOffice,
    totalOffice,
    highestPercent,
    lowestPercent,
    highestRate,
    lowestRate,
    totalInOfficeLast6Months,
    totalAbsentLast6Months,
    inOfficePercentageLast6Months,
    totalOfficeLast6Months,
    rateLast6Months,
    totalAbsent,
    rate,
    inOfficePercentage,
    inOfficePercentageValue,
    lowestPresent,
    highestPresent,
    lowestAbsent,
    highestAbsent,
  } = getFigures(attendance);
  expect(totalInOffice).toBe(21);
  expect(totalOffice).toBe(211);
  expect(totalAbsent).toBe(190);
  expect(rate).toBe("0.50");
  expect(Math.round(highestPercent)).toBe(55);
  expect(lowestPercent).toBe(0);
  expect(Math.round(highestRate)).toBe(3);
  expect(lowestRate).toBe(0);
  expect(totalInOfficeLast6Months).toBe(10);
  expect(totalAbsentLast6Months).toBe(111);
  expect(inOfficePercentageLast6Months).toBe("8.3%");
  expect(totalOfficeLast6Months).toBe(121);
  expect(rateLast6Months).toBe("0.41");
  expect(inOfficePercentage).toBe("10.0%");
  expect(Math.round(inOfficePercentageValue)).toBe(10);
  expect(lowestPresent).toBe(0);
  expect(highestPresent).toBe(11);
  expect(lowestAbsent).toBe(9);
  expect(highestAbsent).toBe(30);
});

test("only absent", () => {
  const attendance: OfficeMonth[] = [
    ["Jan 2024", 0, 1],
    ["Feb 2024", 0, 1],
    ["Mar 2024", 0, 1],
    ["Apr 2024", 0, 1],
    ["May 2024", 0, 1],
    ["Jun 2024", 0, 1],
    ["Jul 2024", 0, 1],
    ["Aug 2024", 0, 1],
    ["Sep 2024", 0, 1],
    ["Oct 2024", 0, 1],
  ];
  const {
    totalInOffice,
    totalOffice,
    highestPercent,
    lowestPercent,
    highestRate,
    lowestRate,
    totalInOfficeLast6Months,
    totalAbsentLast6Months,
    inOfficePercentageLast6Months,
    totalOfficeLast6Months,
    rateLast6Months,
    totalAbsent,
    rate,
    inOfficePercentage,
    inOfficePercentageValue,
    lowestPresent,
    highestPresent,
    lowestAbsent,
    highestAbsent,
  } = getFigures(attendance);
  expect(totalInOffice).toBe(0);
  expect(totalOffice).toBe(10);
  expect(totalAbsent).toBe(10);
  expect(rate).toBe("0.00");
  expect(Math.round(highestPercent)).toBe(0);
  expect(lowestPercent).toBe(0);
  expect(Math.round(highestRate)).toBe(0);
  expect(lowestRate).toBe(0);
  expect(totalInOfficeLast6Months).toBe(0);
  expect(totalAbsentLast6Months).toBe(6);
  expect(inOfficePercentageLast6Months).toBe("0.0%");
  expect(totalOfficeLast6Months).toBe(6);
  expect(rateLast6Months).toBe("0.00");
  expect(inOfficePercentage).toBe("0.0%");
  expect(Math.round(inOfficePercentageValue)).toBe(0);
  expect(lowestPresent).toBe(0);
  expect(highestPresent).toBe(0);
  expect(lowestAbsent).toBe(1);
  expect(highestAbsent).toBe(1);
});

test("only present", () => {
  const attendance: OfficeMonth[] = [
    ["Jan 2024", 1, 1],
    ["Feb 2024", 1, 1],
    ["Mar 2024", 1, 1],
    ["Apr 2024", 1, 1],
    ["May 2024", 1, 1],
    ["Jun 2024", 1, 1],
    ["Jul 2024", 1, 1],
    ["Aug 2024", 1, 1],
    ["Sep 2024", 1, 1],
    ["Oct 2024", 1, 1],
  ];
  const {
    totalInOffice,
    totalOffice,
    highestPercent,
    lowestPercent,
    highestRate,
    lowestRate,
    totalInOfficeLast6Months,
    totalAbsentLast6Months,
    inOfficePercentageLast6Months,
    totalOfficeLast6Months,
    rateLast6Months,
    totalAbsent,
    rate,
    inOfficePercentage,
    inOfficePercentageValue,
    lowestPresent,
    highestPresent,
    lowestAbsent,
    highestAbsent,
  } = getFigures(attendance);
  expect(totalInOffice).toBe(10);
  expect(totalOffice).toBe(10);
  expect(totalAbsent).toBe(0);
  expect(rate).toBe("5.00");
  expect(Math.round(highestPercent)).toBe(100);
  expect(lowestPercent).toBe(100);
  expect(Math.round(highestRate)).toBe(5);
  expect(lowestRate).toBe(5);
  expect(totalInOfficeLast6Months).toBe(6);
  expect(totalAbsentLast6Months).toBe(0);
  expect(inOfficePercentageLast6Months).toBe("100.0%");
  expect(totalOfficeLast6Months).toBe(6);
  expect(rateLast6Months).toBe("5.00");
  expect(inOfficePercentage).toBe("100.0%");
  expect(Math.round(inOfficePercentageValue)).toBe(100);
  expect(lowestPresent).toBe(1);
  expect(highestPresent).toBe(1);
  expect(lowestAbsent).toBe(0);
  expect(highestAbsent).toBe(0);
});

test("getGreenColor", () => {
  expect(getGreenColor(0)).toBe("rgb(255, 255, 255)");
  expect(getGreenColor(50)).toBe("rgb(212.5, 255, 212.5)");
  expect(getGreenColor(70)).toBe("rgb(130.05, 255, 130.05)");
});
