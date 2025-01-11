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
const averageDaysPerWeekInOffice = (
  (5 * inOfficePercentageValue) /
  100
).toFixed(1);

export default function Home() {
  const aggregateColor =
    parseInt(averageDaysPerWeekInOffice) >= 3 ? "green" : "red";

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
    <div style={{ backgroundColor: "lightblue", padding: "30px" }}>
      <style>
        {`
      table {
        border-collapse: collapse;
        width: 75%;
        background-color: white;
        margin: auto;
      }
      th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: center;
      }
      th {
        background-color: #f2f2f2;
      }
      .aggregate {
         color: ${aggregateColor}
      }
      `}
      </style>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Present</th>
            <th>Absent</th>
            <th>Days</th>
            <th>PCT</th>
            <th>Per-week</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map(([date, present, total]) => {
            const absent = total - present;
            // const inOfficePercentage = `${((present / total) * 100).toFixed(1)}%`;
            // const averageDaysPerWeekInOffice = (
            //   (5 * ((present / total) * 100)) /
            //   100
            // ).toFixed(1);

            // const isHighestPresent = highestPresentDate[0].toString() === date;
            // const isLowestPresent = lowestPresentDate[0].toString() === date;
            // const isHighestAbsent = highestAbsentDate[0].toString() === date;
            // const isLowestAbsent = lowestAbsentDate[0].toString() === date;
            const isHighestPercent = highestPercentDate[0].toString() === date;
            const isLowestPercent = lowestPercentDate[0].toString() === date;

            let backgroundColor = isHighestPercent ? "green" : "white";
            if (isLowestPercent) {
              backgroundColor = "white";
            }

            return (
              <tr key={date}>
                <td style={{ backgroundColor }}>{date}</td>
                <td>{present}</td>
                <td>{absent}</td>
                <td>{total}</td>
                <td>{`${((present / total) * 100).toFixed(1)}%`}</td>
                <td>{((5 * ((present / total) * 100)) / 100).toFixed(1)}</td>
              </tr>
            );
          })}
          <tr>
            <th>Total</th>
            <th>{totalInOffice}</th>
            <th>{totalAbsent}</th>
            <th>{totalOffice}</th>
            <th>{inOfficePercentage}</th>
            <th className="aggregate">{averageDaysPerWeekInOffice}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
