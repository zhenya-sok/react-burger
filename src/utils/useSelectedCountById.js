import { useSelector } from "react-redux";

export function useSelectedCountById(ingredientId) {
    const selectedIngredients = useSelector((store) => store.constructorReducer.selectedIngredients)

    return selectedIngredients.reduce((result, currentIngredient) => {
        if (currentIngredient._id === ingredientId) {
            result++
        }
        if (currentIngredient.type === "bun") {
            return result * 2
        }

        return result
    }, 0)
}
