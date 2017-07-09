// Import the parent
import { AbstractCanvasManager } from './abstractCanvasManager';

// Import the utils
import { burgerHelper } from '../kings/burgerHelper';
import { Utils } from '../utils/utils';

/**
 * 
 * 
 * @class BeverageCanvasManager
 * @extends {AbstractCanvasManager}
 */
export class BeverageCanvasManager extends AbstractCanvasManager {


    /**
     * Creates an instance of BeverageCanvasManager.
     * @param {number} width 
     * @param {number} height 
     * @param {string} id 
     * @param {string} containerID 
     * @memberof BeverageCanvasManager
     */
    constructor(id: string, containerID: string) {
        super(id, containerID);
    }


    /**
     * 
     * 
     * @param {JSON} res 
     * @returns {Promise<boolean>} 
     * @memberof BeverageCanvasManager
     */
    createBeverage(res: any): Promise<any> {
        if (res === undefined) 
            return Promise.reject('Result is empty');

        // Get the path of the beverage
        let path = Utils.asset_path(burgerHelper.getBeveragePath(res.label));

        // Get the blob
        return Utils.fetchSVG(path, res.label)
             .then((b: Blob) => this._drawFacade(b))
             .catch((e: string) => console.log(e));
    }


    /**
     * 
     * 
     * @param {Blob} blob 
     * @returns {Promise<any>} 
     * @memberof BeverageCanvasManager
     */
    _drawFacade(blob: Blob): any {

        let img: HTMLImageElement = new Image(),
            url: any = self.URL.createObjectURL(blob);
        
        img.onload = function() {
            this.drawImg(img, {
                left  : this.ctx.canvas.clientWidth / 2,
                height: this.ctx.canvas.clientHeight / 2,
                width : img.width,
                heigth: img.height  
            })
            .then((res: any) => self.URL.revokeObjectURL(url))
            .then(() => Promise.resolve())
            .catch((e: string) => console.log(e));
        }.bind(this)

        img.src = url;
    }
}