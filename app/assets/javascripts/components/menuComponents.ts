// Importing GraphQL dependencies
import { QueryManager } from '../graphql/queryManager';
import { QueryRoutes } from '../graphql/queryRoutes'; 

// Importing Factory
import { Burger } from '../kings/burgerFactory';

// Importing Utils
import { Utils } from '../utils/utils'; 
import { DOMUtils } from '../utils/dom';

/**
 * Menu Components
 * @Revealing Module Pattern
 */
const MenuComponents = (() => {

    const asset_path: any = (<any>window).asset_path;

    // Static props
    const graphQLProps = {
        method: 'POST',
        uri: 'http://localhost:8080/graphql'    
    };
    
    /**
     * Init Menu Component
     * @return {Promise} QueryManager FetchGraph
     */
    const initMenuComponent = () => {
        const graphQLDatas = {
            query: QueryRoutes.ALL,
            datas: {}
        }
        
        try {
            const QueryManagerInstance = new QueryManager(Utils.retrieveGraphQLToken());
            return QueryManagerInstance.fetchGraph(graphQLProps, graphQLDatas)
                    .then(res => buildMenu(res))
                    .then(() => Promise.resolve(true))
                    .catch(e => Promise.reject(e));
        } catch(e) {
            return Promise.reject(e);
        }
    };

    /**
     * Build Menu
     * @param {Array} burgers 
     * @void
     */
    const buildMenu = (burgers: Array<Burger>) => {

        burgers.map(burger => {
            let tmpl = `
                <div class="burger">
                    <img src="`+asset_path("burger_sample.png")+ `"/>
                    <p>${burger.name}</p>
                </div>
            `
            // Append the template to the menu
            DOMUtils.applyTmpl('menu-items', 'id', tmpl);
        }); 
    };

    return {
        init: initMenuComponent
    }
})();

export {MenuComponents}; 