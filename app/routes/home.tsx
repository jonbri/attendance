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
            return (
              <tr key={date}>
                <td>{date}</td>
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
