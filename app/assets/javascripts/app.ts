// Import Components
import { LoaderComponentsManager } from './components/loaderComponentsFactory';
import { SwitcherMenuComponents } from './components/switcherMenuComponents';

// Import Utils
import { DOMUtils } from './utils/dom';
import { LocaleSwitcher } from './utils/lang';

(() => {
    // Init the menu with the burgers first
    let menu: any = SwitcherMenuComponents.getComponentsByName('burgers');
    // Retrieve the menu components by default

    /**
     * Init Callback
     * @TODO return an error to the loader in order to display a message in the front
     */
    const initCallback = () => {
        menu.initMenuComponent().then(() => LoaderComponentsManager.duration = 50)
        .then(() => {
            DOMUtils.applyStyle('overlay', 'id', ['opacity'], ['0'])
                    .hideElement('overlay', 'id', 100)
                    .applyClass('overlay', 'id', 'show', 'rm');

            return Promise.resolve(true);
        })
        .then(() => DOMUtils.addSlick())
        .then(() => Promise.resolve(LocaleSwitcher.initObserver()))
        .catch((e: string) => console.log(e));
    };

    /**
     * Add Event Switcher
     */
    const addEventSwitcher = () => {
        let textTitle = DOMUtils.getElementFromType('text-title', 'id');

        DOMUtils.addEventToElement('selAction', 'class', 'click', function() {
            // get id
            let id = parseInt(this.getAttribute('data-id'));
            let domID = this.id;

            let name: string = SwitcherMenuComponents.switchType(id);
            // Get the menu by the id
            let menu: any = SwitcherMenuComponents.getComponentsByName(name);

            // Should we put this into an other method ? or is it too much abstraction
            SwitcherMenuComponents.initMenu(menu)
                .then(() => console.log('init'))
                .catch((e: string) => console.log(e));

            // Update the switches
            SwitcherMenuComponents.updateButton(id, domID);

            // Update the name of the cat
            textTitle.innerHTML = LocaleSwitcher.ilnHelper('', [], true, id);
        })
    };

    // Start when the dom is loaded
    document.addEventListener('DOMContentLoaded', () => {
        LoaderComponentsManager.makeLoader();
        addEventSwitcher();
        initCallback();
    });
    
})();  