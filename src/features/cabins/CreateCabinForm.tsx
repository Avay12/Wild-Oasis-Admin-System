import { useForm } from "react-hook-form";

import styled from "styled-components";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

interface Props {
  cabinToEdit?: {
    id?: number;
    created_at?: string;
    name?: string;
    maxCapacity?: number;
    regularPrice?: number;
    description?: string;
    image?: string;
    discount?: number;
  };
  onCloseModal?: Function;
}

interface FormData {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList | File | any;
}

export interface NewData {
  newCabin: FormData;
  // Extend NewData with FormData and add any additional fields if needed
}

export interface EditData {
  newCabin: FormData;
  id?: number;
}

const Label = styled.label`
  font-weight: 500;
`;

export default function CreateCabinForm({
  cabinToEdit = {},
  onCloseModal,
}: Props) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();
  const isWorking = isCreating || isUpdating;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<FormData>({
      defaultValues: isEditSession ? editValues : {},
    });
  const { errors } = formState;

  function onSubmit(data: FormData) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      return updateCabin(
        { newCabin: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );

    const Data: NewData = { newCabin: { ...data, image: image } };

    createCabin(Data, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  function onError(error: Object) {
    return error;
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity Should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            validate: (value) =>
              value >= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="text"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        <>
          <Label htmlFor="image">Cabin photo</Label>
          <FileInput
            id="image"
            accept="image/*"
            type="file"
            disabled={isWorking}
            {...register("image", {
              required: isEditSession ? false : "This field is required",
            })}
          />
        </>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <>
          <Button
            variation="secondary"
            type="reset"
            disabled={isWorking}
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isEditSession ? "Edit cabin" : "Add cabin"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}
