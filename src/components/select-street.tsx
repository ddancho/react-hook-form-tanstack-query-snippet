import { Label } from "@/components/ui/label";
import { getStreetsQueryOptions } from "@/query-options/index";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircleIcon } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

type SelectStreetProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  isEnabled: boolean;
  filter: unknown;
};

function SelectStreet({ isEnabled, filter, ...props }: SelectStreetProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { streetName } = useWatch({
    control,
  });

  const {
    data: streets,
    isPending: isStreetsPending,
    isEnabled: isStreetsQueryEnabled,
  } = useQuery({ ...getStreetsQueryOptions(filter), enabled: isEnabled });

  const isStreetsExists = streets && streets.length > 0;
  const noStreetError =
    isStreetsQueryEnabled && !isStreetsPending && !isStreetsExists;
  const noStreetSelectedError = streetName === undefined || streetName === "";

  return (
    <div className="space-y-2 mb-6">
      <div className="flex space-x-3">
        <Label htmlFor="street">Street</Label>
        {isStreetsQueryEnabled && isStreetsPending ? (
          <LoaderCircleIcon className="animate-spin size-4" />
        ) : null}
      </div>
      <select
        id="street"
        defaultValue=""
        disabled={!isStreetsQueryEnabled || noStreetError}
        className="w-full p-2 border border-gray-200 rounded-sm text-sm shadow-sm"
        {...register("streetName")}
        {...props}
      >
        <option value="" hidden>
          Select street
        </option>

        {streets?.map((street) => (
          <option key={street.id} value={street.name}>
            {street.name}
          </option>
        ))}
      </select>
      {errors.streetName && (
        <p className="text-sm text-red-400">{`${errors.streetName?.message}`}</p>
      )}
      {noStreetError && (
        <h3 className="text-sm underline text-red-700 font-bold">
          Please create some street data before continue!
        </h3>
      )}
      {noStreetSelectedError && (
        <h3 className="text-sm underline text-red-700 font-bold">
          Please select a street before continue!
        </h3>
      )}
    </div>
  );
}

export default SelectStreet;
