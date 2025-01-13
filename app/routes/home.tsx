import classnames from "classnames";
import type { Route } from "./+types/home";
import { attendance } from "~/data";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Attendance" },
    { name: "description", content: "An app to keep track of attendance" },
  ];
}
const totalInOffice = attendance.reduce((acc, [, present]) => acc + present, 0);
const totalOffice = attendance.reduce((acc, [, , total]) => acc + total, 0);
const totalAbsent = totalOffice - totalInOffice;
const inOfficePercentageValue = (totalInOffice / totalOffice) * 100;
const inOfficePercentage = `${inOfficePercentageValue.toFixed(1)}%`;
const rate = ((5 * inOfficePercentageValue) / 100).toFixed(1);

export default function Home() {
  const brown = "#8B4513";
  const aggregateColor = parseInt(rate) >= 3 ? "green" : brown;

  const highestPresent = attendance.reduce((acc, [, present]) => {
    return present > acc ? present : acc;
  }, 0);
  const lowestPresent = attendance.reduce((acc, [, present]) => {
    return present < acc ? present : acc;
  }, 100);

  const highestAbsent = attendance.reduce((acc, [, present, total]) => {
    const absent = total - present;
    return absent > acc ? absent : acc;
  }, 0);
  const lowestAbsent = attendance.reduce((acc, [, present, total]) => {
    const absent = total - present;
    return absent < acc ? absent : acc;
  }, 100);

  const highestPresentDate = attendance.find(
    ([, present]) => present === highestPresent,
  ) ?? ["", 0, 0];
  const lowestPresentDate = attendance.find(
    ([, present]) => present === lowestPresent,
  ) ?? ["", 0, 0];
  const highestAbsentDate = attendance.find(
    ([, present, total]) => total - present === highestAbsent,
  ) ?? ["", 0, 0];
  const lowestAbsentDate = attendance.find(
    ([, present, total]) => total - present === lowestAbsent,
  ) ?? ["", 0, 0];

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

  const highestPercentDate = attendance.find(
    ([, present, total]) => (present / total) * 100 === highestPercent,
  ) ?? ["", 0, 0];
  const lowestPercentDate = attendance.find(
    ([, present, total]) => (present / total) * 100 === lowestPercent,
  ) ?? ["", 0, 0];

  console.log("highestPercent", highestPercent);
  console.log("lowestPercent", lowestPercent);
  console.log("highestPercentDate", highestPercentDate);
  console.log("lowestPercentDate", lowestPercentDate);

  console.log("highestPresentDate", highestPresentDate);
  console.log("lowestPresentDate", lowestPresentDate);
  console.log("highestAbsentDate", highestAbsentDate);
  console.log("lowestAbsentDate", lowestAbsentDate);

  console.log("highestPresent", highestPresent);
  console.log("lowestPresent", lowestPresent);
  console.log("highestAbsent", highestAbsent);
  console.log("lowestAbsent", lowestAbsent);

  return (
    <div>
      <style>
        {`
      body {
        font-size: 1rem;
        background-color: lightblue;
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
        background-color: #f0e68c;
      }
      .bad {
        color: red;
      }
      .good {
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
            <th>Days</th>
            <th>Pct</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map(([date, present, total]) => {
            const absent = total - present;
            const inOfficePercentage = `${((present / total) * 100).toFixed(1)}%`;
            const rate = (5 * ((present / total) * 100)) / 100;

            const isHighestPresent = present === highestPresent;
            const isLowestPresent = present === lowestPresent;
            const isHighestAbsent = absent === highestAbsent;
            const isLowestAbsent = absent === lowestAbsent;
            const isHighestPercent =
              `${highestPercent.toFixed(1)}%` === inOfficePercentage;
            const isLowestPercent =
              `${lowestPercent.toFixed(1)}%` === inOfficePercentage;

            const isHighestRate = highestRate === rate;
            const isLowestRate = lowestRate === rate;

            let backgroundColor = isHighestPercent ? "gold" : "white";
            if (isLowestPercent) {
              backgroundColor = "white";
            }

            return (
              <tr
                key={date}
                className={classnames(
                  backgroundColor === "gold" ? "highlighted" : undefined,
                )}
              >
                <td>{date}</td>
                <td
                  className={classnames(
                    isLowestPresent && "bad",
                    isHighestPresent && "good",
                  )}
                >
                  {present}
                </td>
                <td
                  className={classnames(
                    isLowestAbsent && "bad",
                    isHighestAbsent && "good",
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
                    isLowestRate && "bad",
                    isHighestRate && "good",
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
