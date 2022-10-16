import React from 'react';
import styles from './ingredients-group.module.css';
import Ingredient from '../ingredient/ingredient';
import PropTypes from 'prop-types';
import {ingredientPropTypes} from '../../utils/ingredientPropType';

const IngredientsGroup = ({title, ingredients, showDetails}) => {

    return (
        <>
            <h3 className="text text_type_main-medium mb-6" >
                {title}
            </h3>
            <div className={`${styles.ingredientsBlock} pl-4 pr-4 pb-10`}>
                {ingredients && ingredients.map((ingredient) => {
                    return (
                        <Ingredient
                            ingredientData={ingredient}
                            key={ingredient._id}
                            onClick={showDetails}
                            showDetails={showDetails}
                        />
                    )
                })}
            </div>
        </>
    )
}

IngredientsGroup.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
    type: PropTypes.string.isRequired,
    showDetails: PropTypes.func.isRequired,
}

export default IngredientsGroup;
