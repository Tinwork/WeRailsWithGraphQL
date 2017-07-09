// Define the generic burger size
const BURGER_SIZE_OPTS = {
    IMG_SIZE   : {ratio: 0.8},
    CANVAS_SIZE: {
        WIDTH : 1000,
        HEIGHT: 500
    }
};

// Define Type Available constant
const TYPE_AVAILABLE = [
    ['steak', 'chicken', 'bacon', 'fish'],
    ['salad', 'onion', 'pickle', 'tomato'],
    ['cheese_one', 'cheese_two'],
    ['fish_bread', 'whopper_bread', 'crispy_bread']
]

// Define beverage type
const BEVERAGE_TYPE = [
    'coke_light',
    'coke_zero',
    'coke_life',
    'coke',
    'fanta',
    'nestea',
    'sprite',
    'water'
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

            TYPE_AVAILABLE.map((ingredient: string[], idx: number) => {
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
            let bv = BEVERAGE_TYPE.map((beverage: string) => {
                if (beverage.includes(name))
                    return beverage;
            });

            if (bv.length === 0)
                return 'beverage_water.png';
            
            return `beverage_${bv[0]}.png`;
        } 
    };

})(BURGER_SIZE_OPTS);