import React, { FC, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from '../ingredients-group/ingredients-group';
import { setCurrentItem } from '../../services/actions/ingredientsActions';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from "react-intersection-observer";
import { IIngredientData } from '../../types/types';

interface IType {
    type: "bun" | "main" | "sauce";
}

const BurgerIngredients: FC = () => {
    // @ts-ignore
    const ingredients = useSelector((state) => state.ingredientsReducer.ingredients);
    const [currentTab, setCurrentTab] = useState("Булки");
    const dispatch = useDispatch();

    const ingredientsCategories = ingredients.reduce((all: object[], current: IIngredientData) => {
        const type = current.type
        if (!Array.isArray(all[type])) {
            all[type] = []
        }
        all[type].push(current)
        return all
    }, {})

    const showIngredientDetails = (item: IIngredientData) => {
        dispatch(setCurrentItem(item));
    };

    const [bunsRef, inViewBuns] = useInView({
        threshold: 0,
    });

    const [mainsRef, inViewFilling] = useInView({
        threshold: 0,
    });
    const [saucesRef, inViewSauces] = useInView({
        threshold: 0,
    });

    React.useEffect(() => {
        if (inViewBuns) {
            setCurrentTab("Булки");
        } else if (inViewSauces) {
            setCurrentTab("Соусы");
        } else if (inViewFilling) {
            setCurrentTab("Начинки");
        }
    }, [inViewBuns, inViewSauces, inViewFilling]);

    const onTabClick = (group: string) => {
        setCurrentTab(group);
        const groupTitle = document.getElementById(group);
        if (groupTitle) groupTitle.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <>
            <section className={`${styles.ingredientsWrapper} mr-10`}>
                <h1 className="text text_type_main-large mt-10 mb-5`">Соберите бургер</h1>

                <div className={`${styles.ingredientsTab} mt-5`}>
                    <Tab value="Булки" active={currentTab === 'Булки'} onClick={onTabClick}>Булки</Tab>
                    <Tab value="Соусы" active={currentTab === 'Соусы'} onClick={onTabClick}>Соусы</Tab>
                    <Tab value="Начинки" active={currentTab === 'Начинки'} onClick={onTabClick}>Начинки</Tab>
                </div>

                <div className={`${styles.ingredientsList} mt-10`}>
                    {ingredientsCategories.bun && <IngredientsGroup
                        title="Булки"
                        ingredients={ingredientsCategories.bun}
                        showDetails={showIngredientDetails}
                        titleId="Булки"
                        ref={bunsRef}
                    />}
                    {ingredientsCategories.sauce && <IngredientsGroup
                        title="Соусы"
                        ingredients={ingredientsCategories.sauce}
                        showDetails={showIngredientDetails}
                        titleId="Соусы"
                        ref={saucesRef}
                    />}
                    {ingredientsCategories.main && <IngredientsGroup
                        title="Онсновное"
                        ingredients={ingredientsCategories.main}
                        showDetails={showIngredientDetails}
                        titleId="Начинки"
                        ref={mainsRef}
                    />}
                </div>
            </section>
        </>
    )
}

export default BurgerIngredients;
