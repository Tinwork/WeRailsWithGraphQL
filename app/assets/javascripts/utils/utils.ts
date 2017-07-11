const RATIO_BASE: number = 1600;
/**
 * 
 * 
 * @class Utils
 */
export class Utils {

    static ASSETS_PATH: string = './assets/images';
    static asset_path: any = (<any>window).asset_path;
    static calories: any = {};

    /**
     * Fetch SVG
     * 
     * @static
     * @param {any} category 
     * @param {any} element 
     * @returns 
     * @memberof Utils
     */
    static fetchSVG(path: string, name: string): Promise<any> {
        if (!self.fetch) {
            Utils._fetchFallback();
        } 

        return fetch(path)
                .then(res => res.blob())
                .then((blob: any) => {
                    blob['name'] = name;

                    return blob;
                })
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


    /**
     * Get Type 
     * 
     * @static
     * @param {*} object 
     * @returns {string} 
     * @memberof Utils
     */
    static getType(object: any): string {
        const t = Object.prototype.toString.call(object);

        return t.replace(/[\[\]']+/g, '').split('object')[1].trim();
    }

    
    /**
     * 
     * 
     * @static
     * @returns 
     * @memberof Utils
     */
    static calculateCalories() {
        let calories: number = 0;

        for (let o in Utils.calories) {
            calories += Utils.calories[o];
        }

        return calories;
    }

    
    /**
     * 
     * 
     * @static
     * @returns 
     * @memberof Utils
     */
    static getCalories() {
        return Utils.calories;
    }

    
    
    /**
     * 
     * 
     * @static
     * @returns 
     * @memberof Utils
     */
    static calculateMainCanvasRatio() {
        // Assuming that 1600 = ratio of 1
        return window.innerWidth / RATIO_BASE;
    }
}