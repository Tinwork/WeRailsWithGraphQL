/**
 * 
 * 
 * @class QueryManager
 */
export class QueryManager {
    
    token: string
    /**
     * 
     * 
     * @memberof QueryManager
     */
    constructor(token: string) {
        this.token = token;
    }


    /**
     * Fetch Graph
     * 
     * @param {any} props 
     * @param {any} queryProps 
     * @returns 
     * @memberof QueryManager
     */
    fetchGraph(props: any, queryProps: any): Promise<any> {
        const {method, uri} = props;
        const {query, datas} = queryProps;

        console.log(query);

        let HEADERS = new Headers();
        HEADERS.append('content-type', 'application/json');
        HEADERS.append('X-CSRF-Token', this.token);

        if (typeof query !== 'string')
            return Promise.reject('query is not a string');

        return fetch(uri , {
            method: method,
            headers: HEADERS,
            body: JSON.stringify({
                query: query,
                variables: datas,
                authenticity_token: this.token
            }),
            credentials: 'same-origin'
        })
        .then(res => res.json())
        .then(res => QueryParser.parse)
        .then(res => res)
        .catch(e => Promise.reject(e));
    }

    static queryBuilder() {

    }

}