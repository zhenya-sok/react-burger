import React from 'react';
import styles from './ingredient-details.module.scss';
import '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropTypes} from '../../utils/ingredientPropType';

const IngredientDetail = ({ ingredientInfo }) => {

    return (
        <div className={styles.ingredientDetailWrapper} >
            <img className={`${styles.ingredientDetailWrapper__image} mb-4`} src={ingredientInfo.image_large} alt="изображение ингредиента" />
            <h3 className="pb-8 text text_type_main-medium">{ingredientInfo.name}</h3>
            <ul className={`${styles.ingredientDetailWrapper__detailsList} text text_type_main-default text_color_inactive`}>
                <li className="mr-5">
                    <p className="pb-2">Калории,ккал</p>
                    <p className="text text_type_digits-default">{ingredientInfo.calories}</p>
                </li>
                <li className="mr-5">
                    <p className="pb-2">Белки, г</p>
                    <p className="text text_type_digits-default">{ingredientInfo.proteins}</p>
                </li>
                <li className="mr-5">
                    <p className="pb-2">Жиры, г</p>
                    <p className="text text_type_digits-default">{ingredientInfo.fat}</p>
                </li>
                <li>
                    <p className="pb-2">Углеводы, г</p>
                    <p className="text text_type_digits-default">{ingredientInfo.carbohydrates}</p>
                </li>
            </ul>
        </div>
    )
}

IngredientDetail.propTypes = {
    ingredientInfo: ingredientPropTypes.isRequired,
}

export default IngredientDetail;
