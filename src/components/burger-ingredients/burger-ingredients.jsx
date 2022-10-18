import React, { useState, useContext } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from '../ingredients-group/ingredients-group';
import IngredientDetail from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { IngredientDataContext } from '../../services/ingredientDataContext';

const BurgerIngredients = () => {
    const { ingredientsCategories } = useContext(IngredientDataContext);
    const [currentTab, setCurrentTab] = useState("Булки");
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    const showIngredientDetails = (item) => {
        setCurrentItem(item);
        setDetailsVisible(true);
    };
    
    const closeIngredientDetails = () => {
        setDetailsVisible(false);
    };

    return (
       <>
        <section className={`${styles.ingredientsWrapper} mr-10`}>
            <h1 className="text text_type_main-large mt-10 mb-5`">Соберите бургер</h1>

            <div className={`${styles.ingredientsTab} mt-5`}>
                <Tab value="Булки" active={currentTab === 'Булки'}>Булки</Tab> 
                <Tab value="Соусы" active={currentTab === 'Соусы'}>Соусы</Tab>
                <Tab value="Начинки" active={currentTab === 'Начинки'}>Начинки</Tab>
            </div>

            <div className={`${styles.ingredientsList} mt-10`}>
                {ingredientsCategories.bun && <IngredientsGroup
                    title="Булки"
                    ingredients={ingredientsCategories.bun}
                    showDetails={showIngredientDetails}
                />}
                {ingredientsCategories.sauce && <IngredientsGroup 
                    title="Соусы"
                    ingredients={ingredientsCategories.sauce} 
                    showDetails={showIngredientDetails}
                />}
                {ingredientsCategories.main && <IngredientsGroup
                    title="Онсновное"
                    ingredients={ingredientsCategories.main}
                    showDetails={showIngredientDetails}
                />}
            </div>
        </section>
        {detailsVisible && (
            <Modal closeModal={closeIngredientDetails} titleText="Детали ингредиента">
                <IngredientDetail ingredientInfo={currentItem}/>
            </Modal>
        )}
       </>
    )
}

export default BurgerIngredients;
