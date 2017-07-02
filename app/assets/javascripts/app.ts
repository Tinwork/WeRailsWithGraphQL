import { LoaderComponentsManager } from './components/loaderComponentsFactory';
import { MenuComponents } from './components/menuComponents';
import { DOMUtils } from './utils/dom';

(() => {
    let menu: MenuComponents = new MenuComponents();

    document.addEventListener('DOMContentLoaded', () => {
        menu.initMenuComponent().then(res => {
            LoaderComponentsManager.duration = 50;
            
        })
        .then(() => {
            DOMUtils.applyStyle('overlay', 'id', ['opacity'], ['0'])
                    .hideElement('overlay', 'id', 100)
                    .applyClass('overlay', 'id', 'show');
        })
        .catch(e => console.log(e));

        LoaderComponentsManager.makeLoader();
    })
    
})();  