import React, { useState, useContext } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from '../ingredients-group/ingredients-group';
import IngredientDetail from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { IngredientDataContext } from '../../services/ingredientDataContext';
import { setCurrentItem } from '../../services/actions';
import { useDispatch } from 'react-redux';

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
                />}
                {ingredientsCategories.sauce && <IngredientsGroup 
                    title="Соусы"
                    ingredients={ingredientsCategories.sauce} 
                    showDetails={showIngredientDetails}
                    titleId="Соусы"
                />}
                {ingredientsCategories.main && <IngredientsGroup
                    title="Онсновное"
                    ingredients={ingredientsCategories.main}
                    showDetails={showIngredientDetails}
                    titleId="Начинки"
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
