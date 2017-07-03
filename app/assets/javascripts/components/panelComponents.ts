// Import Factory
import {
    Burger,
    Ingredients
} from '../kings/burgerFactory';

// Import Utils
import { DOMUtils } from '../utils/dom';
import { Utils } from '../utils/utils';
import { burgerHelper } from '../kings/burgerHelper';

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
    constructIngredientsPanel(): Promise <string> {

        this.tmpl = ``;
        this.clearPanel()

        // If no ingredients in burger then reject
        if (this.burger.ingredients === null ||
            this.burger.ingredients === undefined)
            return Promise.reject(`Burger ${this.burger.name} does not contains any ingredients`);

        // Add close button
        this.tmpl += this.addCloseButton();

        // Before constructing the panel we need to clean if necessary the ingredient panel
        this.burger.ingredients.map((ingredient: Ingredients) => {
            this.tmpl += `
                        <div class="ingredient">
                            <hr>
                            <img src="` + Utils.asset_path(`burgers/${burgerHelper(ingredient.name)}`) + `">
                            <p>${ingredient.name}</p>
                        </div>
                    `;
        });

        DOMUtils.applyTmpl('ingredients-panel', 'id', this.tmpl);
        // show ingredient panel
        DOMUtils.applyClass('ingredients-panel', 'id', 'showPanel', 'add');
        DOMUtils.applyClass('ingredients-panel', 'id', 'hidePanel', 'rm');

        // Bind the close button
        DOMUtils.addEventToElement('close-btn', 'id', 'click', (dom: any) => {
            dom.applyClass('ingredients-panel', 'id', 'hidePanel', 'add');
            dom.applyClass('ingredients-panel', 'id', 'showPanel', 'rm');
        }, DOMUtils)
        return Promise.resolve('added');
    }

    /**
     * Clear Panel 
     * 
     * @memberof PanelComponents
     */
    clearPanel(): void {
        // Hide element
        DOMUtils.applyClass('ingredients-panel', 'id', 'hidePanel', 'rm');
        let element: any = DOMUtils.getElementFromType('ingredients-panel', 'id');

        if (element.hasChildNodes())
            element.innerHTML = '';
    }

    /**
     * 
     * 
     * @returns {string} 
     * @memberof PanelComponents
     */
    addCloseButton(): string {
        return `<i id="close-btn" class="fa fa-times-circle-o" aria-hidden="true"></i>`;
    }
}