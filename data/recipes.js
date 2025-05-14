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
    name: 'overschotten',
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
        },{ name: 'gehakt',
            quantity: 500,
            unit: 'gram'
        },{ name: 'erwten',
            quantity: 1,
            unit: 'zak'
        },{ name: 'courgette',
            quantity: 1,
            unit: ''
        }]
},{
    name: 'pizza',
    ingredients: [
        { 
            name:'deeg',
            quantity: 2,
            unit: ''
        },{ 
            name:'tomatensaus',
            quantity: 1,
            unit: 'bokaal'
        },{ 
            name:'ananas',
            quantity:1,
            unit: 'blik'
        },{ 
            name: 'hesp',
            quantity: 1,
            unit: 'pak'
        },{ 
            name: 'gemalen kaas',
            quantity: 1,
            unit: 'pak'
        },{ 
            name: 'mozarella',
            quantity: 1,
            unit: 'pak'
        }]
},{
    name: 'wok',
    ingredients: [
        { 
            name:'wokgroenten',
            quantity: 1,
            unit:'zak'
        },{ 
            name:'currypoeder',
            quantity: 1,
            unit: 'zak'
        },{ 
            name:'wortels',
            quantity: 3,
            unit: ''
        }]
},{
    name: 'rijst met groenten',
    ingredients: [
        { 
            name: 'rijst',
            quantity: 400,
            unit: 'gram'
        }
    ]
},{
    name: 'quiche',
    ingredients: [
        { 
            name: 'kruimeldeeg',
            quantity: 1,
            unit: ''
        },{
            name: 'soepprei',
            quantity: '1',
            unit: 'pak'
        },{
            name: 'gerookte spekblokjes',
            quantity: 1,
            unit:'pak'
        },{ 
            name: 'magere plattekaas',
            quantity: 250,
            unit: 'gram'
        },{
            name: 'ei',
            quantity: 2,
            unit: ''
        },{
            name: 'geraspte Gruyère',
            quantity: 1,
            unit: 'pak'
        }
    ]
}
]

