import React, { useState, useContext } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from '../ingredients-group/ingredients-group';
import IngredientDetail from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { IngredientDataContext } from '../../services/ingredientDataContext';
import { setCurrentItem } from '../../services/actions';
import { useDispatch } from 'react-redux';
import { useInView } from "react-intersection-observer";

const BurgerIngredients = () => {
    const { ingredientsCategories } = useContext(IngredientDataContext);
    const [currentTab, setCurrentTab] = useState("Булки");
    const [detailsVisible, setDetailsVisible] = useState(false);
    const dispatch = useDispatch();

    const showIngredientDetails = (item) => {
        dispatch(setCurrentItem(item));
        setDetailsVisible(true);
    };

    const closeIngredientDetails = () => {
        setDetailsVisible(false);
        dispatch(setCurrentItem(null));
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

    const onTabClick = (group) => {
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
            {detailsVisible && (
                <Modal closeModal={closeIngredientDetails} titleText="Детали ингредиента">
                    <IngredientDetail />
                </Modal>
            )}
        </>
    )
}

export default BurgerIngredients;
