// Import condiment interface
import { Condiments } from '../components/condimentsMenuComponents';

// Import the abstract class
import { AbstractCanvasManager } from './abstractCanvasManager';

// Import Utils
import { Utils } from '../utils/utils';
import { DOMUtils } from '../utils/dom';

// Import the helpers
import { burgerHelper } from '../kings/burgerHelper';
import { CanvasHelper } from './canvasHelper';

// Import Querymanager
import { QueryManager } from '../graphql/queryManager';
import { GraphQLRoutes } from '../graphql/queryRoutes';

/**
 * 
 * /!\ IF refacto -> reduce to one CanvasManager for the beverage and the condiments
 * @class CondimentsCanvasManager
 * @extends {AbstractCanvasManager}
 */
export class CondimentsCanvasManager extends AbstractCanvasManager{

    condiment   : Condiments;
    condimentID : number;

    /**
     * Creates an instance of CondimentsCanvasManager.
     * @param {Condiments} condiment 
     * @param {string} id 
     * @param {string} containerID 
     * @memberof CondimentsCanvasManager
     */
    constructor(condimentID: number, id: string, containerID: string) {
        super(id, containerID);
        this.condimentID = condimentID;
    }

    /**
     * 
     * /!\ Should use async instead of promises though
     * @memberof CondimentsCanvasManager
     */
    loadCondimentPicture(): Promise<any> {

        return  this.initFacade()
                   .then(() => this._retrieveCondimentByID())
                   .then((res: any) => {
                       this.condiment = res
                   })
                   .then(() => Utils.fetchSVG(
                       Utils.asset_path(burgerHelper.getCondimentPath(this.condiment.label)), 
                       this.condiment.label
                    ))
                   .then((b: Blob) => this._drawCondiment(b))
                   .then(() => this._drawText())
                   .then(() => this._calculateCalories())
                   .then(() => Promise.resolve('draw condiments'))
                   .catch((e: string) => Promise.reject(e));
    }


    /**
     * 
     * 
     * @memberof CondimentsCanvasManager
     */
    _retrieveCondimentByID(): Promise<any> {
        let _queryInstance = new QueryManager(Utils.retrieveGraphQLToken());
        
        return _queryInstance.fetchGraph({
            route   : GraphQLRoutes.getCondimentsById(),
            datas   : {id: this.condimentID} 
        })
        .then((res: any) => Promise.resolve(res.data.condiment));
    }
    
    /**
     * 
     * 
     * @param {Blob} blob 
     * @returns {Promise<any>} 
     * @memberof CondimentsCanvasManager
     */
    _drawCondiment(blob: Blob): Promise<any> {
        DOMUtils.applyStyle('condiments', 'id', ['backgroundImage'], ['none']);
        let img: HTMLImageElement = new Image(),
            url: any = self.URL.createObjectURL(blob),
            ratio: number = burgerHelper.getRatio();

        img.src = url;
        

        return new Promise((resolve, reject) => {
            img.onload = function() {

                this.imgW = img.width * (ratio - 0.45),
                this.imgH = img.height * (ratio - 0.45)

            
                this.drawImg(img, {
                    left  : (this.ctx.canvas.width / (2 * this.sizing())) - (this.imgW * 0.45), 
                    top   : (this.ctx.canvas.height / (2 * this.sizing())) -  (this.imgH * 0.45),
                    width : this.imgW,
                    height: this.imgH
                })
                .then(() => {
                    self.URL.revokeObjectURL(url);
                    resolve();
                })
                .catch((e: string) => reject(e));
            }.bind(this)
        });
    }


    /**
     * 
     * 
     * @memberof CondimentsCanvasManager
     */
    _drawText(): void {

        CanvasHelper.setProps(this.ctx);
        CanvasHelper.renderText({
            x    : (this.ctx.canvas.width / (2 * this.sizing())),
            y    : (this.ctx.canvas.height / (1 * this.sizing())) - 50,
            text : this.Locale.ilnHelper('condiment', [
                this.condiment.label,
                this.condiment.calories
            ]), 
            font : '14px Insanibu'
        })
    } 

    
    /**
     * 
     * 
     * @memberof CondimentsCanvasManager
     */
    _calculateCalories() {
        let cal = Utils.getCalories();
        cal.condiments = this.condiment.calories;
    }
}