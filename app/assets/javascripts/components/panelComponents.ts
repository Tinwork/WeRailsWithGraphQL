// Import Factory
import {
    Burger,
    Ingredients
} from '../kings/burgerFactory';

// Import Utils
import { DOMUtils } from '../utils/dom';
import { Utils } from '../utils/utils';
import { burgerHelper } from '../kings/burgerHelper';

// Import the drawing manager
import { controlDrawingManager } from '../components/drawingManager';

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
                        <div class="ingredient" data-name="${ingredient.name}">
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
        DOMUtils.addEventToElement('close-btn', 'id', 'click', this.closeCallback, DOMUtils);

        // Add event to elements 
        this.addEventToIngredients();

        return Promise.resolve('added');
    }


    /**
     * 
     * @TODO when it's ok remove the loader
     * @returns {*} 
     * @memberof PanelComponents
     */
    constructBurger(): any {
        return controlDrawingManager(this.burger.ingredients)
                .then(controlDrawingManager)
                .then(() => console.log('done'))
                .catch((e) => console.log(e));
    }


    /**
     * Close Callback 
     * 
     * @memberof PanelComponents
     */
    closeCallback(dom: any): void {
        dom.applyClass('ingredients-panel', 'id', 'hidePanel', 'add');
        dom.applyClass('ingredients-panel', 'id', 'showPanel', 'rm');
    }


    /**
     * 
     * 
     * @param {Array<Ingredients>} ingredients 
     * @memberof PanelComponents
     */
    addEventToIngredients(): void {
        DOMUtils.addEventToElement('ingredient', 'class', 'click', function() {
            // Create an instance of the canvas element

        });
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