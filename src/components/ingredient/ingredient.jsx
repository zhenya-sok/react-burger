import React, {useState, useContext} from 'react';
import styles from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/ingredientPropType';
import { IngredientDataContext } from '../../services/ingredientDataContext';

const Ingredient = ({ ingredientData, showDetails }) => {

    const { appSelectedIngredient, selectedIngredients } = useContext(IngredientDataContext);
    const [count, setCounter] = useState(null);

    const countHandler = () => {
        const addIngredient = appSelectedIngredient(ingredientData);
        addIngredient && setCounter(count + 1);
    }

    return (
        <>
            {/* Временно закомментировал открытие модального окна с информацией об ингредиенте, чтобы протестировать работу корзины */}

            <div className={`${styles.ingredientsItem}`} key={ingredientData._id} /* onClick={() => showDetails(ingredientData)} */
            onClick={() => countHandler()}>
                <img className={`${styles.ingredientsItem__image} pr-4 pl-4`} src={ingredientData.image} alt="изображение ингредиента" />
                <div className={`${styles.ingredientsItem__price} mt-1 mb-1`}>
                    <span className="text text_type_digits-default mt-1 mb-1">{ingredientData.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={`${styles.ingredientsItem__title} text text_type_main-default`}>{ingredientData.name}</div>
                {count && <Counter count={count} size="default" />}
            </div>
        </>
    )
}

Ingredient.propTypes = {
    ingredientData: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
    showDetails: PropTypes.func.isRequired,
}

export default Ingredient;
