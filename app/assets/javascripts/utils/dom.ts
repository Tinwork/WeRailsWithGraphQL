import { Utils } from './utils';

import * as $ from "jquery";

declare global {
    interface JQuery {
        slick(props: any): void
    }
}

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

        let element: any = DOMUtils.getElementFromType(DOMString, DOMType);
        if (DOMType === 'class') {

            for (let idx: number = 0; idx < element.length; idx++)
                styleKey.map((key: string, idx: number) => {
                    element[idx].style[key] = styleValue[idx];
                })
                

            return DOMUtils;
        }
           
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

        let element = DOMUtils.getElementFromType(DOMString, DOMType);
        if (DOMType === 'class') {
            for (let idx: number = 0; idx < element.length; idx++)
                element[idx].innerHTML = tmpl;
            return;
        }

        element.insertAdjacentHTML('beforeend', tmpl);
    }


    /**
     * 
     * 
     * @static
     * @param {string} DOMString 
     * @param {string} DOMType 
     * @returns {void} 
     * @memberof DOMUtils
     */
    static cleanElement(DOMString: string, DOMType: string): void {
        let element = DOMUtils.getElementFromType(DOMString, DOMType);

        if (DOMType === 'class') {
            for (let idx = 0; idx < element.length; idx++) 
                element[idx].innerHTML = '';

            return;
        }
            
        element.innerHTML = '';
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
    static applyClass(DOMString: string, DOMType: string, className: string, mode: string): void {

        let element: any = DOMUtils.getElementFromType(DOMString, DOMType);
        if (DOMType === 'class') {
            for (let idx: number = 0; idx < element.length; idx++) {
                DOMUtils.toggle(element[idx], mode, className);
            }

            return;
        }

        DOMUtils.toggle(element, mode, className);
    }


    /**
     * 
     * 
     * @static
     * @param {HTMLElement} element 
     * @param {string} mode 
     * @param {string} [className] 
     * @memberof DOMUtils
     */
    static toggle(element: HTMLElement, mode: string, className?: string): void {

        if (mode === 'add')
            element.classList.add(className);
        else 
            element.classList.remove(className);
        
            
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
    static addEventToElement(DOMString: string, DOMType: string, EventType: string, callback: any, props?: any): void {
        let elements = DOMUtils.getElementFromType(DOMString, DOMType);

        if (DOMType === 'class') {
            for (let idx = 0; idx < elements.length; idx++)
                elements[idx].addEventListener(EventType, function() {  
                    callback.call(this, props);
                });
            return;    
        }    
        
        // If the element is an ID
        elements.addEventListener(EventType, function() {
            callback.call(this, props);
        });
    }

    
    
    /**
     * 
     * 
     * @param {number} idx 
     * @param {string} componentName 
     * @memberof DOMUtils
     */
    static setOddEven(idx: number, componentName: string) {
        let e = DOMUtils.getElementFromType(componentName, 'id');

        if ((idx % 2) == 0) {
            e.classList.add('even');
            e.classList.remove('odd');
        } else {
            e.classList.add('odd');
            e.classList.remove('even');
        }
    }

    
    /**
     * 
     * 
     * @static
     * @memberof DOMUtils
     */
    static updateCalories() {
        let calories = Utils.calculateCalories();
        let el = DOMUtils.getElementFromType('fat', 'id');
        el.innerHTML = `${calories } cal`;
    }


    /**
     * Add Slick
     * ....
     * @static
     * @memberof DOMUtils
     */
    static addSlick() {
        $('.carousel-container').slick({
                    autoplay: false,
                    infinite: true,
                    vertical: true,
                    verticalSwiping: true,
                    centerMode: false,
                    arrows: false,
                    speed: 300,
                    slidesToShow: 3,
                    adaptiveHeight: false
        });
    }
}