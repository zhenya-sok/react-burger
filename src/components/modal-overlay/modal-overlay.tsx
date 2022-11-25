import React, { FC, ReactNode } from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
    children: ReactNode;
    closeModal: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({children, closeModal}) => {
    const handleOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return(
        <div className={styles.overlay} onClick={handleOverlay}>{children}</div>
    )
}

export default ModalOverlay;
