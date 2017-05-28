/**
 * Menu Component
 *      Menu Component is used to control the behavior of the entire left side bar menu of the client
 */
(() => {
    // Namespace _nmenu 
    // Referencing every functions that control the behavior of the menu
    const _menu = Object.create({});
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
     * @param {Array} items [Array<Object>]
     */
    _menu.generateItems = (items) => {
        
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
    }


    /**
     * Init
     *      Init the component
     */
    _menu.init = () => {
        document.addEventListener('DOMContentLoaded', () => {
            _DOMmenu = document.getElementById('menu-parent');
            utils._addListener('menu-parent', _menu.slide, 'click');
        });
    };

    _menu.init();
})();