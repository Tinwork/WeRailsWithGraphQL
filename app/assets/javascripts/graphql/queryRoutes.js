/**
 * Build Template
 * @return {Object}
 */
const QueryRoutes = (() => {
    // Query Routes
    const query = Object.assign({}, {
        ALL: `
            { 
                kings {
                    id 
                    label
                        burger {
                            id
                            label 
                            ingredients {
                                label 
                                calories
                                category {
                                    label
                                }
                            }
                        }
                }
            }
        `,
        BURGERS: `
            kings: {
                
            }
        `

    })

    return {
        ALL: query.ALL
    }
})();




