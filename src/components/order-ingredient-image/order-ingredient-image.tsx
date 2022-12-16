import React, { FC } from 'react';
import styles from './order-ingredient-image.module.css';
import { IIngredientData } from '../../types/burgerTypes';
import { useSelector } from '../../utils/hooks/hooks';

interface IOrderIngredientImageProps {
    ingredientId: string;
    isOpacity?: boolean;
}

const OrderIngredientImage: FC<IOrderIngredientImageProps> = ({ ingredientId, isOpacity }) => {

    const ingredientsData = useSelector((state) => state.ingredientsReducer.ingredients);

    const ingredientImage = ingredientsData && ingredientsData.filter((item: IIngredientData) => item._id === ingredientId)[0]?.image; 

    return (
        <>
            <div className={styles.imageBox}>
                <div className={styles.ingredientImageWrapper}>
                    <img className={!isOpacity ? styles.ingredientImage : styles.ingredientOpacityImage} src={ingredientImage} alt="изображение ингредиента" />
                </div>
            </div>
        </>
    )
}

export default OrderIngredientImage;
