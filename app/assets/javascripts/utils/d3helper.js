class SVGHelper {

    /**
     * Dimension
     *      return the dimension of the screen
     * @return {Object}
     */
    static getSVGCorner(width, height, dv) {
        if (dv === 0)
            dv = 1;
        
        return {
            WIDTH: width / dv,
            HEIGHT: height / dv
        }
    }

    /**
     * Do Loader
     */
    static doLoader() {
        let svg = d3.select('#svg-progress').append('svg');
        const dimension = SVGHelper.getSVGCorner(300, 150, 2);

        let loader = svg.append('g')
           .attr('transform', `translate(${dimension.WIDTH}, ${dimension.HEIGHT})`)
           .append('path')
           .attr('fill', '#135296')
           .attr('d', SVGHelper.arcGenerator({inner: 55, outer: 60, start: 0, end: 0}))
           .transition()
           .duration(750)
           .attrTween('d', function(d) {
               return function(t) {
                   return SVGHelper.arcGenerator({inner: 55, outer: 60, start: 0, end: Math.PI * t * 2})
               };
           });
    }

    /**
     * Append SVG
     * @param {String} id 
     * @return {Object} svg
     */
    static appendSVG(id) {
        let svg = d3.select(id).append('g');

        return svg;
    }

    /**
     * Arc Generator
     *      Generate an arc 
     * @param {Object} props
     * @return {Object} arc
     */
    static arcGenerator(props) {
        const {inner, outer, start, end} = props;
        const arc = d3.arc();

        return arc({
            innerRadius: inner,
            outerRadius: outer,
            startAngle: start,
            endAngle: end
        });
    }
}