/**
 * 
 * 
 * @class Utils
 */
export class Utils {


    /**
     * Fetch SVG
     * 
     * @static
     * @param {any} category 
     * @param {any} element 
     * @returns 
     * @memberof Utils
     */
    static fetchSVG(category: string, element: string): Promise<any> {
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
    static fetchOtherWS(props: any): Promise<any> {
        const {method, uri, data} = props;
        let fetcher: any;

        if (!self.fetch) 
            Utils._fetchFallback();

    
        if (method === 'GET')
            fetcher = fetch(uri, {method: 'GET'})
        else
            fetcher = fetch(uri, {method: 'POST', body: JSON.stringify(data)})

        return new Promise<any>((resolve, reject) => {
            fetcher().then((res: any) => res.json())
                        .then((res: any) => Promise.resolve(res))
                        .catch((e: string) => Promise.reject(e));
        });
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
    static retrieveGraphQLToken(): string {
        let tokenHolder: any = document.getElementsByTagName('meta');

        if (tokenHolder === undefined || tokenHolder === null) 
            throw 'Unable to retrieve the GraphQL Access Token';

        return tokenHolder[1].getAttribute('content');
    }
}