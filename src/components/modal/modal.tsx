import React, { FC, ReactNode } from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import ReactDOM from 'react-dom';

interface IModalProps {
    children: ReactNode;
    closeModal: () => void;
    titleText?: string;
}

const Modal: FC<IModalProps> = ({children, closeModal, titleText}) => {
    const modalElement = document.querySelector("#modal") as HTMLElement;

    React.useEffect(() => {
        function actionEsc(e: KeyboardEvent) {
            e.key === "Escape" && closeModal();
        };

        document.addEventListener("keydown", actionEsc);
        
        return () => {
            document.removeEventListener("keydown", actionEsc);
        }
    }, [closeModal]);

    return ReactDOM.createPortal(
        <ModalOverlay closeModal={closeModal}>
            <div className={`${styles.modal} pl-10 pr-10 pt-10 pb-10`}>
                <div className={styles.modal__title}>
                    <h2 className="text text_type_main-large">{titleText}</h2>
                    <div className={styles.modal__closeBtn} onClick={closeModal}>
                        <CloseIcon type="primary" />
                    </div>
                </div>
                <div className={styles.modalContent}>{children}</div>
            </div>
        </ModalOverlay>,
        modalElement
    )
}

export default Modal;
