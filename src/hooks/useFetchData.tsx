import { useQuery } from "react-query";
import axios from "axios";
import { CountryData, AggregatedData } from "../types";

const aggregateData = (data: CountryData[]): CountryData[] => {
  return data.map((countryData) => {
    const aggregated: AggregatedData = {
      totalVaccinations: countryData.data.reduce(
        (acc, item) => acc + (item.total_vaccinations || 0),
        0
      ),
      peopleVaccinated: countryData.data.reduce(
        (acc, item) => acc + (item.people_vaccinated || 0),
        0
      ),
      dailyVaccinations: countryData.data.reduce(
        (acc, item) => acc + (item.daily_vaccinations || 0),
        0
      ),
      // date: countryData.data.reduce((acc, item) => acc + (item.date || 0), 0),
      date: countryData.data.map((item) => item.date || 0),
      // date: countryData.data.map((item) => item.date),
    };

    return { ...countryData, aggregated };
  });
};

export const useFetchData = () => {
  const fetchData = async (): Promise<CountryData[]> => {
    const res = await axios.get(
      "https://gist.githubusercontent.com/DikenMaharjan/95754f5efce430c608c7996602b63041/raw/7b1519fa02751628fab5a32275a4729ec7d11c4e/vaccinations.json"
    );
    return aggregateData(res.data);
  };

  return useQuery("vaccinationData", fetchData);
};
