import { ingredientsListUrl } from '../../src/utils/api';
import '@4tw/cypress-drag-drop';

describe('service is available', function() {

  const USER_EMAIL = 'sockolovzhe@gmail.com';
  const USER_PASSWORD = 'hello';
  const INGREDIENT = '[data-cy="ingredient"]';

  beforeEach(function() {
    cy.visit('/');
  });

  it('should open burger-constructor page by default', function() {
    cy.contains('Соберите бургер');
  });

  it('should upload ingredients on the page', function() {
    cy.request(ingredientsListUrl)
  });

  it('should open and close modal with detail information about ingredient', function() {
    cy.get(INGREDIENT).first().as('ingredient');
    cy.get('@ingredient').should('be.visible').click();

    cy.get('[class^=modal_modal__]').contains('Краторная булка N-200i');
    cy.get('[class^=modal_modal__closeBtn__]').should('be.visible').click();
  });

  it('should drag ingredient to the constructor and create order', function() {
    cy.get(INGREDIENT).first().as('ingredient-bun');
    cy.get('[class^=burger-constructor_constructorWrapper__]').as('drop-zone');
    cy.get('@ingredient-bun').drag('@drop-zone');
    cy.get('.counter').should('contain', 2);

    cy.get(INGREDIENT).last().as('ingredient-main');
    cy.get('@ingredient-main').drag('@drop-zone');

    cy.get("button").contains('Оформить заказ').as('order-button');
    cy.get('@order-button').should('be.visible').click();
    cy.url().should('include', '/login');

    cy.get('[data-cy="email"]').type(USER_EMAIL);
    cy.get('[data-cy="password"]').type(`${USER_PASSWORD}{enter}`);

    cy.url().should('include', '/');

    cy.get('@order-button').should('be.visible').click();
    cy.wait(20000);
    cy.get('[class^=order-details_orderDetails__bookingNumber__]').should('be.visible');
    cy.get('[class^=modal_modal__closeBtn__]').should('be.visible').click();
  });
});
