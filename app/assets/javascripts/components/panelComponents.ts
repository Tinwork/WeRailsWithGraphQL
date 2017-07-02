// Import Factory
import {
    Burger,
    Ingredients
} from '../kings/burgerFactory';

// Import Utils
import {
    DOMUtils
} from '../utils/dom';
import {
    Utils
} from '../utils/utils';

export class PanelComponents {

    private burger: Burger;
    private tmpl: string;
    private image_path: string;

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
    constructIngredientsPanel(): Promise < string > {

        this.tmpl = ``;
        this.clearPanel()

        // If no ingredients in burger then reject
        if (this.burger.ingredients === null ||
            this.burger.ingredients === undefined)
            return Promise.reject(`Burger ${this.burger.name} does not contains any ingredients`);

        // Before constructing the panel we need to clean if necessary the ingredient panel
        this.burger.ingredients.map((ingredient: Ingredients) => {
            this.tmpl += `
                        <div class="ingredient">
                            <hr>
                            <img src="` + Utils.asset_path(`burgers/salad/${ingredient.name.toLocaleLowerCase()}.svg`) + `">
                            <p>${ingredient.name}</p>
                        </div>
                    `;
        });
        DOMUtils.applyTmpl('ingredients-panel', 'id', this.tmpl);
        // show ingredient panel
        this.applyStyle(true);
        return Promise.resolve('added');
    }

    /**
     * Clear Panel 
     * 
     * @memberof PanelComponents
     */
    clearPanel(): void {
        // Hide element
        this.applyStyle(false);
        let element: any = DOMUtils.getElementFromType('ingredients-panel', 'id');

        if (element.hasChildNodes())
            element.innerHTML = '';
    }


    /**
     * Apply Style
     * 
     * @param {boolean} status 
     * @memberof PanelComponents
     */
    applyStyle(status: boolean): void {
        let element: any = DOMUtils.getElementFromType('ingredients-panel', 'id');

        if (status) 
            setTimeout(() => element.classList.add('show'), 0);
        else
            setTimeout(() => element.classList.remove('show'), 0);

    }
}