import React from 'react';
import styles from './burger-ingredients.module.scss';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from './ingredient/ingredient';

const BurgerIngredients = (props) => {
    const [current, setCurrent] = React.useState('Булки')

    return (
       <section className={`${styles.ingredientsWrapper} mr-10`}>
            <h1 className="text text_type_main-large mt-10 mb-5`">Соберите бургер</h1>

            <div className={`${styles.ingredientsTab} mt-5`}>
                <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>Булки</Tab> 
                <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>Начинки</Tab>
            </div>

            {/* Данный фрагмент нужно реализовать с помощью списоков и выделить новый компонент Ingredient. На скорую руку пришлось пока что так реализовать :( */}

            <div className={`${styles.ingredientsList} pt-10`}>
                <h2 className="text text_type_main-medium">Булки</h2>
                <div className={`${styles.ingredientsBlock} pl-4 pr-4 pt-6 pb-10`}>
                    {/* {props.success && props.data.map((ingredient, index) => <Ingredient key={index} data={ingredient} />)} */}

                    <div className={`${styles.ingredientsItem} mr-6 pr-4 pl-4`}>
                        <img src="" alt="изображение ингредиента" />
                        <div className={`${styles.price} mt-1 mb-1`}>
                            <span className="text text_type_digits-default">20</span>
                            <CurrencyIcon type="primary" />
                        </div>
                        <div className={`${styles.title} text text_type_main-default`}>Краторная булка N-200i</div>
                        <Counter count={1} size="default" />
                    </div>

                    <div className={`${styles.ingredientsItem} mr-6 pr-4 pl-4`}>
                        <img src="" alt="изображение ингредиента" />
                        <div className={`${styles.price} mt-1 mb-1`}>
                            <span className="text text_type_digits-default">20</span>
                            <CurrencyIcon type="primary" />
                        </div>
                        <div className={`${styles.title} text text_type_main-default`}>Флюоресцентная булка</div>
                    </div>
                </div>

                <h2 className="text text_type_main-medium">Соусы</h2>

                <div className={`${styles.ingredientsBlock} pl-4 pr-4 pt-6 pb-10`}>
                    <div className={`${styles.ingredientsItem} mr-6 pr-4 pl-4 mb-8`}>
                        <img src="" alt="изображение ингредиента" />
                        <div className={`${styles.price} mt-1 mb-1`}>
                            <span className="text text_type_digits-default">20</span>
                            <CurrencyIcon type="primary" />
                        </div>
                        <div className={`${styles.title} text text_type_main-default`}>Соус Spicy-X</div>
                    </div>

                    <div className={`${styles.ingredientsItem} mr-6 pr-4 pl-4 mb-8`}>
                        <img src="" alt="изображение ингредиента" />
                        <div className={`${styles.price} mt-1 mb-1`}>
                            <span className="text text_type_digits-default">20</span>
                            <CurrencyIcon type="primary" />
                        </div>
                        <div className={`${styles.title} text text_type_main-default`}>Соус Spicy-X</div>
                    </div>

                    <div className={`${styles.ingredientsItem} mr-6 pr-4 pl-4 mb-8`}>
                        <img src="" alt="изображение ингредиента" />
                        <div className={`${styles.price} mt-1 mb-1`}>
                            <span className="text text_type_digits-default">20</span>
                            <CurrencyIcon type="primary" />
                        </div>
                        <div className={`${styles.title} text text_type_main-default`}>Соус Spicy-X</div>
                    </div>

                    <div className={`${styles.ingredientsItem} mr-6 pr-4 pl-4 mb-8`}>
                        <img src="" alt="изображение ингредиента" />
                        <div className={`${styles.price} mt-1 mb-1`}>
                            <span className="text text_type_digits-default">20</span>
                            <CurrencyIcon type="primary" />
                        </div>
                        <div className={`${styles.title} text text_type_main-default`}>Соус Spicy-X</div>
                    </div>
                </div>
            </div>
       </section>
    )
}

export default BurgerIngredients;
