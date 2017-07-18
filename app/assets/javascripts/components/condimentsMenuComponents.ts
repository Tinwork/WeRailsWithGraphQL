// Import GraphQL related file
import { QueryManager } from '../graphql/queryManager';
import { GraphQLRoutes } from '../graphql/queryRoutes';

// Import Utils
import { Utils } from '../utils/utils';
import { DOMUtils } from '../utils/dom';
import { burgerHelper } from '../kings/burgerHelper';

// Import the condimentCanvasManager
import { CondimentsCanvasManager } from '../canvas/condimentsCanvasManager';
import { LocaleSwitcher } from '../utils/lang';

/**
 * Condiments interface
 * 
 * @interface Condiments
 */
export interface Condiments {
    id          : number;
    calories    : number;
    ingredients : Array<any>;
    label       : string;
}


/**
 * 
 * 
 * @export
 * @class CondimentsMenuComponents
 */
export class CondimentsMenuComponents {
    
    /**
     * Creates an instance of CondimentsMenuComponents.
     * @memberof CondimentsMenuComponents
     */
    constructor() {

    }

    /**
     * 
     * /!\ IF refactor we only need one MenuComponents though
     * @returns 
     * @memberof CondimentsMenuComponents
     */
    initMenuComponent() {
        return this.fetchAllCondiments()
                   .then(this.populateSidebar) 
                   .then(this.addClickEvent)
                   .then(() => DOMUtils.addSlick())
                   .catch((e: string) => Promise.reject(e));
    }


    /**
     * 
     * 
     * @param {*} res 
     * @returns {Promise<any>} 
     * @memberof CondimentsMenuComponents
     */
    populateSidebar(res: any): Promise<any> {
        // Clean the element
        DOMUtils.cleanElement('menu-items', 'id');

        let tmpl = ``;
        
        if (Utils.getType(res) !== 'Array')
            return Promise.reject('res is not a type of Array');

        DOMUtils.applyStyle('menu-items', 'id', ['backgroundColor'], ['#F79700']);
        DOMUtils.applyStyle('menu-parent', 'id', ['backgroundColor'], ['#F79700']);


         if (res.length === 0) {
            DOMUtils.getElementFromType('menu-items', 'id').innerHTML = `
            <p stlye="text-align: center; padding-top: 20px;">
                ${LocaleSwitcher.ilnHelper('', '', true, 5)}
            </p>`;
            return;
        }

        res.map((condiment: Condiments, idx: number) => {
            let classType = idx % 2 ? 'odd' : 'even';

            tmpl += `<div class="condiment ${classType} items" data-id="${condiment.id}">
                <div class="item-infos">
                    <img src="${Utils.asset_path(burgerHelper.getCondimentPath(condiment.label))}">
                    <p>${condiment.label}<p>
                </div>
            </div>`
        });

        // Append the template to the dom
        DOMUtils.applyTmpl('menu-items', 'id', tmpl);

        return Promise.resolve();
    }

    
    /**
     * 
     * 
     * @memberof CondimentsMenuComponents
     */
    addClickEvent(): void {

        // Use Function as we need to get the ID of the element bind
        let callback = function(){
            let id = parseInt(this.getAttribute('data-id'));

            if (id === NaN)
                throw 'id is not a type of number';

            DOMUtils.setOddEven(id, 'condiments');
            // Make a callback to the condiments drawing facade class
            let canvasCondiments = new CondimentsCanvasManager(id, 'sidedish', 'condiments');
            canvasCondiments.loadCondimentPicture()
                            .then((res: string) => console.log(res))
                            .then(() => DOMUtils.updateCalories())
                            .catch((e: string) => console.log(e));
        };

        DOMUtils.addEventToElement('condiment', 'class', 'click', callback);
    }

    /**
     * Fetch All Condiments 
     * @TODO replace the variable by null as we want to get all the condiments.. for now
     * @memberof CondimentsMenuComponents
     */
    fetchAllCondiments(): Promise<any> {
        let _instance = new QueryManager(Utils.retrieveGraphQLToken());
        
        // Retrieve the condiments
        return _instance.fetchGraph({
            route: GraphQLRoutes.getAllCondiments(),
            datas: {id: 1}
        })
        .then((res: any) => Promise.resolve(res.data.condiments))
        .catch((e: string) => Promise.reject(e));
    }
}