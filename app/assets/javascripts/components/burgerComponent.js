/**
 * Burger Component
 *      Control the burger
 */
const burgerComponent = (() => {

    let DOMELement = {};
    let CALORIES = 0;

    /**
     * Init Generator
     *      Init the svg generator
     */
    const initGenerator = (type) => {
        Object.assign(DOMELement, {
            layout: document.getElementById('interact-layout'),
            svg: document.getElementById('burger-container'),
            footer: document.getElementById('footer')
        });

        return Promise.resolve(getBurgerParts());
    };


    /**
     * Get Burger Parts
     * @param {Object} props 
     */
    const getBurgerParts = (props, id = 1) => {
        Utils.fetcher({method: 'POST', data: id,endpoint: 'https://marcintha.fr/json/menu.json'})
            .then(res => getMenuIngredients(res, id))
            .then(buildSVG)
            .then(buildAnnotation)
            .then(res => Promise.resolve(true))
            .catch(e => Promise.reject(e));
    }

    /**
     * Get Menu Ingredients
     * @param {Object} datas
     * @return {Promise}
     */
    const getMenuIngredients = (datas, id = '1') => {
        let menulist = datas.data.kings;

        if (Utils.typeOf(menulist) !== 'Array')
            return Promise.reject('Menu is not an array');

        // Loop threw the array and build a map of ingredients
        for (let idx of menulist) {
            if (parseInt(idx.id) === id) {
                idx.burger.ingredients.map(ig => {
                    CALORIES += ig.calories;
                });

                return Promise.resolve({igredients: idx.burger.ingredients, name: idx.label, id: idx.id});
            }
        }

        return Promise.reject(`No menu exist with the id ${id}`);
    };

    /**
     * Build SVG
     * @param {Object} props
     */
    const buildSVG = (props) => {
        const {id, name} = props;

        // as we only have the sample we're going to build the sample svg
        d3.xml(`assets/burger_sample_svg.svg`).mimeType('image/svg+xml').get((e, xml) => {
            if (e)
                return Promise.reject(e);

            DOMELement.svg.appendChild(xml.documentElement);
        })

        return Promise.resolve(props);
    };

    /**
     * 
     * @param {Object} props 
     */
    const buildAnnotation = (props) => {
        const {ingredients, id} = props;
        document.getElementById('fat').innerHTML = `${CALORIES} kcal`;

        return Promise.resolve('done');
    };


    return {
        init: initGenerator
    }
})();