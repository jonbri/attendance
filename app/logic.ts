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
    0
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
    1
  )}%`;
  const exactRateLast6Months = (5 * inOfficePercentageValueLast6Months) / 100;
  const rateLast6Months = exactRateLast6Months.toFixed(2);
  const totalAbsentLast6Months =
    totalOfficeLast6Months - totalInOfficeLast6Months;

  const highestPresent = attendance.reduce(
    (acc, [, present]) => (present > acc ? present : acc),
    0
  );
  const lowestPresent = attendance.reduce(
    (acc, [, present]) => (present < acc ? present : acc),
    100
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

  const totalDiff = totalInOffice - totalAbsent;
  const last6MonthsDiff = totalInOfficeLast6Months - totalAbsentLast6Months;

  // 2024 data
  const attendance2024 = attendance.filter(([date]) => date.includes("2024"));
  const totalInOffice2024 = attendance2024.reduce(
    (acc, [, present]) => acc + present,
    0
  );
  const totalOffice2024 = attendance2024.reduce(
    (acc, [, , total]) => acc + total,
    0
  );
  const totalAbsent2024 = totalOffice2024 - totalInOffice2024;
  const inOfficePercentageValue2024 =
    (totalInOffice2024 / totalOffice2024) * 100;
  const inOfficePercentage2024 = `${inOfficePercentageValue2024.toFixed(1)}%`;
  const rate2024 = ((5 * inOfficePercentageValue2024) / 100).toFixed(2);
  const diff2024 = totalInOffice2024 - totalAbsent2024;

  // 2025 data
  const attendance2025 = attendance.filter(([date]) => date.includes("2025"));
  const totalInOffice2025 = attendance2025.reduce(
    (acc, [, present]) => acc + present,
    0
  );
  const totalOffice2025 = attendance2025.reduce(
    (acc, [, , total]) => acc + total,
    0
  );
  const totalAbsent2025 = totalOffice2025 - totalInOffice2025;
  const inOfficePercentageValue2025 =
    (totalInOffice2025 / totalOffice2025) * 100;
  const inOfficePercentage2025 = `${inOfficePercentageValue2025.toFixed(1)}%`;
  const rate2025 = ((5 * inOfficePercentageValue2025) / 100).toFixed(2);
  const diff2025 = totalInOffice2025 - totalAbsent2025;

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
    totalDiff: totalDiff > 0 ? `+${totalDiff}` : totalDiff,
    last6MonthsDiff:
      last6MonthsDiff > 0 ? `+${last6MonthsDiff}` : last6MonthsDiff,
    // 2024 data
    totalInOffice2024,
    totalOffice2024,
    totalAbsent2024,
    inOfficePercentage2024,
    rate2024,
    diff2024: diff2024 > 0 ? `+${diff2024}` : diff2024,
    // 2025 data
    totalInOffice2025,
    totalOffice2025,
    totalAbsent2025,
    inOfficePercentage2025,
    rate2025,
    diff2025: diff2025 > 0 ? `+${diff2025}` : diff2025,
  };
};
