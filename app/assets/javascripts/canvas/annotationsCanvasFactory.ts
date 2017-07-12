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

        this.appendBulletToCanvas(filterIngredients, data);        
    }

    
    /**
     * 
     * 
     * @param {Array<CanvasObject>} filterDatas 
     * @memberof AnnotationsCanvasFactory
     */
    appendBulletToCanvas(filterDatas: Array<CanvasObject>, data: any): void {
        filterDatas.map((d: CanvasObject, idx: number) => {


            let props = this.calculateCenter(d.canvasObject);
        
            // Getting the props for drawing a cirlce
            CanvasHelper.generateCircle(this.createRadiusOpts(props));
            CanvasHelper.drawLine(this.createLineOpts(props, idx));
            CanvasHelper.renderText(this.createTextPos(props, idx, data[idx]))
        });
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
            tX: idx % 2 === 0 ? (CanvasHelper.getCanvasWidth() / 2 - 200)
                              : 200,
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
            x   : idx % 2 === 0 ? (CanvasHelper.getCanvasWidth() / 2 - 170)
                                : 120,
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