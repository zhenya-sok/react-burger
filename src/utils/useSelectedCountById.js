import { useSelector } from "react-redux";

export function useSelectedCountById(ingredientId) {
    const selectedIngredients = useSelector((store) => store.ingredientsReducer.selectedIngredients)

    return selectedIngredients.reduce((result, currentIngredient) => {
        if (currentIngredient._id === ingredientId) {
            result++
        }

        return result
    }, 0)
}
