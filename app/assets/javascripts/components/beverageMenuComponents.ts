// Import GraphQL related file
import { QueryManager } from '../graphql/queryManager';
import { GraphQLRoutes } from '../graphql/queryRoutes';

// Import Utils
import { Utils } from '../utils/utils';
import { DOMUtils } from '../utils/dom';
import { burgerHelper } from '../kings/burgerHelper';

// Import beverage
import { beverageCallback } from './beverageComponent';



/**
 * 
 * 
 * @interface Beverage
 */
interface Beverage{
    label    : string;
    ice      : boolean;
    calories : number;
    id       : number;
}

/**
 * 
 * 
 * @export
 * @class BeverageMenuComponents
 */
export class BeverageMenuComponents {


    /**
     * Creates an instance of BeverageMenuComponents.
     * @memberof BeverageMenuComponents
     */
    constructor() {
        // Empty...
    }


    /**
     * 
     * 
     * @memberof BeverageMenuComponents
     */
    initMenuComponent(): Promise<any> {
        console.log('laaa');
        return this.fetchAllBeverage()
            .then(res => this.populateSidebar([res.data.beverage]))
            .then(this.addClickEvent)
            .catch(e => console.log(e));
    }


    /**
     * 
     * 
     * @param {*} res 
     * @memberof BeverageMenuComponents
     */
    populateSidebar(res: any): Promise<any>{
        let tmpl = ``;

        if (Utils.getType(res) !== 'Array')
            return Promise.reject('data is not an array')

        DOMUtils.applyStyle('menu-items', 'id', ['backgroundColor'], ['#93C0E9']);

        // Clean the sidebar
        DOMUtils.cleanElement('menu-items', 'id');

        // loop threw each data and append the datas to the sidebar     
        res.map((beverage: Beverage, idx: number) => {
            let classType = idx % 2 ? 'odd' : 'even';
            tmpl += `<div class="beverage ${classType} items" data-id="${beverage.id}">
                        <div class="item-infos">
                            <img src="${Utils.asset_path(burgerHelper.getBeveragePath(beverage.label))}">
                            <p>${beverage.label}</p>
                        </div>
                    </div>
            `;
        });
    
        // Append the template to the dom
        DOMUtils.applyTmpl('menu-items', 'id', tmpl);
        return Promise.resolve();
    }


    /**
     * 
     * 
     * @memberof BeverageMenuComponents
     */
    addClickEvent(): void {
        let callback = function() {
            // Execute the beverage based on the id
            let id = parseInt(this.getAttribute('data-id'));
            if (id === NaN)
                throw 'ID is not a type of number';

            beverageCallback(id);
        };

        DOMUtils.addEventToElement('beverage', 'class', 'click', callback);
    }

    /**
     * 
     * 
     * @returns {Promise<any>} 
     * @memberof BeverageMenuComponents
     */
    fetchAllBeverage(): Promise<any> {
        // Retrieving only for one beverage
        let _queryInstance = new QueryManager(Utils.retrieveGraphQLToken());

        return _queryInstance.fetchGraph({
            route: GraphQLRoutes.getBeverage(),
            datas: {id: 1}
        })
        .then((res: any) => Promise.resolve(res))
        .catch((e: string) => Promise.reject(e));
    }
}