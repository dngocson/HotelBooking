import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    isLoading,
  } = useSettings();
  const { updateSetting, isUpdating } = useUpdateSetting();

  // return <Spinner />;
  if (isLoading) return <Spinner />;

  function handleBlur(e: React.FocusEvent<HTMLInputElement>, field: string) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value });
  }

  // This time we are using UNCONTROLLED fields, so we will NOT store state
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          defaultValue={minBookingLength}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleBlur(e, "minBookingLength")
          }
          disabled={isUpdating}
          id="min-nights"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          defaultValue={maxBookingLength}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleBlur(e, "maxBookingLength")
          }
          disabled={isUpdating}
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleBlur(e, "maxGuestsPerBooking")
          }
          disabled={isUpdating}
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          defaultValue={breakfastPrice}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleBlur(e, "breakfastPrice")
          }
          disabled={isUpdating}
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
