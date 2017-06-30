/**
 * 
 * 
 * @interface Ingredients
 */
interface Ingredients {
    calories: number;
    category: string;
    name: string;
}


/**
 * 
 * 
 * @interface Burger
 */
export interface Burger {
    name: string;
    ingredients: Array<Ingredients>;
}

/**
 * 
 * 
 * @class BurgerFactory
 */
export class BurgerFactory {

    ingredientList: any
    name: string

    /**
     * Creates an instance of BurgerComponents.
     * @param {*} datas 
     * @memberof BurgerComponents
     */
    constructor(ingredients: any[], name: string) {
        this.ingredientList = ingredients;
        this.name = name;
    }

    /**
     * Build Ingredients
     * 
     * @returns {Ingredients} 
     * @memberof BurgerFactory
     */
    buildIngredients(): Ingredients[]{

        let ing: Array<Ingredients> = [];
        
        this.ingredientList.map((d: any) => {
            let ingredients: Ingredients = {
                calories: d.calories,
                category: d.category,
                name: d.name
            }
            
            ing.push(ingredients);
        });


        return ing;
    }


    /**
     * Build Burger
     * 
     * @returns 
     * @memberof BurgerFactory
     */
    buildBurger() {

        let burger: Burger = {
            name: this.name,
            ingredients: this.buildIngredients()
        }

        return burger;
    }
    
}