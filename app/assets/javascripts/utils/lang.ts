import { DOMUtils } from './dom';

export class LocaleSwitcher {

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