import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import css from "./Modal.module.css";

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

 const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  
    return createPortal(
      <div className={css.overlay} onClick={handleBackdropClick}>
        <div className={css.modal}>
          {children}
          <button
            className={css.button}
            type="button"
            onClick={onClose}
          >
            X
          </button>
        </div>
      </div>,
      modalRoot,
    );
  }


Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};