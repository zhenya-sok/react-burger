import { IIngredientData, TOrderNumber } from "../types/burgerTypes";
import { IWsOrder } from "../types/wsTypes";

export const testIngredientData: IIngredientData = {
    _id: "60d3b41abdacab0026a733c7",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    price: 988,
    fat: 26,
    proteins: 44,
    carbohydrates: 85,
    calories: 643,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    dragId: "f7b49db2-ae32-4953-a15c-bc178d324039",
    position: 1,
}

export const testOrderNumber: TOrderNumber = {
    name: "Space флюоресцентный бургер",
    order: {number: 33333},
    success: true,
}

export const testOrderItem = {
    ingredients: ["60d3463f7034a000269f45e7"],
    _id: "60d3463f7034a000269f45e7",
    status: "done",
    number: 1,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z",
}

export const testWsOrder: IWsOrder = {
    success: true,
    orders: [testOrderItem],
    total: 1,
    totalToday: 1,
}
