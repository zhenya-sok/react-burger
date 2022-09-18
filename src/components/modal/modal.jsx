import React from 'react';
import styles from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Modal = ({children, closeModal, titleText}) => {
    const modalElement = document.querySelector("#modal");

    React.useEffect(() => {
        function actionEsc(e) {
            e.key === "Escape" && closeModal();
        };

        document.addEventListener("keydown", actionEsc);
        
        return () => {
            document.removeEventListener("keydown", actionEsc);
        }
    }, [closeModal]);

    return ReactDOM.createPortal(
        <>
            <ModalOverlay>
                <div className={`${styles.modal} pl-10 pr-10 pt-10 pb-15`}>
                    <div className={styles.title}>
                        <h2 className="text text_type_main-large">{titleText}</h2>
                        <div className={styles.closeBtn} onClick={closeModal}>
                            <CloseIcon type="primary" />
                        </div>
                    </div>
                    <div className={styles.modalContent}>{children}</div>
                </div>
            </ModalOverlay>
        </>,
        modalElement
    )
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    closeModal: PropTypes.func.isRequired,
    titleText: PropTypes.string,
}

export default Modal;
