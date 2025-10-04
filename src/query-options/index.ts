import { getCities, getCountries, getStreets } from "@/query-actions";
import { queryOptions } from "@tanstack/react-query";

// used with query client
export const getCountriesQueryKey = "getCountriesQueryKey";

export const getCountriesQueryOptions = () => {
  return queryOptions({
    queryKey: [getCountriesQueryKey],
    queryFn: async () => {
      return await getCountries();
    },
    enabled: true,
  });
};

export const getCitiesQueryKey = "getCitiesQueryKey";

export const getCitiesQueryOptions = (country: unknown) => {
  return queryOptions({
    queryKey: [getCitiesQueryKey, { country }],
    queryFn: async () => {
      return await getCities(country);
    },
    enabled: false,
  });
};

export const getStreetsQueryKey = "getStreetsQueryKey";

export const getStreetsQueryOptions = (city: unknown) => {
  return queryOptions({
    queryKey: [getStreetsQueryKey, { city }],
    queryFn: async () => {
      return await getStreets(city);
    },
    enabled: false,
  });
};
