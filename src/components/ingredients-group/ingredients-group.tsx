import React, { FC, useRef } from 'react';
import styles from './ingredients-group.module.css';
import Ingredient from '../ingredient/ingredient';
import { IIngredientData } from '../../types/types';

interface IIngredientsGroupProps {
    title: string;
    ingredients: IIngredientData[];
    showDetails: (item: IIngredientData) => void;
    titleId: string;
    ref: (node?: Element | null | undefined) => void
}

type Ref = HTMLDivElement | null;

const IngredientsGroup = React.forwardRef<Ref, IIngredientsGroupProps>(({title, ingredients, showDetails, titleId}, groupRef) => {
    // groupRef = useRef<HTMLDivElement>(null)
    
    return (
        <>
            <h3 className="text text_type_main-medium mb-6" id={titleId}>
                {title}
            </h3>
            {/* Тут ref чет не знаю, как победить по-человечески, сорян )) */}
            {/* Ну типа он должен быть HTMLDivElement | null, но intersectionObserver возвращает тип (node?: Element | null | undefined) => void */}
            {/* Чтобы ошибки убрать написал в 14 строке HTMLDivElement | null, но это костыль какой-то по моему */}
            <div className={`${styles.ingredientsBlock} pl-4 pr-4 pb-10`} ref={groupRef}>
                {ingredients && ingredients.map((ingredient) => {
                    return (
                        <Ingredient
                            ingredientData={ingredient}
                            // Тут в типах для ингредиента (IIngredientProps) не было onClick функции
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
