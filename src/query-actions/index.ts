import { citiesInFrance, citiesInGermany, citiesInItaly } from "@/data/cities";
import { countries } from "@/data/countries";
import { streets } from "@/data/streets";
import { SelectCitiesInfoSchema, SelectStreetsInfoSchema } from "@/schema";

export async function getCountries() {
  await waitForBackend();

  return countries;
}

export async function getCities(country: unknown) {
  await waitForBackend();

  // just for show...
  const result = SelectCitiesInfoSchema.safeParse(country);

  if (!result.success) {
    console.error(result.error);

    return [];
  }

  const countryName = countries.find(
    (country) => country.name === result.data.countryName
  )?.name;

  if (!countryName) {
    return [];
  }

  switch (countryName) {
    case "Germany": {
      return citiesInGermany;
    }
    case "Italy": {
      return citiesInItaly;
    }
    case "France": {
      return citiesInFrance;
    }
    default:
      return [];
  }
}

export async function getStreets(city: unknown) {
  await waitForBackend();

  // just for show...
  const result = SelectStreetsInfoSchema.safeParse(city);

  if (!result.success) {
    console.error(result.error);

    return [];
  }

  // any street is fine...
  return streets;
}

async function waitForBackend() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
