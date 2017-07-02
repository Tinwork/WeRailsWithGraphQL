/**
 * @type {{observe}}
 */
const localeSwitcher = (() => {
    /**
     * Observe checkbox locale value
     */
    const observe = () => {
        let input = document.getElementById('myonoffswitch');
        input.addEventListener("click", hotReloadByLocale);
    };

    /**
     * Reload page /fr or /en
     *
     * @returns {void}
     */
    const hotReloadByLocale = () => {
        let input = document.getElementById('myonoffswitch');
        let locale = input.checked;

        return locale === true ? window.location.href = '/fr' : window.location.href = '/en';
    };

    return {
        observe: observe
    }
})();