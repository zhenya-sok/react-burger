import React from 'react';
import styles from './modal-overlay.module.scss';
import PropTypes from 'prop-types';

const ModalOverlay = ({children}) => {
    return(
        <div className={styles.overlay}>{children}</div>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired,
}

export default ModalOverlay;
