import { LoaderComponentsManager } from './components/loaderComponentsFactory';
import { MenuComponents } from './components/menuComponents';
import { DOMUtils } from './utils/dom';

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        MenuComponents.init().then(res => {
            LoaderComponentsManager.duration = 50;
            
        })
        .then(() => {
            DOMUtils.applyStyle('overlay', 'id', ['opacity'], ['0'])
                    .applyClass('overlay', 'id', 'show');
        })
        .catch(e => console.log(e));

        LoaderComponentsManager.makeLoader();
    })
    
})();  