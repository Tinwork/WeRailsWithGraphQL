// import our interface
import { Ingredients } from '../kings/burgerFactory';
import { burgerHelper } from '../kings/burgerHelper';

// Import Utils
import { Utils } from '../utils/utils';
import { DOMUtils } from '../utils/dom';

// Import Ingredients Factory
import { IngredientsCanvasManager } from '../canvas/ingredientsCanvasManager';

/**
 * Canvas Object
 * 
 * @interface CanvasObject
 */
export interface CanvasObject {
    name: string,
    path: string,
    canvasObject: any
}

/**
 * Control Drawing Manager
 */
export const controlDrawingManager = (ingredients: Array<Ingredients>, document: string = 'burger-container') => {
    let manager = new DrawingManager(document, ingredients);

    try {
        manager.initCanvas();

        return manager.retrieveSVGFromIngredients()
               .then(() => manager.draw())
               .then((res: Array<CanvasObject>) => Promise.resolve([res, manager.getCtx()]))
               .catch((e: string) => console.log(e));
    } catch(e) {
        return Promise.reject(e);
    }
};


/**
 * 
 * 
 * @class DrawingManager
 */
class DrawingManager {

    document: string;
    ctx: CanvasRenderingContext2D;
    canvasObj: Array<CanvasObject> = [];
    ingredients: Array<Ingredients>;
    canvas: HTMLCanvasElement;
    platform: string;

    /**
     * Creates an instance of DrawingManager.
     * @param {String} document 
     * @memberof DrawingManager
     */
    constructor(document: string, ingredients: Array<Ingredients>) {
        this.document = document;
        this.ingredients = ingredients;
        this.platform = navigator.platform.toLowerCase();
    }

    /**
     * Init Canvas
     * @void
     * @memberof DrawingManager
     */
    initCanvas() {
        if (typeof this.document !== 'string')
            throw 'DOM Element is not a string !';
            
        this.canvas = <HTMLCanvasElement> document.getElementById(this.document);

        if (this.canvas === undefined)
            throw 'Element is not defined';
        
        if (!this.canvas.getContext)
            throw 'Canvas is not supported by the Browser / Element';

        // set size props
        this.ctx = <CanvasRenderingContext2D> this.canvas.getContext('2d');
        this.setSize();

        
        if (this.platform === 'macintel')
            this.ctx.scale(2,2);
        
    }

    /**
     * Set Size
     * 
     * @returns 
     * @memberof DrawingManager
     */
    setSize() {
        // clear the canvas
        let container = DOMUtils.getElementFromType('interact-layout', 'id');
        this.ctx.clearRect(0, 0, 100, 100);
        // set the dimension of the canvas

        if (this.platform === 'macintel') {
            this.canvas.width  = 2 * container.offsetWidth;
            this.canvas.height = 2 * container.offsetHeight;
        
            return;
        }

        this.canvas.width  = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
        
        // set style size to canvas
        this.canvas.style.width  = container.offsetWidth;
        this.canvas.style.height = container.offsetHeight;
    }

     /**
     * 
     * 
     * @param {boolean} [useHelper=true] 
     * @param {Array<Ingredients>} ingredients 
     * @returns {Promise<string>} 
     * @memberof DrawingManager
     */
    retrieveSVGFromIngredients(useHelper: boolean = true): Promise<string> {
        // burger ingredient should have a path for the time being we're going to use the helper
        
        if (Utils.getType(this.ingredients) !== 'Array')
            return Promise.reject('Ingredients is not an array of Ingredients');
        
        // loop threw the ingredients and create an array of Object
        this.ingredients.map((ingredient: Ingredients) => {
            let ingredientObj: CanvasObject = {
                name: ingredient.name,
                path: useHelper ? Utils.asset_path(`burgers/${burgerHelper.getPathForName(ingredient.name)}`) : ``,
                canvasObject: Object.create({})
            }

            this.canvasObj.push(ingredientObj);
        });

        return Promise.resolve('done');
    }

    /**
     * 
     * 
     * @memberof DrawingManager
     */
    draw(): any {
        let ingredientCanvasFactory = new IngredientsCanvasManager(this.canvasObj, this.ctx);
        return ingredientCanvasFactory.drawSVGElement();
    }

    /**
     * 
     * 
     * @returns 
     * @memberof DrawingManager
     */
    getCtx() {
        return this.ctx;
    }
}
