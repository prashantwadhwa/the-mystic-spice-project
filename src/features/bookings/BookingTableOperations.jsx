import React from "react";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

const BookingTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked Out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by Date(Recent First)" },
          { value: "startDate-asc", label: "Sort by Date(Earlier First)" },

          { value: "totalPrice-desc", label: "Sort By Price (high-low)" },
          { value: "totalPrice-asc", label: "Sort By Price (low-high)" },
        ]}
      />
    </TableOperations>
  );
};

export default BookingTableOperations;
