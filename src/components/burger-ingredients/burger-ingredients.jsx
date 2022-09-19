import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from '../ingredients-group/ingredients-group';
import IngredientDetail from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import {ingredientPropTypes} from '../../utils/ingredientPropType';

const BurgerIngredients = ({ingredients}) => {
    const [current, setCurrent] = React.useState('Булки');
    const [detailsVisible, setDetailsVisible] = React.useState(false);
    const [currentItem, setCurrentItem] = React.useState(null);

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
                <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>Булки</Tab> 
                <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>Начинки</Tab>
            </div>

            <ul className={`${styles.ingredientsList} mt-10`}>
                <li>
                    <h3 className="text text_type_main-medium">Булки</h3>
                    <IngredientsGroup ingredients={ingredients} type={"bun"} showDetails={showIngredientDetails} />
                </li>
                <li>
                    <h3 className="text text_type_main-medium">Соусы</h3>
                    <IngredientsGroup ingredients={ingredients} type={"sauce"} showDetails={showIngredientDetails} />
                </li>
               <li>
                    <h3 className="text text_type_main-medium">Основное</h3>
                    <IngredientsGroup ingredients={ingredients} type={"main"} showDetails={showIngredientDetails} />
               </li>
            </ul>
        </section>
        {detailsVisible && 
        <Modal closeModal={closeIngredientDetails} titleText="Детали ингредиента">
            <IngredientDetail ingredientInfo={currentItem}/>
        </Modal>}
       </>
    )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};

export default BurgerIngredients;
