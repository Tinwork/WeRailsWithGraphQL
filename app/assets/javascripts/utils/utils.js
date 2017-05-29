/**
 * List of static function that we might use...
 */
class utils {
    
    /**
     * _Fetch
     *      Control and trigger the fetch utils
     * @param {*} props 
     * @return {Promise} fetch
     */
    static _fetch(...props) {
        const HEADERS = new Headers();
        const {endpoint, method, prop} = props;
        
        if (typeof endpoint !== 'string')
            return Promise.reject(`endpoint is not a String ${endpoint}`);

        // In case of the method is empty then we set it to post
        if (method === null)
            method = 'POST';

        if (prop == null) 
            prop = {};

        return fetch(endpoint, {
            method: method,
            headers: HEADERS,
            body: method == 'POST' ? JSON.stringify(prop) : ''
        })
        .then(payload => payload.json)
        .then(res => Promise.resolve(res))
        .catch(e => Promise.reject(e));
    }

    /**
     * _add Listener
     *      Add listener to element
     * @void
     */
    static _addListener(DOMString, callback, type = 'click') {
        let e = document.getElementById(DOMString);
        e.addEventListener(type, callback);
    }

    /**
     * 
     * @param {DOMElement} DOMElement 
     * @param {String} target 
     * @param {Mixed} value 
     */
    static _stylizer(DOMElement, target, value) {
        DOMElement.style[target] = value;
    }

    /**
     * _Generate Static Items
     *      Generate static items as the bo is not working yet
     * @return {Promise} data
     */
    static _generateStaticMenuItems() {

        /**
         * Param structure 
         * @param {Array <Object>}
         *      - src: String
         *      - name: String
         *      - type: Enum <String> (burger | salad | condiments)
         */

        let data = [{
            src: '/assets/burger.png',
            name: 'Burger',
            type: 'burger'
        },{
            src: '/assets/nuggets.jpg',
            name: 'Condiments',
            type: 'condiments'
        },{
            src: '/assets/salad.jpg',
            name: 'Salads',
            type: 'salad'
        }];

        return Promise.resolve(data);
    }
}