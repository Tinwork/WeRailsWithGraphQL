// Import utils
import { Utils } from '../utils/utils';
import { DOMUtils } from '../utils/dom';
import { LocaleSwitcher } from '../utils/lang'; 

// Import the drawing manager
import { CanvasObject } from '../components/drawingManager';
import { CanvasHelper } from './canvasHelper';

const OPTIONS = {
    RADIUS: 6,
    COLOR : '#FFFFFF', 
    WIDTH : 2
};

/**
 * 
 * /!\ Though it's not a factory but more a manager...
 * @class AnnotationsCanvasFactory
 */
export class AnnotationsCanvasFactory {

    ctx: CanvasRenderingContext2D;
    ingredients: Array<CanvasObject>;
    size: number = navigator.platform.toLowerCase() === 'macintel' ? 2 : 1


    /**
     * Creates an instance of AnnotationsCanvasFactory.
     * @param {CanvasRenderingContext2D} ctx 
     * @memberof AnnotationsCanvasFactory
     */
    constructor(ctx: CanvasRenderingContext2D, ingredients: Array<CanvasObject>) {
        this.ctx = ctx;
        this.ingredients = ingredients;

        // Init our canvas helper
        CanvasHelper.setProps(this.ctx);
    }


    /**
     * 
     * 
     * @param {*} res 
     * @returns {Promise<any>} 
     * @memberof AnnotationsCanvasFactory
     */
    buildAnnotation(res: any, name: string): Promise<any> {
        let id: number = 0;
        /* 
         *  The process is to create an array based on the ingredients JSON and the CanvasObject array
         *
         */ 

        let data = res.data.menu.burger.ingredients;

        if (data.length === 0)
            return Promise.reject('No ingredient exist');

        // Filter for one ingredient
        let filterIngredients = this.ingredients.filter((ingredient: CanvasObject, idx: number) => {
            if (ingredient.name === name && !ingredient.isAn) {
                ingredient.isAn = true;
                id = idx;
                return ingredient;
            }
        });

        // The data is empty because it has already been set or no
        if (filterIngredients.length === 0)
            return Promise.resolve();

        // Filter for one ingredient
        let filterData = data.filter((d: any) => {
            if (d.label === name) 
                return d;
        });

        this.appendBulletToCanvas(filterIngredients, filterData, id);        
    }

    
    /**
     * 
     * 
     * @param {Array<CanvasObject>} filterDatas 
     * @memberof AnnotationsCanvasFactory
     */
    appendBulletToCanvas(filterDatas: Array<CanvasObject>, data: any, id: number): void {
        console.log(filterDatas);
        console.log(data);
        // filterDatas.map((d: CanvasObject, idx: number) => {
        //     let props = this.calculateCenter(d.canvasObject);
        
        //     // Getting the props for drawing a cirlce
        //     CanvasHelper.generateCircle(this.createRadiusOpts(props));
        //     CanvasHelper.drawLine(this.createLineOpts(props, idx));
        //     CanvasHelper.renderText(this.createTextPos(props, idx, data[idx]))
        // });

        let props = this.calculateCenter(filterDatas[0].canvasObject);
        
            // Getting the props for drawing a cirlce
        CanvasHelper.generateCircle(this.createRadiusOpts(props));
        CanvasHelper.drawLine(this.createLineOpts(props, id));
        CanvasHelper.renderText(this.createTextPos(props, id, data[0]))
    }


    /**
     * 
     * 
     * @param {*} position 
     * @returns {*} 
     * @memberof AnnotationsCanvasFactory
     */
    calculateCenter(position: any): any {
        let topCenter  = position.top  - (position.height / 0.75);
        let leftCenter = position.left + (position.width / 2);

        return {
            x: leftCenter,
            y: topCenter
        };
    }

    /**
     * 
     * 
     * @param {*} positionsProps 
     * @returns {*} 
     * @memberof AnnotationsCanvasFactory
     */
    createRadiusOpts(positionsProps: any): any {
        return Object.assign(positionsProps, {
            radius: OPTIONS.RADIUS,
            color : OPTIONS.COLOR,
            width : OPTIONS.WIDTH
        });
    }


    /**
     * 
     * 
     * @param {*} positionsProps 
     * @param {number} idx 
     * @returns {*} 
     * @memberof AnnotationsCanvasFactory
     */
    createLineOpts(positionsProps: any, idx: number): any {
        return Object.assign({}, {
            sX: positionsProps.x,
            sY: positionsProps.y,
            tX: idx % 2 === 0 ? (CanvasHelper.getCanvasWidth() / (2 * this.size) + 100)
                              : (CanvasHelper.getCanvasWidth() / (2 * this.size) - 100),
            tY: positionsProps.y
        });
    }

    /**
     * 
     * 
     * @param {*} positionProps 
     * @param {number} idx 
     * @returns {*} 
     * @memberof AnnotationsCanvasFactory
     */
    createTextPos(positionProps: any, idx: number, ingOpts: any): any {
        return Object.assign({}, {
            x   : idx % 2 === 0 ? (CanvasHelper.getCanvasWidth() / (2 * this.size) + 200)
                                : (CanvasHelper.getCanvasWidth() / (2 * this.size) - 200),
            y   : positionProps.y,
            text: LocaleSwitcher.ilnHelper('burger', [
                ingOpts.label, 
                ingOpts.category.label, 
                ingOpts.calories
            ]),
            font: '14px Insanibu'
        });
    }
}