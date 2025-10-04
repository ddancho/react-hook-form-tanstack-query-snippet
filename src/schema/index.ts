import { z } from "zod";

export const SelectInfoFormSchema = z.object({
  countryName: z.string({ error: "Country name is required" }),
  cityName: z.string({ error: "City name is required" }),
  streetName: z.string({ error: "Street name is required" }),
});

export type SelectInfoForm = z.infer<typeof SelectInfoFormSchema>;

export const SelectCitiesInfoSchema = z.object({
  countryName: z.string({ error: "Country name is required" }),
});

export const SelectStreetsInfoSchema = z.object({
  cityName: z.string({ error: "City name is required" }),
});
