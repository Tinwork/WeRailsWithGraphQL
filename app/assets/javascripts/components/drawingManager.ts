// import our interface
import { Ingredients } from '../kings/burgerFactory';
import { burgerHelper } from '../kings/burgerHelper';
import { Utils } from '../utils/utils';


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
 * 
 * 
 * @class DrawingManager
 */
class DrawingManager {

    document: string;
    ctx: CanvasRenderingContext2D;
    canvasObj: Array<CanvasObject>;

    /**
     * Creates an instance of DrawingManager.
     * @param {String} document 
     * @memberof DrawingManager
     */
    constructor(document: string) {
        this.document = document;
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
        
        if (d.getContext)
            this.ctx = <CanvasRenderingContext2D> d.getContext('2d');

        throw 'Canvas is not supported by the Browser / Element';
    }


     /**
     * 
     * 
     * @param {boolean} [useHelper=true] 
     * @param {Array<Ingredients>} ingredients 
     * @returns {Promise<string>} 
     * @memberof DrawingManager
     */
    retrieveSVGFromIngredients(useHelper: boolean = true, ingredients: Array<Ingredients>): Promise<string> {
        // burger ingredient should have a path for the time being we're going to use the helper
        
        if (Utils.getType(ingredients) !== 'Array')
            return Promise.reject('Ingredients is not an array of Ingredients');
        
        // loop threw the ingredients and create an array of Object
        ingredients.map((ingredient: Ingredients) => {
            let ingredientObj: CanvasObject = {
                name: ingredient.name,
                path: useHelper ? burgerHelper(name) : ``,
                canvasObject: Object.create({})
            }
        });
    }
}