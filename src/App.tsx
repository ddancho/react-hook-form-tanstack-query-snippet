import { useForm, useWatch, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import { SelectInfoFormSchema, type SelectInfoForm } from "@/schema";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SelectCountry from "@/components/select-country";
import SelectCity from "@/components/select-city";
import SelectStreet from "@/components/select-street";

function App() {
  const methods = useForm<SelectInfoForm>({
    resolver: zodResolver(SelectInfoFormSchema),
    defaultValues: {
      countryName: "",
      cityName: "",
      streetName: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const { countryName, cityName, streetName } = useWatch({ control });

  const onSubmit = () => {
    toast.success(
      `Selected values are : ${countryName} - ${cityName} - ${streetName}`
    );

    reset();
  };

  const noCountrySelectedError =
    countryName === undefined || countryName === "";
  const noCitySelectedError = cityName === undefined || cityName === "";
  const noStreetSelectedError = streetName === undefined || streetName === "";

  return (
    <div className="flex justify-center h-fit">
      <div className="container mt-5 px-8 py-16 mx-auto max-w-lg ring-1 ring-gray-200 rounded shadow-lg">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 px-16"
          >
            <SelectCountry />

            <SelectCity
              isEnabled={!noCountrySelectedError}
              filter={{ countryName }}
            />

            <SelectStreet
              isEnabled={!noCitySelectedError}
              filter={{ countryName, cityName }}
            />

            <div className="mt-8">
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={
                  isSubmitting ||
                  noCountrySelectedError ||
                  noCitySelectedError ||
                  noStreetSelectedError
                }
              >
                {isSubmitting ? (
                  <LoaderCircleIcon className="animate-spin size-5" />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default App;
