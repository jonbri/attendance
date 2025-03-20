import type { Route } from "./+types/home";
import { attendance } from "~/data";
import { getGreenColor, getFigures } from "~/logic";
import classnames from "classnames";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Attendance" }];
}

const brown = "#8B4513";

export default function Home() {
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
  const aggregateColor = parseInt(rate) >= 3 ? "green" : brown;
  return (
    <div>
      <style>
        {`
      body {
        font-size: 1rem;
        background-color: ${getGreenColor(inOfficePercentageValue)};
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
      .sixmonths {
        border-top: 2px solid black;
      }
      `}
      </style>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Pres</th>
            <th>Abs</th>
            <th>Tot</th>
            <th>Pct</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map(([date, present, total], i) => {
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
                <th className="index">{i}</th>
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
                  style={{
                    backgroundColor: getGreenColor(inOfficePercentageValue),
                  }}
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
          <tr className="sixmonths">
            <th></th>
            <th>Six Months</th>
            <th>{totalInOfficeLast6Months}</th>
            <th>{totalAbsentLast6Months}</th>
            <th>{totalOfficeLast6Months}</th>
            <th>{inOfficePercentageLast6Months}</th>
            <th className="aggregate">{rateLast6Months}</th>
          </tr>
          <tr>
            <th></th>
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
