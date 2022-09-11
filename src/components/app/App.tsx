import React, { useState, useEffect } from 'react';
import './App.scss';
import '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

// Не хватило времени на реализацию jsx логики :(

function App() {
  const [state, setState] = useState({
    data: [],
  })

  const ingredientsListUrl = "https://norma.nomoreparties.space/api/ingredients";

  const getIngredients = () => {

    setState({ ...state});
    fetch(ingredientsListUrl)
      .then(res => res.json())
      .then(data => setState({ ...state, data}))
      .catch(e => {
        setState({ ...state});
      });
  };

  useEffect(() => {
    getIngredients();
  }, [])

  return (
    <div className="App">
      <div className="appWrapper">
        <AppHeader />
        <main className="mainWrapper">
          <BurgerIngredients ingredients={state.data}/>
          <BurgerConstructor />
        </main>
      </div>
    </div>
  );
}

export default App;
