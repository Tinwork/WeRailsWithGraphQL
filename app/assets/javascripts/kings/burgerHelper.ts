/**
 * Burger Utils
 * /!\ This utils is only ise
 * 
 * @param ingredientName 
 * @return Ingredient
 */

let typeAvailable: string[][] = [['steak', 'chicken', 'bacon', 'fish'],
                                    ['salad', 'onion', 'pickle', 'tomato'],
                                    ['cheese_one', 'cheese_two'],
                                    ['fish_bread', 'whopper_bread', 'crispy_bread']];

/**
 * Burger Helper
 *      /!\ WIP: This method shouldn't be use in production. It serve as a quick dirty technic while waiting for the image uploading from the rails BO
 * 
 * BTW this code is horrible.
 * @param {string} ingredientName
 */
export const burgerHelper = (ingredientName: string): string => {
    let path = ``;

    typeAvailable.map((ingredient: string[], idx: number) => {
        ingredient.map((name: string): void => {
            if (ingredientName.toLowerCase().indexOf(name) !== -1)
                switch(idx) {
                    case 0:
                        path += `/viande/${name}.svg`;
                    break;
                    case 1:
                        path += `/salad/${name}.svg`;
                    break;
                    case 2:
                        path += `/fromage/${name}.svg`;
                    break;
                    case 3:
                        path += `/pain/${name}.svg`;
                    break;
                    default:
                        path += `/pain/whopper_bread.svg`;
                }
        })
    });

    return path || `/pain/whopper_bread.svg`;
};