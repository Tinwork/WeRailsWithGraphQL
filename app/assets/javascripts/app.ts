// Import Components
import { LoaderComponentsManager } from './components/loaderComponentsFactory';
import { MenuComponents } from './components/menuComponents';

// Import Utils
import { DOMUtils } from './utils/dom';
import { LocaleSwitcher } from './utils/lang';

(() => {
    let menu: MenuComponents = new MenuComponents();

    document.addEventListener('DOMContentLoaded', () => {
        menu.initMenuComponent().then(res => LoaderComponentsManager.duration = 50
        )
        .then(() => {
            DOMUtils.applyStyle('overlay', 'id', ['opacity'], ['0'])
                    .hideElement('overlay', 'id', 100)
                    .applyClass('overlay', 'id', 'show');

            return Promise.resolve(true);
        })
        .then(() => Promise.resolve(LocaleSwitcher.initObserver()))
        .catch(e => console.log(e));

        LoaderComponentsManager.makeLoader();
    })
    
})();  