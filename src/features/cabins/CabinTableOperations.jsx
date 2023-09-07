import React from "react";
import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";
import SortBy from "../../ui/SortBy.jsx";

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by Name(A-Z)" },
          { value: "name-desc", label: "Sort by Name(Z-A)" },

          { value: "regularPrice-asc", label: "Sort By Price (low-high)" },
          { value: "regularPrice-desc", label: "Sort By Price (high-low)" },
          
          { value: "maxCapacity-asc", label: "Sort By Capacity (low-high)" },
          { value: "maxCapacity-desc", label: "Sort By Capacity (high-low)" },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
