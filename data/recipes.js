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
    name: 'restaurant',
    ingredients: []
},{
    name: 'spaghetti',
    ingredients: [
        { name:'pasta',
            quantity: 400,
            unit: 'gram'
        },{ name: 'tomatensaus',
            quantity: 2,
            unit: 'bokaal'
        }]
},{
    name: 'pizza',
    ingredients: [
        { name:'deeg',
            quantity: 2
        },{ name:'tomatensaus',
            quantity: 1,
            unit: 'bokaal'
        },{ name:'ananas',
            quantity:1,
            unit: 'blik'
        }]
},{
    name: 'wok',
    ingredients: [
        { name:'wokgroenten',
            quantity: 1,
            unit:'zak'
        },{ name:'currypoeder',
            quantity: 1,
            unit: 'zak'
        }
    ]
}
]

