import { Utils } from './utils';

/**
 * 
 * 
 * @export
 * @class DOMUtils
 */
export class DOMUtils {

    /**
     * Apply Style
     * 
     * @static
     * @param {string} DOMString 
     * @param {string} DOMType 
     * @param {string} styleKey 
     * @param {string} styleValue 
     * @returns {void} 
     * @memberof DOMUtils
     */
    static applyStyle(DOMString: string, DOMType: string, styleKey: string[], styleValue: string[]): any {
        
        if (DOMType === 'class') {
            let element: any = document.getElementsByClassName(DOMString);

            for (let idx: number = 0; idx < element.length; idx++)
                styleKey.map((key: string, idx: number) => {
                    element[idx].style[key] = styleValue[idx];
                })
                

            return DOMUtils;
        }
           
        let element: any = document.getElementById(DOMString)
        styleKey.map((key: string, idx: number) => element.style[key] = styleValue[idx]);
        
        return DOMUtils;
    }


    /**
     * Apply Tmpl
     * 
     * @static
     * @param {string} DOMString 
     * @param {string} DOMType 
     * @param {string} tmpl 
     * @returns {void} 
     * @memberof DOMUtils
     */
    static applyTmpl(DOMString: string, DOMType: string, tmpl: string): void {

        if (DOMType === 'class') {
            let element: any = document.getElementsByClassName(DOMString);

            for (let idx: number = 0; idx < element.length; idx++)
                element[idx].innerHTML = tmpl;

            return;
        }

        document.getElementById(DOMString).insertAdjacentHTML('beforeend', tmpl);
    }


    /**
     * Apply Class
     * 
     * @static
     * @param {string} DOMString 
     * @param {string} DOMType 
     * @param {string} className 
     * @returns {void} 
     * @memberof DOMUtils
     */
    static applyClass(DOMString: string, DOMType: string, className: string): void {
        if (DOMType === 'class') {
            let element: any = document.getElementsByClassName(DOMString);

            for (let idx: number = 0; idx < element.length; idx++) {
                element[idx].classList.toggle(className);
            }

            return;
        }

        document.getElementById(DOMString).classList.toggle(className);
    }


    
    /**
     * Hide Element
     * 
     * @static
     * @param {string} DOMString 
     * @param {string} DOMType 
     * @returns {DOMUtils} 
     * @memberof DOMUtils
     */
    static hideElement(DOMString: string, DOMType: string, timeout: number): DOMUtils {
        let element = DOMUtils.getElementFromType(DOMString, DOMType);

        if (Utils.getType(element) === 'Array') 
            for (let idx: number = 0; idx < element.length; idx++) {
                setTimeout(() => element[idx].style.display = 'none', timeout);
            }
        else 
            setTimeout(() => element.style.display = 'none', timeout);

        return DOMUtils;
    }


    /**
     * Get Element From Type 
     * 
     * @static
     * @param {string} DOMString 
     * @param {string} DOMType 
     * @returns {*} 
     * @memberof DOMUtils
     */
    static getElementFromType(DOMString: string, DOMType: string): any {

        if (typeof DOMString !== 'string')
            throw 'DOMString is not a type of string';

        if (DOMType === 'class') 
            return document.getElementsByClassName(DOMString);

        
        return document.getElementById(DOMString);
    }

    /**
     * Add Event To Element
     * 
     * @static
     * @param {string} DOMString 
     * @param {string} DOMType 
     * @param {string} EventType 
     * @param {*} callback 
     * @returns {void} 
     * @memberof DOMUtils
     */
    static addEventToElement(DOMString: string, DOMType: string, EventType: string, callback: any): void {
        let elements = DOMUtils.getElementFromType(DOMString, DOMType);

        if (DOMType === 'class') {
            for (let idx = 0; idx < elements.length; idx++)
                elements[idx].addEventListener(EventType, callback);
            return;    
        }    
        
        // If the element is an ID
        elements.addEventListener(EventType, callback);
    }
}