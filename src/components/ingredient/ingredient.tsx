import React, { FC } from 'react';
import styles from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useSelectedCountById } from '../../utils/hooks/useSelectedCountById';
import { useLocation, useHistory } from 'react-router-dom';
import { IIngredientData } from '../../types/burgerTypes';

interface IIngredientProps {
    ingredientData: IIngredientData;
    showDetails: (ingredientData: IIngredientData) => void;
    onClick: (item: IIngredientData) => void;
}

const Ingredient: FC<IIngredientProps> = ({ ingredientData, showDetails }) => {

    const location = useLocation();
    const history = useHistory();

    const count = useSelectedCountById(ingredientData._id);

    const chooseIngredient = (ingredientData: IIngredientData) => {
        showDetails(ingredientData);
    }

    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredient',
        item: { ...ingredientData },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })

    function navigate(id: string) {
        history.push(`/ingredients/${id}`, { background: location });
    }

    return (
        <div ref={dragRef} style={{ opacity }} onClick={() => navigate(ingredientData._id)}>
            <div className={`${styles.ingredientsItem}`} onClick={() => chooseIngredient(ingredientData)}>
                <img className={`${styles.ingredientsItem__image} pr-4 pl-4`} src={ingredientData.image} alt="изображение ингредиента" />
                <div className={`${styles.ingredientsItem__price} mt-1 mb-1`}>
                    <span className="text text_type_digits-default mt-1 mb-1">{ingredientData.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={`${styles.ingredientsItem__title} text text_type_main-default`}>{ingredientData.name}</div>
                {count > 0 && <Counter count={count} size="default" />}
            </div>
        </div>

    )
}

export default Ingredient;
