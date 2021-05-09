import Cookies from "js-cookie";
import React from "react";
import "../styles/Modal.css";

interface ModalData {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ ...props }: ModalData) => {
  return (
    <div>
      {props.showModal ? (
        <div className="modal">
          <div className="modalContent">
            <div className="modalHeader">
              <h4 className="modalTitle"> Shareable Link </h4>
            </div>
            <div className="modalBody">
              {window.location.href + "/" + Cookies.get("UUID")}
            </div>
            <div className="modalFooter">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    window.location.href + "/" + Cookies.get("UUID")
                  );
                }}
              >
                {" "}
                Copy{" "}
              </button>
              <button
                className="modalBtn"
                onClick={() => {
                  props.setShowModal(!props.showModal);
                }}
              >
                {" "}
                Close{" "}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Modal;
