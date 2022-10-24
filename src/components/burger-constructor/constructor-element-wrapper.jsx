import React from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';

export default function ConstructorElementWrapper({ type, isLocked, text, price, thumbnail, dragId, ingredientType, handleClose, draggable = false }) {
    const [{ opacity }, dragRef] = useDrag({
        type: 'selected-ingredient',
        item: { type, isLocked, text, price, thumbnail, draggable, dragId, ingredientType },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })

    return (
        <div className={`${styles.ingredientItem} mb-4`} ref={dragRef} data-drag-id={dragId}>
            {draggable && <DragIcon />}
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={text}
                price={price}
                thumbnail={thumbnail}
                handleClose={handleClose}
            />
        </div>
    )
}

ConstructorElementWrapper.propTypes = {
    ingredientType: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
    isLocked: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    dragId: PropTypes.string.isRequired,
    type: PropTypes.string,
    handleClose: PropTypes.func,
    draggable: PropTypes.bool,
}
