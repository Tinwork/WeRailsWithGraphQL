// import our interface
import { Ingredients } from '../kings/burgerFactory';
import { burgerHelper } from '../kings/burgerHelper';

// Import Utils
import { Utils } from '../utils/utils';

// Import Ingredients Factory
import { IngredientsFactory } from '../canvas/ingredientsFactory';

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
        manager.retrieveSVGFromIngredients()
               .then(() => manager.draw())
               .then(() => Promise.resolve('done'))
               .catch((e: string) => console.log(e));
    } catch(e) {
        return Promise.reject(e);
    }
}


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

    /**
     * Creates an instance of DrawingManager.
     * @param {String} document 
     * @memberof DrawingManager
     */
    constructor(document: string, ingredients: Array<Ingredients>) {
        this.document = document;
        this.ingredients = ingredients;
    }

    /**
     * Init Canvas
     * @void
     * @memberof DrawingManager
     */
    initCanvas() {
        if (typeof this.document !== 'string')
            throw 'DOM Element is not a string !';
            
        let d: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById(this.document);

        if (d === undefined)
            throw 'Element is not defined';
        
        if (!d.getContext)
            throw 'Canvas is not supported by the Browser / Element';
            
        this.ctx = <CanvasRenderingContext2D> d.getContext('2d');
        
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
                path: useHelper ? burgerHelper(name) : ``,
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
        let ingredientCanvasFactory = new IngredientsFactory(this.canvasObj, this.ctx);
        return ingredientCanvasFactory.drawSVGElement();
    }
}
