export const recipes = [{
    name: 'spaghetti',
    ingredients: ['pasta','tomatensaus']
},{
    name: 'pizza',
    ingredients: ['deeg','tomatensaus','ananas']
}
]

export function getIngredients(dishName) {
    let matchingIngredients;

    recipes.forEach((recipe) => {
        if (recipe.name === dishName) {
            matchingIngredients = recipe.ingredients;
        }
    });

    return matchingIngredients;
}