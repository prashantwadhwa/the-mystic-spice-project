import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

const Error = styled.span`
  color: var(--color-red-700);
  font-size: 1.4rem;
`;

const CreateCabinForm = ({ cabinToEdit = {}, onCloseModal }) => {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  console.log(errors);

  const { isCreating, createCabin } = useCreateCabin();

  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    if (data.image) {
      const image = typeof data.image === "string" ? data.image : data.image[0];
      console.log(image);

      if (isEditSession) {
        editCabin(
          { newCabinData: { ...data, image }, id: editId },
          {
            onSuccess: (data) => {
              reset();
              onCloseModal?.();
            }, // Reset form on success
          }
        );
      } else {
        createCabin(
          { ...data, image: image },
          {
            onSuccess: (data) => {
              reset();
              onCloseModal?.();
            }, // Reset form on success
          }
        );
      }
    } else {
      // No image selected, handle accordingly
      if (isEditSession) {
        editCabin({ newCabinData: data, id: editId });
      } else {
        createCabin(data);
      }
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <label htmlFor="name">Cabin Name</label>
        <Input
          type="text"
          id="name"
          name="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>
      <FormRow>
        <label htmlFor="maxCapacity">Maximum Capacity</label>
        <Input
          type="number"
          id="maxCapacity"
          name="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Minimum Value should be 1" },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <label htmlFor="regularPrice">Regular Price</label>
        <Input
          type="number"
          id="regularPrice"
          name="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 500, message: "Minimum Value should be 500" },
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors.regularPrice.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <label htmlFor="discount">Discount</label>
        <Input
          type="number"
          id="discount"
          name="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              (value >= 0 && value < getValues().regularPrice) ||
              "Discount should be less than or equal to regular price",
          })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <label htmlFor="description">Description for website</label>
        <Textarea
          type="text"
          id="description"
          disabled={isWorking}
          name="description"
          {...register("description", { required: "This field is required" })}
        />
        {errors?.description?.message && (
          <Error>{errors.description.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <label htmlFor="image">Cabin Image</label>
        <FileInput
          type="file"
          accept="image/*"
          id="image"
          name="image"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
