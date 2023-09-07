import React from "react";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import Heading from "../ui/Heading";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

const Bookings = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Bookings</Heading>
        <BookingTableOperations />
      </Row>

        
      <BookingTable/>
    </>
  );
};

export default Bookings;
