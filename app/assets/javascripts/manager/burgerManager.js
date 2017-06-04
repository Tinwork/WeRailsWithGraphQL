/**
 * Burger Manager
 *          Burger manager is used to control the burger | salad | condiments ...
 */
const burgerManager = (() => {
    // Constant
    const SCREEN = Object.assign({}, {
        WIDTH: window.screen.width - 120,
        HEIGHT: window.screen.height - 300
    })

    // MenuID
    let menuID;
    
    // Technics that we might try ... 
    /**
     * - First create the burger in SVG in illustrator and then export the 
     * SVG. 
     * 
     * - As we have the structure we can then save it somewhere... and generate it using D3JS
     * - Or append these SVG. However this will required us to store and might not be flexible though....
     */

    /**
     * Init SVG
     *      Init a basic SVG
     * @return {Object} svg
     */
    const initSVG = () => {
        let svg = d3.select('.svg-container').append('svg')
                    .attr('width', `${SCREEN.WIDTH}px`)
                    .attr('height', `${SCREEN.HEIGHT}px`)
        
        return svg;
    };

    /**
     * 
     * @param {Object} svg 
     */
    const makeBum = (svg, type = '1') => {
        let bumGroup = svg.append('g').attr('transform', `translate(${SCREEN.WIDTH / 2}, ${SCREEN.HEIGHT / 2 - 100})`);
        bumGroup.append('path')
                .attr('d', D3Utils.generateArc({
                    start: Math.PI / 2,
                    end: -Math.PI / 2,
                    inner: 1,
                    outer: 100
                }))
                .attr('fill', '#bf5f00');
    };

    /**
     * 
     * @param {*} svg 
     * @param {*} type 
     */
    const makeOnion = (svg, type = '1') => {
        let onionArc = D3Utils.generateArc({
            start: Math.PI / 2, 
            end: -Math.PI / 2,
            inner: 15,
            outer: 20
        });

        let fakeOnion = utils.createFakeData(onionArc);
        let onionGroup = svg.append('g').attr('transform', `translate(${SCREEN.WIDTH / 2 - 85}, ${SCREEN.HEIGHT / 2 - 90})`).attr('id', 'onion-layer');

        onionGroup.selectAll('#onion-layer')
                  .data(fakeOnion)
                  .enter()
                  .append('g')
                  .attr('transform', (d) => {
                      return `translate(${d.dx}, 0)`;
                  })
                  .append('path')
                  .attr('d', (d,i) => {
                      return d.arc
                  })
                  .attr('dx', d => d.dx)
                  .attr('fill', '#EBDCD7');                  
    };

    /**
     * Draw Meat
     */
    const drawMeat = () => {
        
    };

    /**
     * Init
     *      Init the burger manager
     *  @param {String} type
     *  @throws 
     *  @private
     */
    const init = function(){
        if (typeof this !== 'object')
            throw new Error('The element bind is not an object');

        menuID = this.getAttribute('data-id');

        // Init the svg
        let svg = initSVG();
        makeBum(svg);
        makeOnion(svg);
    };

    return {
        init: init
    }
})();