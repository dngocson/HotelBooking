import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { Cabin, CabinForm } from "../../type/type";
import { toast } from "react-hot-toast";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

////////Initial Edit Value
const initialEditFormValue: Cabin = {
  name: "",
  maxCapacity: 0,
  regularPrice: 0,
  discount: 0,
  description: "",
};

function CreateCabinForm({
  cabinToEdit = initialEditFormValue,
  onCloseModal,
}: {
  cabinToEdit?: Cabin;
  onCloseModal?: () => void;
}) {
  const { id: editId, ...editValue } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CabinForm>({
      defaultValues: isEditSession ? editValue : initialEditFormValue,
    });
  const { errors } = formState;

  // Create Cabin
  const { isCreating, createCabin } = useCreateCabin();

  // Edit Cabin
  const { editCabin, isEditing } = useEditCabin();

  const isWorking = isCreating || isEditing;

  const onSubmit: SubmitHandler<CabinForm> = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (!data.image) return;

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  };
  const onError: SubmitErrorHandler<CabinForm> = () =>
    toast.error("Cannot submit form");
  return (
    <Form
      type={onCloseModal ? "model" : "regular"}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <FormRow
        disabled={isWorking}
        label="Cabin name"
        error={errors?.name?.message}
      >
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        disabled={isWorking}
        label="Maximum capacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        disabled={isWorking}
        label="Regular price"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        disabled={isWorking}
        label="Discount"
        error={errors?.discount?.message}
      >
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={() => onCloseModal?.()}
          $variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
