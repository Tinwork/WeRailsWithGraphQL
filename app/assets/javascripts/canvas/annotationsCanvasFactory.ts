// Import utils
import { Utils } from '../utils/utils';
import { DOMUtils } from '../utils/dom';

// Import the drawing manager
import { CanvasObject } from '../components/drawingManager';

/**
 * 
 * 
 * @class AnnotationsCanvasFactory
 */
class AnnotationsCanvasFactory {

    ctx: CanvasRenderingContext2D;
    ingredients: Array<CanvasObject>;

    /**
     * Creates an instance of AnnotationsCanvasFactory.
     * @param {CanvasRenderingContext2D} ctx 
     * @memberof AnnotationsCanvasFactory
     */
    constructor(ctx: CanvasRenderingContext2D, ingredients: Array<CanvasObject>) {
        this.ctx = ctx;
        this.ingredients = ingredients;
    }
}