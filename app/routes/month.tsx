import { NavLink } from "react-router";
import type { Route } from "./+types/month";
import { attendance } from "~/data";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Month" }, { name: "description", content: "Month" }];
}

export default function Month({ params: { id } }: Route.ComponentProps) {
  const month = attendance.find(
    ([date]) => date.toLowerCase().replace(" ", "") === id,
  );
  return (
    <div>
      <NavLink to="/" end>
        Home
      </NavLink>
      {month ? (
        <div>
          <h4>{month.toString()}</h4>
        </div>
      ) : (
        <div>Month not found</div>
      )}
    </div>
  );
}
