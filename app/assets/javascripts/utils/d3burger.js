/**
 * D3 Burger
 *      Manipulate the present SVG
 */
const D3burger = (() => {

    const SCREEN = Object.assign({}, {
        WIDTH: window.screen.width,
        HEIGHT: window.screen.height
    });

    let svg;

    /**
     * Init the d3burger utils
     * @param {String} id 
     */
    const init = (id) => {
        svg = d3.select(`#${id}`);
    };

    /**
     * Resize
     */
    const resize = (width) => {
        if (svg === null || svg === undefined)
            return;

        svg.attr('width', width)
           .attr('viewborx', '0 0 1500 452');
    };

    /**
     * Center
     *      Center the SVG
     */
    const center = (SVGElement = null) => {
        if (SVGElement !== null) {
            SVGElement.attr('transform', `translate(${SCREEN.WIDTH / 2}, 0)`);

            return;
        }

        svg.attr('transform', `translate(${SCREEN.WIDTH / 5}, 0)`);        
    };

    /**
     * Locate Part
     *      Locate the different part of the ingredients in the burger
     * @param {Object} typeIngredient
     */
    const locatePart = (typeIngredients) => {
        if (svg === null || svg === undefined)
            return;

        let part = Object.assign({});

        for (let ingredients in typeIngredients) {
            typeIngredients[ingredients].map(ingredient => {
                part[ingredient.label] = svg.select(`#${ingredient.label.toLowerCase()}`);
            });
        }

        return part;
    };

    return {
        init: init,
        resize: resize,
        center: center,
        locatePart: locatePart
    }
})();