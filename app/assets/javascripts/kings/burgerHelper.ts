// Define the generic burger size
// Ratio = 1280 = 0.8
// 1 = 1600
import { Utils } from '../utils/utils';
         
const BURGER_SIZE_OPTS = {
    IMG_SIZE   : {ratio: Utils.calculateMainCanvasRatio()},
    CANVAS_SIZE: {
        WIDTH : 1000,
        HEIGHT: 500
    }
};

// Define Types Available constant
const TYPES_AVAILABLE = [
    ['steak', 'chicken', 'bacon', 'fish'],
    ['salad', 'salade', 'onion', 'oignon', 'pickle', 'cornichon', 'tomato', 'tomate'],
    ['cheese_one', 'cheese_two', 'fromage', 'cheese'],
    ['fish_bread', 'whopper_bread', 'crispy_bread']
]

// Define beverages type
const BEVERAGES_TYPE = [
    'coke_light',
    'coke_zero',
    'coke_life',
    'coke',
    'fanta',
    'nestea',
    'sprite',
    'water'
];

// Define condiments type
const CONDIMENTS_TYPE = [
    'frie',
    'frites',
    'nuggets',
    'strips',
    'onion',
    'cheesy',
    'snackbox'
]

/**
 * Burger Helper
 * @param {Object: <any>} OPTIONS
 * @return {Object: <any>} 
 */
export const burgerHelper = ((OPTIONS) => {

    /**
     * 
     * @param {Object: <any>} OPTIONS 
     * @param {Object: <any>} usersPreferences
     * @return {Object <any>}
     */
    const calculateSize = (img: any) => {

        const { width, height } = _getSVGElementSize(img);
    
        // Calculating the size of the burger depending of the preference..
        if (typeof width === 'undefined' || typeof height === 'undefined')
            return Promise.reject('image profile is undefined');
        
        return {
            width : OPTIONS.IMG_SIZE.ratio * width,
            height: OPTIONS.IMG_SIZE.ratio * height
        }
    };

    /**
     * _Get SVG Element Size
     * @param {Object} img
     * @return {Object}
     */
    const _getSVGElementSize = (img: any): any => {

        return {
            width : img.width,
            height: img.height
        }
    }

    
    /**
     * Get Path
     * @param {Number} idx 
     */
    const getPath = (idx: number, name: string) => {
        let path: string = '';
        switch(idx) {
            case 0:
                path += `/viande/${name}.svg`;
            break;
            case 1:
                path += `/salad/${name}.svg`;
            break;
            case 2:
                path += `/fromage/${name}.svg`;
            break;
            case 3:
                path += `/pain/${name}.svg`;
            break;
            default:
                path += `/pain/bottom_whopper_bread.svg`;
        }

        return path;
    } 

    return {
        /**
         * Get Path For Name
         * @param {String} ingredientName
         * @return {String} path
         */
        getPathForName: (ingredientName: string) => {
            let path = ``;

            TYPES_AVAILABLE.map((ingredient: string[], idx: number) => {
                ingredient.map((name: string): void => {
                    if (ingredientName.toLowerCase().indexOf(name) !== -1)
                        path = getPath(idx, name)
                })
            });

            return path || `/pain/bottom_whopper_bread.svg`;
        },

        /**
         * Get Size
         * @param {Object} ratio
         */
        getSize: calculateSize,

        /**
         * Get Ratio
         *      Get the ratio
         * @return {Number} ratio
         */
        getRatio: () => OPTIONS.IMG_SIZE.ratio,

        /**
         * Get Beverage Path
         * @param {string} name
         * @return {string}
         */
        getBeveragePath: (name: string) => {
            let bv = BEVERAGES_TYPE.filter((beverage: string) => {
                if (beverage.includes(name.toLowerCase()))
                    return beverage;
            });

            if (bv.length === 0)
                return 'beverages/beverage_water.png';
            
            return `beverages/beverage_${bv[0]}.png`;
        },
        
        /**
         * Get Condiment Path
         *      Get the path for a given condiment
         * @param {string} name
         * @return {string} path
         */
        getCondimentPath: (name: string) => {
            let condiment = CONDIMENTS_TYPE.filter((condiment: string) => {
                if (condiment.indexOf(name.toLowerCase()) !== -1)
                    return condiment;
            });

            console.log(condiment);
            if (condiment.length === 0)
                return `condiments/nuggets.png`;

            return `condiments/${condiment[0]}.png`
        }
    };

})(BURGER_SIZE_OPTS);