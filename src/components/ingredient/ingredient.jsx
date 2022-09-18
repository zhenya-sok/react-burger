import React from 'react';
import styles from './ingredient.module.scss';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {ingredientPropTypes} from '../../utils/ingredientPropType';

const Ingredient = ({ ingredientData, showDetails }) => {

    return (
        <>
            {ingredientData && ingredientData.map(ingredient =>
                <div className={`${styles.ingredientsItem} mb-8`} key={ingredient._id} onClick={() => showDetails(ingredient)}>
                    <img className={`${styles.image} pr-4 pl-4`} src={ingredient.image} alt="изображение ингредиента" />
                    <div className={`${styles.price} mt-1 mb-1`}>
                        <span className="text text_type_digits-default mt-1 mb-1">{ingredient.price}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <div className={`${styles.title} text text_type_main-default`}>{ingredient.name}</div>
                    <Counter count={1} size="default" />
                </div>
            )}
        </>
    )
}

Ingredient.propTypes = {
    ingredientData: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
    showDetails: PropTypes.func.isRequired,
}

export default Ingredient;
