// Import Query's dependency
import { QueryManager } from '../graphql/QueryManager';
import { GraphQLRoutes } from '../graphql/queryRoutes';

// Import Utils
import { Utils } from '../utils/utils';

// Import the main drawing manager
import { CanvasObject } from '../components/drawingManager';

// Import the annotations manager
import { AnnotationsCanvasFactory } from '../canvas/annotationsCanvasFactory';

/**
 * Ingredient Callback
 * 
 * @param {Number} id
 * @return {Promise: <any>}
 */
export const ingredientCallback = (props: any) => {
    const { id, obj, ctx } = props;
    let token: string = Utils.retrieveGraphQLToken();
    
    // Create an instance of our component that we're going to return
    let _ingredientInstance = new IngredientManager(id, token);

    return _ingredientInstance.retrieveIngredients()
                       .then((res: JSON) => _ingredientInstance.setProps(obj, res, ctx))
                       .then(() => _ingredientInstance.buildAnnotation())
                       .catch((e: string) => Promise.reject(e));
}

/**
 * 
 * 
 * @class IngredientComponent
 */
class IngredientManager {
    
    menuID     : number;
    token      : string;
    canvasProps: Array<CanvasObject>; 
    jsonIng    : JSON;
    ctx        : CanvasRenderingContext2D;

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
    retrieveIngredients(): Promise<any> {
        let queryInstance = new QueryManager(this.token);
        // Execute a query to retrieve the information for a menu
    
        return queryInstance.fetchGraph({
            route: GraphQLRoutes.getIngredients(),
            datas: {
                'id': this.menuID
            }
        })
        .then((res: JSON) => Promise.resolve(res))
        .catch((e: string)  => Promise.reject(e));    
    }

    
    /**
     * 
     * 
     * @param {Array<CanvasObject>} obj 
     * @memberof IngredientManager
     */
    buildAnnotation() {
        let _instanceAnnot = new AnnotationsCanvasFactory(this.ctx, this.canvasProps);
        _instanceAnnot.buildAnnotation(this.jsonIng);
    }


    /**
     * 
     * 
     * @param {Array<CanvasObject>} CanvasObjProps 
     * @memberof IngredientManager
     */
    setProps(canvasObjProps: Array<CanvasObject>, res: JSON, ctx: CanvasRenderingContext2D) {
        this.canvasProps = canvasObjProps;
        this.jsonIng = res;
        this.ctx = ctx;

        return Promise.resolve();
    }
}