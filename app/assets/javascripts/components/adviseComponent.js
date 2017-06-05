class AdviseComponent {

    /**
     * Constructor
     * @param {Object} ingredients 
     */
    constructor(ingredients, name) {
        this.ingredients = ingredients;
        this.name = name;
    }

    /**
     * Filter Categories
     *      Reorder the ingredients by categories
     * @return {Object} ingredientsByCategory [Object <Array<Object>>]
     */
    filterCategories() {
        let ingredientsByCategory = Object.create({});

        this.ingredients.map(foodLabel => {
            if (ingredientsByCategory[foodLabel.category.label] === undefined)
                ingredientsByCategory[foodLabel.category.label] = [];
            
            ingredientsByCategory[foodLabel.category.label].push({
                'label': foodLabel.label,
                'calories': foodLabel.calories
            });
        })

        return ingredientsByCategory;
    }

    /**
     * Build Annotation
     *      Build the annotation
     * @param {Object} ingredients
     */
    buildAnnotation(ingredients){
        let parts = D3burger.locatePart(ingredients);

        let counterIdx = 0
        for (let idx in parts) {
            parts[idx] = this.appendGroup(parts[idx], counterIdx, this.retrieveHeight(idx));
            this.appendCircle(parts[idx], this.retrieveHeight(idx));
            counterIdx++;
        }        
    }

    /**
     * Retrieve Height
     *      Retrieve the height of a part
     * @param {Object} parts 
     */
    retrieveHeight(part_id) {
        let svg = document.getElementById(this.name);
        let path = svg.getElementById(part_id.toLowerCase());
        
        let transform = path.getBoundingClientRect();
        console.log(transform);

        return {
            centerHeight: transform.top - transform.height,
            centerWidth: transform.right - 500
        };
    }

    /**
     * Append Group
     * @param {Object} part 
     */
    appendGroup(part, idx, dimProps) {
        const {centerHeight} = dimProps;
        return part.append('g')
               .attr('id', 'information')
               .attr('transform', `translate(0, ${centerHeight - 15})`)
    }

    /**
     * Append Circle
     * @param {Object} part
     */
    appendCircle(part, dimProps) {
        let {centerWidth} = dimProps;
        return part.append('path')
                   .attr('d', SVGHelper.arcGenerator({
                       inner: 0,
                        outer: 20,
                        start: 0,
                        end: 2 * Math.PI
                   }))
                   .attr('transform', `translate(${centerWidth}, 0)`)
                   .attr('fill', 'white')
    }

    /**
     * Build
     *      Init the build of the annotation
     */
    build() {
        return Promise.resolve(this.filterCategories())
                .then(this.buildAnnotation.bind(this))
                .catch(e => Promise.reject(e));
    }
}