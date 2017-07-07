// Import Query's dependency
import { QueryManager } from '../graphql/QueryManager';
import { GraphQLRoutes } from '../graphql/queryRoutes';

// Import Utils
import { Utils } from '../utils/utils';

/**
 * Ingredient Callback
 * 
 * @param {Number} id
 * @return {Promise: <any>}
 */
export const ingredientCallback = (id: number) => {
    let token: string = Utils.retrieveGraphQLToken();
    
    // Create an instance of our component that we're going to return
    let _ingredientInstance = new IngredientManager(id, token);

    return _ingredientInstance.retrieveIngredients();
}

/**
 * 
 * 
 * @class IngredientComponent
 */
class IngredientManager {
    
    menuID: number;
    token : string;

    /**
     * Creates an instance of IngredientComponent.
     * @param {number} id 
     * @TODO remove calories in other props.. such as in the burgerFactory or other files.... (if we have time..)
     * @memberof IngredientComponent
     */
    constructor(id: number, token: string) {
        this.menuID = id;
        this.token  = token;
    }

    /**
     * 
     * 
     * @returns {*} 
     * @memberof IngredientComponent
     */
    retrieveIngredients(): any {
        let queryInstance = new QueryManager(this.token);
        // Execute a query to retrieve the information for a menu
    
        queryInstance.fetchGraph({
            route: GraphQLRoutes.getIngredients(),
            datas: {
                'id': this.menuID
            }
        })
        .then((res: JSON) => console.log(res))
        .catch((e: string)  => Promise.reject(e));    
    }
}