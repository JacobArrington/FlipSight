import React, { useRef, useState, useContext } from "react";
import ReactDOM from "react-dom";


const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  // callback function that will be called when modal is closing
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = () => {
    setModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onModalClose === "function") {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function called when modal is closing
    closeModal, // function to close the modal
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
    const { modalRef, modalContent, closeModal } = useContext(ModalContext);
  
    if (!modalRef || !modalRef.current || !modalContent) return null;
  
    return ReactDOM.createPortal(
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="fixed inset-0 bg-black bg-opacity-70" onClick={closeModal} />
        <div className="absolute bg-white">{modalContent}</div>
      </div>,
      modalRef.current
    );
  }



export const useModal = () => useContext(ModalContext);
