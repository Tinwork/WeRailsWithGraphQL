// Import condiment interface
import { Condiments } from '../components/condimentsMenuComponents';

// Import the abstract class
import { AbstractCanvasManager } from './abstractCanvasManager';

// Import Utils
import { Utils } from '../utils/utils';

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
        let img: HTMLImageElement = new Image(),
            url: any = self.URL.createObjectURL(blob);

        img.src = url;
        

        return new Promise((resolve, reject) => {
            console.log(this);
            img.onload = function() {
                this.drawImg(img, {
                    left  : (this.ctx.canvas.width / 2) - (img.width / 2) + 25, 
                    top   : (this.ctx.canvas.height / 2) - (img.height * 0.35 * 2) ,
                    width : img.width * 0.35,
                    height: img.height * 0.35
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
            x    : (this.ctx.canvas.width / 2) - 90,
            y    : (this.ctx.canvas.height / 2) - 50,
            text : `You will love our ${this.condiment.label} | which give you | ${this.condiment.calories} calories`,
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