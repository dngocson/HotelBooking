import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { CabinForm, IApiError } from "../../type/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CabinForm>();
  const { errors } = formState;
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: (newcabin: CabinForm) => createCabin(newcabin),
    onSuccess: () => {
      toast.success("New Cabin created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err: IApiError) => toast.error(err.message),
  });
  const onSubmit: SubmitHandler<CabinForm> = (data) => {
    if (!data.image) return;
    return mutate({ ...data, image: data.image[0] });
  };
  const onError: SubmitErrorHandler<CabinForm> = () =>
    toast.error("Cannot submit form");
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        disabled={isCreating}
        label="Cabin name"
        error={errors?.name?.message}
      >
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        disabled={isCreating}
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
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        disabled={isCreating}
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
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        disabled={isCreating}
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
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
        disabled={isCreating}
      >
        <Textarea
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
