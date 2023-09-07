import React from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

const Account = () => {
  return (
    <>
      <Heading as="h1">Update your Account</Heading>

      <Row>
        <Heading as="h3" style={{}}>Update User Data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm/>
      </Row>
    </>
  );
};

export default Account;
