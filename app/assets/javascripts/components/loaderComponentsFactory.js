/**
 * 
 * 
 * @class LoaderComponentsFactory
 */
class LoaderComponentsFactory {

    /**
     * Creates an instance of LoaderComponentsFactory.
     * @memberof LoaderComponentsFactory
     */
    constructor(SVGStringName) {
        this.SVGName = SVGStringName;
        this.duration = 2500;
    }

    loader() {
        this.svg = d3.select(`#${this.SVGName}`).append('svg');
        const dimension = this.getSVGCorner(300, 150, 2);

        let loader = svg.append('g')
           .attr('transform', `translate(${dimension.WIDTH}, ${dimension.HEIGHT})`)
           .append('path')
           .attr('fill', '#135296')
           .attr('d', this.arcGenerator({inner: 55, outer: 60, start: 0, end: 0}))
           .transition()
           .duration(this.duration)
           .attrTween('d', function(d) {
               return function(t) {
                   return this.arcGenerator({inner: 55, outer: 60, start: 0, end: Math.PI * t * 2})
               };
           });
    }

    /**
     * Get SVG Corner
     * 
     * @param {any} width 
     * @param {any} height 
     * @param {any} dv 
     * @returns 
     * @memberof LoaderComponentsFactory
     */
    getSVGCorner(width, height, dv) {
        if (dv === 0)
            dv = 1;
        
        return {
            WIDTH: width / dv,
            HEIGHT: height / dv
        }
    }


    /**
     * Arc Generator Factory
     * 
     * @param {Object} props 
     * @returns 
     * @memberof LoaderComponentsFactory
     */
    arcGeneratorFactory(props) {
        const {inner, outer, start, end} = props;
        const arc = d3.arc();

        return arc({
            innerRadius: inner,
            outerRadius: outer,
            startAngle: start,
            endAngle: end
        });
    }

    /**
     * Set Duration
     *      Set the duration of the animation at runtime
     * @param {any} duration 
     * @memberof LoaderComponentsFactory
     */
    setDuration(duration) {
        this.duration = duration;
    }
}