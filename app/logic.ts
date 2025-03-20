import type { OfficeMonth } from "./types";

const standard = 3;
const standardPercentage = (standard / 5) * 100;

export const getGreenColor = (percent: number) => {
  const calculateGreenness = (percent: number) => {
    if (percent < standardPercentage) return percent * (percent / 150);
    return percent * (percent / 100);
  };
  const greenness = calculateGreenness(percent);
  return `rgb(${255 - greenness * 2.55}, 255, ${255 - greenness * 2.55})`;
};

export const getFigures = (attendance: OfficeMonth[]) => {
  const totalInOffice = attendance.reduce(
    (acc, [, present]) => acc + present,
    0,
  );
  const totalOffice = attendance.reduce((acc, [, , total]) => acc + total, 0);
  const totalAbsent = totalOffice - totalInOffice;
  const inOfficePercentageValue = (totalInOffice / totalOffice) * 100;
  const inOfficePercentage = `${inOfficePercentageValue.toFixed(1)}%`;
  const exactRate = (5 * inOfficePercentageValue) / 100;
  const rate = exactRate.toFixed(2);

  const totalInOfficeLast6Months = attendance
    .slice(-6)
    .reduce((acc, [, present]) => acc + present, 0);
  const totalOfficeLast6Months = attendance

    .slice(-6)
    .reduce((acc, [, , total]) => acc + total, 0);
  const inOfficePercentageValueLast6Months =
    (totalInOfficeLast6Months / totalOfficeLast6Months) * 100;
  const inOfficePercentageLast6Months = `${inOfficePercentageValueLast6Months.toFixed(
    1,
  )}%`;
  const exactRateLast6Months = (5 * inOfficePercentageValueLast6Months) / 100;
  const rateLast6Months = exactRateLast6Months.toFixed(2);
  const totalAbsentLast6Months =
    totalOfficeLast6Months - totalInOfficeLast6Months;

  const highestPresent = attendance.reduce(
    (acc, [, present]) => (present > acc ? present : acc),
    0,
  );
  const lowestPresent = attendance.reduce(
    (acc, [, present]) => (present < acc ? present : acc),
    100,
  );

  const highestAbsent = attendance.reduce((acc, [, present, total]) => {
    const absent = total - present;
    return absent > acc ? absent : acc;
  }, 0);
  const lowestAbsent = attendance.reduce((acc, [, present, total]) => {
    const absent = total - present;
    return absent < acc ? absent : acc;
  }, 100);

  const highestRate = attendance.reduce((acc, [, present, total]) => {
    const rate = (5 * ((present / total) * 100)) / 100;
    return rate > acc ? rate : acc;
  }, 0);
  const lowestRate = attendance.reduce((acc, [, present, total]) => {
    const rate = (5 * ((present / total) * 100)) / 100;
    return rate < acc ? rate : acc;
  }, 100);

  const highestPercent = attendance.reduce((acc, [, present, total]) => {
    const percent = (present / total) * 100;
    return percent > acc ? percent : acc;
  }, 0);
  const lowestPercent = attendance.reduce((acc, [, present, total]) => {
    const percent = (present / total) * 100;
    return percent < acc ? percent : acc;
  }, 100);
  return {
    totalInOffice,
    totalOffice,
    totalAbsent,
    rate,
    highestPercent,
    lowestPercent,
    highestRate,
    lowestRate,
    lowestPresent,
    highestPresent,
    lowestAbsent,
    highestAbsent,
    totalInOfficeLast6Months,
    totalAbsentLast6Months,
    inOfficePercentageLast6Months,
    totalOfficeLast6Months,
    rateLast6Months,
    inOfficePercentage,
    inOfficePercentageValue,
  };
};
