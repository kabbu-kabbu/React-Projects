import React from "react";
import { CountryData } from "../types";

type TableRowProps = {
  data: CountryData;
};

const TableRow: React.FC<TableRowProps> = ({ data }) => {
  return (
    <div className="flex justify-between border-b-2 py-2">
      <div className="w-1/5">{data.country}</div>
      <div className="w-1/5">{data.iso_code}</div>
      <div className="w-1/5">{data.aggregated?.date}</div>
      <div className="w-1/5">{data.aggregated?.totalVaccinations || "N/A"}</div>
      <div className="w-1/5">{data.aggregated?.peopleVaccinated || "N/A"}</div>
      <div className="w-1/5">{data.aggregated?.dailyVaccinations || "N/A"}</div>
    </div>
  );
};

export default TableRow;
