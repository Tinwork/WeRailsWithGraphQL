const QueryParser = (() => {

    return {
        /**
         * Parse
         * @param {Object} datas
         */
        parse: (datas) => {
            // Create an Object in this order

            const opts = Object.assign({}, {
                name: datas.burger.label,
                ingredients: [] 
            });

            if (datas.burger.ingredients) 
                data.burger.ingredients.map(d => {
                    if (!opts.ingredients[d.category.label])
                        opts.ingredients[d.category.label] = [];
                    
                    opts.ingredients[d.category.label].push({
                        label: d.label,
                        calories: d.calories
                    });
                });

            return opts;    
        }
    }
})();