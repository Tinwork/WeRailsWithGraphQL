// Import utils
import { Utils } from '../utils/utils';
import { DOMUtils } from '../utils/dom';

// Import the drawing manager
import { CanvasObject } from '../components/drawingManager';


/**
 * 
 * /!\ Though it's not a factory but more a manager...
 * @class AnnotationsCanvasFactory
 */
export class AnnotationsCanvasFactory {

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

    buildAnnotation(res: any): Promise<any> {
        /* 
         *  The process is to create an array based on the ingredients JSON and the CanvasObject array
         *
         */ 

        let data = res.data.menu.burger.ingredients;

        if (data.length === 0)
            return Promise.reject('No ingredient exist');

        // Otherwise loop threw the CanvasObject
        let filterIngredients = this.ingredients.filter((ingredient: CanvasObject) => {
            let filterData = data.filter((d: any) => {
                if (d.label === ingredient.name)
                    return d;
            });

            if (filterData.length !== 0)
                return filterData;
        });

        console.log(filterIngredients);
        
    }
}