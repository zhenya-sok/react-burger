export interface IIngredientData {
    _id: string;
    name: string;
    type: "bun" | "main" | "sauce";
    price: number;
    fat: number;
    proteins: number;
    carbohydrates: number;
    calories: number;
    image: string;
    image_large: string;
    image_mobile: string;
    dragId: string;
    position: number;
}

export type TOrderNumber = {
    name: string;
    order: TNumber;
    success: boolean;
}

export type TNumber = {
    number: number;
}
