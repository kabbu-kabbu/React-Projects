export interface DataPoint {
  date: string;
  total_vaccinations?: number;

  people_vaccinated?: number;
  daily_vaccinations?: number;
  total_vaccinations_per_hundred?: number;
  people_vaccinated_per_hundred?: number;
  daily_vaccinations_per_million?: number;
}

export interface AggregatedData {
  date: string;
  totalVaccinations: number;
  peopleVaccinated: number;
  dailyVaccinations: number;
}

export interface CountryData {
  country: string;
  iso_code: string;
  date: string;
  data: DataPoint[];
  aggregated?: AggregatedData;
}
