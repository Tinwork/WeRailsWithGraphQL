/**
 * 
 * 
 * @class Utils
 */
class Utils {


    /**
     * Fetch SVG
     * 
     * @static
     * @param {any} category 
     * @param {any} element 
     * @returns 
     * @memberof Utils
     */
    static fetchSVG(category, element) {
        if (!self.fetch) {
            Utils._fetchFallback();
        } 

        return fetch(`/images/${category}/${element}.svg`)
                .then(res => res.blob())
                .catch(e => Promise.reject(e));
    }


    /**
     * Fetch Other WS
     * 
     * @static
     * @param {Object} props 
     * @returns 
     * @memberof Utils
     */
    static fetchOtherWS(props) {
        const {method, uri, data} = props;
        let fetcher;

        if (!self.fetch) 
            Utils._fetchFallback();

    
        if (method === 'GET')
            fetcher = fetch(uri, {method: 'GET'})
        else
            fetcher = fetch(uri, {method: 'POST', body: JSON.stringify(data)})

        return fetcher().then(res => res.json())
                        .then(res => Promise.resolve(res))
                        .catch(e => Promise.reject(e));
    }

    static _fetchFallback() {

    }


    /**
     * Retrieve GraphQL Token
     * 
     * @static
     * @returns 
     * @memberof Utils
     */
    static retrieveGraphQLToken() {
        let tokenHolder = document.getElementsByTagName('meta');

        if (tokenHolder === undefined || tokenHolder === null) 
            throw 'Unable to retrieve the GraphQL Access Token';

        return tokenHolder[1].getAttribute('content');
    }
}