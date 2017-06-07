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

        if (type === 'sample')
            return Promise.resolve(getSampleBurgerParts());

        return Promise.resolve(getBurgerParts());
    };

    /**
     * Get Sample Burger Parts
     *      Build a sample burger with annotation
     */
    const getSampleBurgerParts = () => {
        return Promise.resolve(Utils.sampleBurgerData())
            .then(res => getMenuIngredients(res, 0))
            .then(buildSVG)
            .then(buildAnnotation)
            .then(res => Promise.resolve(true))
            .then(buildUserWarning)
            .catch(e => Promise.reject(e));
    };

    /**
     * Get Burger Parts
     * @param {Object} props 
     */
    const getBurgerParts = (props, id = 1) => {
        return Utils.fetcher({method: 'POST', data: id,endpoint: 'https://marcintha.fr/json/menu.json'})
            .then(res => getMenuIngredients(res, id))
            .then(buildSVG)
            .then(buildAnnotation)
            .then(res => Promise.resolve(true))
            .then(buildUserWarning)
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

                return Promise.resolve({ingredients: idx.burger.ingredients, name: idx.label, id: idx.id});
            }
        }

        return Promise.reject(`No menu exist with the id ${id}`);
    };

    /**
     * Build SVG
     * @param {Object} props
     * @return {Promise}
     */
    const buildSVG = (props) => {
        const {id, name} = props;

        return new Promise((resolve, reject) => {
            d3.xml(asset_path("samples/burger_sample_svg.svg")).mimeType('image/svg+xml').get((e, xml) => {
                if (e)
                    return Promise.reject(e);

                DOMELement.svg.appendChild(xml.documentElement);
                D3burger.init(name);
                D3burger.resize(500);
                D3burger.center();
                resolve(props);
            })
        });    
    };

    /**
     * 
     * @param {Object} props 
     */
    const buildAnnotation = (props) => {
        const {ingredients, name} = props;
        const adviser = new AdviseComponent(ingredients, name);

        return Promise.resolve(adviser.build());
    };

    /**
     * build User Warning
     */
    const buildUserWarning = () => {
        document.getElementById('fat').innerHTML = `${CALORIES} kcal`;

        return Promise.resolve('done');
    }


    return {
        init: initGenerator
    }
})();