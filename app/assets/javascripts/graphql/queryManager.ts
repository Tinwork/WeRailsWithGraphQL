import {QueryParser} from './queryParser';

// import config
import * as config from '../config.json';

/**
 * 
 * 
 * @class QueryManager
 */
export class QueryManager {
    
    token: string;
    props: any = {
        method: 'POST',
        uri: `${(<any>config).graphQL_address}/graphql`
    }
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
    fetchGraph(queryProps: any): Promise<any> {
        const {method, uri} = this.props;
        const {route, datas} = queryProps;
        
        let HEADERS = new Headers();
        HEADERS.append('content-type', 'application/json');
        HEADERS.append('X-CSRF-Token', this.token);

        if (typeof route !== 'string')
            return Promise.reject('query is not a string');

        return fetch(uri , {
            method: method,
            headers: HEADERS,
            body: JSON.stringify({
                query: route,
                variables: datas,
                authenticity_token: this.token
            }),
            credentials: 'same-origin'
        })
        .then(res => res.json())
        .catch(e => Promise.reject(e));
    }

    static queryBuilder() {

    }

}