import { CanvasObject } from '../components/drawingManager';
import { burgerHelper } from '../kings/burgerHelper';
import { Utils } from '../utils/utils';

export class IngredientsCanvasDecorator {

    /**
     * 
     * 
     * @static
     * @type {CanvasObject}
     * @memberof ingredientsCanvasDecorator
     */
    static topBread: CanvasObject = {
        name: 'top-bread',
        path: Utils.asset_path(`burgers/${burgerHelper.getPathForName('whopper_bread')}`),
        canvasObject: Object.create({}),
    };

    /**
     * 
     * 
     * @static
     * @type {CanvasObject}
     * @memberof ingredientsCanvasDecorator
     */
    static bottomBread: CanvasObject = {
        name: 'bottom-bread',
        path: Utils.asset_path(`burgers/${burgerHelper.getPathForName('bottom')}`),
        canvasObject: Object.create({}),
    };

    /**
     * 
     * 
     * @static
     * @param {Array<CanvasObject>} ingredients 
     * @returns {Array<CanvasObject>} 
     * @memberof ingredientsCanvasDecorator
     */
    static addBread(ingredients: Array<CanvasObject>): Array<CanvasObject>{
        let self = IngredientsCanvasDecorator;

        ingredients.splice(0, 0, self.topBread);
        ingredients.splice(ingredients.length, 0, self.bottomBread)

        console.log(self.bottomBread);

        return ingredients;
    }

    /**
     * 
     * 
     * @static
     * @param {Array<CanvasObject>} ingredients 
     * @param {number[]} position 
     * @returns {Array<CanvasObject>} 
     * @memberof ingredientsCanvasDecorator
     */
    static orderBread(ingredients: Array<CanvasObject>, position: number[]): Array<CanvasObject> {
        let bread: Array<CanvasObject> = [];

        // save the breads
        ingredients.map((ingredient: CanvasObject, idx: number) => {
            position.map((d: number) => {
                if (idx === d)
                    bread.push(ingredient);
            })
        });

        // remove the bread from the original array
        let filterIngredient = ingredients.filter((ingredient: CanvasObject, idx: number) => {
            let find: any = position.find((id: number) => {
                return id === idx;
            });

            if (typeof find === 'undefined') 
                return ingredient;
        });

        // Add the bread at the beginning and at the bottom
        filterIngredient.splice(0, 0, bread[0]);
        filterIngredient.splice(filterIngredient.length - 1, 0, bread[1]);

        return filterIngredient;
    }
}