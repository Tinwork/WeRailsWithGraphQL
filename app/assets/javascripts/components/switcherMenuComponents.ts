// Import utils
import { DOMUtils } from '../utils/dom';

// Import Sidebar related components
import { MenuComponents } from './menuComponents';
import { BeverageMenuComponents } from './beverageMenuComponents';
import { CondimentsMenuComponents } from './condimentsMenuComponents';

/**
 * 
 * 
 * @class SwitcherMenuComponents
 */
export class SwitcherMenuComponents {

    static category: string[] = ['burgers', 'beverages', 'condiments'];


    /**
     * 
     * 
     * @static
     * @param {number} currentIdx 
     * @param {number} nextIdx 
     * @returns {void} 
     * @memberof SwitcherMenuComponents
     */
    static switchType(nextIdx: number): string {
        let _self = SwitcherMenuComponents;

        if (nextIdx > _self.category.length || nextIdx < 0) 
            return;

        return _self.category[nextIdx];
    }


    /**
     * 
     * 
     * @static
     * @param {string} name 
     * @returns {*} Components <Class>
     * @memberof SwitcherMenuComponents
     */
    static getComponentsByName(name: string): any {

        let components: any;

        switch(name) {
            case 'burgers':
                components = new MenuComponents();
            break;
            case 'beverages':
                components = new BeverageMenuComponents();
            break;
            case 'condiments':
                components = new CondimentsMenuComponents();
            break;
            default:
                components = new MenuComponents();
        }

        return components;
    }


    /**
     * 
     * 
     * @static
     * @param {*} menuInstance 
     * @memberof SwitcherMenuComponents
     */
    static initMenu(menuInstance: any): Promise<any> {
        return menuInstance.initMenuComponent()
                    .then(() => Promise.resolve())
                    .catch((e: string) => Promise.reject(e));
    }


    /**
     * 
     * 
     * @static
     * @param {number} id 
     * @memberof SwitcherMenuComponents
     */
    static updateButton(id: number): void{

        let lengthCat: number = SwitcherMenuComponents.category.length; 

        let switchBtn: any = DOMUtils.getElementFromType('selAction', 'class');

        for (let idx = 0; idx < switchBtn.length; idx++) {
            let previousID: number = id === 0 ? 0 : id - 1;
            let nextID: number = id === lengthCat ? id : id + 1;

            console.log(`previous ${previousID} next : ${nextID}`);

            if (idx === 0)
                switchBtn[idx].setAttribute('data-id', previousID);
            else 
                switchBtn[idx].setAttribute('data-id', nextID);
        }
    }
        
}