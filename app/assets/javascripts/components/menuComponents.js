/**
 * Menu Components
 * @Revealing Module Pattern
 */
const MenuComponents = (() => {


    // Static props
    const graphQLProps = {
        method: 'POST',
        uri: 'http://localhost:8080/graphql'    
    };
    
    /**
     * Init Menu Component
     * @return {Promise} QueryManager FetchGraph
     */
    const initMenuComponent = () => {
        const graphQLDatas = {
            query: QueryRoutes.ALL,
            datas: {}
        }

        console.log(graphQLDatas);
        
        try {
            const QueryManagerInstance = new QueryManager(Utils.retrieveGraphQLToken());

            return QueryManagerInstance.fetchGraph(graphQLProps, graphQLDatas)
                    .then(res => Promise.resolve(res))
                    .catch(e => Promise.reject(e));
        } catch(e) {
            return Promise.reject(e);
        }
    };

    return {
        init: initMenuComponent
    }
})();