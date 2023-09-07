import styled from "styled-components";
import React, { createContext, useContext, useEffect, useRef } from "react";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { useState } from "react";
import { cloneElement } from "react";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s ease-in-out;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s ease-in-out;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const Child = styled.div`
  margin-top: 2rem;
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");


  const close = () => {
    setOpenName("");
  };
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);


  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

const Window = ({ children, name }) => {
  const { openName, close } = useContext(ModalContext);
  const ref = useRef();

  //bahar click krne pe modal band krane ke liye
  useEffect(function () {
    function handleClick(e) {
      if(ref.current && !ref.current.contains(e.target)){
        close();
        console.log("outside click")
      }
    }

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  },[close]);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button>
          <HiXMark onClick={close} />
        </Button>
        <Child>{cloneElement(children, { onCloseModal: close })}</Child>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

Modal.open = Open;
Modal.Window = Window;

export default Modal;
