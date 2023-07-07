import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { Cabin, CabinForm, IApiError } from "../../type/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

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
}: {
  cabinToEdit: Cabin;
}) {
  const { id: editId, ...editValue } = cabinToEdit;
  const isEditSession = Boolean(editId !== 0);

  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CabinForm>({
      defaultValues: isEditSession ? editValue : initialEditFormValue,
    });
  const { errors } = formState;
  // Create Cabin
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: (newcabin: CabinForm) => createEditCabin(newcabin),
    onSuccess: () => {
      toast.success("New Cabin created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err: IApiError) => toast.error(err.message),
  });
  // Edit Cabin
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    // mutationFn: (newcabin: CabinForm) => createEditCabin(newcabin),
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err: IApiError) => toast.error(err.message),
  });

  const isWorking = isCreating || isEditing;

  const onSubmit: SubmitHandler<CabinForm> = (data) => {
    console.log("data", data);
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (!data.image) return;

    if (isEditSession)
      editCabin({ newCabinData: { ...data, image }, id: editId });
    else createCabin({ ...data, image: image });
  };
  const onError: SubmitErrorHandler<CabinForm> = () =>
    toast.error("Cannot submit form");
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
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
        disabled={isWorking}
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
        <Button variation="secondary" type="reset">
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
