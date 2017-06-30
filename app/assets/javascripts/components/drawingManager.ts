class DrawingManager {

    document: string;
    ctx: CanvasRenderingContext2D 

    /**
     * Creates an instance of DrawingManager.
     * @param {String} document 
     * @memberof DrawingManager
     */
    constructor(document: string) {
        this.document = document;
    }

    /**
     * Init Canvas
     * @void
     * @memberof DrawingManager
     */
    initCanvas() {
        if (typeof this.document !== 'string')
            throw 'DOM Element is not a string !';
            
        let d: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById(this.document);

        if (d === undefined)
            throw 'Element is not defined';
        
        if (d.getContext)
            this.ctx = <CanvasRenderingContext2D> d.getContext('2d');

        throw 'Canvas is not supported by the Browser / Element';
    }

    
    /**
     * Populate Burgers
     * 
     * @param {any} [elementList=[]] 
     * @returns 
     * @memberof DrawingManager
     */
    populateBurgers(elementList: Array<any>) {
        let SVGMap = [];
        if (elementList.length == 0)
            return Promise.reject('Nothing to draw');

        // Assuming that the Object contains the following properties
        elementList.map((d, i) => {
            // fetch the SVG
            let cat = Object.keys(elementList[i]);
            // Utils.fetchSVG(d.label, Object.keys(cat))
            //      .then((blob: any) => {
            //         // if (SVGMap[cat] === undefined)
            //         //     SVGMap[cat] = [];

            //         // SVGMap[cat].push({
            //         //     label: d.label,
            //         //     svg: blob
            //         // });
            //      });
        });
    }

}