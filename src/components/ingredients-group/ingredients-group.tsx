import React from 'react';
import styles from './ingredients-group.module.css';
import Ingredient from '../ingredient/ingredient';
import { IIngredientData } from '../../types/burgerTypes';

interface IIngredientsGroupProps {
    title: string;
    ingredients: IIngredientData[];
    showDetails: (item: IIngredientData) => void;
    titleId: string;
    ref: (node?: Element | null | undefined) => void
}

type Ref = HTMLDivElement | null;

const IngredientsGroup = React.forwardRef<Ref, IIngredientsGroupProps>(({title, ingredients, showDetails, titleId}, groupRef) => {
    
    return (
        <>
            <h3 className="text text_type_main-medium mb-6" id={titleId}>
                {title}
            </h3>
            <div className={`${styles.ingredientsBlock} pl-4 pr-4 pb-10`} ref={groupRef}>
                {ingredients && ingredients.map((ingredient) => {
                    return (
                        <Ingredient
                            ingredientData={ingredient}
                            onClick={showDetails}
                            showDetails={showDetails}
                            key={ingredient._id}
                        />
                    )
                })}
            </div>
        </>
    )
});

export default IngredientsGroup;
