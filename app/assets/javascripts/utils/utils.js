/**
 * Utils
 *      List of static method that we might need 
 *      during the whole app
 */
class Utils {

    /**
     * Loader
     *      Preloader of the app
     */
    static hideLoader() {
        document.getElementById('overlay').classList.remove('show');
        document.getElementById('overlay').classList.add('hide');
        setTimeout(() => {
            document.getElementById('overlay').style.display = 'none';
        }, 1000);
    }

    /**
     * Display Error
     *      Display the error
     * @param {Mixed} e 
     */
    static displayError(e) {
        console.warn(e);
    }

    /**
     * Get Color By Modulo
     *      Return the colors depending of the type of dish and the index
     * @param {String} dishType
     * @param {Number} idx 
     */
    static getColorByModulo(dishType, idx) {
        let colors = [];
        
        switch (dishType) {
            case "burger":
                colors.push('#CF9867', '#713B30');
            break;
            case "salad":
                colors.push('#F7A600', '#F79700');
            break;
            case "condiments":
                colors.push('#93C0E9', '#0171CE');
            break;
        }

        return idx % 2 === 0 ? colors[0] : colors[1];
    }

    /**
     * Fetcher
     *     Fetch the datas
     * @param {Object} props
     * @return {Promise} fetch
     */
    static fetcher(props) {
        const HEADERS = new Headers();

        if (typeof props !== 'object')
            return Promise.reject('props is not an object');

        const {method, data, endpoint} = props;

        if (typeof method !== 'string')
            return Promise.reject(`endpoint: ${endpoint} is not a type of String`);

        const opts = Object.assign({}, {
            headers: HEADERS,
            method: method,
            mode: 'cors'
        });

        if (method === 'POST')
            opts.body = data === undefined ? JSON.stringify({}) : JSON.stringify(data);

        return fetch(endpoint, opts)
                .then(payload => payload.json())
                .then(res => Promise.resolve(res))
                .catch(e => Promise.reject(e));
    }

    /**
     * Type Of
     *      Return the typeof of a given variable
     * @param {Mixed} props
     */
    static typeOf(props) {
        let type = Object.prototype.toString.call(props);

        return type.replace(/[\[\]']+/g, '').split('object')[1].trim();
    }

    /**
     * Sample Burger Data
     *      Return a sample burger
     */
    static sampleBurgerData() {
        return Object.assign({}, {
            data: {
                kings: [{
                    id: '0',
                    label: 'crunchy_chicken_burger',
                    burger: {
                        id: 0,
                        label: 'sample',
                        ingredients: [{
                            label: 'Salad',
                            calories: 100,
                            category: {
                                label: 'legume vert'
                            }
                        }, {
                            label: 'Steak',
                            calories: 350,
                            category: {
                                label: 'viande'
                            }
                        }]
                    }
                }]
            }
        });
    }
}