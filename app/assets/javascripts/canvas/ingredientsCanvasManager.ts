// import our drawing Manager
import { CanvasObject } from '../components/drawingManager';

// Import Utils
import { Utils } from '../utils/utils';
import { DOMUtils } from '../utils/dom';

// Import kings related module
import { burgerHelper } from '../kings/burgerHelper'; 
import { IngredientsCanvasDecorator } from './ingredientsCanvasDecorator';

/**
 * 
 * 
 * @interface CanvasIMGProps
 */
interface CanvasIMGProps {
    height: number,
    width : number,
    top   : number,
    left  : number,
}

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
     * /!\ Async issue we need to reorder the datas
     * This code might need some refactoring
     * @returns {*} 
     * @memberof IngredientsCanvasManager
     */
    drawSVGElement(): any {
        // first order the ingredients
        this.orderIngredients();
        let promises: any = [];
        // get the path and the datas of each svg
        try {
            this.ingredients.map((ingredient: CanvasObject) => {
                promises.push(Utils.fetchSVG(ingredient.path, ingredient.name));
            });

            Promise.all(promises)
                   .then(res => {
                       if (Utils.getType(res) !== 'Array')
                           return Promise.reject('results is not a type of array');

                       let copyRes = IngredientsCanvasDecorator.dataQuickSort(res);
                       copyRes.map((image: any, idx: number) => this.createSVGCanvasObject(image, idx));
                   })
                   .catch(e => {throw e});

            // pushing promises
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
    createSVGCanvasObject(svgData: Blob, idx: number): any {
        let img: HTMLImageElement = new Image(),
            url: any = self.URL.createObjectURL(svgData),
            drawDatas: any;
        
        // as data returns async we need to order it again..
        img.onload = () => this.drawImage(img, url)
                               .then(res => this.storeCanvasObj(res, idx));
        // set the source of the file
        img.src = url;
    }

    /**
     * 
     * @param {Object} img
     */
    drawImage(img: any, url: any): Promise<any> {
        const ratio = burgerHelper.getRatio();
        let elementSize: any = burgerHelper.getSize(img);
        let panel = DOMUtils.getElementFromType('ingredients-panel', 'id');

        // Calculating width
        let left  :number = (this.ctx.canvas.clientWidth / 2) - (panel.clientWidth * ratio);

        try {
            this.ctx.drawImage(img, 
                left, 
                this.imgHeight === undefined ? this.ctx.canvas.clientHeight / 3 : this.imgHeight,  
                elementSize.width, 
                elementSize.height);
            // set the height of the props

            if (this.imgHeight === undefined) 
                this.imgHeight = (this.ctx.canvas.clientHeight / 3) + 65;
            else 
                this.imgHeight += elementSize.height + 10;

            self.URL.revokeObjectURL(url);

            return Promise.resolve({
                width : elementSize.width,
                height: elementSize.height,
                top   : this.imgHeight,
                left  : left
            });
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
    storeCanvasObj(d: any, idx: number) {
        // Create an Object of CanvasIMGProps
        let canvasImgProps: CanvasIMGProps = {
            height: d.height,
            width : d.width,
            top   : d.top,
            left  : d.left
        };

        // Saving the props into the canvas object
        this.ingredients[idx].canvasObject = canvasImgProps;
    }
}