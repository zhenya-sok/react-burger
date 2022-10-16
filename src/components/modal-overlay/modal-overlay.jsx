import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({children, closeModal}) => {
    const handleOverlay = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return(
        <div className={styles.overlay} onClick={handleOverlay}>{children}</div>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired,
    closeModal: PropTypes.func.isRequired,
}

export default ModalOverlay;
