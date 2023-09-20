import { CountryData } from "../types";

export const filterData = (
  data: CountryData[],
  searchTerm: string
  // startDate: string,
  // endDate: string
): CountryData[] => {
  return data.filter(
    ({ country, aggregated }) =>
      country.toLowerCase().includes(searchTerm.toLowerCase())
    // &&
    // (!startDate || aggregated.date >= startDate) &&
    // (!endDate || aggregated.date <= endDate)
  );
};
