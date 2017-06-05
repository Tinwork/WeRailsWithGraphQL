/**
 * Sidebar Component
 *      Control the sidebar and init the layout
 */
(() => {

    /**
     * Create Side Bar
     * @param {*} datas 
     * @return {String} template
     * @TODO replace with the name of the menu when available
     */
    const createSideBar = (datas) => {
        let template = ``;

        datas.kings.map((d, i) => {
            if (i ===  0)
                template += `<div class="logo" style="background-color: ${Utils.getColorByModulo('burger', 0)}">
                                <img src="assets/burgers_logo.png"/>
                            </div>`;

            template += `<div class="items" style="background-color: ${Utils.getColorByModulo('burger', i + 1)}">
                            <img src="assets/burger_sample.png"/>
                            <p>${d.label}</p>
                        </div>`;
        });

        return Promise.resolve(template);
    };

    /**
     * Append Side Bar
     */
    const appendSideBar = () => {
        let sidebar = document.getElementById('menu-items');
        // We should use the fetch here in order to get the data
        Utils.fetcher({method: 'POST', endpoint: 'https://marcintha.fr/json/menu.json'})
        .then(res =>  {
            return createSideBar.call(null, res.data);
        })
        .then(tmpl => {
            sidebar.insertAdjacentHTML('beforeend', tmpl);
            return Promise.resolve('done');
        })
        .catch(e => {
            console.log(e);
            Promise.reject(e)
        });
    };

    /**
     * Fire
     */
    const fire = () => {
        // init the loader
        SVGHelper.doLoader();

        setTimeout(() => {
            Promise.all([appendSideBar(), burgerComponent.init('sample')])
                .then(() => Utils.hideLoader.call())
                .catch(e => console.log('error '+e));
        }, 2000);
        
        
    }

    /**
     * Init
     *      Init the sidebar
     * @void
     */
    const init = () => {
        document.addEventListener('DOMContentLoaded', fire);
    };

    // Trigger the function imediately
    init();
})();