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
        return `{kings {id
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
                            }}}`;
    }
}





