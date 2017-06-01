/**
 * Menu Component
 *      Menu Component is used to control the behavior of the entire left side bar menu of the client
 */
(() => {
    // Namespace _nmenu 
    // Referencing every functions that control the behavior of the menu
    const _menu = Object.create({});
    // Color of the menu
    const MENU_COLORS = {
        BURGER: '#713B30',
        SALAD: '#96C740',
        CONDIMENTS: '#F07D00'
    }
    // Use to store our menu DOM Component
    let _DOMmenu;

    /**
     * Fetch Burger
     *          Retrieve every burgers
     */
    _menu.fetchBurger = () => {
        utils._fetch({
            endpoint: 'api/burgers/list',
            method: 'POST'
        })
        .then(res => console.log(res))
        .catch(e => console.log(`e ${e}`));
    };

    /**
     * Generate Items
     *          Generate list of burgers to show in the sidebar
     */
    _menu.generateItems = () => {
        utils._generateStaticMenuItems()
            .then(items => {
                let burgerItems = document.getElementById('burgers-items');
                items.map(d => {
                    burgerItems.insertAdjacentHTML('beforeend', `
                        <div class="item ${d.type}" id="item-${d.type}">
                            <div class="circle-items">
                                <img src="${d.src}"></img>
                            </div>
                            <p>${d.name}</p>
                        </div>
                    `);

                    utils._addListener(`item-${d.type}`, _menu.addList.bind(null, d.type.toUpperCase()));
                });

                // add listener to this components
            })
            .catch(e => console.log(e));
    };

    /**
     * Slide
     *      Control the slie of the menu
     * @void
     */
    _menu.slide = function(){
        if (this.classList.contains('expand')) {
            this.classList.add('retract');
            this.classList.remove('expand');

            return;
        }
        
        this.classList.add('expand');
        this.classList.remove('retract');    
    };

    /**
     * Add List
     *      Add the list of elements in the menu
     *      and set the colors to it
     * @param {String} colors
     */
    _menu.addList = (colors) => {
        let DOMList = document.getElementById('col-list');
        utils._stylizer(DOMList, 'backgroundColor', MENU_COLORS[colors]);

        // get the dataset 
        utils._generateSubMenuItems()
            .then(res => {
                console.log(res);
                // Create menu items that we're going to append in the DOM
                let DOMString = ``;

                res.map(d => {
                    DOMString += `
                    <div class="menu-items-data" data-id="${d.id}">
                        <div class="items">
                           <img src="http://localhost:8080/assets/${d.label}.jpg"/>                 
                        </div>
                        <p>${d.label}</p>
                    </div>`
                });

                // should append to the slide container
                utils._insertDOMString(DOMString, 'col-list');
                // add a listener
                utils._addClassListener('menu-items-data', burgerManager.init);
            })
            .catch(e => console.log(e));
    };


    /**
     * Init
     *      Init the component
     */
    _menu.init = () => {
        document.addEventListener('DOMContentLoaded', () => {
            _DOMmenu = document.getElementById('menu-parent');
            utils._addListener('menu-parent', _menu.slide, 'click');
            
            // Add the items in the DOM 
            _menu.generateItems();
        });
    };

    _menu.init();
})();