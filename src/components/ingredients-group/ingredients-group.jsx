import React from 'react';
import styles from './ingredients-group.module.css';
import Ingredient from '../ingredient/ingredient';
import PropTypes from 'prop-types';
import {ingredientPropTypes} from '../../utils/ingredientPropType';

const IngredientsGroup = ({ingredients, type, showDetails}) => {

    const bunsList = ingredients && ingredients.filter((ingredient) => ingredient.type === "bun");
    const saucesList = ingredients && ingredients.filter((ingredient) => ingredient.type === "sauce");
    const mainList = ingredients && ingredients.filter((ingredient) => ingredient.type === "main");

    return (
        <div className={`${styles.ingredientsBlock} pl-4 pr-4 pt-6 pb-2`}>
            {type === "bun" && <Ingredient key={ingredients._id} showDetails={showDetails} ingredientData={bunsList} />}
            {type === "sauce" && <Ingredient key={ingredients._id} showDetails={showDetails} ingredientData={saucesList} />}
            {type === "main" && <Ingredient key={ingredients._id} showDetails={showDetails} ingredientData={mainList} />}
        </div>
    )
}

IngredientsGroup.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
    type: PropTypes.string.isRequired,
    showDetails: PropTypes.func.isRequired,
}

export default IngredientsGroup;
