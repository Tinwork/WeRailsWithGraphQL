import {Utils} from '../utils/utils';
import {BurgerFactory, Burger} from '../kings/burgerFactory';
/**
 * Query Parser 
 * 
 * @class QueryParser
 */
export class QueryParser {

    /**
     * Parse 
     * 
     * @static
     * @param {*} datas 
     * @returns {*} 
     * @memberof QueryParser
     */
    static parseBurgers(datas: any): any{
        
        let burger: Array<Burger> = [];
        let ingred: any[] = [];

        if (Utils.getType(datas) !== 'Array')
            return Promise.reject('data not type of Array');
            
        datas.map((d: any) => {
            // Reset the ingredient list array as we pushed datas in for each loop
            ingred = [];
            d.burger.ingredients.map((ing: any) => {
                ingred.push({
                    calories: ing.calories,
                    category: ing.category.label,
                    name: ing.label
                });
            })
            // Order the datas and create an instance of the burgers
            let instanceBurger = new BurgerFactory(ingred, d.burger.label);
            burger.push(instanceBurger.buildBurger());
        });
        
        return Promise.resolve(burger);
    }
};
