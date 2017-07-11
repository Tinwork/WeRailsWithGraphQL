// Import the parent
import { AbstractCanvasManager } from './abstractCanvasManager';

// Import the utils
import { burgerHelper } from '../kings/burgerHelper';
import { Utils } from '../utils/utils';

// Import canvas helper
import { CanvasHelper } from './canvasHelper';

/**
 * 
 * 
 * @class BeverageCanvasManager
 * @extends {AbstractCanvasManager}
 */
export class BeverageCanvasManager extends AbstractCanvasManager {

    imgW: number;
    imgH: number;

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
        return this.initFacade()
             .then(() =>  Utils.fetchSVG(path, res.label))
             .then((b: Blob) => this._drawFacade(b))
             .then(() => this._drawText(res))
             .catch((e: string) => console.log(e));
    }


    /**
     * 
     * /!\ need refactoring
     * @param {Blob} blob 
     * @returns {Promise<any>} 
     * @memberof BeverageCanvasManager
     */
    _drawFacade(blob: Blob): any {

        let img: HTMLImageElement = new Image(),
            url: any = self.URL.createObjectURL(blob);
        
        img.src = url;

        return new Promise((resolve, reject) => {
            img.onload = function() {
                this.imgW = img.width * 0.35,
                this.imgH = img.height * 0.35

                this.drawImg(img, {
                    left: (this.ctx.canvas.width / 2) - (this.imgW + 25),
                    top: (this.ctx.canvas.height / 2) - (this.imgH + 140),
                    width : this.imgW,
                    height: this.imgH
                })
                .then((res: any) => self.URL.revokeObjectURL(url))
                .then(() => resolve())
                .catch((e: string) => console.log(e));
            }.bind(this)
        })
    }


    /**
     * 
     * 
     * @param {*} res 
     * @memberof BeverageCanvasManager
     */
    _drawText(res: any): void {
        CanvasHelper.setProps(this.ctx);
        CanvasHelper.renderText({
            x: (this.ctx.canvas.width / 2) - 90,
            y: (this.ctx.canvas.height / 2) - 50,
            text: `You have choose ${res.label} | which give you ${res.calories}`,
            font: '14px Insanibu'
        })
    }
}