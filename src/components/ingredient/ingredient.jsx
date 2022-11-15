import React from 'react';
import styles from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useSelectedCountById } from '../../utils/useSelectedCountById';
import { useLocation, useHistory } from 'react-router-dom';

const Ingredient = ({ ingredientData, showDetails }) => {

    const location = useLocation();
    const history = useHistory();

    const count = useSelectedCountById(ingredientData._id);

    const chooseIngredient = (ingredientData) => {
        showDetails(ingredientData);
    }

    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredient',
        item: { ...ingredientData },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })

    function navigate(id) {
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

Ingredient.propTypes = {
    ingredientData: PropTypes.object.isRequired,
    showDetails: PropTypes.func.isRequired,
}

export default Ingredient;
