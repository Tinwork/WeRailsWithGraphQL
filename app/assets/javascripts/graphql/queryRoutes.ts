/**
 * 
 * 
 * @export
 * @interface graphQLDatas
 */
export interface GraphQLDatas {
    query: string;
    datas: any
}

/**
 * 
 * 
 * @class graphQLRoutes
 */
export class GraphQLRoutes {

    static endpoint: any = {
        method: 'POST',
        uri: 'http://localhost:8080/graphql'
    }


    /**
     * Get All Burgers Query
     * 
     * @static
     * @returns 
     * @memberof graphQLRoutes
     */
    static getAllBurgersQuery() {
        return `{kings 
                    {
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
                    }`;
    }

    /**
     * Get Ingredients
     * 
     * @static
     * @returns 
     * @memberof GraphQLRoutes
     */
    static getIngredients() {
        return `
            query IngredientMenu($id: Int!) {
                menu(id: $id) {
                    burger {
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
        `;
    }


    /**
     * 
     * 
     * @static
     * @returns 
     * @memberof GraphQLRoutes
     */
    static getBeverage() {
        return `
            query Beverage($id: Int!) {
                beverage(id: $id) {
                    id
                    label
                    calories
                    ice
                    category {
                        label
                    }
                }
            }
        `;
    }

    /**
     * 
     * 
     * @static
     * @returns 
     * @memberof GraphQLRoutes
     */
    static getCondiments() {
        return `
            query Condiment($id: Int!) {
                condiment(id: $id) {
                    label
                    calories
                    ingredients {
                    label
                    }
                }
            }
        `
    }


    /**
     * 
     * 
     * @static
     * @returns 
     * @memberof GraphQLRoutes
     */
    static getCondimentsById() {
        return `
            query Condiment($id: Int!) {
                condiment(id: $id) {
                    label
                    calories
                    ingredients {
                    label
                    }
                }
            }
        `
    }


}





