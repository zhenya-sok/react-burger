import React, { FC } from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import styles from './burger-constructor.module.css';

type IConstructorElementWrapperProps = {
    type: "top" | "bottom" | undefined,
    isLocked: boolean,
    text: string,
    price: number,
    thumbnail: string,
    dragId: string,
    ingredientType: "bun" | "main" | "sauce",
    handleClose?: () => void,
    draggable?: boolean,
}

const ConstructorElementWrapper: FC<IConstructorElementWrapperProps> = ({ type, isLocked, text, price, thumbnail, dragId, ingredientType, handleClose, draggable = false }) => {
    const [{ opacity }, dragRef] = useDrag({
        type: 'selected-ingredient',
        item: { type, isLocked, text, price, thumbnail, draggable, dragId, ingredientType },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })

    return (
        <div className={`${styles.ingredientItem} mb-4`} ref={dragRef} data-drag-id={dragId}>
            {draggable && <DragIcon type="primary" />}
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

export default ConstructorElementWrapper;
