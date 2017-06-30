/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/app/assets/javascript/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const loaderComponentsFactory_1 = __webpack_require__(1);
const menuComponents_1 = __webpack_require__(2);
(() => {
    document.addEventListener('DOMContentLoaded', () => {
        let loaderInstance = new loaderComponentsFactory_1.LoaderComponentsFactory();
        menuComponents_1.MenuComponents.init().then(res => console.log(res))
            .catch(e => console.log(e));
    });
})();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class LoaderComponentsFactory {
    constructor() {
    }
}
exports.LoaderComponentsFactory = LoaderComponentsFactory;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const queryManager_1 = __webpack_require__(3);
const queryRoutes_1 = __webpack_require__(4);
const utils_1 = __webpack_require__(5);
const MenuComponents = (() => {
    const graphQLProps = {
        method: 'POST',
        uri: 'http://localhost:8080/graphql'
    };
    const initMenuComponent = () => {
        const graphQLDatas = {
            query: queryRoutes_1.QueryRoutes.ALL,
            datas: {}
        };
        try {
            const QueryManagerInstance = new queryManager_1.QueryManager(utils_1.Utils.retrieveGraphQLToken());
            return QueryManagerInstance.fetchGraph(graphQLProps, graphQLDatas)
                .then(res => Promise.resolve(res))
                .catch(e => Promise.reject(e));
        }
        catch (e) {
            return Promise.reject(e);
        }
    };
    return {
        init: initMenuComponent
    };
})();
exports.MenuComponents = MenuComponents;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class QueryManager {
    constructor(token) {
        this.token = token;
    }
    fetchGraph(props, queryProps) {
        const { method, uri } = props;
        const { query, datas } = queryProps;
        console.log(query);
        let HEADERS = new Headers();
        HEADERS.append('content-type', 'application/json');
        HEADERS.append('X-CSRF-Token', this.token);
        if (typeof query !== 'string')
            return Promise.reject('query is not a string');
        return fetch(uri, {
            method: method,
            headers: HEADERS,
            body: JSON.stringify({
                query: query,
                variables: datas,
                authenticity_token: this.token
            }),
            credentials: 'same-origin'
        })
            .then(res => res.json())
            .then(res => QueryParser.parse)
            .then(res => res)
            .catch(e => Promise.reject(e));
    }
    static queryBuilder() {
    }
}
exports.QueryManager = QueryManager;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const QueryRoutes = (() => {
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
    });
    return {
        ALL: query.ALL
    };
})();
exports.QueryRoutes = QueryRoutes;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static fetchSVG(category, element) {
        if (!self.fetch) {
            Utils._fetchFallback();
        }
        return fetch(`/images/${category}/${element}.svg`)
            .then(res => res.blob())
            .catch(e => Promise.reject(e));
    }
    static fetchOtherWS(props) {
        const { method, uri, data } = props;
        let fetcher;
        if (!self.fetch)
            Utils._fetchFallback();
        if (method === 'GET')
            fetcher = fetch(uri, { method: 'GET' });
        else
            fetcher = fetch(uri, { method: 'POST', body: JSON.stringify(data) });
        return new Promise((resolve, reject) => {
            fetcher().then((res) => res.json())
                .then((res) => Promise.resolve(res))
                .catch((e) => Promise.reject(e));
        });
    }
    static _fetchFallback() {
    }
    static retrieveGraphQLToken() {
        let tokenHolder = document.getElementsByTagName('meta');
        if (tokenHolder === undefined || tokenHolder === null)
            throw 'Unable to retrieve the GraphQL Access Token';
        return tokenHolder[1].getAttribute('content');
    }
}
exports.Utils = Utils;


/***/ })
/******/ ]);