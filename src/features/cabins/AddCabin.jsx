import React, { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.open opens="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

        {/* <Modal.open opens='table'>
        <Button>Show Table</Button>
      </Modal.open>
      <Modal.Window name='table'>
        <CabinTable />
      </Modal.Window> */}
      </Modal>
    </div>
  );
}

// const AddCabin = () => {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <>
//       <div>
//         <BTN onClick={() => setIsOpenModal((show) => !show)}>Add new Cabin</BTN>
//         {isOpenModal && (
//           <Modal onClose={() => setIsOpenModal(false)}>
//             <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//           </Modal>
//         )}
//       </div>
//     </>
//   );
// };

export default AddCabin;
