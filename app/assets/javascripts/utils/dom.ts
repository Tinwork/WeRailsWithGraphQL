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
    static applyStyle(DOMString: string, DOMType: string, styleKey: string, styleValue: string): any {
        
        if (DOMType === 'class') {
            let element: any = document.getElementsByClassName(DOMString);

            for (let idx: number = 0; idx < element.length; idx++)
                element[idx].style[styleKey] = styleValue;

            return DOMUtils;
        }
           
        let element: any = document.getElementById(DOMString)
        element.style[styleKey] = styleValue;

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
}