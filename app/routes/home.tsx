import type { Route } from "./+types/home";
import { attendance } from "~/data";
import { getGreenColor, getFigures } from "~/logic";
import classnames from "classnames";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

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
    totalDiff,
    last6MonthsDiff,
    // 2024 data
    totalInOffice2024,
    totalOffice2024,
    totalAbsent2024,
    inOfficePercentage2024,
    rate2024,
    diff2024,
    // 2025 data
    totalInOffice2025,
    totalOffice2025,
    totalAbsent2025,
    inOfficePercentage2025,
    rate2025,
    diff2025,
  } = getFigures(attendance);
  const aggregateColor = parseInt(rate) >= 3 ? "green" : brown;

  // Prepare chart data from attendance
  const chartData = attendance.map(([date, present, total]) => {
    const rate = (5 * ((present / total) * 100)) / 100;
    const percentage = (present / total) * 100;
    return {
      month: date,
      rate: parseFloat(rate.toFixed(2)),
      percentage: parseFloat(percentage.toFixed(1)),
      present,
      absent: total - present,
    };
  });

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
      .chart-container {
        width: 80%;
        margin: 20px auto;
        background-color: white;
        padding: 20px;
        border-radius: 8px;
      }
      .chart-title {
        text-align: center;
        margin-bottom: 10px;
        font-family: arial;
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
            <th>2024</th>
            <th>{totalInOffice2024}</th>
            <th>{totalAbsent2024}</th>
            <th>{totalOffice2024}</th>
            <th>{inOfficePercentage2024}</th>
            <th className="aggregate">
              {rate2024} ({diff2024})
            </th>
          </tr>
          <tr>
            <th></th>
            <th>2025</th>
            <th>{totalInOffice2025}</th>
            <th>{totalAbsent2025}</th>
            <th>{totalOffice2025}</th>
            <th>{inOfficePercentage2025}</th>
            <th className="aggregate">
              {rate2025} ({diff2025})
            </th>
          </tr>
          <tr>
            <th></th>
            <th>Six Months</th>
            <th>{totalInOfficeLast6Months}</th>
            <th>{totalAbsentLast6Months}</th>
            <th>{totalOfficeLast6Months}</th>
            <th>{inOfficePercentageLast6Months}</th>
            <th className="aggregate">
              {rateLast6Months} ({last6MonthsDiff})
            </th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th>{totalInOffice}</th>
            <th>{totalAbsent}</th>
            <th>{totalOffice}</th>
            <th>{inOfficePercentage}</th>
            <th className="aggregate">
              {rate} ({totalDiff})
            </th>
          </tr>
        </tbody>
      </table>

      <div className="chart-container">
        <h3 className="chart-title">Monthly Attendance Rate</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              label={{ value: "Rate", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === "rate") return [value.toFixed(2), "Rate"];
                return [value, name];
              }}
            />
            <Legend />
            <ReferenceLine
              y={3}
              stroke="orange"
              strokeDasharray="5 5"
              label="Target (3.0)"
            />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#2196F3"
              strokeWidth={2}
              dot={{ fill: "#2196F3", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
