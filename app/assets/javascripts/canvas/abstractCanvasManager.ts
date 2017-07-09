import { DOMUtils } from '../utils/dom';


/**
 * 
 * 
 * @class AbstractCanvasManager
 */
export class AbstractCanvasManager {
    
    canvasID: string;
    ctx     : CanvasRenderingContext2D;
    contID  : string;


    /**
     * Creates an instance of AbstractCanvasManager.
     * @param {number} width 
     * @param {number} height 
     * @param {string} id 
     * @param {string} containerID 
     * @memberof AbstractCanvasManager
     */
    constructor(id: string, containerID: string) {
        this.canvasID = id;
        this.contID   = containerID;
    }

    
    /**
     * 
     * 
     * @returns {Promise<any>} 
     * @memberof AbstractCanvasManager
     */
    initCanvas(): Promise<any> {
        let canvas = <HTMLCanvasElement> DOMUtils.getElementFromType(this.canvasID, 'id');

        // get the canvas
        if (canvas === undefined || canvas === null)
            return Promise.reject('canvas does not exist');
        
        // Get the context
        this.ctx = canvas.getContext('2d');
        return Promise.resolve(canvas);
    }

     /**
     * 
     * 
     * @memberof BeverageCanvasManager
     */
    setSize(canvas: HTMLCanvasElement): Promise<any> {
        // retrieve the container
        let container = DOMUtils.getElementFromType(this.contID, 'id');
        // retrieve the factor of the canvas
        let factor: number = this.sizing();
        
        // set the size
        canvas.width  = factor * container.offsetWidth;
        canvas.height = factor * container.offsetHeight;

        // set the style to the canvas
        canvas.style.width  = container.offsetWidth;
        canvas.style.height = container.offsetHeight;

        return Promise.resolve();
    }


    /**
     * 
     * 
     * @returns {number} 
     * @memberof AbstractCanvasManager
     */
    sizing(): number {
        if (navigator.platform.toLowerCase() === 'macintel')
            return 2;
        
        return 1;
    }

    /**
     * 
     * 
     * @param {*} blob 
     * @param {*} props 
     * @memberof AbstractCanvasManager
     */
    drawImg(blob: any, props: any) {
        let {
            left,
            top,
            width,
            height
        } = props;

        try {
            this.ctx.drawImage(
                blob,
                left,
                top,
                width,
                height
            )  
            
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        };
    }
}