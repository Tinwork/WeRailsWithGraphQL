(() => {
    document.addEventListener('DOMContentLoaded', () => {
        let loaderInstance = new LoaderComponentsFactory();
        MenuComponents.init().then(res => console.log(res))
                       .catch(e => console.log(e));
    })
    
})();