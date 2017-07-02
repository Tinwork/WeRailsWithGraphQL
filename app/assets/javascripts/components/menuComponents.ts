// Importing GraphQL dependencies
import { QueryManager } from '../graphql/queryManager';
import { GraphQLRoutes,  GraphQLDatas} from '../graphql/queryRoutes'; 

// Importing Factory
import { Burger } from '../kings/burgerFactory';

// Importing Utils
import { Utils } from '../utils/utils'; 
import { DOMUtils } from '../utils/dom';

/**
 * Menu Components
 */
export class MenuComponents {

    private graphQLProps: any = {
        method: 'POST',
        uri: 'http://localhost:8080/graphql'
    }


    /**
     * Init Menu Component 
     * 
     * @returns 
     * @memberof MenuComponents
     */
    initMenuComponent() {
        // Build a query Object
        const graphQLDatas: GraphQLDatas = {
            query: GraphQLRoutes.getAllBurgersQuery(),
            datas: null
        }

        try {
            // Create a new instance of our query manager
            const QueryManagerInstance = new QueryManager(Utils.retrieveGraphQLToken());

            // Retrieve the datas
            return QueryManagerInstance.fetchGraph(this.graphQLProps, graphQLDatas)
                    .then(res => this.buildMenu(res))
                    .then(() => Promise.resolve(true))
                    .catch(e => Promise.reject(e));
        } catch(e) {
            return Promise.reject(e);
        }
    }


    /**
     * Build Menu 
     * 
     * @param {Array<Burger>} burgers 
     * @memberof MenuComponents
     */
    buildMenu(burgers: Array<Burger>) {
        // Loop threw the burger
        burgers.map((burger: Burger, idx: number) => {
            let classType = idx % 2 ? 'odd' : 'even';
            let tmpl = `
                <div class="burger ${classType}">
                    <img src="`+Utils.asset_path("burger_sample.png")+ `"/>
                    <p>${burger.name}</p>
                </div>
            `
            // Append the template to the menu
            DOMUtils.applyTmpl('menu-items', 'id', tmpl);
        });
    }
}

