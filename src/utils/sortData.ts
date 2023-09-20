import { CountryData, AggregatedData } from "../types";

type SortOrder = "asc" | "desc";
type SortableKeys = keyof CountryData | keyof AggregatedData;

export const sortData = (
  data: CountryData[],
  key: SortableKeys,
  order: SortOrder
): CountryData[] => {
  return [...data].sort((a, b) => {
    const valueA =
      key in a
        ? a[key as keyof CountryData]
        : a.aggregated?.[key as keyof AggregatedData];
    const valueB =
      key in b
        ? b[key as keyof CountryData]
        : b.aggregated?.[key as keyof AggregatedData];

    // Handle undefined cases
    if (valueA === undefined && valueB === undefined) return 0;
    if (valueA === undefined) return order === "asc" ? 1 : -1;
    if (valueB === undefined) return order === "asc" ? -1 : 1;

    if (valueA < valueB) return order === "asc" ? -1 : 1;
    if (valueA > valueB) return order === "asc" ? 1 : -1;
    return 0;
  });
};
