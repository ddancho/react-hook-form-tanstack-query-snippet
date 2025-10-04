import { Label } from "@/components/ui/label";
import { getCountriesQueryOptions } from "@/query-options/index";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircleIcon } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

type SelectCountryProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  // other props
};

function SelectCountry(props: SelectCountryProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { countryName } = useWatch({
    control,
  });

  const {
    data: countries,
    isPending: isCountriesPending,
    isEnabled: isCountriesQueryEnabled,
  } = useQuery(getCountriesQueryOptions());

  const isCountriesExists = countries && countries.length > 0;
  const noCountryError =
    isCountriesQueryEnabled && !isCountriesPending && !isCountriesExists;
  const noCountrySelectedError =
    countryName === undefined || countryName === "";

  return (
    <div className="space-y-2 mb-6">
      <div className="flex space-x-3">
        <Label htmlFor="country">Country</Label>
        {isCountriesQueryEnabled && isCountriesPending ? (
          <LoaderCircleIcon className="animate-spin size-4" />
        ) : null}
      </div>
      <select
        id="country"
        defaultValue=""
        disabled={!isCountriesQueryEnabled || noCountryError}
        className="w-full p-2 border border-gray-200 rounded-sm text-sm shadow-sm"
        {...register("countryName")}
        {...props}
      >
        <option value="" hidden>
          Select country
        </option>

        {countries?.map((country) => (
          <option key={country.id} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
      {errors.countryName && (
        <p className="text-sm text-red-400">{`${errors.countryName?.message}`}</p>
      )}
      {noCountryError && (
        <h3 className="text-sm underline text-red-700 font-bold">
          Please create some country data before continue!
        </h3>
      )}
      {noCountrySelectedError && (
        <h3 className="text-sm underline text-red-700 font-bold">
          Please select a country before continue!
        </h3>
      )}
    </div>
  );
}

export default SelectCountry;
