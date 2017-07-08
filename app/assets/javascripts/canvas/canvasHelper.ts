/**
 * 
 * 
 * @class CanvasHelper
 */
export class CanvasHelper {

    static ctx: CanvasRenderingContext2D;
    
    /**
     * 
     * 
     * @static
     * @param {*} props 
     * @memberof CanvasHelper
     */
    static generateCircle(props: any) {
        let { x, 
              y, 
              radius, 
              endAngle,
              color,
              width
        } = props;

        if (endAngle === undefined || endAngle === null)
            endAngle = 2 * Math.PI;

        CanvasHelper.ctx.beginPath();
        CanvasHelper.ctx.arc(x, y, radius, 0, endAngle, false);
        CanvasHelper.ctx.lineWidth = width;
        CanvasHelper.ctx.fillStyle = color;
        CanvasHelper.ctx.strokeStyle = color;
        CanvasHelper.ctx.stroke();
    }


    /**
     * 
     * 
     * @static
     * @param {*} props 
     * @memberof CanvasHelper
     */
    static drawLine(props: any): void {
        let {
            sX,
            sY,
            tX,
            tY,
            color
        } = props;

        CanvasHelper.ctx.beginPath();
        CanvasHelper.ctx.moveTo(sX, sY);
        CanvasHelper.ctx.lineTo(tX, tY);
        CanvasHelper.ctx.strokeStyle = color;
        CanvasHelper.ctx.stroke();
    }


    /**
     * 
     * 
     * @static
     * @param {*} props 
     * @param {string} text 
     * @memberof CanvasHelper
     */
    static renderText(props: any): void {
        let {
            x,
            y,
            text,
            font
        } = props;

        let texts = text.split('|');

        if (texts.length === 0) {
             CanvasHelper.ctx.font = font;
             CanvasHelper.ctx.fillText(text, x, y);
             CanvasHelper.ctx.textAlign = 'center';
             CanvasHelper.ctx.stroke();
             return;
        }

        // if we founded a break into the text loop and create text
        texts.map((t: string, idx: number) => {
            CanvasHelper.ctx.font = font;
            CanvasHelper.ctx.fillText(
               t, 
               x, 
               idx === 0 ? y : y + (idx * 10));
            CanvasHelper.ctx.textAlign = 'center';
            CanvasHelper.ctx.stroke();
        });
    }

    /**
     * 
     * 
     * @static
     * @param {CanvasRenderingContext2D} ctx 
     * @memberof CanvasHelper
     */
    static setProps(ctx: CanvasRenderingContext2D): void {
        CanvasHelper.ctx = ctx;
    }

    /**
     * 
     * 
     * @static
     * @returns 
     * @memberof CanvasHelper
     */
    static getCanvasWidth() {
        let center = CanvasHelper.ctx.canvas.width;

        return center;
    }
}