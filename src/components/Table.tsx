import React from "react";
import { CountryData } from "../types";
import TableRow from "./TableRow";

type TableProps = {
  data: CountryData[];
};

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="flex flex-col mb-8">
      {/* Header */}
      <div className="flex justify-between border-b-2 py-2 font-bold">
        <div className="w-1/5">Country</div>
        <div className="w-1/5">ISO Code</div>
        <div className="w-1/5">Date</div>
        <div className="w-1/5">Total Vaccinations</div>
        <div className="w-1/5">People Vaccinated</div>
        <div className="w-1/5">Daily Vaccinations</div>
      </div>
      {/* Rows */}
      {data.map((countryData, index) => (
        <TableRow key={index} data={countryData} />
      ))}
    </div>
  );
};

export default Table;
