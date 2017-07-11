// Importing our Query Manager
import { QueryManager } from '../graphql/queryManager';
import { GraphQLRoutes } from '../graphql/queryRoutes';

// Import Utils
import { Utils } from '../utils/utils';
import { DOMUtils } from '../utils/dom';

// Import the beverage canvas manager
import { BeverageCanvasManager } from '../canvas/beverageCanvasManager';

/**
 * Beverage Callback
 * @param {Number} menuID
 */
export const beverageCallback = (menuID: number) => {
    let _instance = new BeverageComponents(menuID);
    
    return _instance.getBeverage()
             .then((res: JSON) => _instance.triggerDrawing(res))
             .then(() => console.log('done beverage'))
             .catch((e: string) => console.log(e));
}

/**
 * 
 * 
 * @class BeverageComponents
 */
class BeverageComponents {

    menuID: number;


    /**
     * Creates an instance of BeverageComponents.
     * @param {number} menuID 
     * @memberof BeverageComponents
     */
    constructor(menuID: number) {
        this.menuID = menuID;
    }

    /**
     * 
     * 
     * @returns {Promise<any>} 
     * @memberof BeverageComponents
     */
    getBeverage(): Promise<any>{
        // Get the token
        let token: string = Utils.retrieveGraphQLToken();
        // Create an instance of the QueryManager
        let _instance = new QueryManager(token);
        console.log(`this menu id `+this.menuID);
        // Get the beverage
        return _instance.fetchGraph({
            route: GraphQLRoutes.getBeverage(),
            datas: {id: this.menuID}
        })
        .then((res: any) => Promise.resolve(res.data))
        .catch((e: string) => Promise.reject(e));
    }


    /**
     * 
     * 
     * @param {JSON} res 
     * @returns 
     * @memberof BeverageComponents
     */
    triggerDrawing(res: any) {
        let _instance = new BeverageCanvasManager('beverage', 'drink');
        return _instance.createBeverage(res.beverage);
    }
}