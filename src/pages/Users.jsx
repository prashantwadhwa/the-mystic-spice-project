import React from "react";
import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm"

const Users = () => {
  return (
    <>
      <Heading as="h1">Create a new User</Heading>
      <SignupForm />
    </>
  );
};

export default Users;
