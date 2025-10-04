import { Label } from "@/components/ui/label";
import { getCitiesQueryOptions } from "@/query-options/index";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircleIcon } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

type SelectCityProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  isEnabled: boolean;
  filter: unknown;
};

function SelectCity({ isEnabled, filter, ...props }: SelectCityProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { cityName } = useWatch({
    control,
  });

  const {
    data: cities,
    isPending: isCitiesPending,
    isEnabled: isCitiesQueryEnabled,
  } = useQuery({ ...getCitiesQueryOptions(filter), enabled: isEnabled });

  const isCitiesExists = cities && cities.length > 0;
  const noCityError =
    isCitiesQueryEnabled && !isCitiesPending && !isCitiesExists;
  const noCitySelectedError = cityName === undefined || cityName === "";

  return (
    <div className="space-y-2 mb-6">
      <div className="flex space-x-3">
        <Label htmlFor="city">City</Label>
        {isCitiesQueryEnabled && isCitiesPending ? (
          <LoaderCircleIcon className="animate-spin size-4" />
        ) : null}
      </div>
      <select
        id="city"
        defaultValue=""
        disabled={!isCitiesQueryEnabled || noCityError}
        className="w-full p-2 border border-gray-200 rounded-sm text-sm shadow-sm"
        {...register("cityName")}
        {...props}
      >
        <option value="" hidden>
          Select city
        </option>

        {cities?.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
      {errors.cityName && (
        <p className="text-sm text-red-400">{`${errors.cityName?.message}`}</p>
      )}
      {noCityError && (
        <h3 className="text-sm underline text-red-700 font-bold">
          Please create some city data before continue!
        </h3>
      )}
      {noCitySelectedError && (
        <h3 className="text-sm underline text-red-700 font-bold">
          Please select a city before continue!
        </h3>
      )}
    </div>
  );
}

export default SelectCity;
