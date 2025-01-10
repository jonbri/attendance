import { NavLink } from "react-router";
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
const inOfficePercentageValue = (totalInOffice / totalOffice) * 100;
const inOfficePercentage = `${inOfficePercentageValue.toFixed(1)}%`;
const averageDaysPerWeekInOffice = (
  (5 * inOfficePercentageValue) /
  100
).toFixed(1);

export default function Home() {
  return (
    <div>
      <NavLink to="/" end>
        Home
      </NavLink>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Attendance</th>
            <th>Avg</th>
            <th>Days</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map(([date, present, total]) => (
            <tr key={date}>
              <td>
                <NavLink
                  to={`/month/${date.toLowerCase().replace(" ", "")}`}
                  end
                >
                  {date}
                </NavLink>
              </td>
              <td>{`${present} / ${total}`}</td>
              <td>{`${((present / total) * 100).toFixed(1)}%`}</td>
              <td>{((5 * ((present / total) * 100)) / 100).toFixed(1)}</td>
            </tr>
          ))}
          <tr className="totals">
            <td>Total</td>
            <td>{`${totalInOffice} / ${totalOffice}`}</td>
            <td>{inOfficePercentage}</td>
            <td
              className={
                parseInt(averageDaysPerWeekInOffice) >= 3 ? "good" : "bad"
              }
            >
              {averageDaysPerWeekInOffice}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
