// import our drawing Manager
import { CanvasObject } from '../components/drawingManager';

// Import 
import { Utils } from '../utils/utils';

export class IngredientsFactory {

    ingredients: Array<CanvasObject>
    ctx: CanvasRenderingContext2D

    /**
     * Creates an instance of IngredientsFactory.
     * @param {any} [Array=<CanvasObject>] 
     * @memberof IngredientsFactory
     */
    constructor(ingredients: Array<CanvasObject>, ctx: CanvasRenderingContext2D) {
        this.ingredients = ingredients;
    }

    /**
     * 
     * 
     * @returns {*} 
     * @memberof IngredientsFactory
     */
    drawSVGElement(): any {
        // get the path and the datas of each svg
        try {
            this.ingredients.map((ingredient: CanvasObject) => {
                Utils.fetchSVG(ingredient.path)
                    .then(this.createSVGCanvasObject)
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
     * @memberof IngredientsFactory
     */
    createSVGCanvasObject(svgData: Blob) {
        let img: HTMLImageElement = new Image(),
            url: any = self.URL.createObjectURL(svgData),
            drawDatas: any;

        img.onload = () => {
            drawDatas = this.ctx.drawImage(img, 0, 0);
            self.URL.revokeObjectURL(url);
            return Promise.resolve(drawDatas);
        }
    }


    /**
     * 
     * 
     * @param {*} d 
     * @memberof IngredientsFactory
     */
    storeCanvasObj(d: any) {
        // push the ingredient in canvas element in there
    }
}