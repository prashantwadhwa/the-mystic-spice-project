import React, { useState } from "react";
import Form from "../../ui/Form";
import { toast } from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import Button from "../../ui/Button";

import { useUser } from "./useUser";
import FileInput from "../../ui/FileInput";
import { useUpdateUser } from "./useUpdateUser";

const UpdateUserDataForm = () => {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName) {
      toast.error("Please enter your full name");
      return;
    }

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email Address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="Full Name">
        <Input
          value={fullName}
          type="text"
          id="fullName"
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
};

export default UpdateUserDataForm;
