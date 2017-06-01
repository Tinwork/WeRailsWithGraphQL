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
    static _fetch(props) {
        const HEADERS = new Headers();
        const {endpoint, method, prop} = props;
        
        if (typeof endpoint !== 'string')
            return Promise.reject(`endpoint is not a String ${endpoint}`);

        let opts = Object.assign({}, {
            method: method,
            headers: HEADERS,
            mode: 'cors'
        });

        // In case of the method is empty then we set it to post
        if (method === null) {
            method = 'POST';
            opts.body = prop !== undefined ? JSON.stringify(prop) : JSON.stringify({});
        }

        return fetch(endpoint, opts)
        .then(payload => payload.json())
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
     * @param {String} DOMString 
     * @param {Function} callback 
     * @param {String} type 
     */
    static _addClassListener(DOMString, callback, type = 'click') {
        if (typeof DOMString !== 'string')
            throw new Error('Dom string is not a string');

        let bem = document.getElementsByClassName(DOMString);

        // This is an html Collection therefore we don't use map to loop over it
        for (let idx of bem) 
            idx.addEventListener(type, callback.bind(idx));
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
     * _Insert DOM String
     *      Insert an html string into a dom element
     * @param {String} DOMString 
     * @param {String} DOMTarget 
     * @param {Boolean} clean 
     * @void
     */
    static _insertDOMString(DOMString, DOMTarget, clean = true) {

        // If we need to clean the component 
        if (clean)
            document.getElementById(DOMTarget).innerHTML = '';

        document.getElementById(DOMTarget).insertAdjacentHTML('beforeend', DOMString);
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

    /**
     * Generate the subs menu items 
     * @param {String} predicate
     */
    static _generateSubMenuItems(predicate = 'burger') {
        let flag = true;
        // we will simulate the way we'll return the data.. as we're going to use the _fetch method we'll promisify the process

        return utils._fetch({endpoint: 'https://marcintha.fr/json/menu.json', method: 'POST'})
            .then(res => {
                const data = res.data.kings;

                data.map(d => {
                    if (d[predicate] !== undefined || d[predicate] !== null)
                        flag = false;
                })

                if (flag)
                    return Promise.reject(`${predicate} does not exist in the menu that you'd selected`);

                return Promise.resolve(data);
            })
            .catch(e => Promise.reject(e));
    }

    /**
     * Create Fake Data
     * @param {String} arc 
     */
    static createFakeData(arc) {
        let arcArray = [];
        let idx = 0;

        while(idx < 10) {
            arcArray.push({'arc': arc, 'dx': (idx * 100)});
            idx++;
        }

        return arcArray;
    } 
}