// Importing other components
import { PanelComponents } from './panelComponents';

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

    private burgers: Array<Burger>;

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
                    .then(() => this.addEventToMenu('burger'))
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
        this.burgers = burgers;
        burgers.map((burger: Burger, idx: number) => {
            let classType = idx % 2 ? 'odd' : 'even';
            let tmpl = `
                <div class="burger ${classType} items" data-id=${burger.id}>
                    <div class="item-infos">
                        <img src="`+Utils.asset_path("burger_sample.png")+ `"/>
                        <p>${burger.name}</p>
                    </div>
                </div>
            `
            // Append the template to the menu
            DOMUtils.applyTmpl('menu-items', 'id', tmpl);
        });
    }


    /**
     * Add Event To Menu 
     *      Clicking on one menu will open the ingredient panel
     * @param {string} className 
     * @returns {Promise<boolean>} 
     * @memberof MenuComponents
     */
    addEventToMenu(className: string): Promise<boolean> {   
        DOMUtils.addEventToElement('burger', 'class', 'click', function(props: any) {
            const {burger, panel}: any = props;

            // Retrieving an attribute return a string so we need to cast it to a number
            let id = <number> this.getAttribute('data-id') - 1;
            if (burger[id] === undefined || burger[id] === null) 
                throw `Burger does not exist with id ${id}`;

            // Otherwise init the panel
            let panelComponent = new panel(burger[id]);
            panelComponent.constructIngredientsPanel();
            panelComponent.constructBurger();

        }, {burger: this.burgers, panel: PanelComponents});

        return Promise.resolve(true);
    }

    /**
     * Lang Switcher
     * 
     * @param {*} jQuery 
     * @memberof MenuComponents
     */
    langSwitcher(jQuery: any): void {
        // @Did
        jQuery('.carousel-container').slick({
            autoplay: false,
            infinite: true,
            vertical: true,
            verticalSwiping: true,
            centerMode: true,
            arrows: false,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true
        });
    } 
}

