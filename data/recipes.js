export function getIngredients(dishName) {
    let matchingIngredients;

    recipes.forEach((recipe) => {
        if (recipe.name === dishName) {
            matchingIngredients = recipe.ingredients;
        }
    });

    return matchingIngredients;

}

export function getAllRecipeNames() {
    let recipeNameList = [];
    recipes.forEach((recipe) => {
        recipeNameList.push(recipe.name)
    });
    return recipeNameList
}

export const recipes = [{
    name: 'spaghetti',
    ingredients: [
        { name:'pasta',
            quantity: 1
        },{ name: 'tomatensaus',
            quantity: 2
        }]
},{
    name: 'pizza',
    ingredients: [
        { name:'deeg',
            quantity: 2
        },{ name:'tomatensaus',
        quantity:1 
        },{ name:'ananas',
            quantity:1
        }]
},{
    name: 'wok',
    ingredients: [
        { name:'wokgroenten',
            quantity: 1
        },{ name:'currypoeder',
            quantity: 1
        }
    ]
}
]

