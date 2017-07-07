// import our drawing Manager
import { CanvasObject } from '../components/drawingManager';

// Import Utils
import { Utils } from '../utils/utils';
import { DOMUtils } from '../utils/dom';

// Import kings related module
import { burgerHelper } from '../kings/burgerHelper'; 
import { IngredientsCanvasDecorator } from './ingredientsCanvasDecorator';


export class IngredientsCanvasManager {

    ingredients: Array<CanvasObject>;
    ctx        : CanvasRenderingContext2D;
    imgHeight  : any;

    /**
     * Creates an instance of IngredientsCanvasManager.
     * @param {any} [Array=<CanvasObject>] 
     * @memberof IngredientsCanvasManager
     */
    constructor(ingredients: Array<CanvasObject>, ctx: CanvasRenderingContext2D) {
        this.ingredients = ingredients;
        this.ctx = ctx;
    }

    /**
     * Order Ingredients
     * 
     * @memberof IngredientsCanvasManager
     */
    orderIngredients() {
        let breadPosition: number[] = [];

        this.ingredients.map((ingredient: CanvasObject, idx: number) => {
            if (ingredient.name.includes('bread') || 
                ingredient.name.includes('pain')) 
                    breadPosition.push(idx);
        });

        // if we didn't find any bread inject bread
        // Yes there're mutation
        if (breadPosition.length === 0)
            IngredientsCanvasDecorator.addBread(this.ingredients);
        else
            IngredientsCanvasDecorator.orderBread(this.ingredients, breadPosition);

    }

    /**
     * 
     * 
     * @returns {*} 
     * @memberof IngredientsCanvasManager
     */
    drawSVGElement(): any {
        // first order the ingredients
        this.orderIngredients();
        console.log(this.ingredients);
        // get the path and the datas of each svg
        try {
            this.ingredients.map((ingredient: CanvasObject) => {
                Utils.fetchSVG(ingredient.path)
                    .then(res => this.createSVGCanvasObject(res))
                    .then(this.storeCanvasObj)
                    .catch(e => {
                        throw e;
                    });
            });

            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }


    /**
     * 
     * 
     * @param {Blob} svgData 
     * @memberof IngredientsCanvasManager
     */
    createSVGCanvasObject(svgData: Blob): any {
        let img: HTMLImageElement = new Image(),
            url: any = self.URL.createObjectURL(svgData),
            drawDatas: any;
        
        try {
            img.onload = () => this.drawImage(img, url)

        } catch (e) {

        }
        // set the source of the file
        img.src = url;
    }

    /**
     * 
     * @param {Object} img
     */
    drawImage(img: any, url: any): Promise<string> {
        let elementSize: any = burgerHelper.getSize(img);
        let panel = DOMUtils.getElementFromType('ingredients-panel', 'id');

        try {
            this.ctx.drawImage(img, 
                               (this.ctx.canvas.clientWidth / 2) - (panel.clientWidth * 0.5), 
                               this.imgHeight === undefined ? 10 : this.imgHeight,  
                               elementSize.width, 
                               elementSize.height);
            // set the height of the props
            this.imgHeight = elementSize.height + 50;
            console.log(this.imgHeight);
            self.URL.revokeObjectURL(url);
            return Promise.resolve('done');
        } catch (e) {
            return Promise.reject(e);
        }
    }

    /**
     * 
     * 
     * @param {*} d 
     * @memberof IngredientsCanvasManager
     */
    storeCanvasObj(d: any) {
        // push the ingredient in canvas element in there
    }
}