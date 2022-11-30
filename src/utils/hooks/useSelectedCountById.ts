import { useSelector } from '../hooks/hooks';
import { IIngredientData } from '../../types/types';

export function useSelectedCountById(ingredientId: string) {
    const selectedIngredients = useSelector((store) => store.constructorReducer.selectedIngredients)

    return selectedIngredients.reduce((result: number, currentIngredient: IIngredientData) => {
        if (currentIngredient._id === ingredientId) {
            result++
        }
        if (currentIngredient.type === "bun") {
            return result * 2
        }

        return result
    }, 0)
}
