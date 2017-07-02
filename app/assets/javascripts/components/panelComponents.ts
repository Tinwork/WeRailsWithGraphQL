// Import Factory
import { Burger, Ingredients } from '../kings/burgerFactory';

// Import Utils
import { DOMUtils } from '../utils/dom';
import { Utils } from '../utils/utils';

class PanelComponents {

    private burger: Burger;

    /**
     * Creates an instance of PanelComponents.
     * @param {Burger} burger 
     * @memberof PanelComponents
     */
    constructor(burger: Burger) {
        this.burger = burger;
    }

    /**
     * Construct Ingredients Panel
     * 
     * @returns {Promise<string>} 
     * @memberof PanelComponents
     */
    constructIngredientsPanel(): Promise<string> {
        let tmpl: string = ``;

        // If no ingredients in burger then reject
        if (this.burger.ingredients === null ||
            this.burger.ingredients === undefined)
            return Promise.reject(`Burger ${this.burger.name} does not contains any ingredients`);
            
        this.burger.ingredients.map((ingredient: Ingredients) => {
            tmpl += `
                <div class="ingredient">
                    <img src="`+Utils.asset_path(ingredient.name+'.svg')+`">
                    <p>${ingredient.name}</p>
                </div>
            `;
        });

        return Promise.resolve(tmpl);
    }
}