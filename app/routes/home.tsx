import classnames from "classnames";
import type { Route } from "./+types/home";
import { attendance } from "~/data";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Attendance" }];
}
const totalInOffice = attendance.reduce((acc, [, present]) => acc + present, 0);
const totalOffice = attendance.reduce((acc, [, , total]) => acc + total, 0);
const totalAbsent = totalOffice - totalInOffice;
const inOfficePercentageValue = (totalInOffice / totalOffice) * 100;
const inOfficePercentage = `${inOfficePercentageValue.toFixed(1)}%`;
const exactRate = (5 * inOfficePercentageValue) / 100;
const rate = exactRate.toFixed(2);

const brown = "#8B4513";
const warningYellow = "#f0e68c";
const lighterGreen = "#98FB98";
const lightGreen = "#90EE90";
const middleGreen = "#00FF00";
const solidGreen = "#006400";
const thresholdColors = {
  2.6: warningYellow,
  2.7: lighterGreen,
  2.8: lightGreen,
  2.9: middleGreen,
  3: solidGreen,
};

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

export default function Home() {
  let backgroundColor = "white";
  for (const [threshold, color] of Object.entries(thresholdColors)) {
    if (exactRate >= parseFloat(threshold)) {
      backgroundColor = color;
    }
  }
  const aggregateColor = parseInt(rate) >= 3 ? "green" : brown;
  return (
    <div>
      <style>
        {`
      body {
        font-size: 1rem;
        background-color: ${backgroundColor};
        font-family: arial;
      }
      table {
        border-collapse: collapse;
        min-width: 80%;
        background-color: white;
        margin: auto;
        font-family: courier;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 6px;
        text-align: center;
      }
      th {
        background-color: #f2f2f2;
      }
      .aggregate {
         color: ${aggregateColor}
      }
      .highlighted {
        color: green;
        font-style: italic;
      }
      .bad, .good {
        font-style: italic;
      }
      .bad {
        color: red;
      }
      .good {
        font-weight: bold;
        color: green;
      }
      `}
      </style>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Pres</th>
            <th>Abs</th>
            <th>Tot</th>
            <th>Pct</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map(([date, present, total]) => {
            const absent = total - present;
            const inOfficePercentageValue = (present / total) * 100;
            const inOfficePercentage = `${inOfficePercentageValue.toFixed(1)}%`;
            const rate = (5 * ((present / total) * 100)) / 100;
            const isHighestPercent =
              `${highestPercent.toFixed(1)}%` === inOfficePercentage;
            const isLowestPercent =
              `${lowestPercent.toFixed(1)}%` === inOfficePercentage;
            return (
              <tr key={date}>
                <th
                  className={classnames(
                    isHighestPercent ? "highlighted" : undefined,
                  )}
                >
                  {date}
                </th>
                <td
                  className={classnames(
                    present === lowestPresent && "bad",
                    present === highestPresent && "good",
                  )}
                >
                  {present}
                </td>
                <td
                  className={classnames(
                    absent === lowestAbsent && "good",
                    absent === highestAbsent && "bad",
                  )}
                >
                  {absent}
                </td>
                <td>{total}</td>
                <td
                  className={classnames(
                    isLowestPercent && "bad",
                    isHighestPercent && "good",
                  )}
                >
                  {inOfficePercentage}
                </td>
                <td
                  className={classnames(
                    lowestRate === rate && "bad",
                    highestRate === rate && "good",
                  )}
                >
                  {rate.toFixed(1)}
                </td>
              </tr>
            );
          })}
          <tr>
            <th></th>
            <th>{totalInOffice}</th>
            <th>{totalAbsent}</th>
            <th>{totalOffice}</th>
            <th>{inOfficePercentage}</th>
            <th className="aggregate">{rate}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
