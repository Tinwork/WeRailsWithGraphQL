import { DOMUtils } from './dom';

// Constant of front textx not translate by the rails as it's dynamic to the app and bind by JavaScript
const FRONT_TEXT: any = {
    beverage: {
        fr: 'Vous avez choisi <%- %> | qui va vous donnez | <%- %> calories',
        en: 'You have choose <%- %> | which give you | <%- %> calories'
    },
    condiment: {
        fr: 'Vous allez adorer nos <%- %> | qui vont vous donnez | <%- %> calories',
        en: 'You will love our <%- %> | which give you | <%- %> calories'
    },
    burger: {
        fr: '<%- %> de type <%- %> | vous donnera | <%- %> calories',
        en: '<%- %> of type <%- %> | will give you | <%- %> calories'
    },
    misc: [{
        fr: 'Burgers',
        en: 'Burgers'
    }, {
        fr: 'Boissons',
        en: 'Beverages'
    }, {
        fr: 'Accompagnements',
        en: 'Condiments'
    }, {
        fr: `Aucun menu burger n'existe actuellement`,
        en: 'Currently no burger in the menu'
    }, {
        fr: `Aucune boisson n'existe actuellement`,
        en: 'Currently no beverages in the menu'
    }, {
        fr: `Aucun condiments n'existe actuellement`,
        en: 'Currently no condiments in the menu'
    }]
};


/**
 * 
 * 
 * @export
 * @class LocaleSwitcher
 */
export class LocaleSwitcher {

    
    /**
     * 
     * 
     * @static
     * @param {string} propsName 
     * @param {boolean} [isMisc=false] 
     * @param {number} idx 
     * @param {*} value 
     * @returns {string} 
     * @memberof LocaleSwitcher
     */
    static ilnHelper(propsName: string, value: any, isMisc?: boolean, idx?: number): string {
        let input: HTMLInputElement = <HTMLInputElement> DOMUtils.getElementFromType('myonoffswitch', 'id')
        let lang : string = input['checked'] === true ? 'fr' : 'en';

        // If gettig misc value
        if (isMisc)
            return FRONT_TEXT.misc[idx][lang];

        return LocaleSwitcher.hydrateTemplate(FRONT_TEXT[propsName][lang], value)
    }


    /**
     * 
     * 
     * @static
     * @param {string} text 
     * @param {Array<string>} datas 
     * @returns {string} 
     * @memberof LocaleSwitcher
     */
    static hydrateTemplate(text: string, datas: Array<string>): string {
        datas.map((d: string) => {
            text = text.replace(/<%- %>/, d);
        });

        return text;
    } 

    /**
     * Init Observer
     * 
     * @static
     * @memberof LocaleSwitcher
     */
    static initObserver(): void {
        DOMUtils.addEventToElement('myonoffswitch', 'id', 'click', LocaleSwitcher.observerCallback);
    }


    /**
     * Observer Callback
     * 
     * @static
     * @returns {*} 
     * @memberof LocaleSwitcher
     */
    private static observerCallback(): any {
        let input: HTMLInputElement = <HTMLInputElement> document.getElementById('myonoffswitch'),
            locale: boolean = input['checked'];


        return locale === true ? window.location.href = '/fr' : window.location.href = '/en';
    }
}